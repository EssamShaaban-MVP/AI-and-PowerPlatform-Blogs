// Default response provider: answers from the build-time index with intent matching + article search.
// Runs entirely in the browser; no network calls, no external AI service. Every answer is composed from the index
// (so it never states a number, title or credential that is not on the site).
import type { Article, Context, Index, Reply, ReplyLink, ResponseProvider } from './types';
import { keywords, rank, similar, topicLabel } from './search';

const fmtNum = (n: number) => n.toLocaleString('en-US');
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const pageLink = (idx: Index, name: string): ReplyLink | undefined => {
  const p = idx.pages.find(x => x.name === name);
  return p && { label: p.name, url: p.url };
};
const ext = (label: string, url?: string): ReplyLink[] => (url ? [{ label, url, external: true }] : []);
const list = (items: string[]) => (items.length <= 1 ? items.join('') : items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1]);

const RX = {
  greet: /^\s*(hi|hello|hey|hola|yo|greetings|good\s+(morning|afternoon|evening))\b/i,
  thanks: /\b(thanks|thank you|thx|appreciate)\b/i,
  bye: /^\s*(bye|goodbye|see you|that'?s all)\b/i,
  help: /\b(what can you (do|help)|help me|how (do|can) (i|you) use (this|you|the assistant)|who are you|what are you)\b|^\s*(help|\?)\s*$/i,
  latest: /\b(latest|newest|most recent|recent(ly)?|new(est)?|just (published|posted))\b/i,
  articleWord: /\b(article|articles|post|posts|blog|writing|published|publish|read|content|guides?|tutorials?)\b|what'?s new/i,
  similar: /\b(similar|related|like this|more like|same topic|more on this|more about this)\b/i,
  newsletter: /\b(newsletter|subscribe|subscription|follow|rss|feed|notif\w*|stay (updated|in touch)|updates)\b/i,
  contact: /\b(contact|reach|email|e-mail|hire|hiring|linkedin|connect|get in touch|message|collaborat\w*|invite|book|schedule)\b/i,
  stats: /\b(how many|number of|total|views?|reads?|readers?|stats|statistics|numbers|kpis?|impact|metrics?)\b/i,
  speaking: /\b(speak(er|ers|ing)?|spoke|sessions?|talks?|conferences?|events?|meetups?|user groups?|webinars?|presentations?|organi[sz]\w*)\b/i,
  mvp: /\b(mvp|most valuable)\b/i,
  cert: /\b(certif\w*|credentials?|exams?|badges?|transcript|qualifications?)\b/i,
  certCode: /\b(ab|ai|pl|az|dp|sc|md|ms)-?(\d{3})\b/i,
  profile: /\b(who is|who's|about (essam|him|the author|the owner|you)|bio|biography|background|experience|career|what (does|do) (he|essam|you) do|introduc\w*|professional|job|position|title|role)\b/i,
  expertise: /\b(expertise|skills?|specialt\w*|specializ\w*|specialis\w*|technolog\w*|tech stack|stack|capabilit\w*|good at|strengths?|focus(es)? on|work with)\b/i,
  projects: /\b(projects?|portfolio|case stud\w*|solution themes?|work samples?|what has (he|essam) built)\b/i,
  nav: /\b(where|navigate|navigation|go to|take me|open|page|section|menu|site ?map|find the)\b/i,
};

const GENERIC = ['Show me the latest articles', 'What does Essam specialize in?', 'What certifications does he hold?', 'How can I contact Essam?'];

export function contextualSuggestions(ctx: Context): string[] {
  const { index, path, current } = ctx;
  const topCategory = Object.entries(index.articles.reduce<Record<string, number>>((m, a) => ((m[a.category] = (m[a.category] ?? 0) + 1), m), {})).sort((a, b) => b[1] - a[1])[0]?.[0];
  if (current) return ['Show me similar articles', 'Show me the latest articles', topCategory ? `Find ${topCategory} articles` : 'What does Essam specialize in?'];
  if (path.startsWith('/credentials')) return ['Which certifications are active?', 'Where can I verify the certifications?', 'Is Essam a Microsoft MVP?'];
  if (path.startsWith('/about')) return ['What does Essam specialize in?', 'Tell me about the projects', 'How can I contact Essam?'];
  if (path.startsWith('/expertise')) return ['Which technologies does Essam work with?', topCategory ? `Find ${topCategory} articles` : 'Show me the latest articles', 'Tell me about the projects'];
  if (path.startsWith('/projects')) return ['Tell me about the projects', 'What does Essam specialize in?', 'Show me the latest articles'];
  if (path.startsWith('/community')) return ['How many events has Essam organized?', 'How do I follow new articles?', 'Is Essam a Microsoft MVP?'];
  return [GENERIC[0], topCategory ? `Find ${topCategory} articles` : GENERIC[1], GENERIC[2], GENERIC[3]];
}

export class LocalProvider implements ResponseProvider {
  readonly id = 'local';

  respond(question: string, ctx: Context): Reply {
    const q = question.trim().slice(0, 240);
    const idx = ctx.index;
    const hits = rank(idx.articles, q);
    const kw = keywords(q).length;
    const strongArticle = !!hits[0] && ((kw >= 2 && hits[0].score >= 8 && hits[0].coverage >= 0.75) || hits[0].score >= 14);
    const make = (r: Omit<Reply, 'suggestions'> & { suggestions?: string[] }): Reply => ({ suggestions: contextualSuggestions(ctx), ...r });

    if (RX.greet.test(q) && q.split(/\s+/).length <= 4) return make({ intent: 'greeting', matched: 0, text: `Hi! I can help you find technical articles and learn about ${idx.profile.name}'s expertise, certifications and community work. What would you like to know?` });
    if (RX.bye.test(q)) return make({ intent: 'bye', matched: 0, text: 'Thanks for stopping by! I\'m here if you have more questions.' });
    if (RX.thanks.test(q) && q.split(/\s+/).length <= 6) return make({ intent: 'thanks', matched: 0, text: 'You\'re welcome! Anything else I can help you find?' });
    if (RX.help.test(q)) return this.help(ctx);

    if (ctx.current && RX.similar.test(q)) {
      const rel = similar(idx.articles, ctx.current);
      if (rel.length) return make({ intent: 'similar', matched: rel.length, text: `Articles related to “${ctx.current.title}”:`, articles: rel });
    }
    if (RX.latest.test(q) && (RX.articleWord.test(q) || /what'?s new/i.test(q) || keywords(q).length <= 1)) return this.latest(q, ctx);

    if (!strongArticle) {
      const code = q.match(RX.certCode);
      if (code) { const r = this.certByCode(`${code[1]}-${code[2]}`, ctx); if (r) return r; }
      if (RX.nav.test(q)) { const r = this.navigate(q, ctx); if (r) return r; }
      if (RX.newsletter.test(q) && !/\bfollow\b.*\b(linkedin)\b/i.test(q)) return this.newsletter(ctx);
      if (RX.contact.test(q) || /\b(invite|book)\b.*\bspeak/i.test(q)) return this.contact(ctx);
      if (RX.stats.test(q) || RX.speaking.test(q)) return this.stats(q, ctx);
      if (RX.mvp.test(q)) return this.mvp(ctx);
      if (RX.cert.test(q)) return this.certifications(q, ctx, hits.slice(0, 2).map(h => h.article));
      if (RX.projects.test(q)) return this.projects(ctx);
      if (RX.expertise.test(q)) return this.expertise(ctx, hits.slice(0, 2).map(h => h.article));
      if (RX.profile.test(q)) return this.profile(ctx);
    }

    if (hits.length) {
      const top = hits.slice(0, 4).map(h => h.article);
      const label = topicLabel(q).slice(0, 60) || q.slice(0, 60);
      const more = hits.length > top.length ? ` (${hits.length} matches in total)` : '';
      return make({ intent: 'article-search', matched: hits.length, text: hits.length === 1 ? `I found one article about “${label}”:` : `Here are the ${top.length === hits.length ? '' : 'best '}${top.length} article${top.length > 1 ? 's' : ''} about “${label}”${more}:`, articles: top, links: hits.length > top.length ? [this.articlesLink(idx)] : [] });
    }
    if (!keywords(q).length) return this.latest(q, ctx);
    return this.fallback(ctx);
  }

  private articlesLink(idx: Index): ReplyLink { return pageLink(idx, 'Articles') ?? { label: 'All articles', url: idx.base + '/#writing' }; }

  private help(ctx: Context): Reply {
    return { intent: 'help', matched: 0, suggestions: contextualSuggestions(ctx), text: 'I\'m a website assistant. I can search the technical articles, show the latest ones, and answer questions about expertise, projects, certifications, community work and how to get in touch.\nI only use the public content of this website.' };
  }

  private latest(q: string, ctx: Context): Reply {
    const idx = ctx.index;
    const n = Math.min(8, Math.max(1, parseInt(q.match(/\b(\d{1,2})\b/)?.[1] ?? '3', 10)));
    const topic = keywords(q.replace(RX.latest, ' ').replace(/\b\d+\b/g, ' ')).filter(k => !RX.articleWord.test(k));
    let pool: Article[] = idx.articles;
    let label = 'Latest articles';
    if (topic.length) {
      const found = rank(idx.articles, topic.join(' ')).map(h => h.article).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
      if (found.length) { pool = found; label = `Latest articles about ${topicLabel(q.replace(RX.latest, ' ').replace(/\d+/g, ' '))}`; }
    }
    const items = pool.slice(0, n);
    return { intent: 'latest', matched: items.length, suggestions: contextualSuggestions(ctx), text: `${label}:`, articles: items, links: [this.articlesLink(idx)] };
  }

  private newsletter(ctx: Context): Reply {
    const l = ctx.index.links;
    const text = l.newsletter
      ? 'You can subscribe to the newsletter from the link below. New articles are also available through the RSS feed.'
      : 'There is no email newsletter on this site at the moment. To follow new articles, add the RSS feed to your feed reader, or connect on LinkedIn.';
    return { intent: 'newsletter', matched: 1, suggestions: contextualSuggestions(ctx), text, links: [...ext('Subscribe to the newsletter', l.newsletter), { label: 'RSS feed', url: l.rss, external: true }, ...ext('Connect on LinkedIn', l.linkedin)] };
  }

  private contact(ctx: Context): Reply {
    const l = ctx.index.links;
    return { intent: 'contact', matched: 1, suggestions: contextualSuggestions(ctx), text: `You can reach ${ctx.index.profile.name} through the links below. LinkedIn is the best place for professional enquiries and speaking invitations.`, links: [...ext('Connect on LinkedIn', l.linkedin), ...(l.email ? [{ label: 'Send an email', url: `mailto:${l.email}`, external: true }] : []), ...ext('Microsoft MVP profile', l.mvp)] };
  }

  private stats(q: string, ctx: Context): Reply {
    const idx = ctx.index, s = idx.stats;
    const lines: string[] = [];
    const wantViews = /\b(views?|reads?|readers?)\b/i.test(q);
    const wantOrg = /organi[sz]|host|\bled\b|\blead\b|\bevents?\b.*\b(run|ran)\b/i.test(q);
    const wantSpeak = /speak|talk|session|present|webinar|conference/i.test(q);
    const wantArticles = /\barticles?\b|\bposts?\b|\bblogs?\b|published/i.test(q);
    const any = wantViews || wantOrg || wantSpeak || wantArticles;
    if ((wantArticles || !any)) lines.push(`${fmtNum(s.articles)} published technical articles.`);
    if (s.articleViews != null && (wantViews || !any)) lines.push(`${fmtNum(s.articleViews)} article views.`);
    if (s.speakingSessions != null && (wantSpeak || (!any))) lines.push(`${fmtNum(s.speakingSessions)} speaking sessions as a speaker.`);
    if (s.eventsOrganized != null && (wantOrg || (!any))) lines.push(`${fmtNum(s.eventsOrganized)} events organized.`);
    if (!any) s.extra.forEach(e => lines.push(`${fmtNum(e.value)} ${e.label.toLowerCase()}.`));
    if (!lines.length) lines.push('I don\'t have a published figure for that.');
    if (wantOrg || wantSpeak) lines.push('The site shares these totals only. It does not list individual sessions or events, so for details please see LinkedIn or get in touch.');
    return { intent: 'stats', matched: lines.length, suggestions: contextualSuggestions(ctx), text: lines.join('\n'), links: [pageLink(idx, 'Community')!, ...ext('LinkedIn', idx.links.linkedin)].filter(Boolean) };
  }

  private mvp(ctx: Context): Reply {
    const idx = ctx.index, m = idx.profile.mvp;
    return { intent: 'mvp', matched: 1, suggestions: contextualSuggestions(ctx), text: `${idx.profile.name} is a Microsoft Most Valuable Professional (MVP) in ${m.category}, recognized since ${m.since}. The current award period is ${m.award}.`, links: [pageLink(idx, 'Community')!, ...ext('Microsoft MVP profile', idx.links.mvp)] };
  }

  private certByCode(code: string, ctx: Context): Reply | undefined {
    const idx = ctx.index;
    const c = idx.certifications.find(x => x.code.toLowerCase().replace('-', '') === code.toLowerCase().replace('-', ''));
    if (!c) return undefined;
    const status = c.status === 'active' ? 'currently active' : 'no longer active';
    return { intent: 'certification', matched: 1, suggestions: contextualSuggestions(ctx), text: `${c.code}: Microsoft Certified ${c.title} (${c.level}). Earned ${c.earned}${c.expires ? `, valid until ${c.expires}` : ''}. This certification is ${status}.`, links: [pageLink(idx, 'Credentials')!, ...ext('Verify on Microsoft Learn', idx.links.transcript)] };
  }

  private certifications(q: string, ctx: Context, related: Article[]): Reply {
    const idx = ctx.index, certs = idx.certifications;
    const active = certs.filter(c => c.status === 'active');
    const onlyActive = /\bactive|current|valid\b/i.test(q);
    const shown = onlyActive ? active : certs;
    const text = `${idx.profile.name} has earned ${certs.length} Microsoft certification${certs.length === 1 ? '' : 's'}, ${active.length} currently active.\n${shown.map(c => `${c.code}: ${c.title}${c.status === 'active' ? '' : ' (expired)'}`).join('\n')}`;
    return { intent: 'certifications', matched: shown.length, suggestions: contextualSuggestions(ctx), text, links: [pageLink(idx, 'Credentials')!, ...ext('Verify on Microsoft Learn', idx.links.transcript)], articles: related.filter(a => /certif|credential|learning/i.test(a.title + a.tags.join(' '))).slice(0, 1) };
  }

  private projects(ctx: Context): Reply {
    const idx = ctx.index;
    return { intent: 'projects', matched: idx.projects.length, suggestions: contextualSuggestions(ctx), text: `Representative solution themes (internal details are intentionally omitted):\n${idx.projects.map(p => `${p.title}: ${p.description}`).join('\n')}`, links: [pageLink(idx, 'Projects')!] };
  }

  private expertise(ctx: Context, related: Article[]): Reply {
    const idx = ctx.index;
    const text = `${idx.profile.name} focuses on ${list(idx.expertise.map(a => a.title))}.\n${idx.expertise.map(a => `${a.title}: ${a.items.slice(0, 4).join(', ')}`).join('\n')}\nTechnologies: ${idx.technologies.join(', ')}.`;
    return { intent: 'expertise', matched: idx.expertise.length, suggestions: contextualSuggestions(ctx), text, links: [pageLink(idx, 'Expertise')!], articles: related.slice(0, 2) };
  }

  private profile(ctx: Context): Reply {
    const idx = ctx.index, p = idx.profile;
    return { intent: 'profile', matched: 1, suggestions: contextualSuggestions(ctx), text: `${p.name} is a ${p.role.replace(/\s*•\s*/g, ' and ')}.\n${p.intro}\nThis site shares his public work. For a full employment history, please see his LinkedIn profile.`, links: [pageLink(idx, 'About')!, ...ext('LinkedIn', idx.links.linkedin)] };
  }

  private navigate(q: string, ctx: Context): Reply | undefined {
    const idx = ctx.index;
    const terms = keywords(q);
    const found = idx.pages.filter(p => p.keywords.some(k => terms.includes(k) || terms.includes(k.replace(/s$/, ''))) || terms.includes(p.name.toLowerCase()));
    if (!found.length) return undefined;
    return { intent: 'navigate', matched: found.length, suggestions: contextualSuggestions(ctx), text: found.map(p => `${p.name}: ${p.summary}`).join('\n'), links: found.map(p => ({ label: p.name, url: p.url })) };
  }

  private fallback(ctx: Context): Reply {
    const idx = ctx.index;
    return { intent: 'fallback', matched: 0, suggestions: contextualSuggestions(ctx), text: 'I couldn\'t find anything about that on this site. I can search the technical articles, or answer questions about expertise, projects, certifications and community work. You can also browse the pages below.', links: idx.pages.filter(p => p.name !== 'Home').map(p => ({ label: p.name, url: p.url })) };
  }
}
