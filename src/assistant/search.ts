// Lightweight article search: tokenising, light stemming, synonyms and weighted field scoring. No dependencies.
import type { Article } from './types';

const STOP = new Set(('a an the and or of to in on for with about is are was were be been being do does did can could should would will how what ' +
  'which who whom where when why i you me my your we our us it its this that these those any some there than then so as at by from into over under ' +
  'up out show tell give find get want need please article articles post posts blog blogs write wrote written read reading have has had if not no yes ' +
  'essam shaaban his him he she they them site website page pages tutorial guide guides').split(' '));

/** Query words that also match related vocabulary used in articles (kept small and generic). */
const SYN: Record<string, string[]> = {
  ai: ['agentic', 'copilot', 'agent'],
  agents: ['agentic', 'agent'],
  agent: ['agentic', 'copilot'],
  automation: ['automate', 'flow'],
  automate: ['flow'],
  flows: ['flow', 'automate'],
  flow: ['automate'],
  email: ['mail', 'outlook'],
  mail: ['email', 'outlook'],
  dropdown: ['drop', 'down', 'choice'],
  database: ['dataverse', 'data'],
  excel: ['spreadsheet'],
  report: ['power', 'bi'],
  dashboard: ['power', 'bi'],
};

export function stem(w: string): string {
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

export function words(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z0-9+#.\s-]/g, ' ').replace(/[-_/]+/g, ' ').split(/\s+/).map(w => w.replace(/^[.]+|[.]+$/g, '')).filter(Boolean);
}

/** Meaningful query terms: stop words removed, stemmed. */
export function keywords(q: string): string[] {
  return [...new Set(words(q).filter(w => !STOP.has(w) && (w.length > 1 || /\d/.test(w))).map(stem))];
}

function fieldMatch(fieldWords: string[], t: string): number {
  let best = 0;
  for (const w of fieldWords) {
    if (w === t) return 1;
    if (t.length >= 4 && w.length >= 4 && (w.startsWith(t) || t.startsWith(w))) best = Math.max(best, 0.7);
    else if (t.length >= 5 && w.includes(t)) best = Math.max(best, 0.5);
  }
  return best;
}

export interface Hit { article: Article; score: number; coverage: number }

const prepared = new WeakMap<Article, { title: string[]; tags: string[]; category: string[]; desc: string[]; titleText: string; tagText: string }>();
function prep(a: Article) {
  let p = prepared.get(a);
  if (!p) {
    p = {
      title: words(a.title).map(stem), tags: a.tags.flatMap(t => words(t)).map(stem), category: words(a.category).map(stem), desc: words(a.description).map(stem),
      titleText: words(a.title).join(' '), tagText: a.tags.map(t => words(t).join(' ')).join(' | '),
    };
    prepared.set(a, p);
  }
  return p;
}

/** Rank articles for a query. Results below the relevance floor are dropped. */
export function rank(articles: Article[], query: string, opts: { exclude?: string; min?: number } = {}): Hit[] {
  const terms = keywords(query);
  if (!terms.length) return [];
  const phrase = terms.join(' ');
  const hits: Hit[] = [];
  for (const a of articles) {
    if (a.id === opts.exclude) continue;
    const p = prep(a);
    let total = 0, matched = 0;
    for (const t of terms) {
      const variants: [string, number][] = [[t, 1], ...(SYN[t] ?? []).map(s => [stem(s), 0.5] as [string, number])];
      let termScore = 0;
      for (const [v, w] of variants) {
        const s = 5 * fieldMatch(p.title, v) + 4 * fieldMatch(p.tags, v) + 3 * fieldMatch(p.category, v) + 2 * fieldMatch(p.desc, v);
        termScore = Math.max(termScore, s * w);
      }
      if (termScore > 0) matched++;
      total += termScore;
    }
    const coverage = matched / terms.length;
    let score = total * (0.5 + 0.5 * coverage);
    if (terms.length > 1 && p.titleText.includes(phrase)) score += 6;
    if (terms.length > 1 && p.tagText.includes(phrase)) score += 4;
    if (score >= (opts.min ?? 3.5) && (terms.length === 1 || coverage >= 0.5)) hits.push({ article: a, score, coverage });
  }
  // With several terms, keep only articles that cover most of them (relax only when nothing covers enough).
  const floor = terms.length > 1 && hits.some(h => h.coverage >= 0.75) ? 0.75 : 0;
  return hits.filter(h => h.coverage >= floor).sort((x, y) => y.score - x.score || Date.parse(y.article.date) - Date.parse(x.article.date));
}

/** Readable topic of a question for headings: the query words that are not filler, in the visitor's own spelling. */
export function topicLabel(q: string): string {
  return q.split(/\s+/).map(w => w.replace(/^[^\w#+]+|[^\w#+]+$/g, '')).filter(w => w && !/^[0-9]+$/.test(w) && !STOP.has(w.toLowerCase())).join(' ');
}

/** Articles most similar to `base`, by shared tags and category. */
export function similar(articles: Article[], base: Article, limit = 4): Article[] {
  return articles
    .filter(a => a.id !== base.id)
    .map(a => ({ a, s: a.tags.filter(t => base.tags.includes(t)).length * 3 + (a.category === base.category ? 2 : 0) }))
    .filter(x => x.s > 0)
    .sort((x, y) => y.s - x.s || Date.parse(y.a.date) - Date.parse(x.a.date))
    .slice(0, limit).map(x => x.a);
}
