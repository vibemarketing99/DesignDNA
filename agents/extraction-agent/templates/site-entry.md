# {Site Name} Extraction

> Template for documenting site extraction progress.

## Site Info

| Field | Value |
|-------|-------|
| Domain | `{domain.com}` |
| URL | `https://{domain.com}` |
| Category | SaaS / E-commerce / Portfolio / Documentation |
| Status | Not Started / In Progress / Complete |

---

## Pages to Extract

### Required
- [ ] Homepage (`/`)
- [ ] Pricing (`/pricing`)

### Recommended
- [ ] Product/Features (`/features`)
- [ ] Documentation (`/docs`)
- [ ] Auth (`/login`)

### Optional
- [ ] About (`/about`)
- [ ] Blog (`/blog`)
- [ ] Dashboard (`/dashboard`)

---

## Extraction Notes

### Navigation Structure
```
{Describe the main nav items}
```

### Special Considerations
- Cookie banner: Yes / No
- Login required pages: {list}
- Dark mode available: Yes / No
- Animations/JS: Light / Heavy

---

## Output Files

```
output/{domain}/
├── pages/
│   ├── homepage.png
│   ├── pricing.png
│   └── manifest.json
├── tokens/
│   └── extracted-tokens.json
└── summary.md
```

---

## Quality Check

- [ ] All screenshots captured successfully
- [ ] manifest.json generated
- [ ] No cookie banners in screenshots
- [ ] Full page captured (not cropped)
- [ ] Logged to sites-log.md

---

## Session Log

| Date | Action | Notes |
|------|--------|-------|
| {date} | Started | {notes} |
| {date} | {action} | {notes} |
