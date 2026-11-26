// Site pages: single source for the header menu and the website assistant (src/pages/assistant-index.json.ts).
export const pages = [
  { name: 'Home', path: '/', summary: 'Introduction, key contribution figures and the latest technical articles.', keywords: ['home', 'start', 'landing', 'main'] },
  { name: 'Articles', path: '/#writing', summary: 'Searchable, filterable list of all technical articles (grid or list view).', keywords: ['articles', 'blog', 'writing', 'posts', 'insights'] },
  { name: 'About', path: '/about/', summary: 'Who Essam is, his engineering philosophy and how he works.', keywords: ['about', 'bio', 'philosophy', 'story'] },
  { name: 'Expertise', path: '/expertise/', summary: 'Capabilities and technologies across agentic AI, Power Platform and cloud integration.', keywords: ['expertise', 'skills', 'technologies', 'stack', 'capabilities'] },
  { name: 'Projects', path: '/projects/', summary: 'Representative solution themes (internal details are intentionally omitted).', keywords: ['projects', 'portfolio', 'work', 'solutions'] },
  { name: 'Community', path: '/community/', summary: 'Microsoft MVP recognition and community contributions.', keywords: ['community', 'mvp', 'recognition', 'contribute'] },
  { name: 'Credentials', path: '/credentials/', summary: 'Microsoft certifications, verifiable on Microsoft Learn.', keywords: ['credentials', 'certifications', 'certificates', 'badges', 'exams'] },
] as const;
