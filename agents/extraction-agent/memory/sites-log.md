# Sites Extraction Log

> Track extraction progress for each site in the DesignDNA library.

## Status Key
- **Not Started** - Site identified but not extracted
- **In Progress** - Extraction underway
- **Pages Done** - Page screenshots complete
- **Complete** - Full extraction (pages + tokens + components)
- **Needs Update** - Site has changed, re-extraction needed

---

## Extracted Sites

### vercel.com
- **Status:** Pages Done
- **Pages Captured:** 5 (homepage, pricing, docs, enterprise, templates)
- **Last Updated:** 2026-01-15
- **Location:** `output/vercel.com/pages/`
- **Notes:** Light theme only, clean minimal design

### linear.app
- **Status:** In Progress
- **Pages Captured:** 2 (homepage, full screenshot)
- **Last Updated:** 2026-01-14
- **Location:** `output/linear.app/`
- **Notes:** Requires JS wait for animations

### stripe.com
- **Status:** In Progress
- **Pages Captured:** 1 (full screenshot)
- **Last Updated:** 2026-01-14
- **Location:** `output/stripe.com/`
- **Notes:** Many product pages to capture

---

## Queue (Not Started)

| Site | Priority | Notes |
|------|----------|-------|
| notion.so | High | Complex app UI |
| figma.com | High | Design tool reference |
| github.com | Medium | Developer audience |
| tailwindcss.com | Medium | CSS framework |
| nextjs.org | Medium | Framework docs |

---

## Recently Updated

| Date | Site | Action |
|------|------|--------|
| 2026-01-15 | vercel.com | Added 5 page screenshots |
| 2026-01-14 | linear.app | Initial extraction |
| 2026-01-14 | stripe.com | Initial extraction |

---

## Template for New Entry

```markdown
### {site-domain}
- **Status:** Not Started | In Progress | Pages Done | Complete
- **Pages Captured:** {count}
- **Last Updated:** {date}
- **Location:** `output/{site}/`
- **Notes:** {any relevant notes}
```
