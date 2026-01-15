# Skill Discovery Workflow

> How PM Agent finds, evaluates, and creates skills for projects.

---

## Skill Discovery Process

```
┌─────────────────────────────────────────────────────────────┐
│                   SKILL DISCOVERY FLOW                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. IDENTIFY SKILLS NEEDED                                  │
│     └── Analyze project requirements                        │
│     └── List all potential skills                           │
│     └── Categorize by domain                                │
│                                                             │
│  2. CHECK LOCAL SKILLS                                      │
│     └── Search: ekmaster/skills/                            │
│     └── Search: ekmaster/.claude/skills/                    │
│     └── Check: agent-browser/skills/                        │
│                                                             │
│  3. SEARCH SKILLSMP.COM                                     │
│     └── Query: https://skillsmp.com/search?q={skill}        │
│     └── Evaluate results                                    │
│     └── Check compatibility                                 │
│                                                             │
│  4. EVALUATE QUALITY                                        │
│     └── Is it good enough for our needs?                    │
│     └── Does it match our tech stack?                       │
│     └── Is it well-documented?                              │
│                                                             │
│  5. INSTALL OR CREATE                                       │
│     └── Quality OK → Install and configure                  │
│     └── Quality NOT OK → Create custom skill                │
│                                                             │
│  6. DOCUMENT & REGISTER                                     │
│     └── Add to docs/skills-overview.md                      │
│     └── Update project skill list                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Step 1: Identify Skills Needed

For each project, analyze and list required skills:

### Frontend Skills
- [ ] ui-ux-pro-max (design, components)
- [ ] react-spa (React SPA patterns)
- [ ] react-native (mobile)
- [ ] tailwind-v4 (styling)
- [ ] state-management (Zustand, React Query)

### Backend Skills
- [ ] node-api (Express/Fastify)
- [ ] database (PostgreSQL, MongoDB)
- [ ] authentication (JWT, OAuth)
- [ ] real-time (WebSocket, SSE)

### Web3/Crypto Skills
- [ ] ethereum-integration
- [ ] solana-integration
- [ ] wallet-adapters
- [ ] smart-contracts
- [ ] defi-protocols

### Mobile Skills
- [ ] react-native
- [ ] expo
- [ ] flutter

### Testing Skills
- [ ] agent-browser (E2E testing)
- [ ] unit-testing (vitest)

---

## Step 2: Check Local Skills

### Search Locations

```bash
# Primary locations
ls ekmaster/skills/
ls ekmaster/.claude/skills/
ls ekmaster/agent-browser/skills/

# Check for specific skill
find ekmaster -name "SKILL.md" -path "*{skill-name}*"
```

### Currently Available (Local)

| Skill | Location | Status |
|-------|----------|--------|
| planning-with-files | .claude/plugins/ | ✅ |
| ui-ux-pro-max | .claude/skills/ | ✅ |
| agent-browser | agent-browser/skills/ | ✅ |

---

## Step 3: Search skillsmp.com

### Search Query

```
URL: https://skillsmp.com/search?q={skill-name}

Example searches:
- https://skillsmp.com/search?q=react-native
- https://skillsmp.com/search?q=web3
- https://skillsmp.com/search?q=ethereum
- https://skillsmp.com/search?q=flutter
```

### Evaluation Criteria

| Criteria | Weight | Threshold |
|----------|--------|-----------|
| Downloads/Usage | 20% | >100 downloads |
| Last Updated | 25% | <6 months ago |
| Documentation | 25% | Complete & clear |
| Compatibility | 30% | Matches our stack |

### Scoring

```
Score = (downloads_score * 0.2) + 
        (freshness_score * 0.25) + 
        (docs_score * 0.25) + 
        (compat_score * 0.3)

If Score >= 70: USE IT
If Score < 70: CREATE CUSTOM
```

---

## Step 4: Evaluate Quality

### Evaluation Checklist

```
□ Does the skill cover our use case?
□ Is it compatible with our tech stack?
  - Alex's Project: React SPA, pnpm, Tailwind v4
  - Self testing: Flexible
