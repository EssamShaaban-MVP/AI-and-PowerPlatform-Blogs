// Community impact numbers shown as KPI cards on the Home page.
//
// The article count is calculated automatically from the site's own content.
// The figures below can't be derived from the site, so fill in your real numbers: a card appears only
// when its value is set (a number). Leave a value as `null` to hide that card.
export const impact = {
  articleViews: 9384 as number | null,       // total reads across your articles (e.g. from Blogger / Search Console / Analytics)
  eventsOrganized: 9 as number | null,    // community events, user groups or meetups you organized
  speakingSessions: 11 as number | null,   // events where you were a speaker
  // Any extra cards, e.g. { value: 1200, suffix: '+', label: 'Community members', note: 'Power Platform user group', icon: 'users' }
  extra: [] as { value: number; suffix?: string; label: string; note?: string; icon?: string }[],
};
