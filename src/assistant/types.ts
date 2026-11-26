// Shared types for the website assistant.

export interface Article {
  id: string; title: string; description: string; category: string; tags: string[];
  /** ISO date */ date: string; minutes: number; /** Base-path-aware URL */ url: string;
}

/** The knowledge index generated at build time by src/pages/assistant-index.json.ts. */
export interface Index {
  base: string;
  profile: { name: string; role: string; headline: string; intro: string; mvp: { category: string; since: number; award: string } };
  stats: { articles: number; articleViews?: number; speakingSessions?: number; eventsOrganized?: number; extra: { label: string; value: number; note?: string }[] };
  articles: Article[];
  pages: { name: string; url: string; summary: string; keywords: string[] }[];
  expertise: { title: string; summary: string; items: string[] }[];
  technologies: string[];
  projects: { title: string; type: string; description: string; tags: string[] }[];
  certifications: { code: string; title: string; level: string; status: string; earned: string; expires: string | null }[];
  links: { linkedin?: string; email?: string; mvp?: string; transcript?: string; github?: string; rss: string; newsletter?: string };
}

export interface ReplyLink { label: string; url: string; external?: boolean }

/** What a provider returns. The chat UI renders it with textContent only (never innerHTML). */
export interface Reply {
  /** Plain text; "\n" starts a new paragraph. */
  text: string;
  articles?: Article[];
  links?: ReplyLink[];
  /** Follow-up questions shown as chips. */
  suggestions?: string[];
  /** Short label of what was understood, for anonymous analytics (never the visitor's text). */
  intent: string;
  /** Number of results found, for anonymous analytics. */
  matched: number;
}

export interface Context {
  index: Index;
  /** Current page path without the site base, e.g. "/about/". */
  path: string;
  /** The article being read, when the visitor is on an article page. */
  current?: Article;
}

/**
 * A response provider turns a visitor's question into a reply.
 *
 * The chat UI only knows this interface. The default provider (LocalProvider) searches the build-time index in the
 * browser with no external services. To use a Microsoft Foundry or Copilot Studio agent later, implement
 * `respond()` to call your own endpoint and return a Reply, then pass it to `mountAssistant({ provider })`
 * (see README, "Website assistant").
 */
export interface ResponseProvider {
  readonly id: string;
  respond(question: string, ctx: Context): Promise<Reply> | Reply;
}
