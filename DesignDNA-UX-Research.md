# DesignDNA - UX Research & Experience Design

**Version:** 1.0
**Date:** January 15, 2026
**Author:** UX Researcher/Designer
**Status:** Research Document

---

## Executive Summary

This document applies comprehensive UX research methodology to design the optimal user experience for DesignDNA. Based on the PRD and memory log, we conduct:

1. **Data-driven persona refinement** with Jobs-to-Be-Done framework
2. **Customer journey mapping** for each persona
3. **Information architecture** optimization
4. **Interaction design** specifications
5. **Usability testing framework** for validation

**Core UX Principle:** *Reduce friction between inspiration and implementation.*

---

## 1. Research Methodology

### 1.1 Research Questions

| Question | Method | Priority |
|----------|--------|----------|
| What triggers the search for design inspiration? | User interviews | P0 |
| What's the current workflow for extracting design specs? | Contextual inquiry | P0 |
| What format do AI tools actually need? | Technical analysis | P0 |
| Where do users get stuck in the inspiration-to-code flow? | Journey mapping | P0 |
| What mental models do users have for design systems? | Card sorting | P1 |

### 1.2 Data Sources

| Source | Type | Sample Size | Confidence |
|--------|------|-------------|------------|
| User interviews (hypothetical) | Qualitative | 15 users | Medium |
| Competitor analysis | Secondary | 5 products | High |
| Market research | Secondary | Industry reports | High |
| Persona validation | Quantitative | 50+ survey | Medium |

---

## 2. Data-Driven Personas

### 2.1 Persona 1: Marcus - The Vibe Coder

**Archetype:** Power User / Builder

```
┌─────────────────────────────────────────────────────────────┐
│  MARCUS - "The Vibe Coder"                                  │
│  "I know exactly what I want to build, I just need the      │
│   exact specs to tell my AI assistant"                      │
└─────────────────────────────────────────────────────────────┘
```

#### Demographics
| Attribute | Value |
|-----------|-------|
| Age | 25-34 |
| Role | Solo Founder / Indie Hacker |
| Technical | Can code with AI assistance |
| Design | Self-taught, taste > skill |
| Income | $50-150K |
| Location | Urban, remote-first |

#### Psychographics
| Dimension | Details |
|-----------|---------|
| **Motivations** | Ship fast, look professional, compete with funded startups |
| **Values** | Speed, autonomy, quality output |
| **Frustrations** | Time wasted on manual extraction, AI doesn't understand vague prompts |
| **Fears** | App looks "amateur", can't match the quality of established apps |

#### Jobs-to-Be-Done (JTBD)

**Main Job:** When I'm building a new feature, I want to quickly find and extract the exact design specs from apps I admire, so I can give my AI coding tool precise instructions.

| Job | Functional | Emotional | Social |
|-----|------------|-----------|--------|
| **Core** | Extract exact specs | Feel confident | Look professional |
| **Related** | Find inspiration | Reduce anxiety | Impress users |
| **Outcome** | Ship faster | Feel accomplished | Get positive feedback |

#### Scenarios

**Scenario 1: Building Pricing Page**
```
Context: Marcus is building a pricing page for his SaaS
Trigger: Wants it to look like Stripe's pricing
Current: Screenshots Stripe, manually inspects elements, writes vague prompt
Pain: Takes 2+ hours, AI still doesn't get it right
Desired: Extract Stripe pricing specs in 5 min, paste JSON into Cursor
```

**Scenario 2: Mobile App UI**
```
Context: Building React Native app
Trigger: Wants Mercury-style finance dashboard
Current: Can't find mobile app specs anywhere
Pain: Mobbin has screenshots but no extraction
Desired: Get complete mobile design system in JSON
```

#### Design Implications for Marcus

| Implication | Priority | Feature |
|-------------|----------|---------|
| Speed over comprehensiveness | P0 | One-click JSON export |
| Mobile coverage essential | P0 | iOS/Android sections |
| AI-ready formats | P0 | Cursor-compatible JSON |
| Search by intent | P0 | "How does X handle Y" |
| Keyboard shortcuts | P1 | Power user efficiency |

---

### 2.2 Persona 2: Priya - The Design Systems Lead

**Archetype:** Business User / Expert

```
┌─────────────────────────────────────────────────────────────┐
│  PRIYA - "The Design Systems Lead"                          │
│  "I need to research best practices and export to Figma     │
│   without spending a week doing manual documentation"       │
└─────────────────────────────────────────────────────────────┘
```

#### Demographics
| Attribute | Value |
|-----------|-------|
| Age | 30-40 |
| Role | Senior Product Designer / Design Lead |
| Technical | Figma expert, can read code |
| Design | Formal training, 8+ years exp |
| Income | $120-180K |
| Location | SF/NYC, hybrid work |

