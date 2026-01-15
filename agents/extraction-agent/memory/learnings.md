# Extraction Learnings

> Patterns, discoveries, and insights from extracting sites.

---

## Page Discovery Patterns

### Navigation Structures
- Most SaaS sites: Logo | Product | Pricing | Docs | Login/Sign Up
- Enterprise sites often have: Solutions | Resources | Company dropdowns
- Footer usually has most complete link structure

### Common URL Conventions
| Page Type | URL Patterns |
|-----------|--------------|
| Pricing | `/pricing`, `/plans`, `/price` |
| Features | `/features`, `/product`, `/solutions` |
| Docs | `/docs`, `/documentation`, `/api`, `/reference` |
| Auth | `/login`, `/signin`, `/sign-in`, `/register` |
| Dashboard | `/dashboard`, `/app`, `/console` |
| Blog | `/blog`, `/articles`, `/news` |

---

## Site-Specific Notes

### Vercel
- Clean, minimal design
- Light theme only (no dark mode on marketing)
- Fast loading, minimal JS blocking
- Good: `/pricing`, `/templates`, `/docs`, `/enterprise`

### Linear
- Heavy animations on load
- Need to wait 2-3 seconds for content
- Dark theme default
- Smooth gradients and glassmorphism

### Stripe
- Extensive product suite
- Many sub-pages: `/payments`, `/billing`, `/connect`, `/terminal`
- High-quality illustrations
- Dashboard requires auth

---

## Technical Learnings

### Screenshot Tips
1. Always use `--full` for complete page capture
2. `networkidle` is usually sufficient for static sites
3. For JS-heavy sites, add explicit wait: `agent-browser wait 3000`
4. Cookie banners: Try `Escape` key first, then look for dismiss button

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Cookie banner blocking | `agent-browser press Escape` or click dismiss |
| Content not loaded | Increase wait time or wait for specific selector |
| Infinite scroll | Take viewport screenshot + scroll captures |
| Modal popup | Press Escape or find close button |
| Login required | Note in manifest, skip or use public preview |

### Agent Browser Quirks
- `--full` sometimes misses fixed headers/footers
- JSON output from snapshot can be large - use `-i` for interactive only
- Screenshot path must include extension (`.png`)

---

## Design Patterns Observed

### Color Usage
- Most sites: 1 primary brand color + neutral grays
- CTAs typically use primary brand color
- Text: Usually dark on light or light on dark
- Subtle gradients becoming more common

### Typography
- Sans-serif dominates (Inter, SF Pro, custom)
- Type scale: Usually 4-6 distinct sizes
- Headings: Bold/Semibold, tight letter-spacing
- Body: Regular weight, comfortable line-height

### Layout Patterns
- Max-width containers: 1200-1400px common
- Section padding: 60-120px vertical
- Card grids: 3-4 columns on desktop
- Mobile: Single column with stacked sections

---

## Extraction Quality Metrics

### Good Extraction Indicators
- [ ] Homepage clearly shows value proposition
- [ ] Pricing page shows all tiers
- [ ] Product pages show key features
- [ ] Screenshots are crisp, not blurry
- [ ] Full page captured, not cropped

### Red Flags
- Blank or mostly empty screenshots
- Cookie banners covering content
- Login walls blocking access
- Infinite loading states captured

---

## Future Improvements

### Automation Ideas
- Auto-detect nav links and generate page list
- Batch screenshot multiple pages in sequence
- Auto-classify page types from URL/content
- Generate manifest.json automatically from screenshots

### Quality Improvements
- Dismiss cookie banners automatically
- Detect and wait for lazy-loaded content
- Multiple viewport sizes per page
- Light/dark mode variants
