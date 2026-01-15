# DesignDNA - Product Memory Log
**Last Updated:** January 15, 2026  
**Purpose:** Reference document for continuing product development conversations

---

## 🎯 PRODUCT OVERVIEW

### One-Liner
**DesignDNA** is a design intelligence platform that extracts complete design systems from any website and exports them as production-ready assets for AI coding tools (Cursor, Claude) and design tools (Figma).

### Tagline
*"See it. Understand it. Build it."*

### Core Problem Solved
The **inspiration-to-implementation gap**: Users see great designs but can't translate them into actual specs, tokens, or code. They waste hours manually extracting colors, fonts, and spacing from screenshots.

### Key Differentiator vs Mobbin
- Mobbin = Screenshot library (inspiration only)
- DesignDNA = Screenshot library + **Full extraction + Actionable exports**

---

## 🧠 CORE VALUE PROPOSITION

### The Core Loop
```
DISCOVER → UNDERSTAND → EXTRACT → BUILD
```

1. **DISCOVER**: Browse curated library or import any URL
2. **UNDERSTAND**: See complete design system breakdown and UX flows
3. **EXTRACT**: Export as JSON, Figma variables, or reverse prompts
4. **BUILD**: Paste into Cursor/Claude/Figma and ship faster

### Why Now
- Rise of "vibe coding" with AI tools (Cursor, Bolt, v0)
- These tools need structured input, not vague descriptions
- "Make it look like Stripe" isn't actionable
- Exact specs ARE actionable

---

## 👥 TARGET PERSONAS

### Primary: Solo Founder (Marcus)
- **Profile**: 29, ex-PM, building first mobile app with Cursor
- **Technical**: Can vibe code, knows basic React Native
- **Design**: No formal training, "knows good design when he sees it"
- **Budget**: $30-50/month
- **Key Jobs**:
  - Find reference apps with the "vibe" he wants
  - Extract exact colors, fonts, spacing
  - Get JSON/prompts for Cursor
  - See how top apps handle specific flows
- **Must-Haves**: Mobile coverage, JSON export, search by intent
- **Deal Breakers**: No mobile, no code-ready export

### Secondary: Startup Designer (Priya)
- **Profile**: 32, Senior Product Designer at Series B startup
- **Technical**: Figma expert, can read code
- **Context**: Redesigning dashboard, CEO wants "Linear" feel
- **Budget**: $50-100/month (company expense)
- **Key Jobs**:
  - Study best-in-class component design
  - Export design tokens to Figma variables
  - Create mood boards for stakeholders
  - Hand off specs to engineering
- **Must-Haves**: Figma variables export, dark mode, component states, share with team
- **Deal Breakers**: No Figma export, no dark mode, can't share

### Tertiary: Product Manager (David)
- **Profile**: 35, Senior PM on Growth team
- **Technical**: Can read code, doesn't write it
- **Context**: Writing PRD for upgrade flow, needs competitor research
- **Budget**: Has budget, needs ROI justification
- **Key Jobs**:
  - Research competitor user journeys
  - Compare approaches side-by-side
  - Export as PDF for PRDs
  - Cite examples to justify decisions
- **Must-Haves**: UX flows, compare mode, PDF export, search by intent
- **Deal Breakers**: Can't search by outcome, no exportable format

---

## 🏗️ PRODUCT ARCHITECTURE

### Content Hierarchy
```
PROJECTS (curated collections)
└── SITES (individual websites/apps)
    ├── SECTIONS (hero, pricing, footer, etc.)
    ├── DESIGN SYSTEM
    │   ├── FOUNDATIONS (colors, type, spacing, shadows, etc.)
    │   └── COMPONENTS (buttons, cards, inputs with all states)
    └── UX FLOWS (onboarding, checkout, upgrade, etc.)
```

### Core Technology: Agentic Browser
- Headless browser (Playwright/Puppeteer) with AI orchestration
- Capabilities:
  1. Load URL and identify sections
  2. Screenshot sections individually + full page
  3. Extract CSS → design tokens
  4. Identify components with all states
  5. Crawl linked pages
  6. Record user flows by simulating journeys
  7. Structure all data for export

---

## 📦 V1 FEATURE SET (LAUNCH)

### Content
- [ ] 50+ curated sites (web + mobile)
- [ ] Section-by-section screenshots
- [ ] Full design system extraction
- [ ] Component library with ALL STATES
- [ ] UX flows with screenshots
- [ ] Dark mode captured (where exists)
- [ ] Microcopy captured

### Browse & Search
- [ ] By project/collection
- [ ] By industry (SaaS, Fintech, E-commerce, Healthcare, AI/ML)
- [ ] By style (Minimal, Bold, Playful, Enterprise, Dark Mode)
- [ ] By platform (Web, iOS, Android)
- [ ] By component type
- [ ] By flow type (Onboarding, Checkout, Upgrade, Settings)
- [ ] **By intent/task** ⚠️ KEY DIFFERENTIATOR

