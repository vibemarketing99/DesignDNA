# DesignDNA - Product Requirements Document (PRD)

**Version:** 1.0
**Date:** January 15, 2026
**Author:** PM Agent
**Status:** Draft for Review

---

## Executive Summary

**DesignDNA** is a design intelligence platform that extracts complete design systems from any website and exports them as production-ready assets for AI coding tools (Cursor, Claude, Bolt, v0) and design tools (Figma).

**Tagline:** *"See it. Understand it. Build it."*

**Core Problem:** The inspiration-to-implementation gap - Users see great designs but can't translate them into actual specs, tokens, or code. Hours are wasted manually extracting colors, fonts, and spacing from screenshots.

**Key Differentiator:**
| Platform | Value |
|----------|-------|
| Mobbin | Screenshot library (inspiration only) |
| DesignDNA | Screenshot library + Full extraction + Actionable exports |

---

## 1. Problem Statement

### 1.1 Current Pain Points

| Pain Point | Impact | Frequency |
|------------|--------|-----------|
| Manual color extraction from screenshots | 2-4 hours per site | Every project |
| Typography specs require browser inspection | Error-prone, incomplete | Daily |
| No structured format for AI tools | "Make it look like Stripe" doesn't work | Every AI interaction |
| Component states undocumented | Inconsistent implementations | Per component |
| UX flows scattered across screenshots | Hard to reference/share | Weekly |

### 1.2 Market Context

- **Rise of "vibe coding"** with AI tools (Cursor, Bolt, v0)
- AI tools need **structured input**, not vague descriptions
- "Make it look like Stripe" isn't actionable
- **Exact specs ARE actionable**

### 1.3 Success Criteria

The product solves the problem when:
1. Users can extract a complete design system in < 5 minutes
2. Exports work directly in Cursor/Claude without modification
3. Figma exports create usable variables/components
4. Users save 4+ hours per project compared to manual extraction

---

## 2. Target Users

### 2.1 Primary Persona: Solo Founder (Marcus)

| Attribute | Details |
|-----------|---------|
| **Profile** | 29, ex-PM, building first mobile app with Cursor |
| **Technical Level** | Can vibe code, knows basic React Native |
| **Design Level** | No formal training, "knows good design when he sees it" |
| **Budget** | $30-50/month |

**Jobs to Be Done:**
1. Find reference apps with the "vibe" he wants
2. Extract exact colors, fonts, spacing
3. Get JSON/prompts for Cursor
4. See how top apps handle specific flows

**Must-Haves:** Mobile coverage, JSON export, search by intent
**Deal Breakers:** No mobile, no code-ready export

---

### 2.2 Secondary Persona: Startup Designer (Priya)

| Attribute | Details |
|-----------|---------|
| **Profile** | 32, Senior Product Designer at Series B startup |
| **Technical Level** | Figma expert, can read code |
| **Context** | Redesigning dashboard, CEO wants "Linear" feel |
| **Budget** | $50-100/month (company expense) |

**Jobs to Be Done:**
1. Study best-in-class component design
2. Export design tokens to Figma variables
3. Create mood boards for stakeholders
4. Hand off specs to engineering

**Must-Haves:** Figma variables export, dark mode, component states, share with team
**Deal Breakers:** No Figma export, no dark mode, can't share

---

### 2.3 Tertiary Persona: Product Manager (David)

| Attribute | Details |
|-----------|---------|
| **Profile** | 35, Senior PM on Growth team |
| **Technical Level** | Can read code, doesn't write it |
| **Context** | Writing PRD for upgrade flow, needs competitor research |
| **Budget** | Has budget, needs ROI justification |

**Jobs to Be Done:**
1. Research competitor user journeys
2. Compare approaches side-by-side
3. Export as PDF for PRDs
4. Cite examples to justify decisions

**Must-Haves:** UX flows, compare mode, PDF export, search by intent
**Deal Breakers:** Can't search by outcome, no exportable format

