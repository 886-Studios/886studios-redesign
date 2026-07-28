import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(50).max(180),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default("886 Studios"),
    category: z.string(),
    readingMinutes: z.number().int().positive(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z.object({
      src: z.string(),
      alt: z.string(),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    }),
  }),
});

export const collections = { blog };
