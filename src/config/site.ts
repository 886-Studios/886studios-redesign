export const siteConfig = {
  name: "886 Studios",
  url: "https://886studios.com",
  defaultTitle: "886 Studios",
  defaultDescription: "Newsletter →",
  defaultOgImage:
    "https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/a3afedd0-7225-4cad-930f-bc3e1d574804/886_banner/public",
  ogImageAlt: "886 Studios",
  locale: "en-US",
  twitterSite: "@886Studios",
  themeColor: "#050507",
  googleAnalyticsFallbackId: "G-HWJ420T1HT",
} as const;

interface RouteImagePreload {
  href: string;
  type?: string;
  srcset?: string;
  sizes?: string;
}

const routeImagePreloads: Record<string, RouteImagePreload[]> = {
  "/": [
    {
      href: "/assets/hero/sf-tpe-hero.jpg",
    },
  ],
  "/programs": [
    {
      href: "/assets/programs/ikigai-audience-theater-1280.webp",
      type: "image/webp",
      srcset:
        "/assets/programs/ikigai-audience-theater-1280.webp 1280w, /assets/programs/ikigai-audience-theater-1920.webp 1920w",
      sizes: "(max-width: 640px) calc(100vw - 36px), min(calc(100vw - 48px), 1160px)",
    },
  ],
};

export function normalizePath(pathname: string) {
  return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
}

export function getCanonicalUrl(pathname: string) {
  const currentPath = normalizePath(pathname);
  return currentPath === "/" ? siteConfig.url : `${siteConfig.url}${currentPath}`;
}

export function getRouteImagePreloads(pathname: string) {
  return routeImagePreloads[normalizePath(pathname)] ?? [];
}

export function getGoogleAnalyticsId() {
  return import.meta.env.PUBLIC_GA_MEASUREMENT_ID || siteConfig.googleAnalyticsFallbackId;
}