### Export Formats
- [ ] **Reverse Prompt**: Natural language for Claude/ChatGPT
- [ ] **JSON**: Structured for Cursor, Bolt, v0
- [ ] **Figma**: Variables + components + frames
- [ ] **PDF**: Presentation-ready for PRDs

### Organization
- [ ] Personal collections
- [ ] Save any element
- [ ] Add personal notes/annotations
- [ ] **Share collection (view-only link)** ⚠️ FROM PERSONA ANALYSIS

---

## 📐 DESIGN SYSTEM EXTRACTION (DETAILED)

### Foundations to Extract

#### Colors
- Brand Colors (primary, secondary, accent with full tint/shade 50-900)
- Semantic Colors (success, warning, error, info with variants)
- Neutral Palette (complete gray scale with usage annotations)
- Surface Colors (background hierarchy, overlays, hover states)
- Dark Mode tokens (where applicable)

#### Typography
- Font Families (primary, secondary, monospace with fallbacks)
- Type Scale (Display, H1-H6, body, caption, overline)
- Font Properties (weight, line-height, letter-spacing per style)
- Special Treatments (gradient text, highlighted text)
- Responsive Behavior

#### Spacing
- Base Unit (typically 4px or 8px)
- Complete Scale (4px to 128px+ with usage)
- Component Patterns

#### Shadows & Elevation
- Elevation Scale (Level 0-4 with exact values)
- Special Shadows (colored, focus rings, glow)
- Usage Guidelines

#### Border & Radii
- Radius Scale (4px, 8px, 12px, 16px, full)
- Border Styles (default, focus, divider)

#### Icons
- Icon Style (outlined vs filled, stroke width)
- Icon Sizes (16px, 20px, 24px, 32px)
- Icon Library (SVG downloads)

#### Illustrations
- Style (flat, isometric, 3D, line art)
- Color Palette used
- Types (product mockups, spot illustrations, empty states)

#### Motion & Animation
- Timing Functions (easing curves with bezier values)
- Duration Scale (50ms to 1000ms)
- Specific Animations (button hover, card lift, page transitions)
- CSS Code (copy-paste ready)

#### Gradients & Effects
- Gradient Library (all gradients with CSS)
- Special Effects (noise, glassmorphism, glow)

#### Grid & Layout
- Container System (max-widths, padding)
- Grid System (columns, gaps)
- Responsive Breakpoints

### Components to Document
Each component includes:
- Visual preview of all variants
- All states (default, hover, active, focus, disabled, loading)
- All sizes (small, medium, large)
- Complete specs (padding, colors, fonts, borders, shadows)
- Anatomy diagram
- Export buttons

**Component Categories:**
- Navigation: Navbar, sidebar, breadcrumb, tabs, pagination
- Data Entry: Button, input, textarea, select, checkbox, toggle, slider
- Data Display: Card, table, avatar, badge, tooltip, accordion
- Feedback: Alert, toast, progress, spinner, skeleton, empty state
- Overlay: Modal, drawer, popover, command palette
- Mobile-specific: Bottom nav, bottom sheet, tab bar, pull-to-refresh

---

## 🔄 UX FLOW DOCUMENTATION

### What Gets Captured
- Flow metadata (name, type, steps, estimated time)
- Step-by-step screenshots
- Trigger actions (what user does to progress)
- UI elements on each screen
- Microcopy (all text, CTAs, error messages)
- UX insights (why this works)

### Flow Categories
- **Acquisition**: Homepage→Signup, Pricing→Purchase, Landing→Lead
- **Activation**: Onboarding, FTUE, Empty state→First action
- **Monetization**: Free→Paid, Trial→Conversion, Upsells
- **Engagement**: Search, Settings, Profile setup
- **Recovery**: Password reset, Failed payment, Cancellation save

---

## 📤 EXPORT FORMAT DETAILS

### Reverse Prompt
- Natural language description AI tools can build from
- Describes layout, styles, behavior
- Example: *"Create a hero section with two-column layout (60/40 split). Left: headline (64px, weight 620), subtext (18px, #425466), and inline email capture..."*

### Structured JSON
- Machine-readable for Cursor/Bolt/v0
- Structure: metadata, layout, style tokens, children, responsive, animations

### Figma Export
- Variables (colors, type, spacing with light/dark modes)
- Components (with variants)
- Frames (page sections ready to use)
- UX Flows (for FigJam)

### PDF Export
- Screenshots with labels
- Design specs in readable format
- Flow diagrams
- User annotations

---

## 🗺️ ROADMAP

### V1: Public Library (Launch - Month 0)
- 50+ curated sites (web + mobile)
- Full design system extraction
- 5-8 UX flows per site
- All export formats
- Personal collections with sharing

