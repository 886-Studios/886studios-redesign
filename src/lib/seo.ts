import { getCanonicalUrl, siteConfig } from "../config/site";
import { partnerProfiles, type PartnerProfile } from "../data/partnerProfiles";
import {
  brand,
  portfolioCompanies,
  siteContent,
  socialLinks,
  type PortfolioCompany,
} from "../data/siteContent";
import type { ResourceArticle } from "../data/resourceArticles";
import type { LumaEventCard } from "./luma";

export type JsonLdPrimitive = string | number | boolean | null;
export type JsonLdValue = JsonLdPrimitive | JsonLdObject | JsonLdValue[];

export interface JsonLdObject {
  [key: string]: JsonLdValue | undefined;
}

export type PageSchemaType = string | string[];

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface StructuredDataOptions {
  path: string;
  title: string;
  description: string;
  pageType?: PageSchemaType;
  breadcrumbs?: BreadcrumbItem[];
  additionalSchema?: JsonLdObject | JsonLdObject[];
  image?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

export const pageMeta = {
  home: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
  },
  programs: {
    title: "ikigai Launchpad Taipei Accelerator | 886 Studios",
    description:
      "ikigai Launchpad is 886 Studios' 10-week, in-person Taipei accelerator with a standard $100K-for-8% SAFE, weekly mentor office hours, and investor access.",
    ogImage: `${siteConfig.url}/assets/programs/ikigai-launchpad-fall-2026-applications-open.png`,
    ogImageAlt:
      "ikigai Launchpad Fall 2026 applications are open: $100K, 10 weeks, Taipei",
    ogImageWidth: 1254,
    ogImageHeight: 1254,
    ogImageType: "image/png",
  },
  launchStation: {
    title: "Launch Station Founder Coworking in Taipei | 886 Studios",
    description:
      "Launch Station is 886 Studios' free dedicated desk and founder community program inside Taiwan Tech Arena.",
    ogImage: `${siteConfig.url}/assets/programs/launch-station-community-collage-2026.jpg`,
    ogImageAlt: "Launch Station founder community collage",
    ogImageWidth: 800,
    ogImageHeight: 800,
    ogImageType: "image/jpeg",
  },
  about: {
    title: "About Our Team and Venture Firm | 886 Studios",
    description:
      "886 Studios is built by founders and partners behind Twitch, Kabam, Guitar Hero, Playdom, Orbit Baby, HTC Vive, and other global companies.",
  },
  events: {
    title: "Startup Events in Taipei | 886 Studios",
    description:
      "Meet 886 Studios through Taipei founder meetups, workshops, demo days, and community events for early-stage startups.",
  },
  portfolio: {
    title: "Startup Portfolio | 886 Studios",
    description:
      "Explore startups backed by 886 Studios and partner-backed companies connected to the 886 Studios founder network.",
  },
  resources: {
    title: "Startup Resources for Founders | 886 Studios",
    description:
      "Founder guides from 886 Studios covering accelerator applications, incorporation, Taiwan startup ecosystem resources, interviews, and fundraising advice.",
  },
  blog: {
    title: "Blog and Startup Insights | 886 Studios",
    description:
      "Read ikigai Insights from 886 Studios: founder perspectives, startup lessons, technology stories, and updates from the Taiwan startup ecosystem.",
  },
  contact: {
    title: "Contact | 886 Studios",
    description:
      "Contact 886 Studios about founder programs, ikigai Launchpad, Launch Station, partnerships, events, or startup community support in Taipei.",
  },
  privacy: {
    title: "Privacy Notice | 886 Studios",
    description:
      "Learn how 886 Studios handles information collected through its website, program applications, newsletter subscriptions, analytics, and communications.",
  },
} as const;

export function getAbsoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return new URL(value, `${siteConfig.url}/`).toString();
}

export function getImageMimeType(value: string) {
  const pathname = value.split(/[?#]/, 1)[0]?.toLowerCase() ?? "";

  if (pathname.endsWith(".avif")) return "image/avif";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".webp")) return "image/webp";
  if (pathname.endsWith(".gif")) return "image/gif";
  if (pathname.endsWith(".svg")) return "image/svg+xml";

  return undefined;
}

