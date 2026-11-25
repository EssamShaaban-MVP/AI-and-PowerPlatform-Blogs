import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// For username.github.io repository use BASE_PATH=/.
// For a project repository use BASE_PATH=/repository-name.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.github.io',
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap()],
  // The Certifications page is now Credentials; keep the old URL working (static meta-refresh page on GitHub Pages).
  redirects: { '/certifications': `${(process.env.BASE_PATH || '/').replace(/\/$/, '')}/credentials/` },
  // three.js (~185 KB gzip) is only loaded on demand by the About-section robot (dynamic import),
  // so its large chunk never blocks page load; raise the warning threshold accordingly.
  vite: { build: { chunkSizeWarningLimit: 800 } },
  markdown: {
    // Dual syntax themes: dark is applied inline (unchanged default); light colours are exposed
    // as --shiki-light variables and switched on by [data-theme="light"] in global.css.
    shikiConfig: { themes: { dark: 'github-dark', light: 'github-light' }, defaultColor: 'dark' },
  },
});
