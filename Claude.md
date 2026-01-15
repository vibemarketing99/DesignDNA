# Claude Development Rules

This file contains global rules and guidelines that Claude must follow when building products in this repository.

---

## 🎯 PM Agent - Top-Level Orchestrator

**For any project work, invoke the PM Agent first.**

The PM Agent (`agents/pm-agent/PM.md`) orchestrates all projects by:
- Breaking inputs into detailed milestones, phases, tasks, and steps
- Discovering and creating skills as needed
- Previewing and asking permission before each task
- Testing with agent-browser after major features
- Using Ralph Wiggum plugin for complex issues
- Coordinating execution while user approves

**PM Agent Workflow:**
```
INPUT → EXPAND → PLAN → SKILL-UP → EXECUTE → TEST → REVIEW → ITERATE
```

**Key Principle:** PM coordinates, user executes (with approval at each task).

See `agents/pm-agent/PM.md` for complete documentation.

---

## Critical Requirements

### Frontend Development

**ALWAYS build the frontend experience in HTML first, regardless of final stack.**

- Create a working HTML prototype before implementing in any framework (React, Vue, Next.js, etc.)
- This applies to ALL frontend work - no exceptions
- The HTML prototype should be:
  - Fully functional with real interactions (using vanilla JavaScript if needed)
  - Styled with CSS (Tailwind, vanilla CSS, or CSS frameworks)
  - Testable in a browser immediately
  - Representative of the actual user experience

**Why HTML-first:**
- Validates the experience before framework commitment
- Allows rapid iteration on UX without framework overhead
- Makes it easy to test with real users immediately
- Can be converted to any framework later
- Ensures you're building experience, not just components

**ALWAYS ask for design inspirations before building any final design.**

- Before creating any UI/UX design, ask the user: "Do you have any design inspiration images to add to the `/inspirations` folder?"
- This is **optional** - user can skip if they don't have specific references
- If provided, analyze the images in `/inspirations` for:
  - Visual style (minimalist, bold, playful, professional, etc.)
  - Color palette and schemes
  - Typography choices
  - Layout patterns and spacing
  - Component styles (buttons, cards, forms, etc.)
  - Animations and interactions
- Document findings in `design-inspirations.md`
- Match the inspiration's style as closely as possible in your implementation

**Inspirations Folder Structure:**
```
/inspirations
├── README.md              # How to use this folder
├── 01-overall-style.png   # Overall design direction
├── 02-color-scheme.png    # Color palette reference
├── 03-typography.png      # Font styling reference
├── 04-components.png      # Component styles
└── ...                    # Additional references
```

**Benefits:**
- Ensures design matches user's vision and expectations
- Reduces back-and-forth iterations on design
- Creates consistency with existing brand or style preferences
- Provides concrete visual references instead of abstract descriptions

**ALWAYS use the ui-ux-pro-max skill for any frontend work.**

- Use the Skill tool to invoke `ui-ux-pro-max` before starting any UI/UX tasks
- This applies to: building components, designing interfaces, creating layouts, implementing styling, choosing color palettes, selecting fonts, etc.
- Do not skip this skill even for "simple" frontend tasks

### Project Planning

**ALWAYS use the planning-with-files skill for any kind of project.**

- Use the Skill tool to invoke `planning-with-files:planning-with-files` before starting any project work
- This applies to ALL projects: small, medium, or large
- The skill creates structured planning files (task_plan.md, findings.md, progress.md)
- This ensures:
  - Clear documentation of project goals and approach
  - Tracked progress throughout development
  - Recorded findings and decisions
  - Better organization for complex multi-step tasks
- Do not skip this skill even if the project seems "simple" or "quick"

### User Persona & Experience-First Design

**ALWAYS create 3 user personas before building any feature or product.**

This is a **mandatory first step** for any new concept, feature, or product idea.

**Process:**
1. **Create `user-personas.md`** in your project directory before any development
2. **Define 3 distinct user personas** with different:
   - Goals and motivations
   - Pain points and challenges
   - Technical proficiency levels
   - Use case contexts