export function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function getMetaDescription(value: string, maxLength = 170) {
  const text = cleanText(value);
  if (text.length <= maxLength) return text;

  const trimmed = text.slice(0, maxLength - 1);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 120 ? lastSpace : trimmed.length).trim()}...`;
}

export function getPortfolioDescription(company: PortfolioCompany) {
  return getMetaDescription(company.description);
}

export function getProfileDescription(profile: PartnerProfile) {
  const profileText = cleanText(profile.profile.map(profileParagraphToText).join(" "));
  if (profileText) return getMetaDescription(profileText);

  const operatingRole = getOperatingRole(profile.name);
  const fallback = operatingRole
    ? `${profile.name} is the ${operatingRole} at 886 Studios in Taipei.`
    : `${profile.name} is a partner at 886 Studios associated with ${profile.company}.`;

  return getMetaDescription(fallback);
}

export function getResourceDescription(article: ResourceArticle) {
  const firstSection = article.sections?.[0];
  const firstDirectoryGroup = article.directoryGroups?.[0];
  const genericPartnerIntro = article.intro?.startsWith("We asked ");
  const candidate =
    (genericPartnerIntro && firstSection?.title
      ? `${firstSection.title} Read perspectives from 886 Studios partners.`
      : article.intro) ??
    firstSection?.paragraphs?.[0] ??
    firstSection?.list?.[0] ??
    firstSection?.cards?.find((card) => card.body)?.body ??
    firstDirectoryGroup?.entries?.[0]?.focus ??
    `${article.title} from 886 Studios Resources.`;

  return getMetaDescription(`${article.title}: ${candidate}`);
}

export function getResourcePageTitle(article: ResourceArticle) {
  const optimizedTitles: Record<string, string> = {
    "y-combinator-101": "Y Combinator (YC) Application Guide | 886 Studios",
    "application-guide": "Startup Accelerator Application Guide | 886 Studios",
    "ecosystem-database": "Taiwan Startup Ecosystem Database | 886 Studios",
    "founders-frequently-asked-questions": "Startup Founder FAQs | 886 Studios",
    "incorporation-101": "Startup Incorporation Guide | 886 Studios",
    "interview-guidebook": "Startup Accelerator Interview Guide | 886 Studios",
  };

  return optimizedTitles[article.slug] ?? `${article.title} | 886 Studios`;
}

export function getStructuredDataGraph(options: StructuredDataOptions) {
  const graph: JsonLdObject[] = [
    getOrganizationSchema(),
    getWebsiteSchema(),
    getWebPageSchema(options),
  ];

  if (options.breadcrumbs?.length) {
    graph.push(getBreadcrumbSchema(options.breadcrumbs, options.path));
  }

  const additional = Array.isArray(options.additionalSchema)
    ? options.additionalSchema
    : options.additionalSchema
      ? [options.additionalSchema]
      : [];

  graph.push(...additional.filter(Boolean));

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function getOrganizationSchema(): JsonLdObject {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.defaultDescription,
    logo: {
      "@type": "ImageObject",
      url: getAbsoluteUrl(brand.logoUrl),
      width: brand.logoWidth,
      height: brand.logoHeight,
      caption: brand.logoAlt,
    },
    sameAs: socialLinks.map((link) => link.href),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Taipei",
      addressCountry: "TW",
    },
    areaServed: ["Taiwan", "Silicon Valley", "Global"],
    knowsAbout: [
      "Startup accelerator in Taipei",
      "Venture capital",
      "Early-stage startup funding in Taiwan",
      "Global startup founders",
      "Early-stage startups",
      "Founder mentorship",
      "Taiwan startup ecosystem",
      "Silicon Valley operator network",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Founder and partnership inquiries",
      url: `${siteConfig.url}/contact`,
      availableLanguage: "English",
    },
    brand: {
      "@type": "Brand",
      "@id": `${siteConfig.url}/programs#ikigai-brand`,
      name: "ikigai Launchpad",
      url: `${siteConfig.url}/programs`,
    },
  };
}

