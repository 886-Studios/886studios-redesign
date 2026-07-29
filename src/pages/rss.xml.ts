import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { siteConfig } from "../config/site";
import { getBlogPosts } from "../lib/blog";
import { pageMeta } from "../lib/seo";
import { blogConfig } from "../lib/substack";

const feedPath = "/rss.xml";
const feedTitle = "886 Studios Blog";
const atomNamespace = "http://www.w3.org/2005/Atom";
const creatorNamespace = "http://purl.org/dc/elements/1.1/";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getBlogPosts();
  const feedUrl = new URL(feedPath, site ?? siteConfig.url).toString();
  const latestPublishedAt = posts.at(0)?.publishedAt;
  const channelData = [
    "<language>en-us</language>",
    `<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>`,
    latestPublishedAt
      ? `<lastBuildDate>${new Date(latestPublishedAt).toUTCString()}</lastBuildDate>`
      : "",
  ].join("");

  return rss({
    title: feedTitle,
    description: pageMeta.blog.description,
    site: site ?? siteConfig.url,
    trailingSlash: false,
    xmlns: {
      atom: atomNamespace,
      dc: creatorNamespace,
    },
    customData: channelData,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: new Date(post.publishedAt),
      link: `/blog/${post.slug}`,
      customData: `<dc:creator>${escapeXml(post.author)}</dc:creator>`,
      ...(post.source === "substack"
        ? {
            source: {
              title: blogConfig.publicationName,
              url: blogConfig.feedUrl,
            },
          }
        : {}),
    })),
  });
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
