#!/bin/bash
# DesignDNA - Master Extraction Script
# Usage: ./extract.sh <url> [options]
#
# Options:
#   --output-dir <path>  Output directory (default: ./output)
#   --skip-recon         Skip reconnaissance phase
#   --skip-tokens        Skip token extraction
#   --skip-sections      Skip section screenshots
#   --skip-components    Skip component capture
#   --phases <list>      Run only specific phases (comma-separated: recon,tokens,sections,components)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LIB_DIR="$SCRIPT_DIR/lib"
UTILS_DIR="$SCRIPT_DIR/utils"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default settings
OUTPUT_BASE="../output"
SKIP_RECON=false
SKIP_TOKENS=false
SKIP_SECTIONS=false
SKIP_COMPONENTS=false

# Helper functions
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

print_banner() {
    echo -e "${BLUE}"
    echo "╔═══════════════════════════════════════════════════════════╗"
    echo "║                    DesignDNA Extractor                     ║"
    echo "║              Taking websites apart, piece by piece         ║"
    echo "╚═══════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_usage() {
    echo "Usage: $0 <url> [options]"
    echo ""
    echo "Options:"
    echo "  --output-dir <path>  Output directory (default: ./output)"
    echo "  --skip-recon         Skip reconnaissance phase"
    echo "  --skip-tokens        Skip token extraction"
    echo "  --skip-sections      Skip section screenshots"
    echo "  --skip-components    Skip component capture"
    echo "  --phases <list>      Run only specific phases"
    echo ""
    echo "Example:"
    echo "  $0 https://linear.app"
    echo "  $0 https://stripe.com --phases tokens,sections"
}

# Parse URL to create site name
get_site_name() {
    local url="$1"
    echo "$url" | sed -e 's|https\?://||' -e 's|www\.||' -e 's|/.*||' -e 's|\.$||'
}

# Check if agent-browser is available
check_dependencies() {
    # Check for agent-browser in project directory first
    PROJECT_AB="/Users/ekhqc409/Desktop/designdna/agent-browser/bin/agent-browser-darwin-arm64"
    if [ -x "$PROJECT_AB" ]; then
        AGENT_BROWSER="$PROJECT_AB"
        log_success "agent-browser found at $AGENT_BROWSER"
        return
    fi

    # Fall back to PATH
    if command -v agent-browser &> /dev/null; then
        AGENT_BROWSER="agent-browser"
        log_success "agent-browser found in PATH"
        return
    fi

    log_error "agent-browser not found. Please install it first."
    log_info "Run: cd /Users/ekhqc409/Desktop/designdna/agent-browser && pnpm install && pnpm build:native"
    exit 1
}

# Parse arguments
parse_args() {
    if [ $# -eq 0 ]; then
        print_usage
        exit 1
    fi

    URL="$1"
    shift

    while [ $# -gt 0 ]; do
        case "$1" in
            --output-dir)
                OUTPUT_BASE="$2"
                shift 2
                ;;
            --skip-recon)
                SKIP_RECON=true
                shift
                ;;
            --skip-tokens)
                SKIP_TOKENS=true
                shift
                ;;
            --skip-sections)
                SKIP_SECTIONS=true
                shift
                ;;
            --skip-components)
                SKIP_COMPONENTS=true
                shift
                ;;
            --phases)
                IFS=',' read -ra PHASES <<< "$2"
                SKIP_RECON=true
                SKIP_TOKENS=true
                SKIP_SECTIONS=true
                SKIP_COMPONENTS=true
                for phase in "${PHASES[@]}"; do
                    case "$phase" in
                        recon) SKIP_RECON=false ;;
                        tokens) SKIP_TOKENS=false ;;
                        sections) SKIP_SECTIONS=false ;;
                        components) SKIP_COMPONENTS=false ;;
                    esac
                done
                shift 2
                ;;
            -h|--help)
                print_usage
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                print_usage
                exit 1
                ;;
        esac
    done
}

# Create output directory structure
setup_output_dir() {
    local site_name="$1"
    OUTPUT_DIR="$OUTPUT_BASE/$site_name"

    mkdir -p "$OUTPUT_DIR"/{tokens,components,sections,flows,network}

    log_info "Output directory: $OUTPUT_DIR"
}