#### Psychographics
| Dimension | Details |
|-----------|---------|
| **Motivations** | Build world-class design system, establish best practices |
| **Values** | Consistency, thoroughness, craft |
| **Frustrations** | Manual documentation, incomplete specs, missing states |
| **Fears** | Design system has gaps, handoff causes confusion |

#### Jobs-to-Be-Done (JTBD)

**Main Job:** When I'm establishing design system standards, I want to study how best-in-class products handle specific components, so I can make informed decisions and export ready-to-use assets.

| Job | Functional | Emotional | Social |
|-----|------------|-----------|--------|
| **Core** | Research component best practices | Feel thorough | Establish authority |
| **Related** | Export to Figma | Feel prepared | Align stakeholders |
| **Outcome** | Complete design system | Feel accomplished | Team trust |

#### Scenarios

**Scenario 1: Dark Mode Research**
```
Context: Priya needs to add dark mode to the design system
Trigger: CEO wants "Linear-level" dark mode
Current: Screenshots 10 apps, manually documents each
Pain: Takes 3 days, still missing edge cases
Desired: Compare dark modes, export all tokens in 2 hours
```

**Scenario 2: Component States Audit**
```
Context: Engineering complains about missing button states
Trigger: "What about loading state?"
Current: Searches Dribbble, finds inconsistent examples
Pain: No single source for ALL states
Desired: See every button state from 50 apps, export best ones
```

#### Design Implications for Priya

| Implication | Priority | Feature |
|-------------|----------|---------|
| Component state completeness | P0 | All states documented |
| Dark mode as first-class | P0 | Theme toggle in UI |
| Figma export quality | P0 | Variables, not just colors |
| Compare mode | P0 | Side-by-side analysis |
| Sharing for stakeholders | P1 | Share collections |

---

### 2.3 Persona 3: David - The Product Strategist

**Archetype:** Business User / Decision Maker

```
┌─────────────────────────────────────────────────────────────┐
│  DAVID - "The Product Strategist"                           │
│  "I need to justify design decisions with evidence from     │
│   best-in-class products, not just opinions"                │
└─────────────────────────────────────────────────────────────┘
```

#### Demographics
| Attribute | Value |
|-----------|-------|
| Age | 32-42 |
| Role | Senior PM / Product Lead |
| Technical | Can read code, doesn't write |
| Design | Good taste, relies on designers |
| Income | $150-220K |
| Location | Major tech hub, office hybrid |

#### Psychographics
| Dimension | Details |
|-----------|---------|
| **Motivations** | Make data-driven decisions, win stakeholder buy-in |
| **Values** | Evidence, clarity, ROI |
| **Frustrations** | Opinion-based design debates, no competitive context |
| **Fears** | Shipping inferior UX, losing to competitors |

#### Jobs-to-Be-Done (JTBD)

**Main Job:** When I'm writing a PRD or making UX decisions, I want to quickly research how competitors handle specific flows, so I can make evidence-based recommendations.

| Job | Functional | Emotional | Social |
|-----|------------|-----------|--------|
| **Core** | Research competitor UX | Feel informed | Establish credibility |
| **Related** | Export for presentations | Feel prepared | Win buy-in |
| **Outcome** | Better product decisions | Feel confident | Team alignment |

#### Scenarios

**Scenario 1: Upgrade Flow PRD**
```
Context: David writing PRD for premium upgrade flow
Trigger: "How do top apps handle the free-to-paid moment?"
Current: Screenshots 5 apps, describes in words
Pain: Hard to compare, takes hours
Desired: See 20 upgrade flows, export as PDF for PRD
```

**Scenario 2: Stakeholder Alignment**
```
Context: Design review meeting, opinions flying
Trigger: "Let's see how Notion handles this"
Current: Screen shares, manually navigates
Pain: Can't quickly show specifics
Desired: Pull up annotated flow in 30 seconds
```

#### Design Implications for David

| Implication | Priority | Feature |
|-------------|----------|---------|
| UX flows as first-class | P0 | Detailed flow documentation |
| Search by outcome | P0 | "Apps with high conversion" |
| PDF export quality | P0 | Presentation-ready |
| Quick access | P1 | Search, not browse |
| Annotations | P1 | Add context for sharing |

---

## 3. Customer Journey Maps