---

## 3. Product Architecture

### 3.1 Content Hierarchy

```
PROJECTS (curated collections)
└── SITES (individual websites/apps)
    ├── SECTIONS (hero, pricing, footer, etc.)
    ├── DESIGN SYSTEM
    │   ├── FOUNDATIONS (colors, type, spacing, shadows, etc.)
    │   └── COMPONENTS (buttons, cards, inputs with all states)
    └── UX FLOWS (onboarding, checkout, upgrade, etc.)
```

### 3.2 Core Value Loop

```
DISCOVER → UNDERSTAND → EXTRACT → BUILD
```

| Phase | User Action | System Output |
|-------|-------------|---------------|
| DISCOVER | Browse library or import URL | Curated sites, search results |
| UNDERSTAND | View design system breakdown | Foundations, components, flows |
| EXTRACT | Select export format | JSON, Figma, Reverse Prompt, PDF |
| BUILD | Paste into tool | Production-ready code/assets |

### 3.3 Core Technology: Agentic Browser

Headless browser (Playwright/Puppeteer) with AI orchestration.

**Capabilities:**
1. Load URL and identify page sections
2. Screenshot sections individually + full page
3. Extract CSS → design tokens
4. Identify components with all states
5. Crawl linked pages for flows
6. Record user flows by simulating journeys
7. Structure all data for multi-format export

---

## 4. Feature Requirements - V1 (Launch)

### 4.1 Content Requirements

| Requirement | Target | Priority |
|-------------|--------|----------|
| Curated sites (web + mobile) | 50+ | P0 |
| Section-by-section screenshots | All sites | P0 |
| Full design system extraction | All sites | P0 |
| Component library with ALL STATES | All sites | P0 |
| UX flows with screenshots | 5-8 per site | P0 |
| Dark mode captured | Where exists | P1 |
| Microcopy captured | All visible text | P1 |

---

### 4.2 Browse & Search Features

| Feature | Description | Priority |
|---------|-------------|----------|
| By project/collection | Browse curated collections | P0 |
| By industry | SaaS, Fintech, E-commerce, Healthcare, AI/ML | P0 |
| By style | Minimal, Bold, Playful, Enterprise, Dark Mode | P0 |
| By platform | Web, iOS, Android | P0 |
| By component type | Button, Card, Modal, etc. | P0 |
| By flow type | Onboarding, Checkout, Upgrade, Settings | P0 |
| **By intent/task** | "How do top apps handle..." | P0 |

**Intent Search Examples:**
- "How do SaaS apps handle pricing toggles?"
- "Show me onboarding flows for fintech apps"
- "Error states in form validation"

---

### 4.3 Export Formats

#### 4.3.1 Reverse Prompt (P0)
Natural language description AI tools can build from.

**Example:**
```
Create a hero section with two-column layout (60/40 split).
Left: headline (64px, weight 620), subtext (18px, #425466),
and inline email capture with pill-shaped input...
```

#### 4.3.2 Structured JSON (P0)
Machine-readable for Cursor/Bolt/v0.

```json
{
  "metadata": { "source": "stripe.com", "section": "hero" },
  "layout": { "type": "grid", "columns": "1fr 1fr" },
  "tokens": {
    "colors": { "primary": "#635bff", "text": "#425466" },
    "typography": { "headline": { "size": "64px", "weight": 620 } }
  }
}
```

#### 4.3.3 Figma Export (P0)
- Variables (colors, type, spacing with light/dark modes)
- Components (with variants)
- Frames (page sections ready to use)
- UX Flows (for FigJam)

#### 4.3.4 PDF Export (P1)
- Screenshots with labels
- Design specs in readable format
- Flow diagrams
- User annotations

---

### 4.4 Organization Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Personal collections | Save sites/sections to collections | P0 |
| Save any element | Bookmark individual components | P0 |
| Annotations/notes | Add personal context | P1 |
| Share collection | View-only shareable link | P1 |

