# DesignDNA Extraction Scripts

Systematic web scraping tools for extracting complete design systems from websites.

## Overview

These scripts use `agent-browser` to "take apart" websites like disassembling a car - capturing every component, style, and interaction pattern.

## Quick Start

```bash
# Extract design system from a website
./scripts/extract.sh https://linear.app

# Output will be in: ./output/linear.app/
```

## Directory Structure

```
extraction/
├── scripts/
│   ├── extract.sh              # Master orchestrator
│   └── lib/
│       ├── recon.sh            # Phase 1: Reconnaissance
│       ├── tokens.js           # Phase 2: Design token extraction
│       ├── sections.sh         # Phase 3: Section screenshots
│       └── components.sh       # Phase 4: Component capture
├── output/                     # Extracted data (per site)
│   └── {site-name}/
│       ├── tokens/             # Design tokens (colors, typography, spacing)
│       ├── components/         # Component inventory and specs
│       ├── sections/           # Page screenshots at various breakpoints
│       └── summary.md          # Extraction report
└── templates/                  # JSON schema templates
```

## Extraction Phases

### Phase 1: Reconnaissance
- Full page screenshot
- Accessibility tree capture
- Page source HTML
- Meta information
- Console/error logging

### Phase 2: Token Extraction
- **Colors**: All colors from computed styles + CSS variables
- **Typography**: Font families, type scale, weights
- **Spacing**: Margin, padding, gap values
- **Effects**: Shadows, border radii, transitions

### Phase 3: Section Screenshots
- Full page in light mode
- Full page in dark mode
- Responsive breakpoints (mobile, tablet, laptop, desktop, wide)
- Individual sections at scroll positions

### Phase 4: Component Capture
- Component inventory (buttons, inputs, links, cards, navigation)
- Detailed specs for each component type
- State variants (default, hover, focus, disabled)

## Usage Options

```bash
# Full extraction (all phases)
./scripts/extract.sh https://stripe.com

# Run specific phases only
./scripts/extract.sh https://vercel.com --phases tokens,sections

# Skip specific phases
./scripts/extract.sh https://notion.so --skip-components

# Custom output directory
./scripts/extract.sh https://linear.app --output-dir ./my-output
```

## Output Files

After extraction, you'll find:

| File | Description |
|------|-------------|
| `tokens/colors.json` | Color palette with usage frequency |
| `tokens/typography.json` | Font families and type scale |
| `tokens/spacing.json` | Spacing values in use |
| `tokens/effects.json` | Shadows and border radii |
| `components/inventory.json` | Full component inventory |
| `components/buttons/samples.json` | Button specifications |
| `sections/full-light.png` | Full page screenshot (light) |
| `sections/full-dark.png` | Full page screenshot (dark) |
| `sections/responsive-*.png` | Responsive breakpoint screenshots |
| `summary.md` | Human-readable extraction report |

## Prerequisites

**agent-browser** is already installed in this project:

```bash
# Location
/Users/ekhqc409/Desktop/designdna/agent-browser/bin/agent-browser-darwin-arm64

# Quick alias (add to ~/.zshrc)
alias ab='/Users/ekhqc409/Desktop/designdna/agent-browser/bin/agent-browser-darwin-arm64'

# Or link globally
cd /Users/ekhqc409/Desktop/designdna/agent-browser
pnpm link --global
```

Verify it works:
```bash
ab open https://example.com
ab snapshot -i
ab close
```

## Target Sites (Recommended)

These sites are great for testing the extraction pipeline:

| Site | URL | Notable Features |
|------|-----|------------------|
| Linear | linear.app | Dark mode, clean components |
| Stripe | stripe.com | Comprehensive design system |
| Vercel | vercel.com | Modern, minimal design |
| Notion | notion.so | Complex UI patterns |

## Troubleshooting

### Browser won't open
```bash
agent-browser install  # Re-download browser
```

### CORS blocked stylesheets
Some external stylesheets can't be read due to CORS. The scripts fall back to computed styles.

### Rate limiting
If a site blocks requests, add delays:
```bash
agent-browser wait 2000  # Wait 2 seconds between actions
```

### Authentication required
For logged-in pages:
```bash
# 1. Open browser in headed mode
agent-browser --headed open https://site.com

# 2. Manually log in
# 3. Save auth state
agent-browser state save auth.json

# 4. Load state for future extractions
agent-browser state load auth.json
```

## Integration with DesignDNA

The extracted data can be:
1. **Imported into DesignDNA database** for browsing
2. **Exported to Figma** as design tokens
3. **Converted to JSON** for AI coding tools
4. **Used as reference** for design system documentation

---

*Part of the DesignDNA project - See it. Understand it. Build it.*
