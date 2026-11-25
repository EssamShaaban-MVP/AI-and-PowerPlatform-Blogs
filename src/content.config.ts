import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(), description: z.string(), date: z.coerce.date(),
    category: z.string(), cover: z.string().optional(),
    // Optional clickable areas over the cover image (percent of the image), e.g. a roadmap whose cards link out.
    coverLinks: z.array(z.object({ label: z.string(), href: z.string().url(), left: z.number(), top: z.number(), width: z.number(), height: z.number() })).optional(), tags: z.array(z.string()).default([]),
    readingMinutes: z.number().optional(), draft: z.boolean().default(false),
  }),
});
export const collections = { blog };