---

### 4.5 Design System Extraction Specifications

#### 4.5.1 Colors

| Token Type | Details |
|------------|---------|
| Brand Colors | Primary, secondary, accent (full 50-900 scale) |
| Semantic Colors | Success, warning, error, info (with variants) |
| Neutral Palette | Complete gray scale with usage annotations |
| Surface Colors | Background hierarchy, overlays, hover states |
| Dark Mode | Complete dark theme tokens (where applicable) |

#### 4.5.2 Typography

| Token Type | Details |
|------------|---------|
| Font Families | Primary, secondary, monospace (with fallbacks) |
| Type Scale | Display, H1-H6, body, caption, overline |
| Font Properties | Weight, line-height, letter-spacing per style |
| Special Treatments | Gradient text, highlighted text |
| Responsive | Mobile/tablet/desktop variations |

#### 4.5.3 Spacing & Layout

| Token Type | Details |
|------------|---------|
| Base Unit | 4px or 8px system detection |
| Spacing Scale | 4px to 128px with usage context |
| Grid System | Columns, gaps, container widths |
| Breakpoints | Mobile, tablet, desktop values |

#### 4.5.4 Effects

| Token Type | Details |
|------------|---------|
| Shadows | Elevation scale (0-4) with exact values |
| Border Radius | Scale (4px, 8px, 12px, 16px, full) |
| Gradients | All gradients with CSS code |
| Motion | Timing functions, duration scale, easing curves |

---

### 4.6 Component Documentation

Each component includes:
- Visual preview of all variants
- All states (default, hover, active, focus, disabled, loading)
- All sizes (small, medium, large)
- Complete specs (padding, colors, fonts, borders, shadows)
- Anatomy diagram
- Export buttons (JSON, CSS, Figma)

**Component Categories:**

| Category | Components |
|----------|------------|
| Navigation | Navbar, sidebar, breadcrumb, tabs, pagination |
| Data Entry | Button, input, textarea, select, checkbox, toggle, slider |
| Data Display | Card, table, avatar, badge, tooltip, accordion |
| Feedback | Alert, toast, progress, spinner, skeleton, empty state |
| Overlay | Modal, drawer, popover, command palette |
| Mobile | Bottom nav, bottom sheet, tab bar, pull-to-refresh |

---

### 4.7 UX Flow Documentation

#### What Gets Captured:
- Flow metadata (name, type, steps, estimated time)
- Step-by-step screenshots
- Trigger actions (user action to progress)
- UI elements on each screen
- Microcopy (all text, CTAs, error messages)
- UX insights (why this works)

#### Flow Categories:

| Category | Examples |
|----------|----------|
| Acquisition | Homepage→Signup, Pricing→Purchase, Landing→Lead |
| Activation | Onboarding, FTUE, Empty state→First action |
| Monetization | Free→Paid, Trial→Conversion, Upsells |
| Engagement | Search, Settings, Profile setup |
| Recovery | Password reset, Failed payment, Cancellation save |

---

## 5. Technical Architecture

### 5.1 Frontend Stack (Alex's Project Requirements)

| Category | Technology | Notes |
|----------|------------|-------|
| Package Manager | **pnpm** | NO npm or bun |
| Language | **TypeScript** | Isomorphic |
| Framework | **React** | SPA, client-side rendering |
| Rendering | **CSR** | NO Next.js, NO SSR |
| Code Splitting | **Dynamic imports** | CDN optimization |
| Styling | **Tailwind CSS v4** | |
| Client State | **Zustand** | |
| Server State | **React Query** | Data fetching |
| Forms | **React Hook Form** | |
| Validation | **Zod** | Schema validation |

### 5.2 Backend Stack (Proposed)

