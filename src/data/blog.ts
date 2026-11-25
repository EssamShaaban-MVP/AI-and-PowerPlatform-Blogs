// Helpers shared by the blog pages and components.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Site-relative path -> URL that works under the GitHub Pages base path. */
export const withBase = (path: string) => base + path;

export const postUrl = (id: string) => `${base}/blog/${id}/`;

/**
 * Cover image for an article: the `cover` set in its frontmatter (a file under /public/blog-images),
 * otherwise the generated share image for that article (`npm run og`).
 */
export const coverSrc = (post: { id: string; data: { cover?: string } }) => withBase(post.data.cover ?? `/og/blog/${post.id}.jpg`);