3. **Map user journeys** for each persona through the proposed feature/product
4. **Review the experience** from each persona's perspective

**Purpose:**
- **Identify unnecessary features:** If a feature doesn't serve any persona meaningfully, cut it
- **Spot critical features:** Features that all 3 personas need are priority-1
- **Prevent feature bloat:** Build only what users actually need
- **Validate assumptions:** Test whether your concept solves real problems

**Templates Available:**

Three comprehensive templates are available in this repository:

1. **User Personas Template:** `docs/user-personas-template.md`
   ```bash
   cp docs/user-personas-template.md [your-project]/user-personas.md
   ```
   Includes:
   - 3 detailed persona structures with background, goals, pain points, and use cases
   - Feature analysis table to map features against persona needs
   - Sections for critical features, nice-to-have features, and features to cut
   - User journey maps for each persona
   - Validation questions to ask before building any feature

2. **Design Inspirations Template:** `docs/design-inspirations-template.md`
   ```bash
   cp docs/design-inspirations-template.md [your-project]/design-inspirations.md
   ```
   Includes:
   - Design reference documentation
   - Visual style analysis (mood, feel, characteristics)
   - Color palette extraction (primary, secondary, accent, semantic)
   - Typography analysis (fonts, weights, type scale)
   - Layout & spacing patterns
   - Component style specifications (buttons, cards, forms, navigation)
   - Animations & interactions
   - Responsive behavior guidelines
   - Accessibility checklist

3. **API Requirements Template:** `docs/api-requirements-template.md`
   ```bash
   cp docs/api-requirements-template.md [your-project]/api-requirements.md
   ```
   Includes:
   - API summary table for project needs
   - OpenRouter integration details (models, config, prompts)
   - Replicate integration details (models, inputs, webhooks)
   - Security checklist for API keys
   - Error handling reference
   - Cost estimation tables
   - Implementation progress tracking
   - Testing checklist

**When to Create Personas:**
- Before starting any new product or major feature
- When pivoting product direction
- When considering adding new functionality
- Before redesigning existing features

**Benefits:**
- Keeps development focused on real user needs
- Prevents building features nobody wants
- Helps prioritize limited development time
- Creates shared understanding of who you're building for

### Custom Skill Creation

**When encountering specialized or repetitive tasks, consider creating a custom skill.**

- Skills are reusable capabilities that can be invoked for specific tasks
- Use Anthropic's official skill-creator or similar tooling to create skills for:
  - Domain-specific operations (e.g., data processing, API integrations)
  - Repetitive workflows that follow a specific pattern
  - Tasks requiring specialized knowledge or expertise
  - Complex multi-step processes that you perform frequently
  
**When to create a skill:**
- You find yourself repeating the same workflow across multiple projects
- A task requires specialized domain knowledge that would benefit from structured guidance
- You want to codify best practices for a specific type of work
- You need to ensure consistency in how a particular task is executed

**Skill creation workflow:**
1. Identify the task or workflow that would benefit from being a skill
2. Document the steps, requirements, and expected outcomes
3. Use skill-creation tooling to structure the skill properly
4. Test the skill on real use cases to verify it works as expected
5. Iterate and refine based on usage

**Benefits:**
- Reduces cognitive load by offloading specialized knowledge into reusable skills
- Ensures consistency across projects
- Enables scaling beyond individual expertise
- Creates a library of capabilities that grow over time

### GitHub Integration

**Push only for MAJOR changes - don't push too frequently.**

**When to Push:**
- ✅ New feature complete
- ✅ Major milestone reached
- ✅ Architectural decisions made
- ✅ End of significant work session
- ✅ Before switching to different project

**When NOT to Push:**
- ❌ Small fixes or tweaks
- ❌ Work in progress
- ❌ Minor documentation updates
- ❌ After every single change

**Commit Message Format:**
```
[TYPE] Brief description

Types: Add, Update, Fix, Remove, Refactor
```

