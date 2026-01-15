# Extraction Agent

> Intelligent orchestrator for extracting design systems from websites into the DesignDNA platform.

## Purpose

This agent automates the process of:
1. Discovering key pages on a website
2. Capturing screenshots of each page
3. Extracting design tokens (colors, typography, spacing)
4. Mapping output to the DesignDNA UI

## Quick Start

```bash
# Full site extraction
/extract https://stripe.com

# Pages only (current focus)
/extract-pages https://stripe.com

# Check progress
/extraction-status
```

---

## Tools Available

| Tool | Purpose | Command |
|------|---------|---------|
| `agent-browser` | Browser automation, screenshots | `agent-browser open <url>` |
| `extract.sh` | Full 4-phase extraction | `./extract.sh <url>` |

### Agent Browser Commands (Most Used)

```bash
# Navigate and screenshot
agent-browser open https://site.com
agent-browser screenshot --full pages/homepage.png

# Get page structure
agent-browser snapshot --json > structure.json

# Navigate to subpage
agent-browser click @nav-link
agent-browser screenshot --full pages/pricing.png
```

---

## Decision Tree

```
New extraction request?
├─ Full site (new to library)?
│   └─ Run: Full 4-phase extraction
│       1. Recon (structure, meta)
│       2. Tokens (colors, type, spacing)
│       3. Sections (responsive, themes)
│       4. Components (inventory)
│
├─ Adding pages to existing site?
│   └─ Run: Pages workflow only
│       → See workflows/pages-extraction.md
│
├─ Updating design tokens?
│   └─ Run: Tokens phase only
│       → ./extract.sh <url> --phases tokens
│
└─ Quick screenshot?
    └─ Direct agent-browser
        → agent-browser screenshot --full
```

---

## Page Discovery Strategy

### 1. Check Navigation
```bash
agent-browser open https://site.com
agent-browser snapshot -i --json | grep -i "link\|button"
```

Look for common nav patterns:
- Products / Features / Solutions
- Pricing
- Documentation / Docs
- Login / Sign In / Dashboard
- About / Company

### 2. Check Footer
Often contains links to:
- Terms, Privacy (skip these)
- Careers, Blog (optional)
- Product pages (capture these)

### 3. Common URL Patterns
| Pattern | Page Type |
|---------|-----------|
| `/` | Homepage |
| `/pricing` | Pricing |
| `/features`, `/product` | Product |
| `/docs`, `/documentation` | Documentation |
| `/login`, `/signin` | Authentication |
| `/dashboard`, `/app` | Dashboard |
| `/blog` | Blog (optional) |
| `/about`, `/company` | About (optional) |

### 4. Sitemap Check
```bash
curl -s https://site.com/sitemap.xml | grep "<loc>"
```

---

## Output Format

### Directory Structure
```
output/
└── {site-domain}/
    ├── pages/
    │   ├── homepage.png
    │   ├── pricing.png
    │   ├── product.png
    │   ├── docs.png
    │   ├── login.png
    │   └── manifest.json      # Page metadata for UI
    ├── tokens/
    │   └── extracted-tokens.json
    ├── sections/
    │   └── full-light.png
    └── summary.md
```

### Pages Manifest Format
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
    }
  ]
}
```

### Page Types (for UI badges)
| Type | Badge Color | Examples |
|------|-------------|----------|
| `home` | Purple | Homepage, Landing |
| `pricing` | Green | Pricing, Plans |
| `product` | Blue | Features, Product |
| `docs` | Yellow | Documentation, API |
| `auth` | Red | Login, Register |
| `dashboard` | Cyan | Dashboard, App |

---

## Quality Checklist

Before marking a site as "complete":

- [ ] Homepage captured (required)
- [ ] Pricing page captured (if exists)
- [ ] At least 1 product/feature page
- [ ] Documentation page (if exists)
- [ ] Auth page (if public)
- [ ] Screenshots are full-page, not viewport
- [ ] manifest.json generated with correct types
- [ ] All screenshots render in lightbox

---

## Memory & Learning

### Progress Tracking
Log all extraction progress to: `memory/sites-log.md`

Format:
```markdown
## stripe.com
- Status: Complete
- Pages: 8
- Last Updated: 2026-01-15
- Issues: None
```

### Learnings
Record patterns and discoveries to: `memory/learnings.md`

Examples:
- "Stripe uses `/payments` not `/product`"
- "Linear requires JS wait for content load"
- "Vercel has light-only theme"

### Known Issues
Track problems and solutions to: `memory/issues.md`

---

## Workflows

| Workflow | File | When to Use |
|----------|------|-------------|
| Pages Extraction | `workflows/pages-extraction.md` | Adding page screenshots |
| Full Extraction | `workflows/full-site-extraction.md` | New site to library |
| Component Extraction | `workflows/component-extraction.md` | Deep component analysis |

---

## Integration with DesignDNA UI

The `manifest.json` maps directly to the Pages tab:

```
manifest.json                    site-detail.html
─────────────                    ────────────────
pages[].name          →          .page-card-header h3
pages[].type          →          .page-type-badge class
pages[].screenshot    →          .page-card-preview background
pages[].featured      →          data-featured attribute
pages[].sections      →          .page-sections-count
```

### Lightbox Integration
When user clicks a page card:
1. Read `data-screenshot` attribute
2. Load image into `.lightbox-preview img`
3. Display with title and badge

---

## Current Status

**Focus:** Pages Screenshots workflow
**Known Issue:** agent-browser integration needs debugging
**Working On:** Page extract flow for Pages tab

Check `memory/sites-log.md` for per-site progress.
