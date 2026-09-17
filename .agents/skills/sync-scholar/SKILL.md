---
name: sync-scholar
description: >-
  Use this skill when the user asks to refresh, sync, update, or check their Google Scholar publications
  and citation counts on their CV website.
---

# Sync Scholar Skill

This runbook guides the agent in syncing and updating publication records from Google Scholar for Anuradha Wickramarachchi (`u-rFXwUAAAAJ`).

## Procedures

### 1. Automatic Live Sync
Run the scholar sync npm script:
```bash
npm run sync-scholar
```
This script (`scripts/sync_scholar.py` via `scripts/sync-scholar.mjs`):
1. Fetches the live Google Scholar profile (`pagesize=100`).
2. Extracts paper titles, publication years, journals/venues, author lists, citation counts, and Google Scholar URLs.
3. Automatically updates `src/data/publications.json` and refreshes `lastUpdated`.

### 2. Manual or Fallback Import
If Google Scholar blocks direct requests (e.g. rate limits or robot challenges):
1. Download or save the Google Scholar page HTML containing the citations table (`#gsc_a_b`).
2. Run the parser against the saved file:
   ```bash
   python3 scripts/sync_scholar.py --file path/to/scholar.html
   ```
3. Or directly edit `src/data/publications.json` to insert or adjust individual papers.

### 3. Verification
Verify publication count and test the Astro site build:
```bash
npm run build
```
Verify `dist/index.html` builds without errors and displays the updated publication count.