**ALWAYS log changes to CHANGELOG.md:**
- Record every push with date, description, and commit hash
- Track project evolution over time
- See `CHANGELOG.md` for format

**When starting a new project:**
- Ask which GitHub repository to connect to
- Initialize git connection early
- Verify remote is configured

### Project Structure

**ALWAYS separate frontend and backend code into distinct folders.**

```
project/
├── inspirations/ # Design reference images (add first)
│   ├── README.md
│   └── [reference-images]
├── prototype/    # HTML prototypes (build first)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── assets/
├── frontend/     # Framework implementation (build after prototype validation)
│   ├── src/
│   ├── components/
│   ├── styles/
│   └── ...
├── backend/      # All server-side code
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   └── ...
└── shared/       # Code shared between frontend and backend (if needed)
```

**Rationale:** Clear separation makes it easier to:
- Build and test experience quickly with HTML prototypes
- Validate UX before committing to a framework
- Make targeted edits without affecting other layers
- Deploy frontend and backend independently
- Maintain and scale each part separately
- Reference the prototype when implementing in frameworks

## Project Planning Files

Every project should maintain these planning documents in the root directory:

| File | Purpose | When to Create | When to Update |
|------|---------|----------------|----------------|
| `user-personas.md` | Define 3 user personas and feature analysis | Before any development starts | When pivoting or adding major features |
| `design-inspirations.md` | Document design references, style guides, and visual direction | When user provides design references (optional) | When design direction changes |
| `api-requirements.md` | Document which APIs are needed and how they're used | When project requires API integrations | When adding new API integrations |
| `task_plan.md` | Project phases, progress tracking, decisions | Start of project (via planning-with-files) | After each phase completion |
| `findings.md` | Research, discoveries, technical decisions | Start of project (via planning-with-files) | After any discovery or research |
| `progress.md` | Session logs, test results, issues encountered | Start of project (via planning-with-files) | Throughout development sessions |

**These files serve as your project's "memory"** - they persist knowledge across context windows and development sessions.

## Code Organization

### File Structure
- Keep related files close together
- Use clear, descriptive folder names
- Avoid mixing frontend and backend logic in the same directory

### Naming Conventions
- Use consistent naming across the project
- Make file and folder names self-explanatory

## Development Workflow

### First Question - Project Type

**ALWAYS ask this before starting ANY project:**

> "Is this project for:
> 1. **Self testing** - Flexible tech stack
> 2. **Alex's Project** - Must follow Alex's frontend stack requirements"

#### If Alex's Project → Use This Frontend Stack:

| Category | Technology | Notes |
|----------|------------|-------|
| **Package Manager** | pnpm | ⚠️ Do NOT use npm or bun |
| **Language** | TypeScript (Isomorphic) | |
| **Framework** | React (SPA) | ⚠️ Do NOT use Next.js |
| **Rendering** | Client-side rendering | Use dynamic imports for code splitting |
| **Styling** | Tailwind CSS v4 | |
| **Client State** | Zustand | |
| **Server State** | React Query | Data fetching |
| **Forms** | React Hook Form | |
| **Validation** | Zod | Schema validation |
| **Charts** | TradingView Lightweight Charts | |

**Alex's Project Rules:**
- ❌ NO Next.js - Use React SPA architecture
- ❌ NO npm or bun - Use pnpm only
- ✅ Dynamic imports for code splitting and CDN optimization
- ✅ Isomorphic TypeScript
- ✅ Client-side rendering

---

### Before Starting Any Task

**For New Products/Features:**
1. **Ask project type:** Self testing OR Alex's Project (see above)
2. **For new projects:** Ask which GitHub repository to connect to
3. **Create 3 user personas** (`user-personas.md`) and map the experience
4. **Review feature list** through persona lens - identify critical vs unnecessary
5. **For frontend work:** Ask for design inspirations (optional)
   - "Do you have any design inspiration images to add to the `/inspirations` folder?"
   - Analyze images in `/inspirations` folder for style, colors, typography, layouts
   - Document in `design-inspirations.md`
