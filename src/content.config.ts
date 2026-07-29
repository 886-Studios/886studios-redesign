import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.md",
    generateId: ({ entry, data }) => {
      const filename = entry.replace(/\.md$/i, "").split("/").at(-1) ?? "";
      const requestedSlug = typeof data.slug === "string" ? data.slug : filename;
      const slug = requestedSlug
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      if (!slug) {
        throw new Error(`Could not generate a blog slug for ${entry}`);
      }

      return slug;
    },
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().min(1).default("886 Studios"),
    slug: z.string().regex(/^[a-z0-9_-]+$/).optional(),
    image: z.string().min(1).optional(),
    imageAlt: z.string().default(""),
    imageWidth: z.number().int().positive().optional(),
    imageHeight: z.number().int().positive().optional(),
    substackUrl: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
