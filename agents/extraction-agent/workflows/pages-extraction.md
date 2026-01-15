# Pages Extraction Workflow

> Step-by-step guide for extracting page screenshots from a website.

## Overview

This workflow captures screenshots of key pages and generates a manifest for the DesignDNA Pages tab.

**Input:** Website URL (e.g., `https://stripe.com`)
**Output:**
- `pages/*.png` - Full-page screenshots
- `pages/manifest.json` - Page metadata for UI

---

## Step 1: Setup

```bash
# Set variables
SITE_URL="https://stripe.com"
SITE_NAME=$(echo $SITE_URL | sed 's|https://||' | sed 's|/.*||')
OUTPUT_DIR="prototype/extraction/output/$SITE_NAME"

# Create output directory
mkdir -p "$OUTPUT_DIR/pages"
```

---

## Step 2: Open Homepage & Discover Pages

```bash
# Open the site
agent-browser open "$SITE_URL"
agent-browser wait --load networkidle

# Get navigation structure
agent-browser snapshot -i --json > "$OUTPUT_DIR/nav-structure.json"
```

### Identify Pages to Capture

Look for these in the nav structure:
1. **Primary Nav** - Main menu items
2. **Footer Links** - Often has complete sitemap
3. **CTA Buttons** - "Get Started", "Sign In", etc.

### Common Pages to Look For

| Priority | Page Type | Common URLs |
|----------|-----------|-------------|
| 1 | Homepage | `/` |
| 1 | Pricing | `/pricing`, `/plans` |
| 2 | Product | `/features`, `/product`, `/solutions` |
| 2 | Docs | `/docs`, `/documentation`, `/api` |
| 3 | Auth | `/login`, `/signin`, `/register` |
| 3 | Dashboard | `/dashboard`, `/app` (if public) |
| 4 | About | `/about`, `/company` |
| 4 | Blog | `/blog` (usually skip) |

---

## Step 3: Capture Screenshots

### Homepage (Required)
```bash
agent-browser open "$SITE_URL"
agent-browser wait --load networkidle
agent-browser screenshot --full "$OUTPUT_DIR/pages/homepage.png"
```

### Each Additional Page
```bash
# Example: Pricing page
agent-browser open "$SITE_URL/pricing"
agent-browser wait --load networkidle
agent-browser screenshot --full "$OUTPUT_DIR/pages/pricing.png"
```

### Screenshot Settings
- Always use `--full` for full-page capture
- Wait for `networkidle` to ensure content loaded
- Check for cookie banners/modals and dismiss if needed

### Handling Dynamic Content
```bash
# Wait for specific element
agent-browser wait "[data-loaded]"

# Or wait fixed time for JS
agent-browser wait 2000
```

---

## Step 4: Generate Manifest

Create `pages/manifest.json`:

```json
{
  "site": "stripe.com",
  "extracted": "2026-01-15",
  "pages": [
    {
      "name": "Homepage",
      "type": "home",
      "url": "/",
      "screenshot": "pages/homepage.png",
      "featured": true,
      "sections": 8
    },
    {
      "name": "Pricing",
      "type": "pricing",
      "url": "/pricing",
      "screenshot": "pages/pricing.png",
      "featured": true,
      "sections": 5
    },
    {
      "name": "Payments",
      "type": "product",
      "url": "/payments",
      "screenshot": "pages/payments.png",
      "featured": false,
      "sections": 6
    }
  ]
}
```

### Field Definitions

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name for UI |
| `type` | enum | `home`, `pricing`, `product`, `docs`, `auth`, `dashboard` |
| `url` | string | Path relative to domain |
| `screenshot` | string | Path to screenshot file |
| `featured` | boolean | Show in "Featured" filter |
| `sections` | number | Estimated section count |

---

## Step 5: Verify & Log

### Verification Checklist
- [ ] All screenshots exist and render correctly
- [ ] manifest.json is valid JSON
- [ ] Page types match badge colors in UI
- [ ] Featured pages are marked appropriately

### Log to Memory
Add entry to `memory/sites-log.md`:

```markdown
## stripe.com
- Status: Complete
- Pages Captured: 6
- Last Updated: 2026-01-15
- Notes: Captured homepage, pricing, payments, billing, connect, docs
```

---

## Quick Reference Commands

```bash
# Navigate
agent-browser open <url>

# Wait
agent-browser wait --load networkidle
agent-browser wait 2000
agent-browser wait "[selector]"

# Screenshot
agent-browser screenshot --full <path>
agent-browser screenshot <path>  # viewport only

# Inspect
agent-browser snapshot -i --json
agent-browser get title
agent-browser get url

# Interact (if needed)
agent-browser click @ref
agent-browser press Escape  # dismiss modals
```

---

## Troubleshooting

### Cookie Banners Blocking Content
```bash
agent-browser press Escape
# or find and click dismiss button
agent-browser click @cookie-dismiss
```

### Page Not Loading
```bash
# Increase wait time
agent-browser wait 5000
# Or wait for specific element
agent-browser wait "[data-page-loaded]"
```

### Screenshots Cropped
- Ensure using `--full` flag
- Some sites have infinite scroll - may need multiple captures

### Modal/Popup Blocking
```bash
agent-browser press Escape
agent-browser click @close-button
```

---

## Example: Full Stripe Extraction

```bash
# Setup
SITE="stripe.com"
OUT="prototype/extraction/output/$SITE/pages"
mkdir -p "$OUT"

# Homepage
agent-browser open "https://stripe.com"
agent-browser wait --load networkidle
agent-browser screenshot --full "$OUT/homepage.png"

# Pricing
agent-browser open "https://stripe.com/pricing"
agent-browser wait --load networkidle
agent-browser screenshot --full "$OUT/pricing.png"

# Payments
agent-browser open "https://stripe.com/payments"
agent-browser wait --load networkidle
agent-browser screenshot --full "$OUT/payments.png"

# Billing
agent-browser open "https://stripe.com/billing"
agent-browser wait --load networkidle
agent-browser screenshot --full "$OUT/billing.png"

# Connect
agent-browser open "https://stripe.com/connect"
agent-browser wait --load networkidle
agent-browser screenshot --full "$OUT/connect.png"

# Docs
agent-browser open "https://stripe.com/docs"
agent-browser wait --load networkidle
agent-browser screenshot --full "$OUT/docs.png"

# Login
agent-browser open "https://stripe.com/login"
agent-browser wait --load networkidle
agent-browser screenshot --full "$OUT/login.png"

# Dashboard (if accessible)
agent-browser open "https://dashboard.stripe.com"
agent-browser wait --load networkidle
agent-browser screenshot --full "$OUT/dashboard.png"

# Close
agent-browser close

# Generate manifest (manual or scripted)
```

---

## Next Steps

After capturing pages:
1. Verify screenshots in `output/{site}/pages/`
2. Create or update `manifest.json`
3. Log progress to `memory/sites-log.md`
4. Test in UI: open site-detail.html, check Pages tab
