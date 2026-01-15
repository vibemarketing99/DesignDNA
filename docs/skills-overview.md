# Skills Overview

> **Purpose:** Reference document for all available skills that can be invoked during development. Skills are reusable capabilities that provide structured guidance for specific tasks.

---

## How to Use Skills

Skills are invoked using the Skill tool before starting specific types of work:

```
Use the Skill tool to invoke [skill-name] before starting [task type]
```

---

## Available Skills

### 1. planning-with-files

**Invocation:** `planning-with-files:planning-with-files`

**Purpose:** Implements Manus-style file-based planning for complex tasks. Creates structured planning documents to maintain context across sessions.

---

### 3. react-best-practices

**Invocation:** `react-best-practices`

**Location:** `skills/react-best-practices/SKILL.md`

**Purpose:** React and Next.js performance optimization guidelines from Vercel Engineering. Contains 40+ rules across 8 categories for optimal performance patterns.

**When to Use:**
- Writing new React components
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React code
- Optimizing bundle size or load times
- Any React-related work (including Alex's Projects)

**Priority Categories:**

| Priority | Category | Impact |
|----------|----------|--------|
| 1 | Eliminating Waterfalls | CRITICAL |
| 2 | Bundle Size Optimization | CRITICAL |
| 3 | Server-Side Performance | HIGH |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH |
| 5 | Re-render Optimization | MEDIUM |
| 6 | Rendering Performance | MEDIUM |
| 7 | JavaScript Performance | LOW-MEDIUM |
| 8 | Advanced Patterns | LOW |

**Key Patterns:**
- Use `Promise.all()` for parallel fetching
- Avoid barrel file imports (import directly)
- Use dynamic imports for heavy components
- Use `React.cache()` for request deduplication
- Use SWR/React Query for client-side fetching
- Apply `startTransition` for non-urgent updates

**Documentation:** See `skills/react-best-practices/SKILL.md` for full guide

---

**When to Use:**
- Starting any new project (required for ALL projects)
- Complex multi-step tasks (3+ steps)
- Research projects
- Tasks requiring >5 tool calls
- Any task requiring organization

**Files Created:**
| File | Purpose |
|------|---------|
| `task_plan.md` | Phases, progress, decisions |
| `findings.md` | Research, discoveries |
| `progress.md` | Session logs, test results |

**Key Features:**
- Persistent "working memory on disk"
- Phase tracking with status updates
- Error logging and resolution tracking
- 3-Strike Error Protocol for debugging
- Session continuity across context windows

**Documentation:** See skill's SKILL.md for full details

---

### 2. ui-ux-pro-max

**Invocation:** `ui-ux-pro-max`

**Purpose:** UI/UX design intelligence for building beautiful, functional interfaces.

**When to Use:**
- Building components
- Designing interfaces
- Creating layouts
- Implementing styling
- Choosing color palettes
- Selecting fonts/typography
- Any frontend work (even "simple" tasks)

**Capabilities:**
- 50+ design styles (glassmorphism, minimalism, brutalism, neumorphism, etc.)
- 21 color palettes
- 50 font pairings
- 20 chart types
- 9 tech stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui)

**Actions Supported:**
- Plan, build, create, design
- Implement, review, fix
- Improve, optimize, enhance
- Refactor, check UI/UX code

**Project Types:**
- Websites, landing pages
- Dashboards, admin panels
- E-commerce, SaaS
- Portfolios, blogs
- Mobile apps
- Individual components (buttons, modals, navbars, sidebars, cards, tables, forms, charts)

---

## Skills by Task Type

| Task Type | Skill to Use | Required? |
|-----------|--------------|-----------|
| Starting any project | `planning-with-files` | ✅ Yes |
| Complex multi-step tasks | `planning-with-files` | ✅ Yes |
| Frontend/UI development | `ui-ux-pro-max` | ✅ Yes |
| Designing interfaces | `ui-ux-pro-max` | ✅ Yes |
| Styling/CSS work | `ui-ux-pro-max` | ✅ Yes |
| Color/typography choices | `ui-ux-pro-max` | ✅ Yes |
| Component building | `ui-ux-pro-max` | ✅ Yes |
| Research projects | `planning-with-files` | ✅ Yes |

---

## Skill Triggers Quick Reference

### planning-with-files Triggers

Use when:
- ✅ Starting any conversation (establishes context)
- ✅ Facing 2+ independent tasks
- ✅ Have a spec or requirements for multi-step task
- ✅ Encountering bugs, test failures, or unexpected behavior
- ✅ Implementing any feature or bugfix
- ✅ Starting feature work needing isolation
- ✅ Receiving code review feedback
- ✅ Completing tasks or implementing major features
- ✅ About to claim work is complete/fixed/passing

### ui-ux-pro-max Triggers

Use when:
- ✅ Creating .html, .tsx, .vue, .svelte files
- ✅ Building any UI component
- ✅ Working with styles, colors, fonts
- ✅ Designing layouts or navigation
- ✅ Creating responsive designs
- ✅ Implementing animations or interactions
- ✅ Building dark mode or themes
- ✅ Creating accessible interfaces

---

## Creating Custom Skills

When encountering specialized or repetitive tasks, consider creating a custom skill.

**When to Create a Skill:**
- Repeating same workflow across multiple projects
- Task requires specialized domain knowledge
- Want to codify best practices
- Need consistency in task execution

**Skill Creation Workflow:**
1. Identify the task/workflow that would benefit
2. Document steps, requirements, expected outcomes
3. Use skill-creation tooling to structure properly
4. Test on real use cases
5. Iterate and refine based on usage

**After Creating a Skill:**
1. Add it to this document
2. Update the skill table in Claude.md
3. Document trigger conditions

---

## Skill Template

When documenting a new skill, use this template:

```markdown
### [Skill Name]

**Invocation:** `[skill-invocation-name]`

**Purpose:** [One-line description]

**When to Use:**
- [Trigger condition 1]
- [Trigger condition 2]
- [Trigger condition 3]

**Capabilities:**
- [Capability 1]
- [Capability 2]

**Actions Supported:**
- [Action 1]
- [Action 2]

**Documentation:** [Link or reference to full docs]
```

---

## Custom Skills Registry

Add custom skills here as they are created:

| Skill Name | Purpose | Trigger |
|------------|---------|---------|
| *(Add custom skills here)* | | |

---

## Best Practices

1. **Always invoke required skills** before starting work - don't skip even for "simple" tasks
2. **Check skill applicability** at the start of every task
3. **Combine skills** when appropriate (e.g., planning-with-files + ui-ux-pro-max for frontend projects)
4. **Document new skills** in this file when created
5. **Review skill triggers** regularly to ensure correct usage
6. **Create skills proactively** for repetitive specialized work

---

## Skill Invocation Checklist

Before starting any task, ask:

- [ ] Does this task require planning? → Invoke `planning-with-files`
- [ ] Is this frontend/UI work? → Invoke `ui-ux-pro-max`
- [ ] Are there custom skills that apply? → Check Custom Skills Registry
- [ ] Should I create a new skill for this task type? → Consider if repetitive/specialized

---

*Last updated: 2026-01-15*
