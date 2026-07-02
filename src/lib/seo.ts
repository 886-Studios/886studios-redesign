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
const contentModified = "2026-07-02";

export const pageMeta = {
  home: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
  },
  programs: {
    title: "Programs - 886 Studios",
    description:
      "ikigai Launchpad is 886 Studios' 12-week in-person Taipei accelerator with $100K USD, weekly mentor office hours, investor intros, and founder community.",
  },
  launchStation: {
    title: "Launch Station - 886 Studios",
    description:
      "Launch Station is 886 Studios' free dedicated desk and founder community program inside Taiwan Tech Arena.",
    ogImage: `${siteConfig.url}/assets/programs/launch-station-community-collage.jpg`,
    ogImageAlt: "Launch Station founder community collage",
    ogImageWidth: 800,
    ogImageHeight: 800,
    ogImageType: "image/jpeg",
  },
  about: {
    title: "About - 886 Studios",
    description:
      "886 Studios is built by founders and partners behind Twitch, Kabam, Guitar Hero, Playdom, Orbit Baby, HTC Vive, and other global companies.",
  },
  events: {
    title: "Events - 886 Studios",
    description:
      "Meet 886 Studios through Taipei founder meetups, workshops, demo days, and community events for early-stage startups.",
  },
  portfolio: {
    title: "Portfolio - 886 Studios",
    description:
      "Explore startups backed by 886 Studios and partner-backed companies connected to the 886 Studios founder network.",
  },
  resources: {
    title: "Resources - 886 Studios",
    description:
      "Founder guides from 886 Studios covering accelerator applications, incorporation, Taiwan startup ecosystem resources, interviews, and fundraising advice.",
  },
  contact: {
    title: "Contact - 886 Studios",
    description:
      "Contact 886 Studios about founder programs, ikigai Launchpad, Launch Station, partnerships, events, or startup community support in Taipei.",
  },
} as const;

export function getAbsoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return new URL(value, `${siteConfig.url}/`).toString();
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
  return getMetaDescription(profile.profile.map(profileParagraphToText).join(" "));
}

export function getResourceDescription(article: ResourceArticle) {
  const firstSection = article.sections?.[0];
  const firstDirectoryGroup = article.directoryGroups?.[0];
  const candidate =
    article.intro ??
    firstSection?.paragraphs?.[0] ??
    firstSection?.list?.[0] ??
    firstSection?.cards?.find((card) => card.body)?.body ??
    firstDirectoryGroup?.entries?.[0]?.focus ??
    `${article.title} from 886 Studios Resources.`;

  return getMetaDescription(`${article.title}: ${candidate}`);
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
      "Startup accelerator",
      "Venture studio",
      "Early-stage startups",
      "Founder mentorship",
      "Taiwan startup ecosystem",
      "Silicon Valley operator network",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Founder and partnership inquiries",
      url: `${siteConfig.url}/contact`,
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
  };
}

export function getProgramSchema(): JsonLdObject {
  const [ikigai] = siteContent.programs.items;

  return {
    "@type": "Service",
    "@id": `${siteConfig.url}/programs#ikigai-launchpad`,
    name: ikigai.name,
    serviceType: "Startup accelerator",
    url: `${siteConfig.url}/programs`,
    provider: { "@id": organizationId },
    areaServed: {
      "@type": "Place",
      name: "Taipei, Taiwan",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Early-stage startup founders",
    },
    description: pageMeta.programs.description,
    additionalProperty: (ikigai.details?.metrics ?? []).map((metric) => ({
      "@type": "PropertyValue",
      name: metric.label,
      value: metric.note ? `${metric.value} - ${metric.note}` : metric.value,
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
    "886 Studios portfolio companies",
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
    memberOf: { "@id": organizationId },
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

export function getEventsCollectionSchema(): JsonLdObject {
  return {
    "@type": "EventSeries",
    "@id": `${siteConfig.url}/events#events`,
    name: "886 Studios events",
    url: `${siteConfig.url}/events`,
    description: pageMeta.events.description,
    organizer: { "@id": organizationId },
    location: {
      "@type": "Place",
      name: "Taipei, Taiwan",
    },
  };
}

export function getPersonSchema(profile: PartnerProfile): JsonLdObject {
  const pageUrl = `${siteConfig.url}/about/${profile.slug}`;

  return {
    "@type": "Person",
    "@id": `${pageUrl}#person`,
    name: profile.name,
    url: pageUrl,
    image: getAbsoluteUrl(profile.photo),
    jobTitle: getOperatingRole(profile.name),
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
    mainEntityOfPage: canonicalUrl,
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    inLanguage: siteConfig.locale,
    dateModified: contentModified,
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

  return {
    "@type": options.pageType ?? "WebPage",
    "@id": getPageFragmentId(options.path, "webpage"),
    url: canonicalUrl,
    name: options.title,
    description: options.description,
    inLanguage: siteConfig.locale,
    isPartOf: { "@id": websiteId },
    publisher: { "@id": organizationId },
    dateModified: contentModified,
    image: options.image
      ? {
          "@type": "ImageObject",
          url: getAbsoluteUrl(options.image.url),
          caption: options.image.alt,
          width: options.image.width,
          height: options.image.height,
        }
      : undefined,
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
