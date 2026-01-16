#!/bin/bash
# DesignDNA - Multi-Page Crawler
# Discovers and extracts all pages within an authenticated area
# Usage: ./crawl.sh <base_url> <output_dir> [max_pages]
# Environment: AUTH_STATE - path to auth state file (optional)

set -e

BASE_URL="$1"
OUTPUT_DIR="$2"
MAX_PAGES="${3:-50}"  # Default max 50 pages

if [ -z "$BASE_URL" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Usage: $0 <base_url> <output_dir> [max_pages]"
    exit 1
fi

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

log_crawl() { echo -e "${CYAN}[CRAWL]${NC} $1"; }
log_crawl_success() { echo -e "${GREEN}[CRAWL]${NC} $1"; }
log_crawl_warning() { echo -e "${YELLOW}[CRAWL]${NC} $1"; }
log_crawl_error() { echo -e "${RED}[CRAWL]${NC} $1"; }

# Extract domain from URL
get_domain() {
    echo "$1" | sed -e 's|https\?://||' -e 's|/.*||'
}

DOMAIN=$(get_domain "$BASE_URL")
log_crawl "Starting crawl for domain: $DOMAIN"
log_crawl "Max pages: $MAX_PAGES"

# Create crawl output directory
CRAWL_DIR="$OUTPUT_DIR/pages"
mkdir -p "$CRAWL_DIR"

# Initialize visited pages tracker
VISITED_FILE="$CRAWL_DIR/.visited"
QUEUE_FILE="$CRAWL_DIR/.queue"
SITEMAP_FILE="$CRAWL_DIR/sitemap.json"

> "$VISITED_FILE"
echo "$BASE_URL" > "$QUEUE_FILE"

# Load auth state if provided
if [ -n "$AUTH_STATE" ] && [ -f "$AUTH_STATE" ]; then
    log_crawl "Loading authentication state..."
    agent-browser state load "$AUTH_STATE" 2>/dev/null || log_crawl_warning "Could not load auth state"
fi

# Function to extract links from current page
extract_links() {
    agent-browser eval "(function(){
        const domain = '$DOMAIN';
        const links = new Set();

        // Get all anchor links
        document.querySelectorAll('a[href]').forEach(a => {
            let href = a.href;

            // Skip non-http links
            if (!href.startsWith('http')) return;

            // Skip external links
            const linkDomain = new URL(href).hostname;
            if (!linkDomain.includes(domain) && !domain.includes(linkDomain)) return;

            // Skip anchors and query variations of same page
            href = href.split('#')[0].split('?')[0];

            // Skip common non-page URLs
            if (href.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|pdf|zip)$/i)) return;
            if (href.includes('/api/') || href.includes('/_next/')) return;

            links.add(href);
        });

        // Also check navigation elements
        document.querySelectorAll('nav a[href], [role=navigation] a[href], aside a[href]').forEach(a => {
            let href = a.href;
            if (href.startsWith('http')) {
                const linkDomain = new URL(href).hostname;
                if (linkDomain.includes(domain) || domain.includes(linkDomain)) {
                    href = href.split('#')[0].split('?')[0];
                    if (!href.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|pdf|zip)$/i)) {
                        links.add(href);
                    }
                }
            }
        });

        return Array.from(links);
    })()" 2>/dev/null || echo "[]"
}

# Function to get page info
get_page_info() {
    agent-browser eval "(function(){
        return {
            title: document.title,
            url: window.location.href,
            h1: document.querySelector('h1')?.textContent?.trim() || '',
            description: document.querySelector('meta[name=description]')?.content || '',
            navItems: Array.from(document.querySelectorAll('nav a, [role=navigation] a')).length,
            mainContent: document.querySelector('main, [role=main], #main, .main')?.textContent?.length || 0
        };
    })()" 2>/dev/null || echo "{}"
}

# Function to create safe filename from URL
url_to_filename() {
    local url="$1"
    # Remove protocol and domain, replace special chars
    echo "$url" | sed -e 's|https\?://[^/]*/||' -e 's|[^a-zA-Z0-9]|_|g' -e 's|_\+|_|g' -e 's|^_||' -e 's|_$||'
}

# Function to detect if page is useful (not error, not login)
is_useful_page() {
    local result
    result=$(agent-browser eval "(function(){
        const title = document.title.toLowerCase();
        const body = document.body?.innerText?.toLowerCase() || '';

        // Skip error pages
        if (title.includes('404') || title.includes('not found') || title.includes('error')) {
            return { useful: false, reason: '404/error page' };
        }

        // Skip login pages (unless we want to capture them)
        if (title.includes('login') || title.includes('sign in')) {
            const hasMainContent = document.querySelector('main, [role=main]')?.textContent?.length > 500;
            if (!hasMainContent) {
                return { useful: false, reason: 'login page' };
            }
        }

        // Skip very empty pages
        if (body.length < 100) {
            return { useful: false, reason: 'empty page' };
        }

        return { useful: true, reason: 'ok' };
    })()" 2>/dev/null)

    if echo "$result" | grep -q '"useful":true'; then
        return 0
    else
        return 1
    fi
}

# Initialize sitemap
echo '{"pages": [], "crawl_info": {"domain": "'"$DOMAIN"'", "started": "'"$(date -u +%Y-%m-%dT%H:%M:%SZ)"'", "max_pages": '"$MAX_PAGES"'}}' > "$SITEMAP_FILE"

# Crawl counter
PAGE_COUNT=0
USEFUL_COUNT=0
SKIPPED_COUNT=0

