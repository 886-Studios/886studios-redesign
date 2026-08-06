export const applicationUrl = "https://tally.so/r/w5p4jQ";

export const siteConfig = {
  name: "886 Studios",
  url: "https://www.886studios.com",
  defaultTitle: "886 Studios | Taipei Startup Accelerator",
  defaultDescription:
    "886 Studios is a Taipei-based venture firm and startup accelerator helping ambitious founders build global technology companies through funding, mentorship, and ikigai Launchpad.",
  defaultOgImage: "https://www.886studios.com/assets/hero/sf-tpe-hero.jpg",
  defaultOgImageWidth: 1774,
  defaultOgImageHeight: 887,
  defaultOgImageType: "image/jpeg",
  ogImageAlt: "886 Studios founder community connecting Taipei and Silicon Valley",
  locale: "en-US",
  ogLocale: "en_US",
  twitterSite: "@886Studios",
  themeColor: "#050507",
  googleAnalyticsFallbackId: "G-HWJ420T1HT",
} as const;

export interface SearchEngineVerification {
  google?: string;
  bing?: string;
  yandex?: string;
  baidu?: string;
}

// Search verification tokens are public by design. Keep the production Google
// token as a fallback so ownership survives deployments from environments that
// do not share the locally linked Vercel project's variables.
const googleSiteVerificationFallback = "YIlkZaBUMZkiKjEm8Ph2VZhitwzzs1zxCCQv97WduDg";

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
  return currentPath === "/" ? `${siteConfig.url}/` : `${siteConfig.url}${currentPath}`;
}

export function getRouteImagePreloads(pathname: string) {
  return routeImagePreloads[normalizePath(pathname)] ?? [];
}

export function getGoogleAnalyticsId() {
  return siteConfig.googleAnalyticsFallbackId;
}

export function getSearchEngineVerification(): SearchEngineVerification {
  const getToken = (value: string | undefined) => value?.trim() || undefined;

  return {
    google: getToken(import.meta.env.GOOGLE_SITE_VERIFICATION) ?? googleSiteVerificationFallback,
    bing: getToken(import.meta.env.BING_SITE_VERIFICATION),
    yandex: getToken(import.meta.env.YANDEX_SITE_VERIFICATION),
    baidu: getToken(import.meta.env.BAIDU_SITE_VERIFICATION),
  };
}
