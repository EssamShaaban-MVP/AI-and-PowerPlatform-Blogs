// Website assistant UI. Loaded lazily the first time the visitor clicks the floating robot.
// - Renders with textContent / createElement only (no innerHTML for content), so replies can never inject markup.
// - Keeps the conversation in memory only: nothing is stored, and reset clears it.
// - Talks to a ResponseProvider, so the answer engine can be swapped (see types.ts) without touching this UI.
import type { Article, Context, Index, Reply, ReplyLink, ResponseProvider } from './types';
import { LocalProvider, contextualSuggestions } from './local-provider';
import { lengthBucket, track } from './analytics';

interface Options { provider?: ResponseProvider }
interface State {
  root: HTMLElement; launcher: HTMLButtonElement; panel: HTMLElement; log: HTMLElement; chips: HTMLElement;
  input: HTMLInputElement; minBtn: HTMLButtonElement; index: Index | null; provider: ResponseProvider | null; busy: boolean; lastIntent: string;
}

let state: State | null = null;

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

const ICON = {
  reset: '<path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/>',
  min: '<path d="M5 12h14"/>',
  expand: '<rect x="5" y="5" width="14" height="14" rx="2"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  send: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};

function iconButton(label: string, path: string, cls: string): HTMLButtonElement {
  const b = el('button', 'as-btn ' + cls);
  b.type = 'button';
  b.setAttribute('aria-label', label);
  b.title = label;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  for (const [k, v] of Object.entries({ viewBox: '0 0 24 24', width: '18', height: '18', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' })) svg.setAttribute(k, v);
  svg.innerHTML = path; // static, trusted icon markup defined above
  b.append(svg);
  return b;
}
const setIcon = (b: HTMLButtonElement, path: string) => { (b.querySelector('svg') as SVGElement).innerHTML = path; };

const norm = (u: string) => u.replace(/\/+$/, '');
function context(s: State): Context {
  const index = s.index!;
  const p = location.pathname;
  const path = (index.base && p.startsWith(index.base) ? p.slice(index.base.length) : p) || '/';
  return { index, path, current: index.articles.find(a => norm(a.url) === norm(p)) };
}

function articleCard(a: Article): HTMLElement {
  const link = el('a', 'as-card');
  link.href = a.url;
  const date = new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  link.append(el('strong', 'as-card-title', a.title), el('span', 'as-card-meta', `${a.category} · ${date} · ${a.minutes} min read`), el('span', 'as-card-desc', a.description));
  return link;
}

function linkChip(l: ReplyLink): HTMLAnchorElement {
  const a = el('a', 'as-link', l.label);
  a.href = l.url;
  if (l.external && /^https?:/i.test(l.url)) { a.target = '_blank'; a.rel = 'noopener'; a.append(el('span', 'as-ext', ' ↗')); }
  return a;
}

const scroll = (s: State) => { s.log.scrollTop = s.log.scrollHeight; };

function addUser(s: State, text: string) {
  s.log.append(el('div', 'as-msg as-user', text));
  scroll(s);
}

function addBot(s: State, reply: Reply) {
  const msg = el('div', 'as-msg as-bot');
  msg.dataset.intent = reply.intent;
  reply.text.split('\n').filter(Boolean).forEach(line => msg.append(el('p', '', line)));
  if (reply.articles?.length) {
    const ul = el('ul', 'as-cards');
    reply.articles.forEach(a => { const li = el('li'); li.append(articleCard(a)); ul.append(li); });
    msg.append(ul);
  }
  const links = (reply.links ?? []).filter(Boolean);
  if (links.length) { const row = el('div', 'as-links'); links.forEach(l => row.append(linkChip(l))); msg.append(row); }
  s.log.append(msg);
  setChips(s, reply.suggestions ?? []);
  scroll(s);
}

function setChips(s: State, items: string[]) {
  s.chips.replaceChildren();
  items.slice(0, 4).forEach(q => {
    const b = el('button', 'as-chip', q);
    b.type = 'button';
    b.addEventListener('click', () => ask(s, q));
    s.chips.append(b);
  });
}

async function ask(s: State, raw: string) {
  const q = raw.trim().slice(0, 200);
  if (!q || s.busy || !s.provider || !s.index) return;
  s.busy = true;
  s.input.value = '';
  addUser(s, q);
  s.log.setAttribute('aria-busy', 'true');
  let wait: HTMLElement | null = null;
  const timer = window.setTimeout(() => { wait = el('div', 'as-msg as-bot as-wait', 'Searching…'); s.log.append(wait); scroll(s); }, 250);
  try {
    const reply = await s.provider.respond(q, context(s));
    window.clearTimeout(timer); wait?.remove();
    s.lastIntent = reply.intent;
    track('assistant_question', { intent: reply.intent, results: reply.matched, length: lengthBucket(q.length) });
    addBot(s, reply);
  } catch {
    window.clearTimeout(timer); wait?.remove();
    addBot(s, { intent: 'error', matched: 0, text: 'Sorry, something went wrong. Please try again, or use the site navigation.', suggestions: contextualSuggestions(context(s)) });
  } finally {
    s.busy = false;
    s.log.removeAttribute('aria-busy');
    s.input.focus();
  }
}

function greet(s: State) {
  s.log.replaceChildren();
  if (!s.index) {
    addBot(s, { intent: 'error', matched: 0, text: 'The assistant could not load its content right now. Please use the navigation menu to explore the site.', suggestions: [] });
    return;
  }
  const ctx = context(s);
  const text = ctx.current
    ? `Hi! You're reading “${ctx.current.title}”. I can find related articles or answer questions about ${s.index.profile.name}'s work.`
    : `Hi! I'm ${s.root.dataset.name || 'the website assistant'}, the website assistant. I can help you find technical articles and learn about ${s.index.profile.name}'s expertise, certifications and community work. I only use the public content of this site.`;
  addBot(s, { intent: 'greeting', matched: 0, text, suggestions: contextualSuggestions(ctx) });
}

function close(s: State) {
  s.panel.hidden = true;
  s.launcher.hidden = false;
  s.launcher.setAttribute('aria-expanded', 'false');
  s.launcher.focus();
}

function build(root: HTMLElement, launcher: HTMLButtonElement): State {
  const name = root.dataset.name || 'Assistant';
  const panel = el('section', 'as-panel');
  panel.id = 'assistant-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'as-title');
  panel.hidden = true;

  const head = el('header', 'as-head');
  const avatar = el('span', 'as-avatar');
  const robot = launcher.querySelector('svg');
  if (robot) {
    // Head crop of the launcher robot, animations off (see .as-avatar in assistant.css); ids are renamed so they stay unique.
    const copy = robot.cloneNode(true) as SVGElement;
    copy.setAttribute('viewBox', '38 8 124 128');
    avatar.append(copy);
    avatar.innerHTML = avatar.innerHTML.replace(/wvg-/g, 'wvg-av-');
  }
  avatar.setAttribute('aria-hidden', 'true');
  const titles = el('div', 'as-titles');
  const title = el('h2', 'as-title', name);
  title.id = 'as-title';
  titles.append(title, el('p', 'as-sub', 'Website assistant · public content only'));
  const actions = el('div', 'as-actions');
  const resetBtn = iconButton('Reset conversation', ICON.reset, 'as-reset');
  const minBtn = iconButton('Minimize assistant', ICON.min, 'as-min');
  minBtn.setAttribute('aria-expanded', 'true');
  const closeBtn = iconButton('Close assistant', ICON.close, 'as-close');
  actions.append(resetBtn, minBtn, closeBtn);
  head.append(avatar, titles, actions);

  const body = el('div', 'as-body');
  const log = el('div', 'as-log');
  log.setAttribute('role', 'log');
  log.setAttribute('aria-live', 'polite');
  log.setAttribute('aria-label', 'Conversation');
  log.tabIndex = 0;
  const chips = el('div', 'as-chips');
  chips.setAttribute('aria-label', 'Suggested questions');
  const form = el('form', 'as-form');
  const label = el('label', 'as-sr', 'Ask a question');
  label.htmlFor = 'as-input';
  const input = el('input', 'as-input');
  input.id = 'as-input'; input.type = 'text'; input.maxLength = 200; input.autocomplete = 'off'; input.placeholder = 'Ask about articles, skills, certifications…';
  const send = iconButton('Send question', ICON.send, 'as-send');
  send.type = 'submit';
  form.append(label, input, send);
  body.append(log, chips, form, el('p', 'as-note', 'Nothing you type is stored or sent anywhere.'));
  panel.append(head, body);
  root.append(panel);

  const s: State = { root, launcher, panel, log, chips, input, minBtn, index: null, provider: null, busy: false, lastIntent: '' };

  form.addEventListener('submit', e => { e.preventDefault(); ask(s, input.value); });
  resetBtn.addEventListener('click', () => { greet(s); track('assistant_reset'); input.focus(); });
  minBtn.addEventListener('click', () => {
    const min = panel.classList.toggle('is-min');
    minBtn.setAttribute('aria-expanded', String(!min));
    minBtn.setAttribute('aria-label', min ? 'Expand assistant' : 'Minimize assistant');
    minBtn.title = min ? 'Expand assistant' : 'Minimize assistant';
    setIcon(minBtn, min ? ICON.expand : ICON.min);
    if (!min) input.focus();
  });
  closeBtn.addEventListener('click', () => close(s));
  panel.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); close(s); } });
  log.addEventListener('click', e => {
    const a = (e.target as HTMLElement).closest('a');
    if (a) track('assistant_link_click', { type: a.target === '_blank' ? 'external' : 'internal', intent: s.lastIntent });
  });
  return s;
}

/** Opens the assistant, creating it (and fetching the knowledge index) on first use. */
export async function openAssistant(root: HTMLElement, opts: Options = {}): Promise<void> {
  const launcher = root.querySelector<HTMLButtonElement>('.assistant-launcher')!;
  if (!state) {
    state = build(root, launcher);
    state.panel.hidden = false; // show immediately while the index loads
    try {
      const res = await fetch(root.dataset.index!, { credentials: 'omit' });
      if (!res.ok) throw new Error(String(res.status));
      state.index = (await res.json()) as Index;
      state.provider = opts.provider ?? new LocalProvider();
    } catch { state.index = null; }
    greet(state);
    track('assistant_open');
  }
  const s = state;
  s.panel.hidden = false;
  s.launcher.hidden = true;
  s.launcher.setAttribute('aria-expanded', 'true');
  if (s.panel.classList.contains('is-min')) s.minBtn.click();
  s.input.focus();
}