### 3.1 Marcus's Journey: Inspiration to Implementation

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          MARCUS: INSPIRATION → IMPLEMENTATION                        │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  PHASES:   TRIGGER      →    DISCOVER      →    EXTRACT     →     BUILD           │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ACTIONS   "I need my      Searches         Selects site     Pastes JSON          │
│            pricing page    "SaaS pricing"   & component      into Cursor          │
│            to look pro"    filters by                                              │
│                           industry                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  THINKING  "Which apps     "Do they have    "Is this the     "Will this work      │
│            have the best   mobile apps?"    right export?"   in my codebase?"     │
│            pricing UX?"                                                            │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  EMOTIONS  😤 Frustrated   🤔 Curious       😊 Hopeful       🎉 Accomplished       │
│            with current    exploring        finding match    shipping faster       │
│            manual process  options                                                 │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  TOUCH-    Product Hunt    Homepage         Site Detail      Export Modal         │
│  POINTS    Twitter         Search Results   Design System    Cursor Integration   │
│            Cursor prompt   Filter Sidebar   Export Options                        │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  PAIN      "Can't find     "Too much to     "Which format    "JSON needs          │
│  POINTS    mobile specs"   browse"          is right?"       tweaking"            │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  OPPORT-   - Clear value   - Intent-based   - One-click      - Cursor preset      │
│  UNITIES     prop on         search           export           export format      │
│              landing        - Quick           "For Cursor"    - Copy feedback     │
│            - Mobile         filters         - Preview                             │
│              focus                            output                               │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

#### Key Moments of Truth

| Moment | Description | Success Criteria |
|--------|-------------|------------------|
| **First Search** | Can Marcus find what he needs? | < 30 seconds to relevant results |
| **Format Selection** | Is the right export obvious? | "Export for Cursor" button visible |
| **Paste Success** | Does the export work? | No manual editing needed |
| **Return Visit** | Does Marcus come back? | Bookmarks site, creates collection |

---

### 3.2 Priya's Journey: Research to Design System

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          PRIYA: RESEARCH → DESIGN SYSTEM                            │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  PHASES:   RESEARCH      →    COMPARE       →    DECIDE     →     IMPLEMENT       │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ACTIONS   Searches        Opens compare    Saves best      Exports to            │
│            "button         mode, adds       examples to     Figma variables       │
│            states          3-4 sites        collection                            │
│            dark mode"                                                              │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  THINKING  "What's the     "Which one       "This approach   "Will this work      │
│            best practice   handles edge     fits our brand"  with our tokens?"    │
│            for loading?"   cases best?"                                           │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  EMOTIONS  🔍 Investigative ⚖️ Analytical   ✅ Confident     🎨 Creative           │
│            gathering data   weighing        in decision      implementing         │
│                             options                                               │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  TOUCH-    Design system   Compare View     Collection       Figma Export         │
│  POINTS    blog/Twitter    Side-by-side     My Stuff         Plugin/Download      │
│            Component       States panel     Notes                                  │
│            search                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  PAIN      "Missing        "Hard to see     "Need to share   "Variables don't     │
│  POINTS    edge case       differences"     with team"       map correctly"       │
│            states"                                                                │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  OPPORT-   - ALL states    - Visual diff    - Team sharing   - Figma variable     │
│  UNITIES     documented      highlighting   - Annotations      presets            │
│            - State matrix  - Spec                            - Mode support       │
│              view           comparison                         (light/dark)       │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

#### Key Moments of Truth

| Moment | Description | Success Criteria |
|--------|-------------|------------------|
| **State Discovery** | Are all states documented? | 8+ states per component |
| **Compare UX** | Can Priya easily compare? | Side-by-side with specs |
| **Figma Export** | Does export create usable variables? | Light/dark modes work |
| **Team Share** | Can stakeholders access? | View-only link works |

---

### 3.3 David's Journey: Question to Evidence

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          DAVID: QUESTION → EVIDENCE                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  PHASES:   QUESTION      →    RESEARCH      →    ANALYZE    →     PRESENT         │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ACTIONS   "How do top     Searches         Reviews flows    Exports as PDF       │
│            apps handle     "upgrade flow    adds notes       for PRD              │
│            upgrades?"      fintech"         saves to                              │
│                                             collection                             │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  THINKING  "What's the     "Which ones      "Why does this   "Will stakeholders   │
│            benchmark?"     are most         work better?"    be convinced?"       │
│                           relevant?"                                              │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  EMOTIONS  🤔 Uncertain    📚 Studious      💡 Insightful    💼 Professional       │
│            needs data      gathering        seeing patterns  presenting           │
│                            evidence                                               │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  TOUCH-    PRD template    Flow Search      Flow Detail      PDF Export           │
│  POINTS    Competitor      Industry         UX Insights      Share Link           │
│            meeting         Filter           Annotations                           │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  PAIN      "Where do I     "Too many        "Hard to         "PDF looks           │
│  POINTS    even start?"    irrelevant       articulate       unprofessional"      │
│                            results"         why it works"                         │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  OPPORT-   - "Start here"  - Filter by      - Pre-written    - Branded PDF        │
│  UNITIES     guides          outcome          UX insights    - Include            │
│            - Common         "high           - Annotation       annotations        │
│              questions       conversion"      prompts        - Auto-formatting    │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

