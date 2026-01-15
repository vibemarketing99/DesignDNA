#!/bin/bash
# DesignDNA - Component Capture Phase
# Usage: ./components.sh <url> <output_dir>

set -e

URL="$1"
OUTPUT_DIR="$2"

if [ -z "$URL" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Usage: $0 <url> <output_dir>"
    exit 1
fi

COMPONENTS_DIR="$OUTPUT_DIR/components"
mkdir -p "$COMPONENTS_DIR"/{buttons,inputs,links,cards,navigation}

echo "[COMPONENTS] Starting component capture for: $URL"

# Ensure browser is on the right page
current_url=$(agent-browser get url 2>/dev/null || echo "")
if [ "$current_url" != "$URL" ]; then
    echo "[COMPONENTS] Navigating to $URL..."
    agent-browser open "$URL"
    agent-browser wait --load networkidle 2>/dev/null || agent-browser wait 3000
fi

# ===== COMPONENT INVENTORY =====
echo "[COMPONENTS] Building component inventory..."

agent-browser eval '(function(){
  const inventory = {
    buttons: [],
    inputs: [],
    links: [],
    cards: [],
    navigation: [],
    modals: [],
    dropdowns: [],
    tables: [],
    lists: [],
    badges: [],
    avatars: [],
    alerts: []
  };

  // Buttons
  document.querySelectorAll("button, [role=button], input[type=button], input[type=submit], .btn, [class*=button]").forEach((el, i) => {
    const style = getComputedStyle(el);
    inventory.buttons.push({
      index: i,
      text: el.textContent?.trim().slice(0, 50) || "",
      tag: el.tagName,
      type: el.type || null,
      classes: el.className?.toString().split(" ").filter(c => c).slice(0, 5) || [],
      disabled: el.disabled || el.getAttribute("aria-disabled") === "true",
      specs: {
        padding: style.padding,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        backgroundColor: style.backgroundColor,
        color: style.color,
        borderRadius: style.borderRadius,
        border: style.border
      }
    });
  });

  // Inputs
  document.querySelectorAll("input:not([type=hidden]):not([type=button]):not([type=submit]), textarea, select, [role=textbox], [role=combobox]").forEach((el, i) => {
    const style = getComputedStyle(el);
    inventory.inputs.push({
      index: i,
      type: el.type || el.tagName.toLowerCase(),
      placeholder: el.placeholder || "",
      label: el.labels?.[0]?.textContent?.trim() || "",
      classes: el.className?.toString().split(" ").filter(c => c).slice(0, 5) || [],
      required: el.required,
      specs: {
        padding: style.padding,
        fontSize: style.fontSize,
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
        border: style.border
      }
    });
  });

  // Links
  document.querySelectorAll("a[href]").forEach((el, i) => {
    if (i > 50) return; // Limit to first 50
    const style = getComputedStyle(el);
    inventory.links.push({
      index: i,
      text: el.textContent?.trim().slice(0, 50) || "",
      href: el.href?.slice(0, 100) || "",
      isExternal: el.hostname !== window.location.hostname,
      specs: {
        color: style.color,
        fontSize: style.fontSize,
        textDecoration: style.textDecoration
      }
    });
  });

  // Cards (heuristic detection)
  document.querySelectorAll("[class*=card], article, .item, [class*=tile]").forEach((el, i) => {
    if (i > 20) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 100 || rect.height < 100) return;

    const style = getComputedStyle(el);
    inventory.cards.push({
      index: i,
      classes: el.className?.toString().split(" ").filter(c => c).slice(0, 5) || [],
      dimensions: {
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      },
      specs: {
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
        boxShadow: style.boxShadow,
        padding: style.padding
      }
    });
  });

  // Navigation
  document.querySelectorAll("nav, [role=navigation], header nav, .nav, .navbar, .menu").forEach((el, i) => {
    const links = el.querySelectorAll("a");
    inventory.navigation.push({
      index: i,
      tag: el.tagName,
      classes: el.className?.toString().split(" ").filter(c => c).slice(0, 5) || [],
      linkCount: links.length,
      links: Array.from(links).slice(0, 10).map(a => ({
        text: a.textContent?.trim().slice(0, 30),
        href: a.pathname || a.href?.slice(0, 50)
      }))
    });
  });

  // Stats
  inventory.stats = {
    totalButtons: inventory.buttons.length,
    totalInputs: inventory.inputs.length,
    totalLinks: inventory.links.length,
    totalCards: inventory.cards.length,
    totalNavs: inventory.navigation.length
  };

  return inventory;
})()' > "$COMPONENTS_DIR/inventory.json"

# ===== BUTTON SAMPLES =====
echo "[COMPONENTS] Extracting button samples..."

