import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    category: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    vimeoId: z.string(),
    vimeoHash: z.string().optional().default(''),
    thumbnail: z.string(),
    featured: z.boolean().optional().default(false),
    orientation: z.enum(['horizontal', 'vertical']).optional().default('horizontal'),
    status: z.enum(['live', 'in-progress', 'planned']).optional().default('live'),
  }),
});

export const collections = { projects };