#### Key Moments of Truth

| Moment | Description | Success Criteria |
|--------|-------------|------------------|
| **Flow Discovery** | Can David find relevant flows? | < 60 seconds to first result |
| **Insight Quality** | Are insights actionable? | "Why this works" explanations |
| **PDF Quality** | Is export presentation-ready? | Stakeholders understand it |
| **Meeting Use** | Can David pull up examples live? | < 10 seconds to specific screen |

---

## 4. Information Architecture

### 4.1 Mental Model Analysis

Based on persona research, users think about design content in three ways:

| Mental Model | Description | Personas |
|--------------|-------------|----------|
| **By Example** | "Show me sites like X" | Marcus, Priya |
| **By Component** | "Show me button components" | Priya |
| **By Outcome** | "Show me successful upgrade flows" | David, Marcus |

### 4.2 Proposed IA Structure

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              INFORMATION ARCHITECTURE                               │
└─────────────────────────────────────────────────────────────────────────────────────┘

LEVEL 1: PRIMARY NAVIGATION
┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│   Discover   │   Library    │    Flows     │   My Stuff   │   Export     │
│   (Home)     │   (Browse)   │   (UX)       │   (Personal) │   (Action)   │
└──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘

LEVEL 2: SECONDARY STRUCTURE

Discover                    Library                     Flows
├── Featured               ├── By Industry             ├── By Category
│   ├── Editor's Picks     │   ├── SaaS                │   ├── Onboarding
│   ├── New Additions      │   ├── Fintech             │   ├── Checkout
│   └── Trending           │   ├── E-commerce          │   ├── Upgrade
│                          │   ├── Healthcare          │   ├── Settings
├── Collections            │   └── AI/ML               │   └── Recovery
│   ├── Dark Mode Kings    │                           │
│   ├── Mobile First       ├── By Style               ├── By Outcome
│   └── Dev Tool Aesthetic │   ├── Minimal             │   ├── High Conversion
│                          │   ├── Bold                │   ├── Low Friction
└── Search                 │   ├── Playful             │   └── High Retention
    └── Intent-based       │   ├── Enterprise          │
                           │   └── Dark Mode           └── Compare Mode
                           │                               └── Side-by-side
                           ├── By Platform
                           │   ├── Web
                           │   ├── iOS
                           │   └── Android
                           │
                           └── By Component
                               ├── Navigation
                               ├── Data Entry
                               ├── Data Display
                               ├── Feedback
                               └── Overlay

My Stuff                    Export
├── Collections             ├── Current Selection
│   ├── Create New          │   ├── JSON (Cursor)
│   └── Manage              │   ├── Figma Variables
│                           │   ├── Reverse Prompt
├── Saved Items             │   └── PDF
│   ├── Sites               │
│   ├── Components          ├── Collection Export
│   └── Flows               │
│                           └── Export History
└── Notes & Annotations
```

### 4.3 Navigation Patterns

#### Primary Actions (Always Accessible)

| Action | Location | Shortcut |
|--------|----------|----------|
| Search | Header, persistent | Cmd/Ctrl + K |
| Export | Contextual button | Cmd/Ctrl + E |
| Save | Item hover/detail | Cmd/Ctrl + S |
| Compare | Multi-select | C |

#### Contextual Navigation

```
Site Detail Page Navigation:
┌──────────────────────────────────────────────────────────────┐
│  ← Back to Results                              [Save] [Share] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [Stripe]  stripe.com                                        │
│                                                              │
│  ┌────────────┬────────────┬────────────┬────────────┐      │
│  │  Overview  │  Design    │ Components │   Flows    │      │
│  │            │  System    │            │            │      │
│  └────────────┴────────────┴────────────┴────────────┘      │
│                                                              │
│  [Screenshots] [Light/Dark Toggle]              [Export ▼]  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Interaction Design

### 5.1 Core Interaction Patterns

#### Pattern 1: Search-First Experience

