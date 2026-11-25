# Essam Shaaban — Portfolio & Technical Blog

Professional portfolio and technical blog focused on Microsoft Foundry, Copilot Studio, Power Platform, Agentic AI, and enterprise solution architecture.

**Live site:** https://essamshaaban-mvp.github.io/AI-and-PowerPlatform-Blogs/

A static [Astro](https://astro.build) site ("Midnight Azure" theme) deployed to GitHub Pages with GitHub Actions. No backend, database, API keys or paid services.

---

## Contents

- [Requirements](#requirements)
- [Local development](#local-development)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [Publishing a new blog post](#publishing-a-new-blog-post)
- [Production build](#production-build)
- [Deployment](#deployment)
- [SEO, RSS and social sharing](#seo-rss-and-social-sharing)
- [Assets and trademarks](#assets-and-trademarks)
- [Troubleshooting](#troubleshooting)

## Requirements

- **Node.js 22.23.4 or newer** (the deployment workflow uses Node 24)
- **npm** (a `package-lock.json` is committed — use `npm ci` for a clean, reproducible install)

## Local development

```bash
npm ci          # install exact locked dependencies
npm run dev     # start the dev server
```

Open http://localhost:4321/. Locally the site is served from `/`; in production it lives under `/AI-and-PowerPlatform-Blogs/` (see [Deployment](#deployment)). All internal links are built from `import.meta.env.BASE_URL`, so they work in both.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Type-check `.astro` / `.ts` files (`astro check`) |
| `npm run og` | Regenerate social share images in `public/og/` (run after adding or renaming an article) |

## Project structure

```text
.
├── .github/workflows/deploy.yml   # Build + deploy to GitHub Pages
├── astro.config.mjs               # site URL, base path, sitemap integration
├── scripts/generate-og.mjs        # Builds 1200×630 Open Graph images (npm run og)
├── public/                        # Copied as-is to the site root
│   ├── badges/                    # Official Microsoft certification + MVP badges
│   ├── logos/                     # Official Microsoft product icons + MCP mark
│   ├── og/                        # Generated social share images (home, certifications, blog, per article)
│   ├── essam-shaaban-cutout*.webp # Hero portrait (transparent)
│   └── favicon.svg, og-image.jpg
└── src/
    ├── data/site.ts               # ★ Single source for profile, links, MVP, certifications, projects
    ├── content.config.ts          # Blog collection schema (frontmatter validation)
    ├── content/blog/*.md          # ★ Blog articles (one Markdown file per post)
    ├── lib/seo.ts                 # Absolute URLs + JSON-LD (Person, WebSite, breadcrumbs)
    ├── layouts/Base.astro         # <head> metadata, header, footer, scroll-reveal script
    ├── components/
    │   ├── SectionHeading.astro   # Numbered section titles
    │   ├── ExpertiseSection.astro # Expertise cards (logos per capability)
    │   ├── MvpBanner.astro        # Microsoft MVP banner (home + certifications)
    │   ├── ShareLinks.astro       # LinkedIn share + copy link on articles
    │   └── Icon.astro             # Line icons for project/article artwork
    ├── pages/
    │   ├── index.astro            # Home
    │   ├── certifications.astro   # Certifications gallery
    │   ├── blog/index.astro       # Blog list with search + category filters
    │   ├── blog/[slug].astro      # Article page (one per Markdown file)
    │   ├── rss.xml.js             # RSS feed
    │   └── robots.txt.ts          # robots.txt with sitemap location
    ├── styles/theme.css           # Colour tokens for dark + light themes
    └── styles/global.css          # All styles (layout, components) using theme tokens
```

## Editing content

Most edits happen in **`src/data/site.ts`** — pages read from it, so nothing needs to be changed in two places.

| What | Where |
|---|---|
| Name, intro, location, public profile links | `site` in `src/data/site.ts` |
| Search console verification codes | `site.seo` in `src/data/site.ts` |
| MVP category, first year, current award, badge | `mvp` in `src/data/site.ts` |
| Certifications (titles, codes, dates, status, badge, verify link) | `certifications` in `src/data/site.ts` |
| Selected work cards | `projects` in `src/data/site.ts` |
| Expertise cards | `src/components/ExpertiseSection.astro` |
| Colours, spacing, typography | `src/styles/global.css` |

**Certifications:** keep entries in sync with the Microsoft Learn transcript (`site.links.learnTranscript`). Set `expires` only when the transcript shows one, and `status: 'expired'` when it lapses. To link a single credential, paste its Microsoft Learn share URL into `verifyUrl` — never guess one.

**MVP renewal:** add the new official badge to `public/badges/`, update `mvp.currentAward` and the badge paths, then run `npm run og` so the share images show the new badge.

## Dark / light theme

- **Default:** the mixed design for every first-time visitor: dark Midnight Azure header, hero and feature panels (expertise cards, credential stats, MVP banner, thumbnails) on light content sections. The switch turns the whole site dark.
- **Toggle:** the sun/moon switch in the header (desktop and mobile). A manual choice is saved in `localStorage` (`theme`) and reused on later visits.
- **No flash:** an inline script in `<head>` (`src/layouts/Base.astro`) sets `data-theme` on `<html>` before the page paints.
- **Colours:** every colour in `global.css` is a token from **`src/styles/theme.css`**, named after its original hex (e.g. `var(--c-070d1a)`). The `:root` block holds the dark values; `:root[data-theme="light"]` holds the light values. Dark "islands" (areas that stay dark in the light theme) re-declare the dark tokens; see the end of `theme.css`.
- **Adding a colour:** add a `--c-<hex>` pair to both blocks in `theme.css` and use `var(--c-<hex>)` — don't put raw hex values in `global.css`, or they won't change with the theme.
- **Code blocks:** Shiki renders GitHub Dark / GitHub Light (`markdown.shikiConfig` in `astro.config.mjs`).
- Switching is instant; only the switch knob animates (disabled for `prefers-reduced-motion`).

## Typography

- **Fonts:** Urbanist (variable) for all text and JetBrains Mono for code only, self-hosted from the `@fontsource-variable/urbanist` and `@fontsource/jetbrains-mono` packages (WOFF2, `font-display: swap`). Imported in `src/layouts/Base.astro`; the Latin Urbanist file is preloaded. No Google Fonts requests.
- **Type scale:** CSS variables at the "Typography system" section of `src/styles/global.css` — `--font-sans`, `--font-mono`, fluid sizes (`--fs-hero`, `--fs-section`, `--fs-card`, `--fs-body`, `--fs-article`, `--fs-code`…), line heights (`--lh-body` 1.65, `--lh-article` 1.75) and `--measure` (article reading width ≈ 65–75 characters).
- Use these variables for new text styles instead of fixed pixel sizes.

## Publishing a new blog post

Every article follows the same structure so the blog reads consistently.

1. **Create** `src/content/blog/<url-slug>.md`. The file name becomes the URL: `/blog/<url-slug>/`.

   ```md
   ---
   title: "Your article title"
   description: "One or two sentences. Shown on the article card, in search results and in social previews."
   date: 2026-12-01
   category: "Power Apps"          # existing: Power Apps, Power Automate, Power BI, AI & Copilot, Power Platform
   tags: ["Power Apps", "Power Fx"]
   cover: "/blog-images/<url-slug>/cover.webp"   # optional; shown on the card and at the top of the article
   readingMinutes: 6               # optional (defaults to 5)
   draft: false                    # true = hidden from every listing, route, RSS and sitemap
   ---

   Opening paragraph(s): what the article covers and why it matters. Do not repeat the title.

   ## Section heading

   Content. Use `##` for sections, `###` for sub-steps. No heading levels may be skipped.
   ```

   **Writing format**
   - Start with an introduction paragraph (no title repeat, no `#` heading).
   - `##` sections, `###` sub-sections; sentence-style headings without emoji or trailing colons.
   - Tight bullet lists (`- item`), numbered steps (`1. step`), fenced code blocks for formulas and code.
   - Every image has meaningful alt text: `![What the screenshot shows](/blog-images/<url-slug>/01.webp)`.

2. **Images:** put them in `public/blog-images/<url-slug>/` (WebP, about 1400 px wide) and reference them as `/blog-images/<url-slug>/01.webp`. The site adds the GitHub Pages base path automatically. The first image is a good `cover`. Without `cover`, the generated share image is used on the card.
3. **Generate the share image:** `npm run og` (creates `public/og/blog/<url-slug>.jpg`). Without it the article falls back to the generic blog image.
4. **Preview:** `npm run dev` and open `/blog/<url-slug>/`.
5. **Build check:** `npm run build`.
6. **Commit and push** to `main` — the workflow deploys automatically.

The new post appears automatically in the blog list, search and filters (categories and tags are derived from the posts), the home page "latest articles" (newest three), the "Keep reading" block of other articles, the RSS feed, the sitemap, and the structured data.

## Production build

```bash
npm run build      # output in dist/
npm run preview    # serve dist/ locally
```

To reproduce the exact production URLs locally (canonical links, sitemap, RSS):

```bash
# bash / Git Bash
SITE_URL=https://essamshaaban-mvp.github.io BASE_PATH=/AI-and-PowerPlatform-Blogs npm run build
```

```powershell
# PowerShell
$env:SITE_URL='https://essamshaaban-mvp.github.io'; $env:BASE_PATH='/AI-and-PowerPlatform-Blogs'; npm run build
```

> In Git Bash on Windows, prefix with `MSYS_NO_PATHCONV=1` so `/AI-and-PowerPlatform-Blogs` isn't rewritten into a Windows path.

## Deployment

Deployment is fully automated by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

- **Triggers:** every push to `main`, or manually via **Actions → Deploy Astro to GitHub Pages → Run workflow**.
- **`build` job** (permission: `contents: read`): checks out the code, warns if the Pages variables are missing, then `withastro/action` installs dependencies, runs the build and uploads the Pages artifact.
- **`deploy` job** (permissions: `pages: write`, `id-token: write`): publishes the artifact with `actions/deploy-pages`.
- The workflow grants no permissions by default (`permissions: {}`); each job requests only what it needs.

### One-time repository settings

| Setting | Value |
|---|---|
| **Settings → Pages → Source** | GitHub Actions |
| **Settings → Secrets and variables → Actions → Variables → `SITE_URL`** | `https://essamshaaban-mvp.github.io` |
| **… → `BASE_PATH`** | `/AI-and-PowerPlatform-Blogs` |

`SITE_URL` and `BASE_PATH` feed `site` and `base` in `astro.config.mjs`. They must match the real Pages address — if the GitHub username or repository name changes, update them, otherwise canonical URLs, the sitemap and RSS will point to the old address.

No secrets are required.

## SEO, RSS and social sharing

| Item | URL / location |
|---|---|
| Sitemap | `/AI-and-PowerPlatform-Blogs/sitemap-index.xml` (generated by `@astrojs/sitemap`) |
| RSS feed | `/AI-and-PowerPlatform-Blogs/rss.xml` |
| robots.txt | `/AI-and-PowerPlatform-Blogs/robots.txt` |
| Page metadata (title, description, canonical, Open Graph, Twitter) | `src/layouts/Base.astro`, props set per page |
| Structured data (JSON-LD) | `src/lib/seo.ts` + each page (`ProfilePage`/`Person`, `Blog`, `BlogPosting`, `BreadcrumbList`) |
| Share images | `public/og/` (regenerate with `npm run og`) |

Notes:

- Search engines only read `robots.txt` at a domain root; for this project site the sitemap is discovered through the `<link rel="sitemap">` tag on every page and by submitting it in Google Search Console / Bing Webmaster Tools.
- To verify ownership, paste the "HTML tag" codes into `site.seo` in `src/data/site.ts` and redeploy.
- Check social previews with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

## Assets and trademarks

- Microsoft certification badges, the Microsoft MVP badge and Microsoft product icons come from Microsoft's official public icon sets / Microsoft Learn and remain trademarks of Microsoft. The Model Context Protocol mark is from the official MCP repository.
- The portrait is the site owner's photograph. Source/original photos are kept out of the repository via `.gitignore`.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Live site has no styles or broken links | `BASE_PATH` variable missing or wrong |
| Canonical URLs / sitemap show `example.github.io` | `SITE_URL` variable missing (the workflow prints a warning) |
| Old `*.github.io` address returns 404 | GitHub Pages doesn't redirect after a username change — update shared links |
| Article shares show the generic image | Run `npm run og` and commit `public/og/blog/<slug>.jpg` |
| `npm run og` fails | Run `npm ci` first (uses the `sharp` dev dependency) |
