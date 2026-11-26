// Knowledge index for the website assistant: <base>/assistant-index.json
//
// Generated at build time from the same sources the pages use (blog collection, site data, certifications,
// projects, expertise, impact figures and the page list), so it updates whenever content is published.
// Nothing here is hand-written article or statistics data. Only public site content is included.
import { getCollection } from 'astro:content';
import { site, mvp, certifications, projects } from '../data/site';
import { impact } from '../data/impact';
import { areas, tech } from '../data/expertise';
import { pages } from '../data/nav';
import type { Index } from '../assistant/types';

export async function GET() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const url = (path: string) => base + path;
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const opt = (v: string | undefined) => (v ? v : undefined);

  const index: Index = {
    base,
    profile: {
      name: site.name,
      role: site.role,
      headline: site.headline,
      intro: site.intro,
      mvp: { category: mvp.category, since: mvp.firstAwarded, award: mvp.currentAward },
    },
    stats: {
      articles: posts.length,
      articleViews: impact.articleViews ?? undefined,
      speakingSessions: impact.speakingSessions ?? undefined,
      eventsOrganized: impact.eventsOrganized ?? undefined,
      extra: impact.extra.map(e => ({ label: e.label, value: e.value, note: e.note })),
    },
    articles: posts.map(p => ({
      id: p.id,
      title: p.data.title,
      description: p.data.description,
      category: p.data.category,
      tags: p.data.tags,
      date: p.data.date.toISOString(),
      minutes: p.data.readingMinutes ?? 5,
      url: url(`/blog/${p.id}/`),
    })),
    pages: pages.map(p => ({ name: p.name, url: url(p.path), summary: p.summary, keywords: [...p.keywords] })),
    expertise: areas.map(a => ({ title: a.title, summary: a.summary, items: a.capabilities.map(c => c[0]) })),
    technologies: tech.map(t => t[0]),
    projects: projects.map(p => ({ title: p.title, type: p.type, description: p.description, tags: [...p.tags] })),
    certifications: certifications.map(c => ({ code: c.code, title: c.title, level: c.level, status: c.status, earned: c.earned, expires: c.expires })),
    links: {
      linkedin: opt(site.links.linkedin),
      email: opt(site.links.email),
      mvp: opt(site.links.mvp),
      transcript: opt(site.links.learnTranscript),
      github: opt(site.links.github),
      rss: url('/rss.xml'),
      // Optional: add `newsletter: 'https://...'` to `site.links` in src/data/site.ts once a newsletter exists.
      newsletter: opt((site.links as Record<string, string>).newsletter),
    },
  };

  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
