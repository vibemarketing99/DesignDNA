#!/bin/bash
# DesignDNA - Reconnaissance Phase
# Usage: ./recon.sh <url> <output_dir>

set -e

URL="$1"
OUTPUT_DIR="$2"

if [ -z "$URL" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Usage: $0 <url> <output_dir>"
    exit 1
fi

echo "[RECON] Starting reconnaissance for: $URL"

# Open the URL
echo "[RECON] Opening URL..."
agent-browser open "$URL"

# Wait for page to fully load
echo "[RECON] Waiting for page load..."
agent-browser wait --load networkidle 2>/dev/null || agent-browser wait 3000

# Take initial screenshots
echo "[RECON] Taking viewport screenshot..."
agent-browser screenshot "$OUTPUT_DIR/initial-viewport.png"

echo "[RECON] Taking full page screenshot..."
agent-browser screenshot --full "$OUTPUT_DIR/initial-full.png"

# Capture structure
echo "[RECON] Capturing full accessibility tree..."
agent-browser snapshot --json > "$OUTPUT_DIR/structure.json"

echo "[RECON] Capturing interactive elements..."
agent-browser snapshot -i --json > "$OUTPUT_DIR/interactive.json"

echo "[RECON] Capturing compact tree..."
agent-browser snapshot -i -c --json > "$OUTPUT_DIR/interactive-compact.json"

# Capture page content
echo "[RECON] Capturing page HTML..."
agent-browser eval "document.documentElement.outerHTML" > "$OUTPUT_DIR/page-source.html"

echo "[RECON] Capturing page text content..."
agent-browser eval "document.body.innerText" > "$OUTPUT_DIR/page-text.txt"

# Capture metadata
echo "[RECON] Capturing page metadata..."
agent-browser get title > "$OUTPUT_DIR/title.txt"
agent-browser get url > "$OUTPUT_DIR/url.txt"

# Capture meta tags
echo "[RECON] Extracting meta information..."
agent-browser eval '(function(){const meta={};document.querySelectorAll("meta").forEach(m=>{const name=m.getAttribute("name")||m.getAttribute("property")||m.getAttribute("http-equiv");if(name)meta[name]=m.getAttribute("content")});return meta})()' > "$OUTPUT_DIR/meta-tags.json"

# Capture link tags (stylesheets, icons)
echo "[RECON] Extracting linked resources..."
agent-browser eval '(function(){const links=[];document.querySelectorAll("link").forEach(l=>{links.push({rel:l.rel,href:l.href,type:l.type})});return links})()' > "$OUTPUT_DIR/linked-resources.json"

# Capture script sources
echo "[RECON] Extracting script sources..."
agent-browser eval '(function(){const scripts=[];document.querySelectorAll("script[src]").forEach(s=>{scripts.push(s.src)});return scripts})()' > "$OUTPUT_DIR/script-sources.json"

# Check for console errors
echo "[RECON] Capturing console messages..."
agent-browser console --json > "$OUTPUT_DIR/console.json" 2>/dev/null || echo "[]" > "$OUTPUT_DIR/console.json"

echo "[RECON] Capturing page errors..."
agent-browser errors --json > "$OUTPUT_DIR/errors.json" 2>/dev/null || echo "[]" > "$OUTPUT_DIR/errors.json"

# Generate recon summary
echo "[RECON] Generating summary..."
cat > "$OUTPUT_DIR/recon-summary.json" << EOF
{
  "url": "$URL",
  "extractedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "files": {
    "screenshots": ["initial-viewport.png", "initial-full.png"],
    "structure": ["structure.json", "interactive.json", "interactive-compact.json"],
    "content": ["page-source.html", "page-text.txt"],
    "metadata": ["meta-tags.json", "linked-resources.json", "script-sources.json"],
    "debug": ["console.json", "errors.json"]
  }
}
EOF

echo "[RECON] Reconnaissance complete!"
