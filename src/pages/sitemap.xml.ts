import type { APIRoute } from "astro";
import { siteConfig } from "../config/site";
import { partnerProfiles } from "../data/partnerProfiles";
import { portfolioCompanies } from "../data/siteContent";
import { resourceArticles, standaloneResourceArticles } from "../data/resourceArticles";
import { getBlogPosts } from "../lib/blog";
import { pageMeta } from "../lib/seo";

const staticRoutes = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
    lastmod: pageMeta.home.dateModified,
  },
  { path: "/programs", priority: "0.9", changefreq: "weekly" },
  { path: "/programs/launch-station", priority: "0.7", changefreq: "monthly" },
  { path: "/about", priority: "0.9", changefreq: "monthly" },
  { path: "/events", priority: "0.7", changefreq: "daily" },
  { path: "/portfolio", priority: "0.7", changefreq: "weekly" },
  { path: "/resources", priority: "0.8", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
];

const profileRoutes = partnerProfiles.map((profile) => ({
  path: `/about/${profile.slug}`,
  priority: "0.5",
  changefreq: "monthly",
}));

const resourceRoutes = resourceArticles.map((article) => ({
  path: `/resources/${article.slug}`,
  priority: "0.6",
  changefreq: "monthly",
}));

const portfolioRoutes = portfolioCompanies.map((company) => ({
  path: `/portfolio/${company.slug}`,
  priority: "0.5",
  changefreq: "monthly",
}));

const standaloneResourceRoutes = standaloneResourceArticles.map((article) => ({
  path: `/${article.slug}`,
  priority: "0.6",
  changefreq: "monthly",
}));

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const getAbsoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

export const GET: APIRoute = async () => {
  const blogPosts = await getBlogPosts();
  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: "0.6",
    changefreq: "monthly",
  }));
  const routes = [
    ...staticRoutes,
    ...profileRoutes,
    ...portfolioRoutes,
    ...resourceRoutes,
    ...standaloneResourceRoutes,
    ...blogRoutes,
  ];
  const urls = routes
    .map((route) => {
      const lastmod =
        "lastmod" in route && typeof route.lastmod === "string"
          ? `<lastmod>${escapeXml(route.lastmod)}</lastmod>`
          : "";

      return `  <url><loc>${escapeXml(getAbsoluteUrl(route.path))}</loc>${lastmod}<changefreq>${route.changefreq}</changefreq><priority>${route.priority}</priority></url>`;
    })
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
