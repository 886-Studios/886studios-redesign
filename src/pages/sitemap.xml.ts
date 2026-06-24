import type { APIRoute } from "astro";
import { siteConfig } from "../config/site";
import { partnerProfiles } from "../data/partnerProfiles";
import { resourceArticles, standaloneResourceArticles } from "../data/resourceArticles";

const staticRoutes = [
  { path: "/", priority: "1.0" },
  { path: "/programs", priority: "0.9" },
  { path: "/programs/launch-station", priority: "0.7" },
  { path: "/about", priority: "0.9" },
  { path: "/events", priority: "0.7" },
  { path: "/resources", priority: "0.8" },
  { path: "/contact", priority: "0.6" },
];

const profileRoutes = partnerProfiles.map((profile) => ({
  path: `/about/${profile.slug}`,
  priority: "0.5",
}));

const resourceRoutes = resourceArticles.map((article) => ({
  path: `/resources/${article.slug}`,
  priority: "0.6",
}));

const standaloneResourceRoutes = standaloneResourceArticles.map((article) => ({
  path: `/${article.slug}`,
  priority: "0.6",
}));

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const getAbsoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

export const GET: APIRoute = () => {
  const routes = [...staticRoutes, ...profileRoutes, ...resourceRoutes, ...standaloneResourceRoutes];
  const urls = routes
    .map(
      (route) =>
        `  <url><loc>${escapeXml(getAbsoluteUrl(route.path))}</loc><priority>${route.priority}</priority></url>`
    )
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