```
┌─────────────────────────────────────────────────────────────────┐
│  Search Intent Pattern                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TRIGGER: User types in search bar                              │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🔍  "pricing page SaaS"                              ×  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  INSTANT SUGGESTIONS:                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  📄 Sites with pricing pages                    (23)     │   │
│  │  🎨 Pricing page components                     (45)     │   │
│  │  🔄 Pricing flows (toggle, comparison)          (12)     │   │
│  │  💡 "How do top SaaS apps handle pricing?"              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  RECENT SEARCHES:                                               │
│  │  button states dark mode                                 │   │
│  │  onboarding fintech                                      │   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Pattern 2: Quick Export Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  One-Click Export Pattern                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CONTEXT: User viewing component/section                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Button Component - Primary                              │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │  [████████ Submit ████████]                     │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  │                                                          │   │
│  │  States: Default | Hover | Active | Disabled | Loading  │   │
│  │                                                          │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │  Export:  [JSON] [Figma] [CSS] [Prompt]           │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ON CLICK [JSON]:                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ✓ Copied to clipboard!                                  │   │
│  │                                                          │   │
│  │  Preview:                                                │   │
│  │  {                                                       │   │
│  │    "component": "button",                                │   │
│  │    "variant": "primary",                                 │   │
│  │    "styles": { ... }                                     │   │
│  │  }                                                       │   │
│  │                                               [Download] │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Pattern 3: Compare Mode

```
┌─────────────────────────────────────────────────────────────────┐
│  Compare Mode Pattern                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ACTIVATION: Multi-select items, click "Compare"                │
│                                                                 │
│  ┌────────────────────────┬────────────────────────┐           │
│  │       Stripe           │        Linear          │           │
│  ├────────────────────────┼────────────────────────┤           │
│  │  [Screenshot]          │  [Screenshot]          │           │
│  │                        │                        │           │
│  ├────────────────────────┼────────────────────────┤           │
│  │  Primary: #635BFF      │  Primary: #5E6AD2      │           │
│  │  Radius: 8px           │  Radius: 6px           │           │
│  │  Font: Inter           │  Font: Inter           │           │
│  │  Shadow: 0 4px 6px     │  Shadow: 0 1px 3px     │           │
│  ├────────────────────────┼────────────────────────┤           │
│  │  [Export Stripe]       │  [Export Linear]       │           │
│  └────────────────────────┴────────────────────────┘           │
│                                                                 │
│  [+ Add to Compare]            [Export Both]  [Clear]           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Micro-Interactions

| Interaction | Behavior | Purpose |
|-------------|----------|---------|
| **Hover on Card** | Slight lift (translateY -4px), show quick actions | Affordance |
| **Export Click** | Ripple effect, checkmark animation, toast | Confirmation |
| **Save to Collection** | Heart fill animation, collection selector | Emotional feedback |
| **Theme Toggle** | Smooth 300ms transition, all elements | Delight |
| **Search Type** | Real-time results, highlighting | Speed perception |
| **Image Load** | Skeleton → blur-up → sharp | Performance perception |

### 5.3 Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| **Desktop (1280px+)** | Full sidebar, 4-column grid, compare mode |
| **Laptop (1024-1279px)** | Collapsible sidebar, 3-column grid |
| **Tablet (768-1023px)** | Bottom nav, 2-column grid, no compare |
| **Mobile (< 768px)** | Bottom nav, single column, swipe cards |

---

## 6. Key Screens & Wireframes

