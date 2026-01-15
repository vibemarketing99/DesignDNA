# EK Master HQ

> **The central command center for all development projects.** This repository contains rules, templates, documentation, and tools that ensure consistency, quality, and efficiency across all projects.

---

## 🎯 What is This?

EK Master HQ is a **master configuration repository** that defines:

- **Development rules and guidelines** - How to approach any project
- **Templates** - Ready-to-use documents for personas, design, and API planning
- **Skills** - Reusable AI capabilities for specific tasks
- **Tools** - Browser automation for testing and validation
- **API documentation** - References for integrated services

Think of it as your **development playbook** - read `Claude.md` before starting any project.

---

## 📁 Repository Structure

```
ekmaster/
├── Claude.md                         # 📖 Master rules file (READ FIRST)
├── README.md                         # This file
├── agent-browser/                    # 🌐 Browser testing tool
├── docs/
│   ├── skills-overview.md            # Available skills reference
│   ├── user-personas-template.md     # User persona template
│   ├── design-inspirations-template.md # Design reference template
│   ├── api-requirements-template.md  # API documentation template
│   ├── twitter-api-docs.md           # Twitter API reference
│   └── inspirations/                 # Design inspiration images
│       └── README.md
├── .claude/skills/                   # Claude skills
│   └── ui-ux-pro-max/                # UI/UX design skill
└── .shared/                          # Shared resources
```

---

## 🚀 Quick Start

### 1. Read the Master Rules

Start by reading `Claude.md` - it contains all the rules and guidelines for development.

### 2. Copy Templates to Your Project

```bash
# User personas (required for new products/features)
cp docs/user-personas-template.md [your-project]/user-personas.md

# Design inspirations (optional)
cp docs/design-inspirations-template.md [your-project]/design-inspirations.md

# API requirements (if project needs APIs)
cp docs/api-requirements-template.md [your-project]/api-requirements.md
```

### 3. Use Browser Testing

```bash
cd agent-browser
pnpm install
pnpm build:native   # Requires Rust (https://rustup.rs)
agent-browser install

# Test your frontend
agent-browser open http://localhost:3000
agent-browser snapshot -i
```

---

## 📋 Core Principles

From `Claude.md`:

| Principle | Description |
|-----------|-------------|
| **Experience-First** | Create user personas before building |
| **Inspiration-Driven** | Ask for design references before designing |
| **HTML-First Frontend** | Build HTML prototypes before frameworks |
| **Separation of Concerns** | Keep frontend and backend separate |
| **Ruthless Prioritization** | If it doesn't serve a persona, cut it |
| **Skill-First Thinking** | Create reusable skills for specialized tasks |

---

## 🛠️ Available Skills

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| `planning-with-files` | Structured project planning | ALL projects |
| `ui-ux-pro-max` | UI/UX design guidance | Any frontend work |

See `docs/skills-overview.md` for complete skill documentation.

---

## 🔌 API Providers

All projects use these centralized API providers:

| Provider | Purpose | Documentation |
|----------|---------|---------------|
| **OpenRouter** | LLM access (Claude, GPT-4, etc.) | https://openrouter.ai/docs |
| **Replicate** | Image/Audio/Video ML models | https://replicate.com/docs |
| **twitterapi.io** | Twitter data access | https://docs.twitterapi.io/ |

---

## 🌐 Browser Testing

Use `agent-browser` for all browser testing:

```bash
# Core workflow
agent-browser open <url>           # Navigate
agent-browser snapshot -i          # Get interactive elements
agent-browser click @e2            # Click by ref
agent-browser fill @e3 "text"      # Fill input
agent-browser screenshot --full    # Capture page
```

See `agent-browser/README.md` for complete documentation.

---

## 📝 Development Workflow

### For New Products/Features:

1. **Ask for GitHub repo** to connect to
2. **Create 3 user personas** using the template
3. **Review features** through persona lens
4. **Ask for design inspirations** (optional)
5. **Identify API requirements**
6. **Invoke planning-with-files skill**
7. **Build HTML prototype first**
8. **Test with agent-browser**
9. **Implement in framework** (if needed)

### Project Planning Files:

| File | Purpose |
|------|---------|
| `user-personas.md` | Define users and analyze features |
| `design-inspirations.md` | Document design references |
| `api-requirements.md` | Track API integrations |
| `task_plan.md` | Track project phases |
| `findings.md` | Record discoveries |
| `progress.md` | Log session progress |

---

## 🎨 Templates

### User Personas Template
Define 3 user personas with:
- Background, goals, pain points
- Feature analysis table
- Critical vs nice-to-have vs cut features
- User journey maps

### Design Inspirations Template
Document design references:
- Reference images from `/inspirations` folder
- Color palette, typography, layouts
- Component styles
- Animation patterns

### API Requirements Template
Track API integrations:
- OpenRouter/Replicate/Twitter endpoints
- Authentication setup
- Cost estimation
- Implementation progress

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| `Claude.md` | Master rules and guidelines |
| `docs/skills-overview.md` | Available skills reference |
| `docs/twitter-api-docs.md` | Twitter API reference |
| `agent-browser/README.md` | Browser testing documentation |

---

## ⚙️ Setup Requirements

- **Node.js** 18+ and **pnpm**
- **Rust** (for agent-browser native build): https://rustup.rs
- **GitHub CLI** (`gh`) for repository management

---

## 📄 License

Private repository for EK development projects.

---

*Last updated: 2026-01-15*
