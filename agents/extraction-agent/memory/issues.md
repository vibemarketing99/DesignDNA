# Known Issues & Solutions

> Track problems encountered during extraction and their solutions.

---

## Active Issues

### Agent Browser Integration
- **Status:** Investigating
- **Symptom:** agent-browser commands sometimes fail silently
- **Workaround:** Run commands individually, check output
- **Next Steps:** Debug connection issues, verify installation

### Page Extract Bug
- **Status:** In Progress
- **Symptom:** Screenshots not appearing in Pages tab lightbox
- **Cause:** Lightbox expects image URL, getting gradient background
- **Fix Needed:** Update lightbox JS to load from manifest paths

---

## Resolved Issues

### Screenshot Path Issues
- **Date Fixed:** 2026-01-15
- **Problem:** Screenshots saved to wrong directory
- **Solution:** Use absolute paths or ensure correct working directory
- **Prevention:** Always verify OUTPUT_DIR before extraction

### Cookie Banner Blocking
- **Date Fixed:** 2026-01-14
- **Problem:** Cookie consent banners covering page content
- **Solution:** Press Escape or click dismiss before screenshot
- **Code:**
  ```bash
  agent-browser press Escape
  agent-browser wait 500
  agent-browser screenshot --full page.png
  ```

---

## Issue Template

```markdown
### {Issue Title}
- **Status:** Active | Investigating | Resolved
- **Symptom:** {What you observe}
- **Cause:** {Root cause if known}
- **Solution/Workaround:** {How to fix or work around}
- **Date:** {When discovered/fixed}
```

---

## Common Error Messages

| Error | Likely Cause | Solution |
|-------|--------------|----------|
| "Browser not found" | agent-browser not installed | Run `agent-browser install` |
| "Timeout waiting" | Page load too slow | Increase wait time |
| "Element not found" | Selector doesn't match | Update selector or use snapshot to find refs |
| "Permission denied" | File path issue | Check directory permissions |

---

## Environment Notes

### Required Tools
- agent-browser (installed at `ekhq/agent-browser`)
- Node.js (for tokens.js)
- Bash (for shell scripts)

### Path References
- Extraction scripts: `prototype/extraction/scripts/`
- Output directory: `prototype/extraction/output/`
- Agent files: `agents/extraction-agent/`
