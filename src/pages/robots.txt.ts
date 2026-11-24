// <base>/robots.txt — points crawlers at the sitemap under the GitHub Pages base path.
// Note: crawlers only honour robots.txt at the domain root; this copy documents intent and
// the sitemap is also linked from every page's <head> and can be submitted in Search Console.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const sitemap = new URL(`${base}/sitemap-index.xml`, site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
