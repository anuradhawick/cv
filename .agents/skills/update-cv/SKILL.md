---
name: update-cv
description: >-
  Use this skill when the user asks to update, edit, add, or remove content in their CV,
  such as work experience, education, skills, software projects, awards, talks, certifications, or personal bio.
---

# Update CV Skill

This runbook guides the agent in updating the user's Curriculum Vitae content within the Astro static website.

## Architecture & Data Location

All CV sections are decoupled from UI components and stored as individual JSON files under `src/data/`:

File | Description
:--- | :---
`src/data/profile.json` | Name, title, avatar, contact email, summary bio, external links, copyright.
`src/data/experience.json` | Career positions, roles, company names, periods, locations, summary, and bulleted highlights.
`src/data/education.json` | Degrees, institutions, locations, dates, research descriptions, and honors.
`src/data/skills.json` | Skill categories (DevOps, Programming, Bioinformatics, ML/Data Science), items, and descriptive notes.
`src/data/software.json` | Research and general software projects, descriptions, and GitHub / live links.
`src/data/presentations.json` | Conference talks, posters, workshops, panel discussions, and years.
`src/data/awards.json` | Academic, CSIRO, industry, and hackathon awards.
`src/data/certifications.json` | Professional certifications, issuer, and year.
`src/data/sections.json` | Section registry, ordering, default visibility, and toggle configurations.

## Procedures

### 1. Adding or Modifying a Section Item
1. Open the relevant file in `src/data/<section>.json`.
2. Follow the existing JSON structure.
3. Ensure strings are properly escaped.

### 2. Adding a New Work Experience Entry
In `src/data/experience.json`, prepend or append to `items`:
```json
{
  "role": "Position Title",
  "company": "Organization Name",
  "location": "City, Country",
  "period": "YYYY - YYYY",
  "summary": "High-level overview of responsibilities.",
  "highlights": [
    "Key achievement 1",
    "Key achievement 2"
  ]
}
```

### 3. Adding a New Skill
In `src/data/skills.json`, locate the appropriate category or add a new category:
```json
{
  "name": "New Category Name",
  "items": [
    "Skill 1",
    "Skill 2"
  ]
}
```

### 4. Verification Steps
After making data edits, always run the build verification:
```bash
npm run build
```
Verify that the output generates without any JSON parsing or Astro compilation errors.