6. **Identify API requirements:** Determine which APIs are needed
   - LLM/Chat → Use OpenRouter (see API Providers section)
   - Image/Audio/Video → Use Replicate (see API Providers section)
   - Document in `api-requirements.md` if project needs APIs
7. **Always invoke planning-with-files skill** to create structured planning documents
8. **Check if existing skills apply:**
   - ui-ux-pro-max for frontend/UI work
   - Any custom skills created for specialized tasks
9. **Consider if a new skill is needed:**
   - Is this a specialized task outside your core expertise?
   - Will this workflow be repeated across projects?
   - If yes, consider creating a custom skill first
10. **For Alex's Project:** Verify tech stack compliance (pnpm, React SPA, no Next.js)
11. Verify you're working in the correct folder (frontend vs backend)
12. Understand the existing structure before adding new files

**For Existing Projects/Tasks:**
1. Review existing `user-personas.md` - does this task serve a persona need?
2. Check task alignment with critical features identified in persona analysis
3. Follow steps 4-8 from above

### Frontend Development Process

**Always follow this order for frontend work:**

1. **Inspiration & Design Phase:**
   - **Ask for design inspirations** (optional - user can skip)
     - "Do you have any design inspiration images to add to the `/inspirations` folder?"
     - If provided, analyze images and extract design patterns, colors, typography, etc.
     - Document findings in `design-inspirations.md`
   - Create user personas (if not done)
   - Map user journeys
   - Invoke ui-ux-pro-max skill for design guidance
   - Create design direction based on personas + inspirations

2. **HTML Prototype Phase:**
   - Build the experience in pure HTML/CSS/JS first
   - Match inspiration styles if references were provided
   - Create actual working pages users can interact with
   - Test in browser to validate the experience
   - Iterate based on testing

3. **Framework Implementation Phase (if needed):**
   - Once HTML prototype is validated, convert to chosen framework
   - React, Vue, Next.js, or whatever the project requires
   - The HTML prototype serves as your specification

**Never skip the HTML prototype phase.** Even if the final implementation will be in React, build the HTML version first to validate the experience.

### After Completing Major Changes
1. **Create a commit** with a clear, descriptive message summarizing the changes
2. **Push to GitHub** to ensure work is backed up and tracked
3. Update documentation if architectural decisions were made
4. Notify the user that changes have been committed and pushed

### Testing

**Frontend Testing - ALWAYS use `agent-browser`:**

Use `agent-browser` (installed at `ekhq/agent-browser`) for ALL browser testing, feedback, and optimization. Do not use other browser automation options.

**Quick Start:**
```bash
agent-browser open http://localhost:3000   # Open URL
agent-browser snapshot                      # Get accessibility tree with refs
agent-browser click @e2                     # Click by ref from snapshot
agent-browser fill @e3 "test@example.com"   # Fill input by ref
agent-browser screenshot page.png           # Take screenshot
agent-browser close                         # Close browser
```

**Testing Workflow:**
1. Build HTML prototype
2. Open in agent-browser: `agent-browser open file:///path/to/prototype/index.html`
3. Get snapshot: `agent-browser snapshot -i` (interactive elements only)
4. Interact using refs: `agent-browser click @e1`, `agent-browser fill @e2 "text"`
5. Validate experience and iterate
6. Screenshot for documentation: `agent-browser screenshot --full`

**Common Commands:**
| Command | Description |
|---------|-------------|
| `agent-browser open <url>` | Navigate to URL |
| `agent-browser snapshot` | Get accessibility tree with refs (best for AI) |
| `agent-browser snapshot -i` | Interactive elements only |
| `agent-browser click @ref` | Click element by ref |
| `agent-browser fill @ref "text"` | Fill input by ref |
| `agent-browser type @ref "text"` | Type into element |
| `agent-browser get text @ref` | Get text content |
| `agent-browser screenshot [path]` | Take screenshot |
| `agent-browser screenshot --full` | Full page screenshot |
| `agent-browser wait <selector>` | Wait for element |
| `agent-browser close` | Close browser |