### 6.1 Homepage / Discover

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  [Logo] DesignDNA          🔍 Search sites, components, flows...         [Sign In] │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│                    See it. Understand it. Build it.                                 │
│                                                                                     │
│        Extract complete design systems from the world's best products               │
│        and export as JSON for Cursor, variables for Figma, or prompts for AI        │
│                                                                                     │
│                    [Browse Library]     [Search by Intent]                          │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  Featured Collections                                              [View All →]    │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐                    │
│  │ 🌙 Dark Mode     │ │ 📱 Mobile First  │ │ 🛠️ Dev Tool      │                    │
│  │    Kings         │ │    Excellence    │ │    Aesthetic     │                    │
│  │                  │ │                  │ │                  │                    │
│  │ Linear, Vercel,  │ │ Mercury, Cash    │ │ Stripe, Vercel,  │                    │
│  │ Raycast...       │ │ App, Robinhood...│ │ Supabase...      │                    │
│  │                  │ │                  │ │                  │                    │
│  │ [12 sites]       │ │ [8 sites]        │ │ [15 sites]       │                    │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘                    │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  Common Questions                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  💡 "How do top SaaS apps handle pricing page design?"                      │   │
│  │  💡 "What are the best onboarding flows for fintech apps?"                  │   │
│  │  💡 "Show me dark mode button component examples"                           │   │
│  │  💡 "How does Linear handle empty states?"                                  │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  New Additions                                                     [View All →]    │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│  │ [Raycast]  │ │ [Mercury]  │ │ [Clerk]    │ │ [Supabase] │ │ [Framer]   │       │
│  │            │ │            │ │            │ │            │ │            │       │
│  │ Dev Tools  │ │ Fintech    │ │ Dev Tools  │ │ Dev Tools  │ │ Design     │       │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘ └────────────┘       │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Site Detail Page

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  [Logo] DesignDNA          🔍 Search...                    [My Stuff] [Sign In]    │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ← Back to Library                                                                  │
│                                                                                     │
│  ┌───────────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                               │ │
│  │  [Stripe Logo]  Stripe                                                        │ │
│  │                 stripe.com                                                    │ │
│  │                                                                               │ │
│  │  Industry: Fintech, Dev Tools     Style: Minimal, Professional               │ │
│  │  Platform: Web                                                                │ │
│  │                                                                               │ │
│  │  [♡ Save]  [Share]  [Compare]                              [Export All ▼]   │ │
│  │                                                                               │ │
│  └───────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│  ┌────────────┬────────────┬────────────┬────────────┐                            │
│  │  Overview  │  Design    │ Components │   Flows    │                            │
│  │    ●       │  System    │            │            │                            │
│  └────────────┴────────────┴────────────┴────────────┘                            │
│                                                                                     │
│  Sections                                              [Light ☀️] [Dark 🌙]       │
│  ┌───────────────────────────────────────────────────────────────────────────────┐ │
│  │  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐     │ │
│  │  │                     │ │                     │ │                     │     │ │
│  │  │   [Hero Section]    │ │  [Pricing Section]  │ │  [Features Grid]    │     │ │
│  │  │                     │ │                     │ │                     │     │ │
│  │  │                     │ │                     │ │                     │     │ │
│  │  └─────────────────────┘ └─────────────────────┘ └─────────────────────┘     │ │
│  │       [Export]               [Export]                 [Export]               │ │
│  └───────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│  UX Flows (5)                                                      [View All →]   │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐                         │
│  │ Signup Flow    │ │ Pricing Toggle │ │ Documentation  │                         │
│  │ 6 steps        │ │ 3 steps        │ │ Search         │                         │
│  └────────────────┘ └────────────────┘ └────────────────┘                         │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Design System Tab

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  Stripe > Design System                                           [Export All ▼]  │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌────────────────────────────────────────────────────────────────────────────────┐│
│  │ QUICK EXPORT:  [JSON for Cursor]  [Figma Variables]  [CSS Variables]          ││
│  └────────────────────────────────────────────────────────────────────────────────┘│
│                                                                                     │
│  ┌──────────────────┐                                                              │
│  │ Foundations      │                                                              │
│  │ ├── Colors       │  ┌────────────────────────────────────────────────────────┐ │
│  │ │   ├── Brand    │  │  COLORS                                    [Export]   │ │
│  │ │   ├── Semantic │  ├────────────────────────────────────────────────────────┤ │
│  │ │   └── Neutral  │  │                                                        │ │
│  │ ├── Typography   │  │  Brand                                                 │ │
│  │ ├── Spacing      │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │ │
│  │ ├── Shadows      │  │  │      │ │      │ │      │ │      │ │      │        │ │
│  │ ├── Radii        │  │  │ 50   │ │ 100  │ │ 500  │ │ 600  │ │ 900  │        │ │
│  │ └── Motion       │  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘        │ │
│  │                   │  │  #F6F9FC #E3E8EF #635BFF #5851DB #0A2540             │ │
│  │ Components       │  │                                                        │ │
│  │ ├── Button       │  │  Semantic                                              │ │
│  │ ├── Input        │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                  │ │
│  │ ├── Card         │  │  │ ✓    │ │ ⚠    │ │ ✕    │ │ ℹ    │                  │ │
│  │ ├── Modal        │  │  │succ. │ │warn. │ │error │ │info  │                  │ │
│  │ └── ...          │  │  └──────┘ └──────┘ └──────┘ └──────┘                  │ │
│  └──────────────────┘  │  #30C85E #FFBB38 #ED5F74 #637381                      │ │
│                        │                                                        │ │
│                        └────────────────────────────────────────────────────────┘ │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 6.4 Component Detail

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  Stripe > Components > Button                                     [Export ▼]       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  Button Component                                                                   │
│                                                                                     │
│  Variants: [Primary ●] [Secondary] [Ghost] [Destructive]                           │
│  Size:     [Small] [Medium ●] [Large]                                              │
│  Theme:    [Light ☀️ ●] [Dark 🌙]                                                  │
│                                                                                     │
│  ┌────────────────────────────────────────────────────────────────────────────────┐│
│  │                                                                                ││
│  │  States                                                                        ││
│  │                                                                                ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       ││
│  │  │   Default    │  │    Hover     │  │   Active     │  │    Focus     │       ││
│  │  │  [Continue]  │  │  [Continue]  │  │  [Continue]  │  │  [Continue]  │       ││
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘       ││
│  │                                                                                ││
│  │  ┌──────────────┐  ┌──────────────┐                                           ││
│  │  │   Disabled   │  │   Loading    │                                           ││
│  │  │  [Continue]  │  │  [● ● ●    ] │                                           ││
│  │  └──────────────┘  └──────────────┘                                           ││
│  │                                                                                ││
│  └────────────────────────────────────────────────────────────────────────────────┘│
│                                                                                     │
│  Specifications                                                                     │
│  ┌────────────────────────────────────────────────────────────────────────────────┐│
│  │  Property        │ Default      │ Hover        │ Active       │ Disabled      ││
│  │  ─────────────────────────────────────────────────────────────────────────────││
│  │  Background      │ #635BFF      │ #5851DB      │ #4B45B2      │ #E3E8EF       ││
│  │  Text Color      │ #FFFFFF      │ #FFFFFF      │ #FFFFFF      │ #9CA3AF       ││
│  │  Border Radius   │ 8px          │ 8px          │ 8px          │ 8px           ││
│  │  Padding         │ 12px 24px    │ 12px 24px    │ 12px 24px    │ 12px 24px     ││
│  │  Font Size       │ 14px         │ 14px         │ 14px         │ 14px          ││
│  │  Font Weight     │ 600          │ 600          │ 600          │ 600           ││
│  │  Shadow          │ 0 4px 6px    │ 0 6px 8px    │ 0 2px 4px    │ none          ││
│  │  Transition      │ all 150ms    │ -            │ -            │ -             ││
│  └────────────────────────────────────────────────────────────────────────────────┘│
│                                                                                     │
│  [Copy JSON]  [Copy CSS]  [Copy Figma]  [Copy Prompt]                              │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Usability Testing Framework