export function getWebsiteSchema(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.defaultDescription,
    inLanguage: siteConfig.locale,
    publisher: { "@id": organizationId },
    copyrightHolder: { "@id": organizationId },
  };
}

export function getProgramSchema(): JsonLdObject {
  const { launchpad } = siteContent.programs;
  const programUrl = `${siteConfig.url}/programs`;

  return {
    "@type": "Service",
    "@id": `${siteConfig.url}/programs#ikigai-launchpad`,
    name: launchpad.name,
    serviceType: "Startup accelerator",
    category: "Early-stage startup accelerator program",
    url: programUrl,
    mainEntityOfPage: { "@id": getPageFragmentId("/programs", "webpage") },
    provider: { "@id": organizationId },
    areaServed: {
      "@type": "Place",
      name: "Taipei, Taiwan",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Early-stage startup founders from Taiwan and around the world",
    },
    image: {
      "@type": "ImageObject",
      url: pageMeta.programs.ogImage,
      width: pageMeta.programs.ogImageWidth,
      height: pageMeta.programs.ogImageHeight,
      caption: pageMeta.programs.ogImageAlt,
    },
    brand: { "@id": `${siteConfig.url}/programs#ikigai-brand` },
    sameAs: socialLinks
      .filter((link) => ["instagram", "threads"].includes(link.platform))
      .map((link) => link.href),
    description: pageMeta.programs.description,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: programUrl,
      availableLanguage: "English",
      serviceLocation: {
        "@type": "Place",
        name: "Taipei, Taiwan",
      },
    },
    potentialAction: {
      "@type": "ApplyAction",
      name: launchpad.cta.label,
      object: { "@id": `${siteConfig.url}/programs#ikigai-launchpad` },
      target: {
        "@type": "EntryPoint",
        urlTemplate: launchpad.cta.href,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Standard investment terms",
        value: "$100,000 USD investment for 8% through a SAFE",
      },
      ...launchpad.facts.map((fact) => ({
        "@type": "PropertyValue",
        name: fact.label,
        value: fact.note ? `${fact.value}: ${fact.note}` : fact.value,
      })),
    ],
  };
}

export function getProgramFaqSchema(): JsonLdObject {
  return {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/programs#faq`,
    url: `${siteConfig.url}/programs#faq`,
    mainEntity: siteContent.programs.launchpad.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getLaunchStationSchema(): JsonLdObject {
  const launchStation = siteContent.programs.launchStation;

  return {
    "@type": "Service",
    "@id": `${siteConfig.url}/programs/launch-station#launch-station`,
    name: launchStation.title,
    serviceType: "Founder coworking and community program",
    url: `${siteConfig.url}/programs/launch-station`,
    mainEntityOfPage: { "@id": getPageFragmentId("/programs/launch-station", "webpage") },
    provider: { "@id": organizationId },
    areaServed: {
      "@type": "Place",
      name: "Taiwan Tech Arena, Taipei",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Early-stage founders in Taipei",
    },
    description: pageMeta.launchStation.description,
    additionalProperty: launchStation.essentials.map((item) => ({
      "@type": "PropertyValue",
      name: item.label,
      value: item.value,
    })),
  };
}

export function getPortfolioItemListSchema() {
  const companies = [...portfolioCompanies].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base", ignorePunctuation: true }),
  );

  return getItemListSchema(
    `${siteConfig.url}/portfolio#portfolio-companies`,
    "886 Studios portfolio and partner-backed companies",
    companies.map((company) => ({
      name: company.name,
      url: `${siteConfig.url}/portfolio/${company.slug}`,
    })),
  );
}

export function getPortfolioCompanySchema(company: PortfolioCompany): JsonLdObject {
  const pageUrl = `${siteConfig.url}/portfolio/${company.slug}`;
  const additionalProperty: JsonLdObject[] = [
    {
      "@type": "PropertyValue",
      name: "Relationship",
      value:
        company.relationship === "886-backed"
          ? "Backed by 886 Studios"
          : "Backed by an 886 Studios partner",
    },
    {
      "@type": "PropertyValue",
      name: "Category",
      value: company.category,
    },
  ];

  if (company.program) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Program",
      value: company.program,
    });
  }

  if (company.status) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Status",
      value: company.status,
    });
  }

  return {
    "@type": "Organization",
    "@id": `${pageUrl}#portfolio-company`,
    name: company.name,
    url: company.websiteUrl,
    mainEntityOfPage: { "@id": getPageFragmentId(`/portfolio/${company.slug}`, "webpage") },
    sameAs: company.websiteUrl ? [company.websiteUrl] : undefined,
    description: getPortfolioDescription(company),
    logo: {
      "@type": "ImageObject",
      url: getAbsoluteUrl(company.logo.src),
      width: company.logo.width,
      height: company.logo.height,
      caption: company.logo.alt,
    },
    founder: company.founders?.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      sameAs: [founder.linkedinUrl, founder.xUrl].filter((value): value is string => Boolean(value)),
    })),
    additionalProperty,
  };
}

