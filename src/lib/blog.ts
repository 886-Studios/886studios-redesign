import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export function sortBlogPosts(posts: BlogPost[]) {
  return [...posts].sort(
    (left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
  );
}

export function getBlogPostPath(post: BlogPost) {
  return `/blog/${post.id}`;
}

export function formatBlogDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function getBlogPostTitle(post: BlogPost) {
  return `${post.data.title} | 886 Studios`;
}
