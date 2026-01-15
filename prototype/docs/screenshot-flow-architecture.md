# DesignDNA: Screenshot Gallery & UX Flow Architecture

## Overview

This document outlines the information architecture for displaying full-site screenshots and UX flows in DesignDNA. The design combines Mobbin's proven patterns with DesignDNA's unique value proposition: **extracting actionable design systems**, not just collecting screenshots.

---

## Key Differentiators from Mobbin

| Mobbin | DesignDNA |
|--------|-----------|
| Screenshot collection | Design system extraction |
| Static image viewing | Interactive component inspection |
| Manual pattern discovery | AI-powered design token extraction |
| Inspiration browsing | Copy-paste ready code/specs |
| Flow as video | Flow as interactive journey |

---

## Information Architecture

### 1. Site-Level Views (Tab Structure)

```
Site Detail Page
├── Overview (existing) - Quick stats, export options, section preview
├── Pages Gallery (NEW) - All pages/screens from the site
├── Sections (NEW) - Section-level components (hero, pricing, etc.)
├── Design System (existing) - Colors, typography, spacing
├── Components (existing) - Individual UI components
└── UX Flows (ENHANCED) - User journey visualization
```

### 2. Pages Gallery View

**Purpose**: Browse all captured pages from a website

**Layout**:
- Responsive masonry/grid of full-page screenshots
- Thumbnail: 16:10 aspect ratio showing above-fold content
- Hover: Reveal page name, sections count, quick actions

**Filtering**:
- Page Type: Home, Product, Pricing, Blog, Auth, Dashboard, etc.
- Content: Has hero, has pricing, has testimonials, etc.
- Complexity: Simple (1-3 sections), Medium (4-6), Complex (7+)

**Card Information**:
```
┌─────────────────────────────────┐
│                                 │
│    [Full Page Screenshot]       │
│         (scrollable)            │
│                                 │
├─────────────────────────────────┤
│ Homepage                        │
│ 8 sections · Last updated 2d    │
│ [View] [Extract Sections]       │
└─────────────────────────────────┘
```

### 3. Sections Gallery View

**Purpose**: Extract and copy individual page sections

**Layout**:
- Grid of section screenshots with type labels
- Visual grouping by section type (Hero, Features, Pricing, etc.)
- Each section is an extractable, exportable unit

**Section Types**:
| Type | Icon | Description |
|------|------|-------------|
| Hero | 🎯 | Main headline, CTA, hero image |
| Features | ⭐ | Feature grid/list/bento |
| Pricing | 💰 | Pricing tables/cards |
| Testimonials | 💬 | Reviews, social proof |
| FAQ | ❓ | Accordion/list Q&A |
| CTA | 📢 | Call-to-action blocks |
| Footer | 📍 | Site footer navigation |
| Stats | 📊 | Numbers, metrics display |
| Logos | 🏢 | Partner/client logos |
| Team | 👥 | Team member grid |
| Blog | 📝 | Article previews |
| Contact | 📧 | Contact forms/info |

**Section Card**:
```
┌─────────────────────────────────┐
│ [HERO]                          │
│                                 │
│    [Section Screenshot]         │
│                                 │
├─────────────────────────────────┤
│ Hero - Homepage                 │
│ Stripe · Centered layout        │
├─────────────────────────────────┤
│ [Copy HTML] [Copy React] [Figma]│
└─────────────────────────────────┘
```

### 4. Full Page View (Deep Dive)

**Purpose**: View complete page with section-by-section extraction