| Category | Technology | Purpose |
|----------|------------|---------|
| Runtime | Node.js | API server |
| Framework | Express/Fastify | REST API |
| Database | PostgreSQL | Primary data store |
| Cache | Redis | Session, rate limiting |
| Browser | Playwright | Agentic extraction |
| AI | OpenRouter | LLM processing |
| Storage | S3/Cloudflare R2 | Screenshots, assets |

### 5.3 Agentic Browser Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    EXTRACTION PIPELINE                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  URL Input                                              │
│      ↓                                                  │
│  ┌─────────────────┐                                    │
│  │ Playwright      │ → Load page, wait for hydration    │
│  │ Browser         │                                    │
│  └─────────────────┘                                    │
│      ↓                                                  │
│  ┌─────────────────┐                                    │
│  │ Section         │ → Identify hero, nav, footer, etc. │
│  │ Detector        │                                    │
│  └─────────────────┘                                    │
│      ↓                                                  │
│  ┌─────────────────┐                                    │
│  │ CSS Extractor   │ → Parse computed styles            │
│  │                 │ → Generate design tokens           │
│  └─────────────────┘                                    │
│      ↓                                                  │
│  ┌─────────────────┐                                    │
│  │ Component       │ → Identify UI components           │
│  │ Analyzer        │ → Capture all states               │
│  └─────────────────┘                                    │
│      ↓                                                  │
│  ┌─────────────────┐                                    │
│  │ Screenshot      │ → Section + full page shots        │
│  │ Generator       │                                    │
│  └─────────────────┘                                    │
│      ↓                                                  │
│  ┌─────────────────┐                                    │
│  │ AI Processor    │ → Semantic analysis                │
│  │ (OpenRouter)    │ → Generate insights                │
│  └─────────────────┘                                    │
│      ↓                                                  │
│  Output: Design System JSON + Screenshots + Insights    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 5.4 Data Models

#### Site
```typescript
interface Site {
  id: string;
  name: string;
  url: string;
  platform: 'web' | 'ios' | 'android';
  industry: Industry;
  style: Style[];
  designSystem: DesignSystem;
  sections: Section[];
  flows: UXFlow[];
  screenshots: Screenshot[];
  lastUpdated: Date;
}
```

#### DesignSystem
```typescript
interface DesignSystem {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  shadows: ShadowTokens;
  radii: RadiusTokens;
  motion: MotionTokens;
  components: Component[];
}
```

#### UXFlow
```typescript
interface UXFlow {
  id: string;
  name: string;
  category: FlowCategory;
  steps: FlowStep[];
  duration: number; // estimated time
  insights: string[];
}
```

---

## 6. User Experience

### 6.1 Core User Flows

#### Flow 1: Browse & Export (Primary)
```
1. User lands on homepage
2. Browses curated sites by industry/style
3. Clicks into Stripe design system
4. Explores color tokens
5. Clicks "Export JSON"
6. Pastes into Cursor
7. Ships feature
```

#### Flow 2: Search by Intent
```
1. User searches "onboarding flows fintech"
2. Views 5 relevant results
3. Compares two side-by-side
4. Saves both to collection
5. Exports collection as PDF
6. Adds to PRD
```

#### Flow 3: Deep Component Research
```
1. User searches "button component"
2. Filters by dark mode
3. Views Vercel button states
4. Exports to Figma variables
5. Creates component in design system
```

### 6.2 Information Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      MAIN NAVIGATION                     │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│ Discover │ Library  │ Flows    │ My Stuff │ Export      │
└──────────┴──────────┴──────────┴──────────┴─────────────┘

Discover
├── Featured Collections
├── New Additions
└── Trending Sites

Library
├── By Industry
├── By Style
├── By Platform
└── By Component

Flows
├── By Category (Onboarding, Checkout, etc.)
├── By Outcome (Conversion, Retention)
└── Compare Mode

My Stuff
├── Collections
├── Saved Items
└── Notes

