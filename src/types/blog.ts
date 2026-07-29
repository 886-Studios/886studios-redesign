export type BlogPostSource = "local" | "substack";

export interface BlogPost {
  source: BlogPostSource;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  readingMinutes: number;
  substackUrl?: string;
  contentHtml?: string;
  localEntryId?: string;
}