**Layout**:
```
┌──────────────────────────────────────────────────────┐
│ [Page Navigation Bar]                                │
│ ← Back | Homepage | 8 sections | [Export All]        │
├──────────────────────────────────────────────────────┤
│                                                      │
│ ┌────────────────────────────────────────────────┐  │
│ │ HERO SECTION                          [Export] │  │
│ │ ────────────────────────────────────────────── │  │
│ │                                                │  │
│ │          [Section Screenshot]                  │  │
│ │                                                │  │
│ │ Design Tokens: Primary blue, 72px heading     │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ ┌────────────────────────────────────────────────┐  │
│ │ FEATURES SECTION                      [Export] │  │
│ │ ────────────────────────────────────────────── │  │
│ │                                                │  │
│ │          [Section Screenshot]                  │  │
│ │                                                │  │
│ │ Design Tokens: 3-column grid, 24px gap        │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ [More sections...]                                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Sticky Sidebar** (optional):
- Section navigation/jump links
- Page statistics
- Bulk export options

---

## UX Flow Visualization System

### 5. Flow Architecture

**Purpose**: Show user journeys through the site

**Types of Flows**:
| Flow Type | Description | Example |
|-----------|-------------|---------|
| Signup | User registration journey | Landing → Signup → Verify → Dashboard |
| Checkout | Purchase flow | Product → Cart → Payment → Confirm |
| Onboarding | First-time user setup | Welcome → Profile → Settings → Home |
| Navigation | Site navigation patterns | Home → Pricing → Features → Demo |
| Auth | Login/recovery flows | Login → 2FA → Dashboard |

### 6. Flow Visualization Layout

**Canvas View** (Primary):
```
┌─────────────────────────────────────────────────────────┐
│ Signup Flow                           [Edit] [Export]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────┐      ┌─────┐      ┌─────┐      ┌─────┐       │
│  │  1  │ ───→ │  2  │ ───→ │  3  │ ───→ │  4  │       │
│  │     │      │     │      │     │      │     │       │
│  └─────┘      └─────┘      └─────┘      └─────┘       │
│  Landing      Signup       Verify       Dashboard      │
│                                                         │
│  [Click any screen to inspect]                         │
└─────────────────────────────────────────────────────────┘
```

**Linear View** (Mobile-friendly):
```
┌─────────────────────────────────────┐
│ 1. Landing Page                     │
│ ┌─────────────────────────────────┐ │
│ │      [Page Screenshot]          │ │
│ └─────────────────────────────────┘ │
│ ↓ User clicks "Sign Up" CTA         │
├─────────────────────────────────────┤
│ 2. Signup Form                      │
│ ┌─────────────────────────────────┐ │
│ │      [Page Screenshot]          │ │
│ └─────────────────────────────────┘ │
│ ↓ User submits form                 │
├─────────────────────────────────────┤
│ 3. Email Verification               │
│ ...                                 │
└─────────────────────────────────────┘
```

### 7. Flow Step Detail

**Step Card Structure**:
```
┌─────────────────────────────────────────────────────┐
│ Step 2: Signup Form                                 │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────┐ │
│ │                                                 │ │
│ │           [Full Page Screenshot]                │ │
│ │                                                 │ │
│ └─────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│ Trigger: Click "Sign Up" button                     │
│ User Action: Fill form fields                       │
│ Exit: Submit button → Step 3                        │
├─────────────────────────────────────────────────────┤
│ Components Used:                                    │
│ • Input Field (email)                               │
│ • Input Field (password)                            │
│ • Checkbox (terms)                                  │
│ • Button (submit)                                   │
├─────────────────────────────────────────────────────┤
│ [Copy Components] [View Design Specs] [Export Flow] │
└─────────────────────────────────────────────────────┘
```

### 8. Flow Annotations

**Annotation Types**:
- **Trigger**: What brings user to this step (click, scroll, time)
- **Action**: What user does on this screen
- **Decision Point**: Branching logic (success/error/alternate)
- **Micro-interaction**: Animations, feedback during step

**Visual Indicators**:
```
→  Standard progression (linear flow)
↗  Branch/decision point (if success)
↘  Error/recovery path
↺  Loop back (retry, edit)
◆  Terminal state (flow complete)
```

---

## Export Options by View

### Page Gallery Exports
- Full page screenshot (PNG/JPEG)
- Page HTML structure
- All sections as separate files
- Design tokens JSON

### Section Exports
- Section screenshot
- React component code
- HTML + CSS
- Figma frame (via plugin)
- Tailwind config snippet
- Reverse prompt for AI

### Flow Exports
- Flow diagram (SVG)
- Step-by-step documentation
- Components used in flow
- User journey map (markdown)
- Figma flow prototype

---

## Navigation Structure

### Site Detail Page Tabs (Updated)

```
[Overview] [Pages] [Sections] [Design System] [Components] [Flows]
```

### URL Structure

```
/site/stripe                    → Overview
/site/stripe/pages              → Pages gallery
/site/stripe/pages/homepage     → Single page deep view
/site/stripe/sections           → Sections gallery
/site/stripe/sections/hero      → Filtered by type
/site/stripe/flows              → All flows
/site/stripe/flows/signup       → Single flow detail
```

---

## Responsive Behavior

### Desktop (1280px+)
- 4-column grid for pages/sections
- Canvas view for flows
- Sticky sidebar navigation

### Tablet (768px - 1279px)
- 2-3 column grid
- Collapsible sidebar
- Linear flow view option

### Mobile (< 768px)
- Single column
- Full-width screenshots
- Linear flow view default
- Bottom sheet for exports

---

## Implementation Priority

### Phase 1: Core Pages View
1. Pages gallery with grid layout
2. Single page deep view with section markers
3. Basic section export (screenshot + HTML)

### Phase 2: Sections Extraction
1. Section type categorization
2. Section filtering by type
3. Multi-format export (React, HTML, Figma)

### Phase 3: UX Flows
1. Flow canvas visualization
2. Step-by-step navigation
3. Flow export options

### Phase 4: Advanced Features
1. Side-by-side comparison
2. Version history
3. Collaborative annotations

---

## Design Tokens for New Views

```css
/* Screenshot Cards */
--screenshot-aspect: 16 / 10;
--screenshot-radius: var(--radius-xl);
--screenshot-shadow: var(--shadow-lg);
--screenshot-border: var(--color-border);

/* Section Markers */
--section-badge-bg: var(--color-accent);
--section-badge-text: white;
--section-hover-border: var(--color-accent);

/* Flow Canvas */
--flow-connector-color: var(--color-border);
--flow-connector-active: var(--color-accent);
--flow-node-bg: var(--color-bg-elevated);
--flow-node-active: var(--gradient-accent);
```

---

## Next Steps

1. Create HTML wireframes for:
   - pages-gallery.html
   - page-view.html (single page with sections)
   - flow-detail.html

2. Add new CSS for screenshot cards and flow visualization

3. Update site-detail.html with new tabs structure

4. Implement JavaScript for:
   - Section highlighting on hover
   - Flow canvas interactions
   - Export functionality
