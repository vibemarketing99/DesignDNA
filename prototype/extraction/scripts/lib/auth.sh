#!/bin/bash
# DesignDNA - Authentication Helper
# Provides login detection, session management, and auth prompts

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

log_auth() { echo -e "${CYAN}[AUTH]${NC} $1"; }
log_auth_success() { echo -e "${GREEN}[AUTH]${NC} $1"; }
log_auth_warning() { echo -e "${YELLOW}[AUTH]${NC} $1"; }
log_auth_error() { echo -e "${RED}[AUTH]${NC} $1"; }

# URL patterns that typically require authentication
LOGIN_URL_PATTERNS=(
    "/login"
    "/signin"
    "/sign-in"
    "/auth"
    "/authenticate"
    "/sso"
    "/oauth"
    "/account/login"
)

# URL patterns that suggest protected/dashboard content
PROTECTED_URL_PATTERNS=(
    "/dashboard"
    "/app"
    "/admin"
    "/settings"
    "/account"
    "/console"
    "/workspace"
    "/projects"
    "/team"
    "/billing"
)

# Load authentication state from file
load_auth_state() {
    local auth_file="$1"

    if [ -z "$auth_file" ]; then
        return 1
    fi

    if [ ! -f "$auth_file" ]; then
        log_auth_error "Auth state file not found: $auth_file"
        return 1
    fi

    log_auth "Loading authentication state from: $auth_file"
    agent-browser state load "$auth_file" 2>/dev/null

    if [ $? -eq 0 ]; then
        log_auth_success "Authentication state loaded successfully"
        return 0
    else
        log_auth_error "Failed to load authentication state"
        return 1
    fi
}

# Save authentication state to file
save_auth_state() {
    local auth_file="$1"

    if [ -z "$auth_file" ]; then
        log_auth_error "No auth file specified for saving"
        return 1
    fi

    log_auth "Saving authentication state to: $auth_file"

    # Create directory if needed
    mkdir -p "$(dirname "$auth_file")"

    agent-browser state save "$auth_file" 2>/dev/null

    if [ $? -eq 0 ]; then
        log_auth_success "Authentication state saved to: $auth_file"
        return 0
    else
        log_auth_error "Failed to save authentication state"
        return 1
    fi
}

# Check if current URL is a login page
is_login_page() {
    local current_url
    current_url=$(agent-browser get url 2>/dev/null)

    for pattern in "${LOGIN_URL_PATTERNS[@]}"; do
        if [[ "$current_url" == *"$pattern"* ]]; then
            return 0  # true - it's a login page
        fi
    done

    # Check for login form on page
    local has_login_form
    has_login_form=$(agent-browser eval '(function(){
        const passwordInput = document.querySelector("input[type=password]");
        const loginButton = document.querySelector("button[type=submit], input[type=submit]");
        const emailInput = document.querySelector("input[type=email], input[name*=email], input[name*=user]");
        return !!(passwordInput && (loginButton || emailInput));
    })()' 2>/dev/null)

    if [ "$has_login_form" = "true" ]; then
        return 0  # true - it has a login form
    fi

    return 1  # false - not a login page
}

# Check if the original URL was protected (redirected to login)
check_login_redirect() {
    local original_url="$1"
    local current_url
    current_url=$(agent-browser get url 2>/dev/null)

    # If we were redirected away from the original URL
    if [ "$original_url" != "$current_url" ]; then
        for pattern in "${LOGIN_URL_PATTERNS[@]}"; do
            if [[ "$current_url" == *"$pattern"* ]]; then
                log_auth_warning "Page redirected to login: $current_url"
                return 0  # true - was redirected to login
            fi
        done
    fi

    return 1  # false - no login redirect
}

# Check if the page is a 404 for a protected-looking URL
check_404_on_protected_url() {
    local url="$1"

    # Check if URL looks like it should be protected
    local is_protected=false
    for pattern in "${PROTECTED_URL_PATTERNS[@]}"; do
        if [[ "$url" == *"$pattern"* ]]; then
            is_protected=true
            break
        fi
    done

    if [ "$is_protected" = false ]; then
        return 1  # Not a protected URL pattern
    fi

    # Check if page shows 404 indicators
    local is_404
    is_404=$(agent-browser eval '(function(){
        const bodyText = document.body.innerText.toLowerCase();
        const title = document.title.toLowerCase();

        // Common 404 indicators
        const indicators = [
            "404",
            "page not found",
            "not found",
            "doesn\\'t exist",
            "does not exist",
            "couldn\\'t find",
            "could not find"
        ];

        for (const indicator of indicators) {
            if (bodyText.includes(indicator) || title.includes(indicator)) {
                return true;
            }
        }

        // Check HTTP status in meta refresh (some sites use this)
        const metaRefresh = document.querySelector("meta[http-equiv=refresh]");
        if (metaRefresh) {
            const content = metaRefresh.getAttribute("content") || "";
            if (content.toLowerCase().includes("login") || content.toLowerCase().includes("signin")) {
                return true;
            }
        }

        return false;
    })()' 2>/dev/null)

    if [ "$is_404" = "true" ]; then
        return 0  # true - 404 on protected URL
    fi

    return 1  # false
}

