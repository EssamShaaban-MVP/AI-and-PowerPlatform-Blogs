export const site = {
  name: 'Essam Shaaban',
  role: 'Senior Software Engineer • Microsoft MVP',
  headline: 'Designing practical AI systems. Building business solutions that last.',
  intro: 'I work at the intersection of agentic AI, Microsoft Power Platform, and enterprise architecture—turning complex processes into reliable, human-centered solutions.',
  // Add only public profiles that you have verified and wish to share.
  links: {
    linkedin: 'https://www.linkedin.com/in/essam-shaaban-37a4371b1',
    email: 'essam.shaaban77777@gmail.com',
    mvp: 'https://mvp.microsoft.com/en-US/MVP/profile/480e02e6-5d73-4ace-bf70-43c208560dcd',
    github: '',
    learnTranscript: 'https://learn.microsoft.com/en-us/users/essamshaaban-4407/transcript/deg5ka2qg3pjj68',
  },
  // Optional: paste the verification codes from Google Search Console / Bing Webmaster Tools (HTML tag method).
  seo: {
    googleSiteVerification: '',
    bingSiteVerification: '',
  },
};

// Microsoft MVP recognition. Keep to verified facts only.
export const mvp = {
  category: 'Business Applications',
  firstAwarded: 2024,
  currentAward: '2026–2027', // matches the official award badge in public/badges/
  badge: '/badges/microsoft-mvp-2026-2027.webp',
  badgeSmall: '/badges/microsoft-mvp-2026-2027-128.webp',
};

// Single source of truth for certifications. Verified against the public Microsoft Learn transcript
// (site.links.learnTranscript). Badges are official artwork from each certification's Microsoft Learn page (public/badges/).
//   title     – official name without the "Microsoft Certified:" prefix (pages add the prefix)
//   type      – 'role-based' (Associate / Expert), 'fundamentals', or 'business' (AI business credentials)
//   expires   – only when shown on the Microsoft Learn transcript; null otherwise
//   verifyUrl – individual Microsoft Learn credential link; leave '' until you copy the real share URL
export const certifications = [
  { code: 'AB-100', title: 'Agentic AI Business Solutions Architect Expert', level: 'Expert', type: 'role-based', category: 'AI & Agentic AI', earned: 'Oct 11, 2026', expires: 'Oct 11, 2027', status: 'active', badge: 'microsoft-certified-expert-badge', featured: true, verifyUrl: '' },
  { code: 'AB-410', title: 'Intelligent Applications Builder Associate', level: 'Associate', type: 'role-based', category: 'AI & Agentic AI', earned: 'Aug 9, 2026', expires: 'Aug 10, 2027', status: 'active', badge: 'microsoft-certified-associate-badge', verifyUrl: '' },
  { code: 'AI-103', title: 'Azure AI Apps and Agents Developer Associate', level: 'Associate', type: 'role-based', category: 'AI & Agentic AI', earned: 'Sep 13, 2026', expires: 'Sep 13, 2027', status: 'active', badge: 'microsoft-certified-associate-badge', verifyUrl: '' },
  { code: 'PL-100', title: 'Power Platform App Maker Associate', level: 'Associate', type: 'role-based', category: 'Power Platform', earned: 'Feb 11, 2023', expires: 'Feb 11, 2024', status: 'expired', badge: 'microsoft-certified-associate-badge', verifyUrl: '' },
  { code: 'AB-730', title: 'AI Business Professional', level: 'Professional', type: 'business', category: 'AI & Agentic AI', earned: 'Mar 12, 2026', expires: null, status: 'active', badge: 'ai-business-professional', verifyUrl: '' },
  { code: 'AB-731', title: 'AI Transformation Leader', level: 'Professional', type: 'business', category: 'AI & Agentic AI', earned: 'Mar 2, 2026', expires: null, status: 'active', badge: 'ai-transformation-leader', verifyUrl: '' },
  { code: 'AI-900', title: 'Azure AI Fundamentals', level: 'Fundamentals', type: 'fundamentals', category: 'AI & Agentic AI', earned: 'Sep 27, 2025', expires: null, status: 'active', badge: 'microsoft-certified-fundamentals-badge', verifyUrl: '' },
  { code: 'PL-900', title: 'Power Platform Fundamentals', level: 'Fundamentals', type: 'fundamentals', category: 'Power Platform', earned: 'Feb 17, 2022', expires: null, status: 'active', badge: 'microsoft-certified-fundamentals-badge', verifyUrl: '' },
];

// Public-safe summaries. Replace with approved case studies before publication.
export const projects = [
  { number: '01', type: 'Agentic AI / Architecture', title: 'Enterprise AI Solution Assessment', description: 'Evaluating agent frameworks, data access patterns and governance tradeoffs to choose the right technology for each business scenario.', tags: ['Microsoft Foundry', 'Copilot Studio', 'Architecture'], icon: 'sparkles' },
  { number: '02', type: 'Power Platform / Business Apps', title: 'Faculty Workflow Modernization', description: 'A multi-stage digital approval experience that makes complex review processes easier to navigate, audit and maintain.', tags: ['Power Apps', 'Dataverse', 'Power Automate'], icon: 'workflow' },
  { number: '03', type: 'AI / Integration', title: 'Data-grounded Agent Prototypes', description: 'Exploring secure integration patterns between agent experiences, enterprise data sources and low-code front ends.', tags: ['Azure AI', 'Databricks', 'Logic Apps'], icon: 'network' },
  { number: '04', type: 'Automation / Scale', title: 'Document Processing at Scale', description: 'Automating document conversion and orchestration with operational visibility and exception handling.', tags: ['Power Automate', 'SharePoint', 'Integration'], icon: 'files' },
];