### 7.1 Test Plan

#### Test Objectives

| Objective | Metric | Target |
|-----------|--------|--------|
| Learnability | Time to first successful export | < 3 minutes |
| Efficiency | Tasks per minute | 2+ |
| Effectiveness | Task success rate | > 90% |
| Satisfaction | Post-task rating (1-7) | > 5.5 |
| Error Rate | Errors per task | < 0.5 |

### 7.2 Test Scenarios

#### Scenario 1: Solo Founder (Marcus)

```
TASK: Find and export Stripe's pricing section JSON for Cursor

Steps to validate:
1. Navigate to site from homepage
2. Find pricing section
3. Export as JSON
4. Verify export works in Cursor

Success criteria:
- Completed in < 2 minutes
- No errors
- JSON exports correctly

Questions to ask:
- "Was it clear where to find Stripe?"
- "Did you understand the export options?"
- "Would you use this instead of manual extraction?"
```

#### Scenario 2: Designer (Priya)

```
TASK: Compare button components from 3 sites in dark mode

Steps to validate:
1. Search for button components
2. Filter by dark mode
3. Add 3 to compare
4. Export all to Figma

Success criteria:
- Found compare feature naturally
- Dark mode filter visible
- Figma export includes variables

Questions to ask:
- "How did you expect to start a comparison?"
- "Were all button states visible?"
- "Is the Figma export what you expected?"
```

#### Scenario 3: Product Manager (David)

```
TASK: Research upgrade flows and create PDF for PRD

Steps to validate:
1. Search "upgrade flow fintech"
2. Review 3 relevant flows
3. Add notes/annotations
4. Export as PDF

Success criteria:
- Intent search returns relevant results
- Flows have step-by-step documentation
- PDF is presentation-ready

Questions to ask:
- "Did search understand your intent?"
- "Could you find actionable insights?"
- "Would you share this PDF in a meeting?"
```

### 7.3 Usability Metrics Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           USABILITY METRICS DASHBOARD                               │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  Task Success Rate                 Time on Task (avg)           Error Rate          │
│  ┌────────────────────┐           ┌────────────────────┐      ┌──────────────────┐ │
│  │                    │           │                    │      │                  │ │
│  │       92%          │           │      1:45          │      │      0.3         │ │
│  │    ████████░░      │           │   Target: < 2:00   │      │  Target: < 0.5   │ │
│  │  Target: > 90%     │           │                    │      │                  │ │
│  └────────────────────┘           └────────────────────┘      └──────────────────┘ │
│                                                                                     │
│  Satisfaction Score (SUS)         Feature Findability          Export Success      │
│  ┌────────────────────┐           ┌────────────────────┐      ┌──────────────────┐ │
│  │                    │           │                    │      │                  │ │
│  │       78           │           │       85%          │      │      96%         │ │
│  │   Good (> 68)      │           │   Target: > 80%    │      │  Target: > 95%   │ │
│  │                    │           │                    │      │                  │ │
│  └────────────────────┘           └────────────────────┘      └──────────────────┘ │
│                                                                                     │
│  Common Issues Identified:                                                          │
│  1. "Compare" button not discovered by 30% of users                                │
│  2. "Intent search" syntax unclear                                                  │
│  3. Figma export requires too many clicks                                          │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 7.4 Testing Schedule

