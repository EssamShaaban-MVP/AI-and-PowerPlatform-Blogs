# Essam Shaaban — Midnight Azure Portfolio + Technical Blog

A modern, responsive, static Astro portfolio for GitHub Pages. Includes six homepage sections, eight Microsoft certifications, Microsoft MVP recognition, and a Markdown technical blog with categories and instant client-side search.

## Local development

Requires Node.js 22.12+ (Node 24 recommended) and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:4321`. Production build:

```bash
npm run build
npm run preview
```

## Publish free on GitHub Pages

1. Create a **public** GitHub repository. For a root site, use `YOUR_GITHUB_USERNAME.github.io`. For a project site, any repo name is fine.
2. Upload these project files to the repository root or push with Git. Use `main` as the default branch.
3. In GitHub **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
4. In **Settings → Secrets and variables → Actions → Variables**, create:
   - `SITE_URL` = `https://YOUR_GITHUB_USERNAME.github.io`
   - `BASE_PATH` = `/` for `YOUR_GITHUB_USERNAME.github.io`, or `/YOUR_REPOSITORY_NAME` for a project repository.
5. Push to `main` or run **Actions → Deploy Astro to GitHub Pages → Run workflow**.
6. Open `https://YOUR_GITHUB_USERNAME.github.io/` (root) or `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/` (project).

A custom domain can be configured later following GitHub Pages' domain instructions; update `SITE_URL` and `BASE_PATH` accordingly.

## Customize the portfolio

- **Name, intro, verified public links, certifications, case studies:** `src/data/site.ts`
- **Colors, typography, and page layout:** `src/styles/global.css`
- **Home:** `src/pages/index.astro`
- **Credential page:** `src/pages/certifications.astro`
- **Header/footer:** `src/layouts/Base.astro`

The 8 certification names/dates are based on the supplied screenshot. The MVP recognition is included separately. Project copy is intentionally high-level and must be reviewed before public release. No email address, social profile URLs, photographs, client names, testimonials or proprietary data have been invented.

## Add a blog article

Create `src/content/blog/my-new-article.md`:

```md
---
title: "My new article"
description: "A one-sentence summary."
date: 2026-11-23
category: "Agentic AI"
tags: ["Azure", "Architecture"]
readingMinutes: 5
---

## Introduction

Your Markdown content here.
```

A new article automatically appears in the blog, search, category filters, homepage latest posts, and generates its own URL. Mark `draft: true` in frontmatter to hide it from production listings/routes.

Three **illustrative starter articles** are included. Edit or replace them before claiming they document tested implementations.

## Important pre-publication steps

- Fill your genuine LinkedIn, GitHub, Microsoft Learn, and contact URLs in `src/data/site.ts`; wire the contact CTA to your chosen public profile if desired. The current contact section only links to the blog and does not pretend to have a working email/contact form.
- Review the project summaries and ensure they are approved for public use.
- Review certification expirations over time. Certification verification links are not yet supplied.
- Optional: add your portrait and an authentic Microsoft MVP badge asset if usage permissions allow.

## Tech

Astro 7, content collections, semantic HTML, vanilla CSS and tiny vanilla JS enhancements, GitHub Pages Action. No premium services, API keys, or backend required.

## Official docs

- https://docs.astro.build/en/guides/content-collections/
- https://docs.astro.build/en/guides/deploy/github/
- https://docs.github.com/en/pages