**Semantic Locators:**
```bash
agent-browser find role button click --name "Submit"
agent-browser find text "Sign In" click
agent-browser find label "Email" fill "test@test.com"
```

**See `ekhq/agent-browser/README.md` for complete documentation.**

**Backend Testing:**
- Write tests for new functionality
- Ensure tests are in the appropriate folder

**Integration Testing:**
- Test frontend and backend integration after both are implemented
- Use agent-browser to validate full user flows

### Documentation
- Update relevant README files when adding new features
- Document complex logic and architectural decisions

## Technology Stack

### Frontend

**Phase 1: Prototype (Always HTML first)**
- HTML5
- CSS3 (or Tailwind CSS)
- Vanilla JavaScript (for interactions)

**Phase 2: Framework (After prototype validation)**

#### Self Testing Projects (Flexible)
- Framework: (To be filled based on project needs - React, Vue, Next.js, etc.)
- Styling: (To be filled - Tailwind, styled-components, CSS modules, etc.)
- State Management: (To be filled - Context, Redux, Zustand, etc.)

#### Alex's Projects (Strict Stack)

| Category | Technology | Notes |
|----------|------------|-------|
| Package Manager | **pnpm** | ❌ No npm or bun |
| Language | **TypeScript** | Isomorphic |
| Framework | **React** | SPA, client-side rendering |
| Rendering | **CSR** | ❌ No Next.js, no SSR |
| Code Splitting | **Dynamic imports** | CDN optimization |
| Styling | **Tailwind CSS v4** | |
| Client State | **Zustand** | |
| Server State | **React Query** | Data fetching |
| Forms | **React Hook Form** | |
| Validation | **Zod** | Schema validation |
| Charts | **TradingView Lightweight Charts** | |

```bash
# Alex's Project Setup
pnpm create vite@latest my-app --template react-ts
cd my-app
pnpm add zustand @tanstack/react-query react-hook-form zod @hookform/resolvers
pnpm add -D tailwindcss@next @tailwindcss/vite
```

### Backend
- (To be filled based on project needs)
- Framework:
- Database:
- API Style:

---

## Browser Testing & Automation

**ALWAYS use `agent-browser` for all browser testing, feedback, and optimization.**

**Location:** `ekhq/agent-browser`

### Why agent-browser?
- Native Rust CLI for fast execution
- AI-optimized snapshot workflow with refs
- Deterministic element selection
- Supports headless and headed modes
- Session isolation for parallel testing

### Installation
```bash
cd ekhq/agent-browser
pnpm install
pnpm build:native   # Requires Rust
agent-browser install  # Download Chromium
```

### Core Workflow for AI Testing
```bash
# 1. Navigate and get snapshot
agent-browser open http://localhost:3000
agent-browser snapshot -i --json   # AI parses tree and refs

# 2. Identify target refs from snapshot output
# Example output:
# - heading "Welcome" [ref=e1]
# - button "Submit" [ref=e2]
# - textbox "Email" [ref=e3]

# 3. Execute actions using refs
agent-browser click @e2
agent-browser fill @e3 "test@example.com"

# 4. Get new snapshot if page changed
agent-browser snapshot -i --json
```

### Essential Commands Reference

**Navigation:**
```bash
agent-browser open <url>          # Open URL
agent-browser back                # Go back
agent-browser forward             # Go forward
agent-browser reload              # Reload page
agent-browser close               # Close browser
```

**Interactions:**
```bash
agent-browser click @ref          # Click element
agent-browser dblclick @ref       # Double-click
agent-browser fill @ref "text"    # Clear and fill input
agent-browser type @ref "text"    # Type into element
agent-browser press Enter         # Press key
agent-browser hover @ref          # Hover element
agent-browser select @ref "value" # Select dropdown option
agent-browser check @ref          # Check checkbox
agent-browser scroll down 500     # Scroll
```

**Get Information:**
```bash
agent-browser get text @ref       # Get text content
agent-browser get value @ref      # Get input value
agent-browser get title           # Get page title
agent-browser get url             # Get current URL
agent-browser is visible @ref     # Check visibility
```