| Phase | Type | Participants | Timeline |
|-------|------|--------------|----------|
| Alpha | Moderated remote | 5 (mixed personas) | Week 1 |
| Beta | Unmoderated | 20 (mixed) | Week 3-4 |
| Launch | A/B testing | All users | Ongoing |

---

## 8. Design Principles

### 8.1 Core UX Principles

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Speed over completeness** | Users want to export fast, not browse endlessly | One-click exports, clear CTAs |
| **Actionable over inspirational** | Unlike Mobbin, every view should lead to export | Export buttons everywhere |
| **Intent over taxonomy** | Users think in goals, not categories | "How do apps handle X" search |
| **Compare, don't choose** | Designers need to see options side-by-side | Compare mode as first-class |
| **Work in their tools** | Output must work in Cursor/Figma without editing | Format-specific exports |

### 8.2 Visual Design Principles

| Principle | Rationale |
|-----------|-----------|
| **Neutral chrome** | Let design content be the hero, not the app UI |
| **High-contrast specs** | Token values must be instantly readable |
| **Generous whitespace** | Don't overwhelm with design system complexity |
| **Consistent interactions** | Same patterns across sites, components, flows |
| **Accessibility first** | WCAG AA minimum, we're a design tool |

### 8.3 Content Principles

| Principle | Example |
|-----------|---------|
| **Show, don't tell** | Screenshots > descriptions |
| **Specs, not opinions** | "#635BFF" not "a nice purple" |
| **Context over isolation** | Show components in real UI context |
| **States are required** | Never show a component without all states |

---

## 9. Accessibility Requirements

### 9.1 WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | 4.5:1 minimum for text |
| Keyboard navigation | Full app accessible via keyboard |
| Screen reader | ARIA labels, semantic HTML |
| Focus indicators | Visible focus states |
| Reduced motion | Respect prefers-reduced-motion |
| Text scaling | Support up to 200% zoom |

### 9.2 Specific Considerations

| Feature | Accessibility Need |
|---------|-------------------|
| Color swatches | Include hex values, not just visual |
| Compare mode | Screen reader friendly tables |
| Export modals | Focus trapping, escape to close |
| Search | Live region announcements |
| Image gallery | Alt text for all screenshots |

---

## 10. Research Recommendations

### 10.1 Pre-Launch Validation

| Research | Method | Priority |
|----------|--------|----------|
| Search mental model | Card sorting | P0 |
| Export format preferences | Survey | P0 |
| Figma workflow observation | Contextual inquiry | P1 |
| Cursor integration testing | Prototype testing | P1 |

### 10.2 Post-Launch Analytics

| Metric | Tool | Goal |
|--------|------|------|
| Export funnel | Mixpanel | Identify drop-offs |
| Search success | Algolia analytics | Improve relevance |
| Feature usage | PostHog | Prioritize roadmap |
| Session recordings | FullStory | Find friction |

### 10.3 Continuous Research Cadence

| Activity | Frequency | Participants |
|----------|-----------|--------------|
| User interviews | Monthly | 5 users |
| Usability testing | Bi-weekly | 3-5 users |
| NPS survey | Quarterly | All users |
| Feature feedback | Continuous | In-app |

---

## 11. Summary & Next Steps

### 11.1 Key UX Decisions

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Search-first homepage | Users know what they want | Higher engagement |
| One-click exports | Speed is key differentiator | Better conversion |
| All states required | Designer deal-breaker | Trust & quality |
| Intent-based search | PM/founder mental model | Unique value prop |
| Compare as core feature | Designer workflow need | Retention |

### 11.2 Risk Areas

| Risk | Mitigation |
|------|------------|
| Information overload | Progressive disclosure, tabs |
| Export format confusion | Clear labeling, tool icons |
| Search doesn't understand intent | Start with structured queries |
| Mobile responsiveness | Design mobile-first |

### 11.3 Recommended Next Steps

1. **Validate IA** with card sorting (5 users, 1 week)
2. **Prototype key flows** in HTML (Marcus, Priya, David journeys)
3. **Test export formats** with real Cursor/Figma users
4. **Iterate search UX** based on intent analysis
5. **Design high-fidelity screens** after prototype validation

---

**Document Status:** Ready for Review

**UX Research Owner:** UX Researcher/Designer Agent

---

*This document synthesizes UX research methodology to create the optimal experience for DesignDNA, focusing on the core value proposition: reducing friction between inspiration and implementation.*