Export
├── Current Selection
├── Collection Export
└── Export History
```

---

## 7. Pricing Strategy

### 7.1 Tier Structure

| Tier | Price | Target Persona | Features |
|------|-------|----------------|----------|
| **Free** | $0 | Explorers | Browse library, 3 exports/month |
| **Pro** | $39/mo | Marcus (Founder) | Unlimited exports, collections, sharing |
| **Team** | $99/mo | Priya (Designer) | Workspaces, collaboration, priority support |

### 7.2 Feature Matrix

| Feature | Free | Pro | Team |
|---------|------|-----|------|
| Browse curated library | ✓ | ✓ | ✓ |
| View design systems | ✓ | ✓ | ✓ |
| View UX flows | ✓ | ✓ | ✓ |
| Exports per month | 3 | Unlimited | Unlimited |
| Personal collections | 1 | Unlimited | Unlimited |
| Share collections | - | ✓ | ✓ |
| JSON export | ✓ | ✓ | ✓ |
| Figma export | - | ✓ | ✓ |
| PDF export | - | ✓ | ✓ |
| Team workspace | - | - | ✓ |
| Priority support | - | - | ✓ |

---

## 8. Success Metrics

### 8.1 Key Milestones

| Milestone | Target | Timeline |
|-----------|--------|----------|
| V1 Launch | 50 sites documented | Month 0 |
| Early Traction | 1,000 registered users | Month 2 |
| Product-Market Fit | 100 paying customers | Month 4 |
| V2 Launch | User URL import live | Month 6 |
| Scale | $10K MRR | Month 9 |

### 8.2 North Star Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| Weekly Active Exporters | Users who export at least 1 item/week | 30% of registered |
| Time to Value | Minutes from signup to first export | < 5 minutes |
| Export Success Rate | Exports that work in target tool | > 90% |

### 8.3 Funnel Metrics

| Stage | Metric | Target |
|-------|--------|--------|
| Acquisition | Monthly signups | 500+ |
| Activation | First export in 7 days | 60% |
| Engagement | WAU / MAU | 40% |
| Revenue | Free → Paid conversion | 5% |
| Retention | Monthly churn | < 5% |

---

## 9. Roadmap

### 9.1 V1: Public Library (Launch)

**Duration:** Month 0

| Deliverable | Status |
|-------------|--------|
| 50+ curated sites (web + mobile) | Planned |
| Full design system extraction | Planned |
| 5-8 UX flows per site | Planned |
| All export formats (JSON, Figma, Reverse Prompt, PDF) | Planned |
| Personal collections with sharing | Planned |
| Search by industry, style, platform, intent | Planned |

### 9.2 V2: User Collections (Month 6)

| Deliverable | Description |
|-------------|-------------|
| Import any URL | Agentic browser for user-submitted sites |
| Private collections | Public + imported sites |
| Compare mode | Side-by-side view |
| Team workspaces | Shared collections |
| Comments | On shared collections |
| Pattern library | Cross-site component view |

### 9.3 V3: Collaboration + Remix (Month 12)

| Deliverable | Description |
|-------------|-------------|
| Remix feature | Combine elements from multiple sites |
| AI harmonization | Blend styles coherently |
| Figma plugin | Direct export to Figma |
| Version history | Track site changes |
| UX insights | Editorial analysis layer |
| Benchmark reports | Industry comparisons |
| API access | Programmatic extraction |

---

## 10. Risks & Mitigations

### 10.1 Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Extraction accuracy varies | Medium | High | Human QA layer for V1 launch |
| Sites change frequently | Medium | High | Scheduled re-crawls, version tracking |
| Figma API limitations | Low | Medium | Start with variables, add incrementally |
| Browser detection/blocking | High | Medium | Rotate user agents, respect rate limits |

### 10.2 Business Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Mobbin adds extraction | High | Medium | Move fast, focus on AI-native exports |
| Legal concerns | High | Low | Focus on public pages, respect robots.txt |
| AI tools evolve rapidly | Medium | High | Stay close to Cursor/Claude ecosystems |
| Price sensitivity | Medium | Medium | Generous free tier, clear value prop |

### 10.3 Market Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Users don't convert from free Mobbin | High | Medium | Clear differentiation on exports |
| Niche market size | Medium | Low | Expand to agencies, bootcamps |
| Economic downturn | Medium | Low | Focus on solo founders (lower CAC) |

---

## 11. Launch Checklist

### 11.1 Content Readiness

- [ ] 50 sites fully documented
- [ ] All design systems extracted and QA'd
- [ ] 5-8 UX flows per site captured
- [ ] Dark mode variants captured (where applicable)
- [ ] Mobile apps included (minimum 10)

### 11.2 Product Readiness

- [ ] Browse/search functional
- [ ] All export formats working
- [ ] Collections feature complete
- [ ] Sharing links functional
- [ ] Payment integration complete
- [ ] Performance optimized (< 3s load)

### 11.3 Go-to-Market

- [ ] Landing page live
- [ ] Pricing page complete
- [ ] Documentation/help center
- [ ] Email sequences set up
- [ ] Social media assets ready
- [ ] Launch day communication plan

---

## 12. V1 Curated Sites List

### Dev Tools (8)
Stripe, Linear, Vercel, Supabase, Raycast, Netlify, PlanetScale, Clerk

### Productivity (6)
Notion, Cron, Superhuman, Craft, Todoist, Things

### Fintech (6)
Mercury, Ramp, Brex, Wise, Robinhood, Coinbase

### Design Tools (4)
Figma, Framer, Webflow, Spline

### E-commerce (3)
Shopify, Gumroad, Lemonsqueezy

### AI/ML (4)
OpenAI, Anthropic, Runway, Midjourney

### Mobile Apps (6)
Mercury (iOS), Copilot Finance, Cash App, Robinhood, Coinbase, Linear Mobile

**Total: 37 sites** (need 13 more to reach 50 target)

---

## 13. Open Questions

| Question | Options | Decision Needed By |
|----------|---------|-------------------|
| Pricing tiers final? | Current proposal vs. lower entry | Week 2 |
| Mobile depth iOS vs Android? | iOS-first vs. equal coverage | Week 2 |
| Editorial curation level? | AI-only vs. human QA | Week 3 |
| Additional 13 sites? | Which categories to expand | Week 3 |
| Team structure? | Who builds what | Week 1 |

---

## 14. Appendix

### A. Feature Value by Persona

| Feature | Marcus (Founder) | Priya (Designer) | David (PM) |
|---------|------------------|------------------|------------|
| JSON export | High | Low | None |
| Figma export | Low | High | None |
| PDF export | None | Low | High |
| Compare mode | Medium | High | High |
| Share collections | Low | High | High |
| Mobile coverage | High | Medium | Medium |
| Intent search | High | High | High |

### B. Competitive Landscape

| Product | Screenshots | Extraction | AI Export | Figma | Price |
|---------|-------------|------------|-----------|-------|-------|
| Mobbin | Yes | No | No | No | $19/mo |
| Dribbble | Yes | No | No | No | Free |
| Awwwards | Yes | No | No | No | Free |
| **DesignDNA** | Yes | Yes | Yes | Yes | $39/mo |

### C. Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | React SPA | Alex's stack, fast iteration |
| Styling | Tailwind v4 | Alex's stack, rapid UI |
| State | Zustand + React Query | Alex's stack, clean patterns |
| Browser automation | Playwright | Best performance, reliability |
| AI provider | OpenRouter | Multi-model flexibility |

---

**Document Status:** Ready for Review

**Next Steps:**
1. Review and approve PRD
2. Answer open questions
3. Create user personas document
4. Design wireframes
5. Begin HTML prototype

---

*PRD prepared by PM Agent following DesignDNA-Memory-Log.md and Claude.md guidelines*