□ Is the documentation sufficient?
□ Are there known issues or limitations?
□ Is it actively maintained?
□ Does it follow best practices?
```

### Decision Matrix

| Scenario | Action |
|----------|--------|
| Local skill exists & good | ✅ Use local |
| Local exists but outdated | 🔄 Update or create new |
| skillsmp has good option | 📦 Install from skillsmp |
| skillsmp option is poor | 🛠️ Create custom |
| No skill exists anywhere | 🛠️ Create custom |

---

## Step 5: Install or Create

### Installing from skillsmp.com

```bash
# Follow skillsmp installation instructions
# Typically:
1. Download skill package
2. Extract to ekmaster/skills/{skill-name}/
3. Configure as needed
4. Test functionality
```

### Creating Custom Skill

Use this structure:

```
ekmaster/skills/{skill-name}/
├── SKILL.md           # Main skill definition
├── README.md          # Usage documentation
├── data/              # Data files if needed
│   └── *.csv
├── scripts/           # Helper scripts if needed
│   └── *.py
└── templates/         # Templates if needed
    └── *.md
```

### Skill Template

```markdown
---
name: {skill-name}
version: "1.0.0"
description: {Description of skill}
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
---

# {Skill Name}

## Purpose
[What this skill does]

## When to Use
[Trigger conditions]

## How to Use
[Usage instructions]

## Examples
[Usage examples]
```

---

## Step 6: Document & Register

### Update skills-overview.md

Add new skill to `docs/skills-overview.md`:

```markdown
### {Skill Name}

**Invocation:** `{skill-invocation}`

**Purpose:** {Description}

**When to Use:**
- {Trigger 1}
- {Trigger 2}

**Source:** Local / skillsmp.com / Custom

**Documentation:** {Link or path}
```

### Update Project Skill List

In the project's plan, update the skills section:

```markdown
## Skills Required

| Skill | Source | Status | Notes |
|-------|--------|--------|-------|
| {skill-name} | {source} | ✅ Ready | {notes} |
```

---

## Skill Categories Reference

### Category: Frontend

| Skill | Purpose | Priority |
|-------|---------|----------|
| ui-ux-pro-max | Design & components | HIGH |
| react-spa | React SPA patterns | HIGH |
| react-native | Mobile development | MEDIUM |
| tailwind-v4 | Styling | HIGH |

### Category: Backend

| Skill | Purpose | Priority |
|-------|---------|----------|
| node-api | API development | HIGH |
| database | DB design & queries | HIGH |
| auth | Authentication | MEDIUM |

### Category: Web3

| Skill | Purpose | Priority |
|-------|---------|----------|
| ethereum | Ethereum integration | HIGH |
| solana | Solana integration | MEDIUM |
| wallets | Wallet adapters | HIGH |

### Category: Testing

| Skill | Purpose | Priority |
|-------|---------|----------|
| agent-browser | E2E testing | HIGH |
| unit-testing | Unit tests | MEDIUM |

---

## Example: Skill Discovery Session

```
PM: "Analyzing skill requirements for DeFi Dashboard project...

📋 Skills Needed:
1. ui-ux-pro-max (design)
2. react-spa (frontend)
3. web3-integration (wallet, chains)
4. defi-protocols (yield tracking)
5. charts (data visualization)
6. agent-browser (testing)

🔍 Checking availability:

✅ ui-ux-pro-max - LOCAL (ekmaster/.claude/skills/)
✅ agent-browser - LOCAL (ekmaster/agent-browser/skills/)
🔍 react-spa - Searching skillsmp.com...
   → Found: react-spa-patterns (Score: 78) ✅ USE
🔍 web3-integration - Searching skillsmp.com...
   → Found: web3-connect (Score: 62) ❌ TOO LOW
   → Creating custom skill...
🔍 defi-protocols - Searching skillsmp.com...
   → Not found → Creating custom skill...
✅ charts - Using TradingView (no skill needed)

📦 Final Skill List:
- ui-ux-pro-max ✅
- agent-browser ✅
- react-spa-patterns 📦 (install from skillsmp)
- web3-integration 🛠️ (create custom)
- defi-protocols 🛠️ (create custom)

Ready to proceed with skill setup?"
```

---

*Skill Discovery Workflow v1.0*
