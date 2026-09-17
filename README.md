# Anuradha Wickramarachchi - CV Website

Static CV website built with **[Astro](https://astro.build)** and **Tailwind CSS**, hosted on GitHub Pages with custom domain [cv.anuradhawick.com](https://cv.anuradhawick.com).

## ✨ Features
- **Config-Driven CV Sections**: All CV data is modularized in `src/data/*.json` (Experience, Education, Skills, Software, Publications, Awards, Presentations, Certifications).
- **Interactive Section Controls**: Show/hide any section with instant updates and `localStorage` persistence.
- **Section Jump Navigation & ScrollSpy**: Smooth scrolling to any section with active navigation indicators.
- **Google Scholar Auto-Sync**: Automatic sync script (`npm run sync-scholar`) to fetch latest publications, citations, and metadata directly from Google Scholar (`u-rFXwUAAAAJ`).
- **Interactive Publications**: Instant search, sorting (citations/year), and quick filters (Top 10 Cited, Recent 10, by Year).
- **Print & PDF Optimized**: Clean `@media print` stylesheet to print or export an elegant, un-cluttered CV PDF.
- **GitHub CI/CD**: Automated GitHub Pages compilation and deployment via GitHub Actions.
- **Antigravity Customization Skills**: Included runbooks in `.agents/skills/` for easy AI-assisted updates.

---

## 🛠️ Project Structure
```text
cv-webapp/
├── .agents/skills/           # Antigravity AI skills (update-cv, sync-scholar)
├── .github/workflows/        # GitHub Actions deploy workflow
├── public/
│   ├── CNAME                 # cv.anuradhawick.com
│   ├── favicon.ico
│   └── me-removebg.png       # Avatar
├── scripts/
│   ├── sync-scholar.mjs      # Node launcher for scholar sync
│   └── sync_scholar.py       # Google Scholar scraper and parser
├── src/
│   ├── components/           # UI and section components
│   │   ├── SectionContainer.astro
│   │   ├── Sidebar.astro
│   │   └── sections/         # Individual CV section components
│   ├── data/                 # Configs for all CV sections
│   │   ├── profile.json
│   │   ├── experience.json
│   │   ├── education.json
│   │   ├── skills.json
│   │   ├── software.json
│   │   ├── publications.json
│   │   ├── presentations.json
│   │   ├── awards.json
│   │   ├── certifications.json
│   │   └── sections.json
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Local Development
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### 3. Sync Google Scholar Publications
To update publications and citations count from Google Scholar:
```bash
npm run sync-scholar
```

### 4. Build for Production
```bash
npm run build
```
Static files will be generated in `dist/`.

---

## 📄 License
Personal CV Website. All rights reserved.
