# Changelog

All notable changes to EK Master HQ are documented here.

---

## [2026-01-15] - Token Efficiency Rules

**Commit:** `f2fc0db`

**Changes:**
- Added token efficiency rules to Claude.md
- Enforces compact responses, minimal filler
- Tables over prose, code over explanation

---

## [2026-01-15] - React Best Practices Skill

**Commit:** `7e28d41`

**Changes:**
- Added `react-best-practices` skill
- 40+ performance optimization rules from Vercel Engineering
- Covers waterfalls, bundle size, re-renders, data fetching

---

## [2026-01-15] - PM Agent

**Commit:** `ba6259f`

**Changes:**
- Added Senior Full-Stack PM Agent
- Skill discovery workflow (local → skillsmp.com → auto-create)
- Task breakdown templates
- agent-browser testing integration
- Ralph Wiggum plugin for complex issues

**Files:**
- `agents/pm-agent/PM.md`
- `agents/pm-agent/templates/`
- `agents/pm-agent/workflows/`

---

## [2026-01-15] - Project Type Rules

**Commit:** `739ea1b`

**Changes:**
- Added first question: Self testing vs Alex's Project
- Defined Alex's frontend stack requirements
- pnpm, React SPA (no Next.js), Tailwind v4, Zustand, React Query

---

## [2026-01-15] - README

**Commit:** `c97a821`

**Changes:**
- Added comprehensive README.md
- Repository overview and quick start guide
- Templates and skills documentation

---

## [2026-01-15] - Initial Setup

**Commit:** `5586381`

**Changes:**
- Initial repository setup
- Claude.md master rules file
- Documentation templates:
  - user-personas-template.md
  - design-inspirations-template.md
  - api-requirements-template.md
  - twitter-api-docs.md
  - skills-overview.md
- agent-browser integration
- ui-ux-pro-max skill
- Inspirations folder structure

---

## Log Format

When adding new entries:

```markdown
## [YYYY-MM-DD] - Brief Title

**Commit:** `hash`

**Changes:**
- Change 1
- Change 2

**Files:** (optional)
- file1
- file2
```
