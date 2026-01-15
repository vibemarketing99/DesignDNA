#!/bin/bash
# DesignDNA - Section Screenshots Phase
# Usage: ./sections.sh <url> <output_dir>

set -e

URL="$1"
OUTPUT_DIR="$2"

if [ -z "$URL" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Usage: $0 <url> <output_dir>"
    exit 1
fi

SECTIONS_DIR="$OUTPUT_DIR/sections"
mkdir -p "$SECTIONS_DIR"

echo "[SECTIONS] Starting section capture for: $URL"

# Ensure browser is on the right page
current_url=$(agent-browser get url 2>/dev/null || echo "")
if [ "$current_url" != "$URL" ]; then
    echo "[SECTIONS] Navigating to $URL..."
    agent-browser open "$URL"
    agent-browser wait --load networkidle 2>/dev/null || agent-browser wait 3000
fi

# ===== THEME VARIANTS =====
echo "[SECTIONS] Capturing light mode..."
agent-browser set media light
agent-browser wait 500
agent-browser screenshot --full "$SECTIONS_DIR/full-light.png"

echo "[SECTIONS] Capturing dark mode..."
agent-browser set media dark
agent-browser wait 500
agent-browser screenshot --full "$SECTIONS_DIR/full-dark.png"

# Reset to light mode for other captures
agent-browser set media light

# ===== RESPONSIVE BREAKPOINTS =====
echo "[SECTIONS] Capturing responsive breakpoints..."

declare -a BREAKPOINTS=(
    "375 812 mobile"
    "768 1024 tablet"
    "1280 800 laptop"
    "1440 900 desktop"
    "1920 1080 wide"
)

for bp in "${BREAKPOINTS[@]}"; do
    read -r width height name <<< "$bp"
    echo "[SECTIONS] Capturing ${name} (${width}x${height})..."
    agent-browser set viewport "$width" "$height"
    agent-browser wait 300
    agent-browser screenshot --full "$SECTIONS_DIR/responsive-${name}-${width}x${height}.png"
done

# Reset viewport
agent-browser set viewport 1920 1080

# ===== SECTION DETECTION =====
echo "[SECTIONS] Detecting page sections..."
agent-browser eval '(function(){
  const sections = [];
  const selectors = [
    "header", "nav", "main", "footer", "aside",
    "section", "article",
    "[class*=\"hero\"]", "[class*=\"header\"]",
    "[class*=\"feature\"]", "[class*=\"pricing\"]",
    "[class*=\"testimonial\"]", "[class*=\"faq\"]",
    "[class*=\"cta\"]", "[class*=\"footer\"]",
    "[class*=\"nav\"]", "[class*=\"banner\"]",
    "[id*=\"hero\"]", "[id*=\"features\"]", "[id*=\"pricing\"]"
  ];

  const seen = new Set();

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.height < 50) return; // Skip tiny elements

      const key = `${Math.round(rect.top)}-${Math.round(rect.height)}`;
      if (seen.has(key)) return;
      seen.add(key);

      sections.push({
        selector: sel,
        index: i,
        tag: el.tagName,
        id: el.id || null,
        classes: el.className.toString().split(" ").filter(c => c).slice(0, 5),
        position: {
          top: Math.round(rect.top + window.scrollY),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        }
      });
    });
  });

  // Sort by position
  return sections.sort((a, b) => a.position.top - b.position.top);
})()' > "$SECTIONS_DIR/detected-sections.json"

# ===== INDIVIDUAL SECTION SCREENSHOTS =====
echo "[SECTIONS] Capturing individual sections..."

# Read sections and capture each
section_count=$(cat "$SECTIONS_DIR/detected-sections.json" | grep -o '"tag"' | wc -l)
echo "[SECTIONS] Found $section_count sections"

# Capture visible sections (scroll to each)
agent-browser eval '(function(){
  const sections = JSON.parse(document.body.getAttribute("data-sections") || "[]");
  // Store sections for reference
  return sections.length;
})()' > /dev/null 2>&1 || true

# Take screenshots at scroll positions
declare -a SCROLL_POSITIONS=(0 500 1000 1500 2000 3000 4000 5000)
idx=0
for pos in "${SCROLL_POSITIONS[@]}"; do
    echo "[SECTIONS] Capturing scroll position ${pos}px..."
    agent-browser eval "window.scrollTo(0, $pos)"
    agent-browser wait 200
    agent-browser screenshot "$SECTIONS_DIR/scroll-${idx}-${pos}px.png"
    ((idx++))
done

# Scroll back to top
agent-browser eval "window.scrollTo(0, 0)"

# ===== GENERATE MANIFEST =====
echo "[SECTIONS] Generating sections manifest..."
cat > "$SECTIONS_DIR/manifest.json" << EOF
{
  "url": "$URL",
  "extractedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "themes": {
    "light": "full-light.png",
    "dark": "full-dark.png"
  },
  "breakpoints": {
    "mobile": "responsive-mobile-375x812.png",
    "tablet": "responsive-tablet-768x1024.png",
    "laptop": "responsive-laptop-1280x800.png",
    "desktop": "responsive-desktop-1440x900.png",
    "wide": "responsive-wide-1920x1080.png"
  },
  "scrollPositions": [0, 500, 1000, 1500, 2000, 3000, 4000, 5000]
}
EOF

echo "[SECTIONS] Section capture complete!"