**Snapshots & Screenshots:**
```bash
agent-browser snapshot            # Full accessibility tree
agent-browser snapshot -i         # Interactive elements only
agent-browser snapshot -c         # Compact (remove empty elements)
agent-browser snapshot -d 3       # Limit depth to 3 levels
agent-browser screenshot          # Take screenshot
agent-browser screenshot --full   # Full page screenshot
```

**Waiting:**
```bash
agent-browser wait @ref           # Wait for element
agent-browser wait 2000           # Wait 2 seconds
agent-browser wait --text "Done"  # Wait for text
agent-browser wait --load networkidle  # Wait for network idle
```

**Sessions (Parallel Testing):**
```bash
agent-browser --session test1 open site-a.com
agent-browser --session test2 open site-b.com
agent-browser session list        # List active sessions
```

**Debug:**
```bash
agent-browser --headed open <url> # Show browser window
agent-browser console             # View console messages
agent-browser errors              # View page errors
agent-browser highlight @ref      # Highlight element
```

### Snapshot Options

| Option | Description |
|--------|-------------|
| `-i, --interactive` | Only show interactive elements |
| `-c, --compact` | Remove empty structural elements |
| `-d, --depth <n>` | Limit tree depth |
| `-s, --selector <sel>` | Scope to CSS selector |
| `--json` | JSON output (for AI parsing) |

### Best Practices

1. **Always use refs** - Get snapshot first, then use `@ref` notation
2. **Use `-i` flag** - Interactive elements only reduces noise
3. **Use `--json`** - Machine-readable output for automation
4. **Use sessions** - Isolate tests with `--session <name>`
5. **Screenshot evidence** - Capture screenshots for documentation
6. **Wait appropriately** - Use `wait` commands for dynamic content

---

## API Providers & Documentation

**All projects use these centralized API providers. Always reference the official documentation when implementing API calls.**

### OpenRouter

**Purpose:** Unified access to multiple LLM providers (OpenAI, Anthropic, Google, Meta, Mistral, etc.)

| Resource | URL |
|----------|-----|
| **Official Documentation** | https://openrouter.ai/docs |
| **API Reference** | https://openrouter.ai/docs/api-reference |
| **Available Models** | https://openrouter.ai/models |
| **Pricing** | https://openrouter.ai/docs/pricing |
| **Rate Limits** | https://openrouter.ai/docs/limits |

**Key Features:**
- Single API for 100+ models from different providers
- Pay-per-token pricing
- Automatic fallbacks between providers
- Usage tracking and analytics

**Base URL:** `https://openrouter.ai/api/v1`

**Authentication:** Bearer token in Authorization header
```
Authorization: Bearer $OPENROUTER_API_KEY
```

**Common Endpoints:**
- `POST /chat/completions` - Chat completions (OpenAI-compatible)
- `GET /models` - List available models
- `GET /auth/key` - Get API key info

**Example Request:**
```javascript
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://your-site.com', // Required
    'X-Title': 'Your App Name' // Optional
  },
  body: JSON.stringify({
    model: 'anthropic/claude-3.5-sonnet',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});
```

---

### Replicate

**Purpose:** Run and deploy machine learning models (image generation, audio, video, etc.)

| Resource | URL |
|----------|-----|
| **Official Documentation** | https://replicate.com/docs |
| **API Reference** | https://replicate.com/docs/reference/http |
| **Model Explorer** | https://replicate.com/explore |
| **JavaScript SDK** | https://replicate.com/docs/get-started/javascript |
| **Python SDK** | https://replicate.com/docs/get-started/python |

**Key Features:**
- Run any model with a simple API call
- Image generation (Stable Diffusion, FLUX, etc.)
- Audio/video processing
- Custom model deployment
- Webhooks for async processing

**Base URL:** `https://api.replicate.com/v1`

**Authentication:** Bearer token in Authorization header
```
Authorization: Bearer $REPLICATE_API_TOKEN
```