# Detect if authentication is needed
detect_auth_required() {
    local original_url="$1"
    local reason=""

    # Check 1: Redirected to login page
    if check_login_redirect "$original_url"; then
        reason="redirected_to_login"
        echo "$reason"
        return 0
    fi

    # Check 2: Current page is a login page (might have loaded directly)
    if is_login_page; then
        reason="on_login_page"
        echo "$reason"
        return 0
    fi

    # Check 3: 404 on a protected-looking URL
    if check_404_on_protected_url "$original_url"; then
        reason="404_on_protected"
        echo "$reason"
        return 0
    fi

    echo ""
    return 1  # No auth required
}

# Interactive login flow
interactive_login() {
    local url="$1"
    local save_to="$2"

    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}           Authentication Required${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    log_auth "This page requires authentication."
    log_auth "A browser window will open for you to log in manually."
    echo ""

    # Open browser in headed mode for manual login
    log_auth "Opening browser for login..."
    agent-browser close 2>/dev/null || true
    agent-browser --headed open "$url"

    echo ""
    echo -e "${YELLOW}Please log in to the site in the browser window.${NC}"
    echo -e "${YELLOW}Press ENTER when you have completed the login...${NC}"
    read -r

    # Save the auth state
    if [ -n "$save_to" ]; then
        save_auth_state "$save_to"
    fi

    # Get current URL after login
    local current_url
    current_url=$(agent-browser get url 2>/dev/null)
    log_auth_success "Login completed. Current URL: $current_url"

    # Close headed browser and reopen headless
    agent-browser close 2>/dev/null || true

    return 0
}

# Prompt user for auth action
prompt_auth_action() {
    local reason="$1"
    local url="$2"

    echo ""
    echo -e "${YELLOW}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}         Authentication Detected${NC}"
    echo -e "${YELLOW}═══════════════════════════════════════════════════════════${NC}"
    echo ""

    case "$reason" in
        "redirected_to_login")
            log_auth_warning "Page redirected to a login screen."
            ;;
        "on_login_page")
            log_auth_warning "Current page appears to be a login page."
            ;;
        "404_on_protected")
            log_auth_warning "Page shows 404 for what appears to be a protected URL."
            log_auth_warning "This often happens with dashboard pages that require login."
            ;;
    esac

    echo ""
    echo "What would you like to do?"
    echo ""
    echo "  1) Login interactively (opens browser window)"
    echo "  2) Load existing auth state file"
    echo "  3) Skip this page and continue"
    echo "  4) Cancel extraction"
    echo ""
    read -p "Enter choice [1-4]: " choice

    case "$choice" in
        1)
            echo "AUTH_ACTION=login"
            ;;
        2)
            read -p "Enter path to auth state file: " auth_file
            echo "AUTH_ACTION=load"
            echo "AUTH_FILE=$auth_file"
            ;;
        3)
            echo "AUTH_ACTION=skip"
            ;;
        4)
            echo "AUTH_ACTION=cancel"
            ;;
        *)
            echo "AUTH_ACTION=skip"
            ;;
    esac
}

# Main function for auth check
check_and_handle_auth() {
    local url="$1"
    local auth_state="$2"  # Optional pre-configured auth state file
    local auto_login="$3"  # If true, automatically start interactive login

    # If auth state provided, load it first
    if [ -n "$auth_state" ] && [ -f "$auth_state" ]; then
        load_auth_state "$auth_state"
    fi

    # Navigate to URL
    agent-browser open "$url"
    agent-browser wait --load networkidle 2>/dev/null || agent-browser wait 3000

    # Check if auth is required
    local auth_reason
    auth_reason=$(detect_auth_required "$url")

    if [ -n "$auth_reason" ]; then
        if [ "$auto_login" = "true" ]; then
            # Auto-start interactive login
            interactive_login "$url" "${auth_state:-./auth-state.json}"
            # Re-navigate after login
            agent-browser open "$url"
            agent-browser wait --load networkidle 2>/dev/null || agent-browser wait 3000
        else
            # Prompt user
            eval "$(prompt_auth_action "$auth_reason" "$url")"

            case "$AUTH_ACTION" in
                "login")
                    interactive_login "$url" "./auth-state.json"
                    agent-browser open "$url"
                    agent-browser wait --load networkidle 2>/dev/null || agent-browser wait 3000
                    ;;
                "load")
                    load_auth_state "$AUTH_FILE"
                    agent-browser open "$url"
                    agent-browser wait --load networkidle 2>/dev/null || agent-browser wait 3000
                    ;;
                "skip")
                    log_auth_warning "Skipping authentication, continuing with current page state"
                    ;;
                "cancel")
                    log_auth_error "Extraction cancelled by user"
                    exit 1
                    ;;
            esac
        fi
    fi

    return 0
}

# Export functions for use in other scripts
export -f load_auth_state
export -f save_auth_state
export -f is_login_page
export -f check_login_redirect
export -f check_404_on_protected_url
export -f detect_auth_required
export -f interactive_login
export -f prompt_auth_action
export -f check_and_handle_auth