# Phase 1: Reconnaissance
run_recon() {
    if [ "$SKIP_RECON" = true ]; then
        log_warning "Skipping reconnaissance phase"
        return
    fi

    log_info "Phase 1: Reconnaissance"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    if [ -f "$LIB_DIR/recon.sh" ]; then
        bash "$LIB_DIR/recon.sh" "$URL" "$OUTPUT_DIR"
    else
        # Inline recon if lib script doesn't exist
        log_info "Opening $URL..."
        $AGENT_BROWSER open "$URL"

        log_info "Taking full page screenshot..."
        $AGENT_BROWSER screenshot --full "$OUTPUT_DIR/initial-full.png"

        log_info "Capturing accessibility tree..."
        $AGENT_BROWSER snapshot --json > "$OUTPUT_DIR/structure.json"

        log_info "Capturing interactive elements..."
        $AGENT_BROWSER snapshot -i --json > "$OUTPUT_DIR/interactive.json"

        log_info "Capturing page source..."
        $AGENT_BROWSER eval "document.documentElement.outerHTML" > "$OUTPUT_DIR/page-source.html"

        log_info "Capturing page metadata..."
        $AGENT_BROWSER get title > "$OUTPUT_DIR/title.txt"
        $AGENT_BROWSER get url > "$OUTPUT_DIR/url.txt"
    fi

    log_success "Reconnaissance complete"
}

# Phase 2: Token Extraction
run_tokens() {
    if [ "$SKIP_TOKENS" = true ]; then
        log_warning "Skipping token extraction phase"
        return
    fi

    log_info "Phase 2: Design Token Extraction"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    if [ -f "$LIB_DIR/tokens.js" ]; then
        # Run the tokens.js extraction script
        local script_content
        script_content=$(cat "$LIB_DIR/tokens.js")
        $AGENT_BROWSER eval "$script_content" > "$OUTPUT_DIR/tokens/all-tokens.json"
    else
        log_warning "tokens.js not found, using inline extraction"

        # Inline color extraction
        log_info "Extracting colors..."
        $AGENT_BROWSER eval '(function(){const c=new Set();document.querySelectorAll("*").forEach(e=>{const s=getComputedStyle(e);[s.color,s.backgroundColor,s.borderColor].filter(v=>v&&v!=="rgba(0, 0, 0, 0)").forEach(v=>c.add(v))});return{colors:[...c]}})()' > "$OUTPUT_DIR/tokens/colors.json"

        # Inline typography extraction
        log_info "Extracting typography..."
        $AGENT_BROWSER eval '(function(){const f=new Set(),t=[];document.querySelectorAll("*").forEach(e=>{const s=getComputedStyle(e);f.add(s.fontFamily);t.push({fontSize:s.fontSize,fontWeight:s.fontWeight,lineHeight:s.lineHeight})});return{fonts:[...f],typeScale:[...new Map(t.map(x=>[x.fontSize+x.fontWeight,x])).values()]}})()' > "$OUTPUT_DIR/tokens/typography.json"

        # Inline spacing extraction
        log_info "Extracting spacing..."
        $AGENT_BROWSER eval '(function(){const s=new Set();document.querySelectorAll("*").forEach(e=>{const c=getComputedStyle(e);["marginTop","marginBottom","paddingTop","paddingBottom","gap"].forEach(p=>{const v=c[p];if(v&&v!=="0px")s.add(v)})});return{spacing:[...s].sort((a,b)=>parseFloat(a)-parseFloat(b))}})()' > "$OUTPUT_DIR/tokens/spacing.json"

        # Inline effects extraction
        log_info "Extracting shadows and effects..."
        $AGENT_BROWSER eval '(function(){const sh=new Set(),r=new Set();document.querySelectorAll("*").forEach(e=>{const s=getComputedStyle(e);if(s.boxShadow!=="none")sh.add(s.boxShadow);if(s.borderRadius!=="0px")r.add(s.borderRadius)});return{shadows:[...sh],borderRadii:[...r]}})()' > "$OUTPUT_DIR/tokens/effects.json"
    fi

    log_success "Token extraction complete"
}