**Common Endpoints:**
- `POST /predictions` - Run a model
- `GET /predictions/{id}` - Get prediction status
- `POST /predictions/{id}/cancel` - Cancel a prediction
- `GET /models` - List models

**Example Request (Run a model):**
```javascript
const response = await fetch('https://api.replicate.com/v1/predictions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    version: 'model-version-id',
    input: {
      prompt: 'A beautiful sunset over mountains'
    }
  })
});
```

**Webhook Pattern (Recommended for production):**
```javascript
// Set webhook_completed to receive results asynchronously
{
  version: 'model-version-id',
  input: { prompt: '...' },
  webhook: 'https://your-api.com/webhooks/replicate',
  webhook_events_filter: ['completed']
}
```

---

### API Usage Guidelines

**Environment Variables:**
```bash
# Required API keys - store securely, never commit to git
OPENROUTER_API_KEY=sk-or-...
REPLICATE_API_TOKEN=r8_...
TWITTER_API_KEY=your_twitter_api_key
```

**Best Practices:**
1. **Never hardcode API keys** - Always use environment variables
2. **Implement error handling** - Handle rate limits, timeouts, and API errors gracefully
3. **Use webhooks for long tasks** - Replicate models can take time; use webhooks instead of polling
4. **Cache responses when appropriate** - Reduce API costs and improve performance
5. **Log API usage** - Track costs and debug issues
6. **Set timeouts** - Don't wait indefinitely for API responses

**Cost Management:**
- Monitor usage in provider dashboards
- Set budget alerts in OpenRouter
- Use cheaper models for testing/development
- Batch requests where possible

---

### Twitter API (twitterapi.io)

**Purpose:** Twitter data access - user profiles, tweets, followers, trends, communities, etc.

| Resource | URL |
|----------|-----|
| **Official Documentation** | https://docs.twitterapi.io/ |
| **Local Reference** | `docs/twitter-api-docs.md` (in this repository) |

**Key Features:**
- 96% cheaper than official Twitter API
- Average response time of 700ms
- Supports up to 200 QPS per client
- RESTful API with OpenAPI specifications

**Pricing:**
- $0.15 per 1,000 tweets
- $0.18 per 1,000 user profiles
- $0.15 per 1,000 followers
- Minimum: $0.00015 per request

**Authentication:**
```javascript
const headers = {
  'X-API-Key': process.env.TWITTER_API_KEY
};
```

**Available Endpoints:**
- **User:** Profile, followers, following, mentions, search
- **Tweet:** Search, replies, quotes, retweets, thread context
- **List:** Followers, members
- **Communities:** Info, members, moderators, tweets
- **Trends:** Get trending topics
- **Spaces:** Get space details
- **Stream:** Monitor user tweets in real-time
- **Actions (V3):** Send tweets, like, retweet, update profile

**See `docs/twitter-api-docs.md` for complete API reference with code examples.**

---

**When to Use Which Provider:**

| Use Case | Provider | Notes |
|----------|----------|-------|
| Chat/Text generation | OpenRouter | Access to Claude, GPT-4, Llama, etc. |
| Code generation | OpenRouter | Use Claude or GPT-4 |
| Image generation | Replicate | FLUX, Stable Diffusion, etc. |
| Image editing | Replicate | Inpainting, upscaling, etc. |
| Audio processing | Replicate | Whisper, music generation, etc. |
| Video processing | Replicate | Video generation, editing, etc. |
| Custom ML models | Replicate | Deploy and run custom models |
| Twitter data | twitterapi.io | Users, tweets, followers, trends |
| Twitter actions | twitterapi.io | Post, like, retweet (V3 endpoints) |

---

## Skill Management

**Full documentation:** See `docs/skills-overview.md` for complete skill reference.

**PM Agent handles skill discovery** - See `agents/pm-agent/workflows/skill-discovery.md`

### Skill Discovery Priority

1. **Local Skills** - Check `ekmaster/skills/`, `.claude/skills/`
2. **skillsmp.com** - Search community skills at https://skillsmp.com/
3. **Auto-Create** - Build custom skill if nothing suitable exists

