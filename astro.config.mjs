import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// For username.github.io repository use BASE_PATH=/.
// For a project repository use BASE_PATH=/repository-name.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.github.io',
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap()],
});