# Phase 3: Section Screenshots
run_sections() {
    if [ "$SKIP_SECTIONS" = true ]; then
        log_warning "Skipping section screenshots phase"
        return
    fi

    log_info "Phase 3: Section Screenshots"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    if [ -f "$LIB_DIR/sections.sh" ]; then
        bash "$LIB_DIR/sections.sh" "$URL" "$OUTPUT_DIR"
    else
        # Light mode screenshots
        log_info "Capturing sections in light mode..."
        $AGENT_BROWSER set media light
        $AGENT_BROWSER screenshot --full "$OUTPUT_DIR/sections/full-light.png"

        # Dark mode screenshots
        log_info "Capturing sections in dark mode..."
        $AGENT_BROWSER set media dark
        $AGENT_BROWSER screenshot --full "$OUTPUT_DIR/sections/full-dark.png"

        # Responsive breakpoints
        log_info "Capturing responsive breakpoints..."
        local breakpoints=("375 812" "768 1024" "1280 800" "1920 1080")

        for bp in "${breakpoints[@]}"; do
            read -r width height <<< "$bp"
            $AGENT_BROWSER set viewport "$width" "$height"
            $AGENT_BROWSER screenshot --full "$OUTPUT_DIR/sections/responsive-${width}x${height}.png"
        done

        # Reset to default
        $AGENT_BROWSER set viewport 1920 1080
        $AGENT_BROWSER set media light
    fi

    log_success "Section screenshots complete"
}

# Phase 4: Component Capture
run_components() {
    if [ "$SKIP_COMPONENTS" = true ]; then
        log_warning "Skipping component capture phase"
        return
    fi

    log_info "Phase 4: Component Capture"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    if [ -f "$LIB_DIR/components.sh" ]; then
        bash "$LIB_DIR/components.sh" "$URL" "$OUTPUT_DIR"
    else
        # Component inventory
        log_info "Building component inventory..."
        $AGENT_BROWSER eval '(function(){const components={buttons:[],inputs:[],links:[],cards:[]};document.querySelectorAll("button,[role=button]").forEach((e,i)=>components.buttons.push({index:i,text:e.textContent.trim().slice(0,50),classes:e.className}));document.querySelectorAll("input,textarea,[role=textbox]").forEach((e,i)=>components.inputs.push({index:i,type:e.type||"text",placeholder:e.placeholder}));document.querySelectorAll("a[href]").forEach((e,i)=>components.links.push({index:i,text:e.textContent.trim().slice(0,50),href:e.href.slice(0,100)}));return components})()' > "$OUTPUT_DIR/components/inventory.json"

        log_info "Capturing button samples..."
        # Capture first few buttons as samples
        $AGENT_BROWSER eval '(function(){const btn=document.querySelector("button,[role=button]");if(!btn)return null;const s=getComputedStyle(btn);return{text:btn.textContent.trim(),styles:{padding:s.padding,fontSize:s.fontSize,fontWeight:s.fontWeight,backgroundColor:s.backgroundColor,color:s.color,borderRadius:s.borderRadius,border:s.border}}})()' > "$OUTPUT_DIR/components/button-sample.json"
    fi

    log_success "Component capture complete"
}

# Generate summary report
generate_summary() {
    log_info "Generating summary report..."

    local site_name
    site_name=$(get_site_name "$URL")

    cat > "$OUTPUT_DIR/summary.md" << EOF
# DesignDNA Extraction Report

**Site:** $URL
**Extracted:** $(date '+%Y-%m-%d %H:%M:%S')
**Site Name:** $site_name

## Files Generated

### Tokens
- \`tokens/colors.json\` - Color palette
- \`tokens/typography.json\` - Font families and type scale
- \`tokens/spacing.json\` - Spacing values
- \`tokens/effects.json\` - Shadows and border radii

### Sections
- \`sections/full-light.png\` - Full page (light mode)
- \`sections/full-dark.png\` - Full page (dark mode)
- \`sections/responsive-*.png\` - Responsive breakpoints

### Components
- \`components/inventory.json\` - Component inventory
- \`components/button-sample.json\` - Button specifications

### Structure
- \`structure.json\` - Full accessibility tree
- \`interactive.json\` - Interactive elements only
- \`page-source.html\` - Raw HTML

---

*Generated by DesignDNA Extractor*
EOF

    log_success "Summary report generated: $OUTPUT_DIR/summary.md"
}

# Cleanup
cleanup() {
    log_info "Closing browser session..."
    $AGENT_BROWSER close 2>/dev/null || true
}

# Main execution
main() {
    print_banner
    parse_args "$@"
    check_dependencies

    local site_name
    site_name=$(get_site_name "$URL")

    log_info "Extracting: $URL"
    log_info "Site name: $site_name"

    setup_output_dir "$site_name"

    # Set trap for cleanup
    trap cleanup EXIT

    # Run extraction phases
    local start_time
    start_time=$(date +%s)

    run_recon
    run_tokens
    run_sections
    run_components
    generate_summary

    local end_time
    end_time=$(date +%s)
    local duration=$((end_time - start_time))

    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log_success "Extraction complete!"
    log_info "Duration: ${duration}s"
    log_info "Output: $OUTPUT_DIR"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

main "$@"