agent-browser eval '(function(){
  const buttons = [];
  const seen = new Set();

  document.querySelectorAll("button, [role=button], .btn, [class*=button]").forEach((el, i) => {
    if (buttons.length >= 10) return;

    const style = getComputedStyle(el);
    const key = `${style.backgroundColor}-${style.color}-${style.padding}`;
    if (seen.has(key)) return;
    seen.add(key);

    const rect = el.getBoundingClientRect();
    buttons.push({
      index: i,
      text: el.textContent?.trim().slice(0, 50),
      variant: el.className?.toString().match(/(primary|secondary|ghost|outline|danger|success|warning)/i)?.[1] || "default",
      position: {
        top: Math.round(rect.top + window.scrollY),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      },
      styles: {
        padding: style.padding,
        margin: style.margin,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        fontFamily: style.fontFamily,
        color: style.color,
        backgroundColor: style.backgroundColor,
        border: style.border,
        borderRadius: style.borderRadius,
        boxShadow: style.boxShadow,
        cursor: style.cursor,
        transition: style.transition
      }
    });
  });

  return { samples: buttons, total: document.querySelectorAll("button, [role=button]").length };
})()' > "$COMPONENTS_DIR/buttons/samples.json"

# ===== INPUT SAMPLES =====
echo "[COMPONENTS] Extracting input samples..."

agent-browser eval '(function(){
  const inputs = [];
  const seen = new Set();

  document.querySelectorAll("input:not([type=hidden]), textarea, select").forEach((el, i) => {
    if (inputs.length >= 10) return;

    const style = getComputedStyle(el);
    const key = `${el.type}-${style.border}-${style.padding}`;
    if (seen.has(key)) return;
    seen.add(key);

    const rect = el.getBoundingClientRect();
    inputs.push({
      index: i,
      type: el.type || el.tagName.toLowerCase(),
      placeholder: el.placeholder,
      position: {
        top: Math.round(rect.top + window.scrollY),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      },
      styles: {
        padding: style.padding,
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
        color: style.color,
        backgroundColor: style.backgroundColor,
        border: style.border,
        borderRadius: style.borderRadius,
        outline: style.outline
      }
    });
  });

  return { samples: inputs, total: document.querySelectorAll("input:not([type=hidden]), textarea, select").length };
})()' > "$COMPONENTS_DIR/inputs/samples.json"

# ===== CARD SAMPLES =====
echo "[COMPONENTS] Extracting card samples..."

agent-browser eval '(function(){
  const cards = [];

  document.querySelectorAll("[class*=card], article").forEach((el, i) => {
    if (cards.length >= 5) return;

    const rect = el.getBoundingClientRect();
    if (rect.width < 150 || rect.height < 100) return;

    const style = getComputedStyle(el);
    cards.push({
      index: i,
      classes: el.className?.toString(),
      dimensions: {
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      },
      styles: {
        padding: style.padding,
        backgroundColor: style.backgroundColor,
        border: style.border,
        borderRadius: style.borderRadius,
        boxShadow: style.boxShadow
      },
      children: {
        images: el.querySelectorAll("img").length,
        headings: el.querySelectorAll("h1,h2,h3,h4,h5,h6").length,
        paragraphs: el.querySelectorAll("p").length,
        buttons: el.querySelectorAll("button, a.btn, [role=button]").length
      }
    });
  });

  return { samples: cards };
})()' > "$COMPONENTS_DIR/cards/samples.json"

# ===== NAVIGATION ANALYSIS =====
echo "[COMPONENTS] Analyzing navigation patterns..."

agent-browser eval '(function(){
  const navs = [];

  document.querySelectorAll("nav, header, [role=navigation]").forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const links = el.querySelectorAll("a");

    navs.push({
      index: i,
      tag: el.tagName,
      position: el.closest("header") ? "header" : (el.closest("footer") ? "footer" : "body"),
      dimensions: {
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      },
      styles: {
        backgroundColor: style.backgroundColor,
        padding: style.padding,
        position: style.position
      },
      links: Array.from(links).map(a => ({
        text: a.textContent?.trim().slice(0, 30),
        styles: {
          color: getComputedStyle(a).color,
          fontSize: getComputedStyle(a).fontSize,
          fontWeight: getComputedStyle(a).fontWeight
        }
      })).slice(0, 15)
    });
  });

  return navs;
})()' > "$COMPONENTS_DIR/navigation/analysis.json"

# ===== GENERATE MANIFEST =====
echo "[COMPONENTS] Generating components manifest..."

cat > "$COMPONENTS_DIR/manifest.json" << EOF
{
  "url": "$URL",
  "extractedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "files": {
    "inventory": "inventory.json",
    "buttons": "buttons/samples.json",
    "inputs": "inputs/samples.json",
    "cards": "cards/samples.json",
    "navigation": "navigation/analysis.json"
  }
}
EOF

echo "[COMPONENTS] Component capture complete!"
