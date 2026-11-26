// SEO helpers: absolute URLs under the GitHub Pages base path, and JSON-LD builders.
// Structured data uses only facts already published on this site (no ratings, reviews or invented organizations).
import { site, mvp } from '../data/site';

const SITE = (import.meta.env.SITE as string | undefined) ?? 'https://example.github.io';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Absolute URL for a site-relative path, e.g. abs('/about/') -> https://host/base/about/ */
export const abs = (path = '/') => new URL(BASE + (path.startsWith('/') ? path : '/' + path), SITE).toString();

export const homeUrl = abs('/');
export const personId = `${homeUrl}#person`;
export const websiteId = `${homeUrl}#website`;

/** Short reference used wherever the author/publisher is needed. */
export const personRef = { '@type': 'Person', '@id': personId, name: site.name, url: homeUrl };

/** Full Person entity (home page). */
export const person = {
  '@type': 'Person',
  '@id': personId,
  name: site.name,
  url: homeUrl,
  image: abs('/og/home.jpg'),
  jobTitle: 'Senior Software Engineer',
  description: 'Microsoft MVP and Senior Software Engineer focused on secure, scalable business applications and enterprise agentic AI across Microsoft Power Platform and Microsoft Foundry.',
  award: `Microsoft Most Valuable Professional (MVP), ${mvp.category}`,
  knowsAbout: ['Microsoft Power Platform', 'Power Apps', 'Power Automate', 'Dataverse', 'Copilot Studio', 'Microsoft Foundry', 'Agentic AI', 'Model Context Protocol', 'Azure Logic Apps', 'Azure Functions', 'Microsoft Entra ID'],
  sameAs: [site.links.linkedin, site.links.mvp].filter(Boolean),
};

export const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  name: `${site.name} — AI & Power Platform`,
  url: homeUrl,
  inLanguage: 'en-US',
  author: { '@id': personId },
  publisher: { '@id': personId },
};

export const breadcrumbs = (items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
});

/** Wrap one or more entities into a single JSON-LD document. */
export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