log_crawl "Starting page discovery..."
echo ""

# Main crawl loop
while [ -s "$QUEUE_FILE" ] && [ $PAGE_COUNT -lt $MAX_PAGES ]; do
    # Get next URL from queue
    CURRENT_URL=$(head -n 1 "$QUEUE_FILE")

    # Remove from queue
    tail -n +2 "$QUEUE_FILE" > "$QUEUE_FILE.tmp" && mv "$QUEUE_FILE.tmp" "$QUEUE_FILE"

    # Skip if already visited
    if grep -q "^${CURRENT_URL}$" "$VISITED_FILE" 2>/dev/null; then
        continue
    fi

    # Mark as visited
    echo "$CURRENT_URL" >> "$VISITED_FILE"
    ((PAGE_COUNT++))

    log_crawl "[$PAGE_COUNT/$MAX_PAGES] Crawling: $CURRENT_URL"

    # Navigate to page
    agent-browser open "$CURRENT_URL" 2>/dev/null
    agent-browser wait --load networkidle 2>/dev/null || agent-browser wait 2000

    # Check if page is useful
    if ! is_useful_page; then
        log_crawl_warning "  Skipping (not useful content)"
        ((SKIPPED_COUNT++))
        continue
    fi

    ((USEFUL_COUNT++))

    # Get page info
    PAGE_INFO=$(get_page_info)
    PAGE_TITLE=$(echo "$PAGE_INFO" | grep -o '"title":"[^"]*"' | cut -d'"' -f4 || echo "Untitled")

    log_crawl_success "  Found: $PAGE_TITLE"

    # Create filename from URL
    FILENAME=$(url_to_filename "$CURRENT_URL")
    [ -z "$FILENAME" ] && FILENAME="index"

    # Take screenshot
    SCREENSHOT_PATH="$CRAWL_DIR/${FILENAME}.png"
    agent-browser screenshot --full "$SCREENSHOT_PATH" 2>/dev/null
    log_crawl "  Screenshot: ${FILENAME}.png"

    # Save page info
    INFO_PATH="$CRAWL_DIR/${FILENAME}.json"
    echo "$PAGE_INFO" > "$INFO_PATH"

    # Extract links and add to queue
    LINKS=$(extract_links)
    LINK_COUNT=$(echo "$LINKS" | grep -o 'http' | wc -l | tr -d ' ')
    log_crawl "  Found $LINK_COUNT links"

    # Add new links to queue
    echo "$LINKS" | tr ',' '\n' | sed 's/.*"\(http[^"]*\)".*/\1/' | while read -r link; do
        if [ -n "$link" ] && ! grep -q "^${link}$" "$VISITED_FILE" 2>/dev/null; then
            echo "$link" >> "$QUEUE_FILE"
        fi
    done

    # Update sitemap
    python3 -c "
import json
import sys

sitemap_file = '$SITEMAP_FILE'
with open(sitemap_file, 'r') as f:
    sitemap = json.load(f)

page_entry = {
    'url': '$CURRENT_URL',
    'title': '''$PAGE_TITLE''',
    'screenshot': '${FILENAME}.png',
    'info_file': '${FILENAME}.json'
}
sitemap['pages'].append(page_entry)

with open(sitemap_file, 'w') as f:
    json.dump(sitemap, f, indent=2)
" 2>/dev/null || true

    echo ""
done

# Finalize sitemap
python3 -c "
import json
from datetime import datetime

sitemap_file = '$SITEMAP_FILE'
with open(sitemap_file, 'r') as f:
    sitemap = json.load(f)

sitemap['crawl_info']['completed'] = datetime.utcnow().isoformat() + 'Z'
sitemap['crawl_info']['pages_crawled'] = $PAGE_COUNT
sitemap['crawl_info']['pages_captured'] = $USEFUL_COUNT
sitemap['crawl_info']['pages_skipped'] = $SKIPPED_COUNT

with open(sitemap_file, 'w') as f:
    json.dump(sitemap, f, indent=2)
" 2>/dev/null || true

# Cleanup temp files
rm -f "$VISITED_FILE" "$QUEUE_FILE" 2>/dev/null

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log_crawl_success "Crawl complete!"
log_crawl "Pages crawled: $PAGE_COUNT"
log_crawl "Pages captured: $USEFUL_COUNT"
log_crawl "Pages skipped: $SKIPPED_COUNT"
log_crawl "Sitemap: $SITEMAP_FILE"
log_crawl "Screenshots: $CRAWL_DIR/"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Generate crawl summary markdown
cat > "$CRAWL_DIR/README.md" << EOF
# Crawl Results: $DOMAIN

**Crawled:** $(date '+%Y-%m-%d %H:%M:%S')
**Base URL:** $BASE_URL
**Pages Captured:** $USEFUL_COUNT

## Pages

$(python3 -c "
import json
with open('$SITEMAP_FILE', 'r') as f:
    sitemap = json.load(f)
for i, page in enumerate(sitemap['pages'], 1):
    print(f\"{i}. [{page['title']}]({page['url']})\")
    print(f\"   - Screenshot: \`{page['screenshot']}\`\")
" 2>/dev/null || echo "See sitemap.json for page list")

## Files

- \`sitemap.json\` - Complete sitemap with all page data
- \`*.png\` - Screenshots of each page
- \`*.json\` - Page metadata for each screenshot

EOF

log_crawl_success "Summary saved to: $CRAWL_DIR/README.md"
