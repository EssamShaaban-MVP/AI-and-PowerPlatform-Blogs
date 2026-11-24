import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// For username.github.io repository use BASE_PATH=/.
// For a project repository use BASE_PATH=/repository-name.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.github.io',
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap()],
  markdown: {
    // Dual syntax themes: dark is applied inline (unchanged default); light colours are exposed
    // as --shiki-light variables and switched on by [data-theme="light"] in global.css.
    shikiConfig: { themes: { dark: 'github-dark', light: 'github-light' }, defaultColor: 'dark' },
  },
});