### Available Skills

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| `planning-with-files` | Structured project planning | ALL projects, complex multi-step tasks |
| `ui-ux-pro-max` | UI/UX design and implementation | Any frontend work, styling, layouts |
| `react-best-practices` | React/Next.js performance optimization | ALL React work, code review, refactoring |
| `agent-browser` | Browser testing and automation | ALL major feature testing |
| *(custom skills)* | See `docs/skills-overview.md` | Document trigger conditions |

### Full Stack Skill Categories

| Category | Skills |
|----------|--------|
| **Frontend** | ui-ux-pro-max, react-best-practices, react-spa, react-native, tailwind-v4 |
| **Backend** | node-api, database, authentication |
| **Web3/Crypto** | ethereum, solana, wallet-adapters, defi-protocols |
| **Mobile** | react-native, expo, flutter |
| **Testing** | agent-browser, e2e-testing |

### Quick Reference

```
planning-with-files   → Use for ANY project, multi-step tasks, research
ui-ux-pro-max         → Use for ANY frontend/UI work
react-best-practices  → Use for ANY React work (components, refactoring, review)
agent-browser         → Use for ANY browser testing
Ralph Wiggum          → Use for COMPLEX debugging/issues
```

### Skill Library Best Practices

- **PM Agent discovers skills** - Let PM handle skill discovery for projects
- **Document new skills:** Add to `docs/skills-overview.md`
- **Describe trigger conditions:** Make it clear when each skill should be invoked
- **Search skillsmp.com first:** Before creating, check if community has a solution
- **Create if not good enough:** Don't settle for poor-quality skills
- **Start small:** Create focused, single-purpose skills rather than monolithic ones

## Token Efficiency & Compact Communication

**ALWAYS prioritize token efficiency and compact responses.**

### Core Rules

1. **Be Concise** - Use minimal words to convey information
2. **No Filler** - Avoid unnecessary phrases like "I think", "Let me", "I'll"
3. **Tables Over Prose** - Use tables and lists instead of paragraphs when possible
4. **Code Over Explanation** - Show code directly, explain briefly only if needed
5. **Batch Updates** - Combine multiple small changes into single operations
6. **Skip Obvious** - Don't explain what's self-evident from code/context

### Response Format

```
❌ Bad (verbose):
"I'll now proceed to update the file. Let me add the new function 
that will handle the user authentication. This function will take 
the username and password as parameters and return a boolean value 
indicating whether the authentication was successful."

✅ Good (compact):
"Adding auth function:"
[code block]
```

### When Explaining

| Instead of | Use |
|------------|-----|
| Long paragraphs | Bullet points |
| Repeated context | Brief reference |
| Step-by-step narration | Direct action |
| "I will now..." | Just do it |

### Summaries

- Use tables for structured data
- Use code blocks for technical content
- Use bullet lists for multiple items
- Keep summaries under 10 lines when possible

---

## Best Practices

- **Token Efficiency:** Always be compact - save tokens wherever possible
- **Experience-First Development:** Always create user personas before building - let user needs drive features, not ideas
- **Inspiration-Driven Design:** Always ask for design inspirations before building - match user's vision instead of guessing
- **HTML-First Frontend:** Always build HTML prototypes before framework implementation - validate the experience before the architecture
- **Separation of Concerns:** Keep frontend and backend completely separated
- **DRY Principle:** Don't repeat yourself, but don't over-abstract
- **KISS Principle:** Keep it simple, stupid - avoid over-engineering
- **Ruthless Prioritization:** If it doesn't serve a persona need, cut it
- **Security First:** Always validate inputs, especially at API boundaries
- **Performance:** Optimize when necessary, but don't prematurely optimize
- **Skill-First Thinking:** When facing unfamiliar territory, consider creating a skill to codify best practices

## Notes

This document should be read before starting any product development work. When in doubt, ask for clarification rather than making assumptions.

---

*Last updated: 2026-01-15*