export function getResourcesItemListSchema() {
  return getItemListSchema(
    `${siteConfig.url}/resources#resource-library`,
    "886 Studios founder resource library",
    siteContent.resources.libraryItems.map((item) => ({
      name: item.title,
      url: getAbsoluteUrl(item.href),
    })),
  );
}

export function getEventsStructuredData(events: LumaEventCard[]): JsonLdObject[] {
  const eventSchemas = events.flatMap((event) => {
    if (!event.url) return [];

    const location = event.isOnline
      ? {
          "@type": "VirtualLocation",
          url: event.url,
        }
      : event.locationName && event.locationName !== "Location TBD"
        ? {
            "@type": "Place",
            name: event.locationName,
          }
        : undefined;

    if (!location) return [];

    const eventId = `${siteConfig.url}/events#event-${event.id.replace(/[^a-zA-Z0-9_-]+/g, "-")}`;

    return [{
      "@type": "Event",
      "@id": eventId,
      name: event.title,
      startDate: event.startAt,
      endDate: event.endAt,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: event.isOnline
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
      location,
      image: event.coverUrl ? [event.coverUrl] : undefined,
      url: event.url,
    } satisfies JsonLdObject];
  });

  const eventList = getItemListSchema(
    `${siteConfig.url}/events#events`,
    "886 Studios events",
    events.map((event) => ({ name: event.title, url: event.url })),
  );

  return [eventList, ...eventSchemas];
}

export function getPersonSchema(profile: PartnerProfile): JsonLdObject {
  const pageUrl = `${siteConfig.url}/about/${profile.slug}`;

  return {
    "@type": "Person",
    "@id": `${pageUrl}#person`,
    name: profile.name,
    url: pageUrl,
    mainEntityOfPage: { "@id": getPageFragmentId(`/about/${profile.slug}`, "webpage") },
    image: getAbsoluteUrl(profile.photo),
    jobTitle: getPersonRole(profile.name),
    description: getProfileDescription(profile),
    affiliation: { "@id": organizationId },
    sameAs: profile.socials?.map((link) => link.href),
    knowsAbout: [getVisibleRole(profile.name), ...profile.companiesBuilt].filter(
      (value): value is string => Boolean(value),
    ),
  };
}

export function getPeopleItemListSchema() {
  const visiblePeople = [
    ...siteContent.about.team.map((person) => ({
      name: person.name,
      role: person.role,
      url: getProfileUrl(person.name),
    })),
    ...siteContent.about.partners.map((person) => ({
      name: person.name,
      role: person.company,
      url: getProfileUrl(person.name),
    })),
  ];

  return getItemListSchema(
    `${siteConfig.url}/about#people`,
    "886 Studios operating team and partners",
    visiblePeople.map((person) => ({
      name: person.role ? `${person.name}, ${person.role}` : person.name,
      url: person.url,
    })),
  );
}

export function getResourceArticleSchema(article: ResourceArticle, path: string): JsonLdObject {
  const canonicalUrl = getCanonicalUrl(path);
  const description = getResourceDescription(article);

  return {
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: article.title,
    description,
    url: canonicalUrl,
    mainEntityOfPage: { "@id": getPageFragmentId(path, "webpage") },
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
    isAccessibleForFree: true,
    inLanguage: siteConfig.locale,
    about: getArticleTopics(article),
  };
}