### V2: User Collections (Month 6)
- Import any URL via agentic browser
- Private collections (public + imported)
- Compare mode (side-by-side)
- Team workspaces
- Comments on shared collections
- Pattern library view

### V3: Collaboration + Remix (Month 12)
- Remix feature (combine elements from multiple sites)
- AI harmonization
- Figma plugin
- Version history/changelog
- UX insights (editorial layer)
- Benchmark reports
- API access

---

## 📊 SUCCESS METRICS

### Key Milestones
| Milestone | Target | Timeline |
|-----------|--------|----------|
| V1 Launch | 50 sites documented | Month 0 |
| Early Traction | 1,000 registered users | Month 2 |
| Product-Market Fit | 100 paying customers | Month 4 |
| V2 Launch | User URL import live | Month 6 |
| Scale | $10K MRR | Month 9 |

### Metrics to Track
- **Acquisition**: Monthly signups, traffic sources, conversion rate
- **Activation**: First export within 7 days, first collection within 7 days
- **Engagement**: WAU, exports per user per week, items saved
- **Revenue**: MRR, free→paid conversion, churn, ARPU

---

## ⚠️ KEY INSIGHTS FROM PERSONA ANALYSIS

### Features Validated as Critical (All 3 Personas)
1. ✅ Screenshots by section
2. ✅ UX flows with screenshots
3. ✅ Personal collections
4. ✅ Search by flow type
5. ✅ **Search by intent/task** (discovered gap)

### New Features Identified
1. **Mobile app coverage** - Marcus's deal breaker
2. **Search by intent/task** - All three wanted this
3. **All component states** - Priya's deal breaker
4. **Share collections** - Priya + David need this
5. **PDF export** - David's key use case
6. **Compare mode** - David + Priya want side-by-side
7. **Dark mode capture** - Priya needs both themes
8. **Microcopy database** - Marcus + David want searchable copy
9. **Annotations/notes** - All personas want to add context

### Persona-Specific Value
| Feature | Marcus (Founder) | Priya (Designer) | David (PM) |
|---------|------------------|------------------|------------|
| JSON export | ★★★ | ★☆☆ | ☆☆☆ |
| Figma export | ★☆☆ | ★★★ | ☆☆☆ |
| PDF export | ☆☆☆ | ★☆☆ | ★★★ |
| Compare mode | ★★☆ | ★★★ | ★★★ |
| Share collections | ★☆☆ | ★★★ | ★★★ |

---

## 🏷️ CURATED SITES (V1 LAUNCH)

### Dev Tools
Stripe, Linear, Vercel, Supabase, Raycast, Netlify, PlanetScale, Clerk

### Productivity
Notion, Cron, Superhuman, Craft, Todoist, Things

### Fintech
Mercury, Ramp, Brex, Wise, Robinhood, Coinbase

### Design Tools
Figma, Framer, Webflow, Spline

### E-commerce
Shopify, Gumroad, Lemonsqueezy

### AI/ML
OpenAI, Anthropic, Runway, Midjourney

### Mobile Apps (iOS + Android)
Mercury, Copilot (finance), Cash App, Robinhood

---

## 💰 PRICING CONSIDERATIONS (From Persona Analysis)

- **Solo founders**: Willing to pay $30-50/month
- **Designers**: Company expense, up to $100/month
- **PMs**: Has budget, needs ROI justification

**Suggested tiers:**
- Free: Browse library, limited exports
- Pro ($39/month): Unlimited exports, collections, sharing
- Team ($99/month): Workspaces, collaboration, priority support

---

## 🔒 RISKS & MITIGATIONS

### Technical
- Extraction accuracy varies → Human QA layer for V1
- Sites change frequently → Scheduled re-crawls
- Figma API limitations → Start with variables, add incrementally

### Business
- Mobbin adds extraction → Move fast, focus on AI-native exports
- Legal concerns → Focus on public pages, respect robots.txt
- AI tools evolve → Stay close to Cursor/Claude ecosystems

### Market
- Users don't convert from free Mobbin → Clear differentiation
- Price sensitivity → Tiered pricing, team plans

---

## 📝 OPEN QUESTIONS FOR NEXT CONVERSATION

1. **Pricing model**: Finalize tiers and features per tier
2. **Mobile coverage**: Depth of iOS vs Android documentation
3. **Editorial layer**: How much human curation for UX insights?
4. **Launch strategy**: Which 50 sites for V1?
5. **Technical architecture**: Tech stack decisions
6. **Team structure**: Who builds this?

---

## 🔗 RELATED DOCUMENTS

- [ ] Full PRD (DesignDNA-PRD.docx)
- [ ] Wireframes/Mockups (TBD)
- [ ] Technical Architecture Doc (TBD)
- [ ] Go-to-Market Plan (TBD)

---

*This memory log captures the complete context from product discussions. Use it to resume conversations or onboard new team members.*
