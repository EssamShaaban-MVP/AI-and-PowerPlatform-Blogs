// RSS feed for technical articles: <base>/rss.xml
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const home = new URL(`${base}/`, context.site).href;
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: 'Essam Shaaban — Technical Blog',
    description: 'Hands-on notes on Microsoft Foundry, agentic AI, Power Platform, and secure integration.',
    site: home,
    trailingSlash: true,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<language>en-us</language><atom:link href="${new URL(`${base}/rss.xml`, context.site).href}" rel="self" type="application/rss+xml"/>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: new URL(`${base}/blog/${post.id}/`, context.site).href,
      categories: [post.data.category, ...post.data.tags],
      author: 'Essam Shaaban',
    })),
  });
}