export function getResourceFaqSchema(article: ResourceArticle, path: string): JsonLdObject | undefined {
  const mainEntity: JsonLdObject[] = [];

  article.sections
    ?.filter((section) => section.title.includes("?"))
    .forEach((section) => {
      const answerText = section.cards
        ?.filter((card) => card.body)
        .map((card) => `${card.title}${card.meta ? ` (${card.meta})` : ""}: ${card.body}`)
        .join(" ");

      if (!answerText) return;

      mainEntity.push({
        "@type": "Question",
        name: cleanText(section.title),
        acceptedAnswer: {
          "@type": "Answer",
          text: cleanText(answerText),
        },
      });
    });

  if (mainEntity.length === 0) return undefined;

  const canonicalUrl = getCanonicalUrl(path);

  return {
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#faq`,
    mainEntity,
  };
}

function getWebPageSchema(options: StructuredDataOptions): JsonLdObject {
  const canonicalUrl = getCanonicalUrl(options.path);
  const primaryImage = options.image
    ? {
        "@type": "ImageObject",
        "@id": getPageFragmentId(options.path, "primaryimage"),
        url: getAbsoluteUrl(options.image.url),
        contentUrl: getAbsoluteUrl(options.image.url),
        caption: options.image.alt,
        width: options.image.width,
        height: options.image.height,
      }
    : undefined;

  return {
    "@type": options.pageType ?? "WebPage",
    "@id": getPageFragmentId(options.path, "webpage"),
    url: canonicalUrl,
    name: options.title,
    description: options.description,
    inLanguage: siteConfig.locale,
    isPartOf: { "@id": websiteId },
    publisher: { "@id": organizationId },
    about: { "@id": organizationId },
    isAccessibleForFree: true,
    image: primaryImage,
    primaryImageOfPage: primaryImage,
    breadcrumb: options.breadcrumbs?.length
      ? { "@id": getPageFragmentId(options.path, "breadcrumb") }
      : undefined,
  };
}

function getBreadcrumbSchema(items: BreadcrumbItem[], currentPath: string): JsonLdObject {
  const hasHome = items[0]?.path === "/";
  const allItems = hasHome ? items : [{ name: "Home", path: "/" }, ...items];

  return {
    "@type": "BreadcrumbList",
    "@id": getPageFragmentId(currentPath, "breadcrumb"),
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

function getItemListSchema(
  id: string,
  name: string,
  items: Array<{ name: string; url?: string }>,
): JsonLdObject {
  return {
    "@type": "ItemList",
    "@id": id,
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

function profileParagraphToText(paragraph: PartnerProfile["profile"][number]) {
  if (typeof paragraph === "string") return paragraph;
  return paragraph.map((segment) => (typeof segment === "string" ? segment : segment.text)).join("");
}

function getArticleTopics(article: ResourceArticle) {
  return (
    article.sections
      ?.slice(0, 8)
      .map((section) => section.title)
      .filter(Boolean) ?? []
  );
}

function getProfileUrl(name: string) {
  const profile = partnerProfiles.find((item) => item.name === name);
  return profile ? `${siteConfig.url}/about/${profile.slug}` : undefined;
}

function getOperatingRole(name: string) {
  return siteContent.about.team.find((person) => person.name === name)?.role;
}

function getPersonRole(name: string) {
  return getOperatingRole(name) ??
    (siteContent.about.partners.some((person) => person.name === name) ? "Partner" : undefined);
}

function getVisibleRole(name: string) {
  return (
    siteContent.about.team.find((person) => person.name === name)?.role ??
    siteContent.about.partners.find((person) => person.name === name)?.company
  );
}

function getPageFragmentId(path: string, fragment: string) {
  const canonicalUrl = getCanonicalUrl(path);
  const separator = canonicalUrl === siteConfig.url ? "/" : "";
  return `${canonicalUrl}${separator}#${fragment}`;
}
