# 886 Studios Website

Astro static site for 886 Studios. The codebase is intentionally small and structured for agentic maintenance: thin route files, page-level Astro components, shared site configuration, data-driven content, and isolated browser scripts.

## Prerequisites

- Node `22.12.0+`
- npm `9.6.5+`

This repo uses `package-lock.json`, so prefer npm over pnpm or yarn unless the package manager strategy changes.

## Quick Start

First-time local setup:

```bash
npm ci
cp .env.example .env
npm run dev
```

Open `http://127.0.0.1:4173/`. If port `4173` is already in use, Astro prints the alternate local URL in the terminal. Use that printed URL instead.

For day-to-day development after dependencies are installed:

```bash
npm run dev
```

Before handing work back or opening a PR, run:

```bash
npm run validate
```

This runs Astro and TypeScript diagnostics, creates the production build, and checks the
generated site for SEO regressions. A successful run ends with `SEO validation passed`.

To inspect the production build locally:

```bash
npm run build
npm run preview
```

Use the URL printed by Astro.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Astro dev server. |
| `npm run check` | Run Astro diagnostics and TypeScript checks. |
| `npm run build` | Build all static routes into `dist/`. |
| `npm run check:seo` | Validate metadata, schema, links, images, robots, and sitemap parity in an existing `dist/` build. |
| `npm run validate` | Run diagnostics, build the site, and run the SEO regression suite. |
| `npm run preview` | Serve the latest `dist/` build locally. |
| `npm run indexnow:dry-run` | Inspect the generated IndexNow submission without sending it. |
| `npm run indexnow` | Submit generated or explicitly provided production URLs to IndexNow. |

Use `npm install <package>` only when intentionally changing dependencies. For normal setup and CI-style installs, use `npm ci` so `package-lock.json` is respected exactly.

## Environment

Copy `.env.example` to `.env` for local configuration. Every supported variable is optional:

```bash
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
YANDEX_SITE_VERIFICATION=
BAIDU_SITE_VERIFICATION=
```

The four site-verification variables emit ownership meta tags when they are set. They are
normally configured in Vercel for production verification and are not needed for local work.

Do not commit `.env`, `.env.local`, or any `.env.*.local` file. These files are ignored by git and should hold local or deployment secrets only.

Google Analytics uses the production fallback ID in `src/config/site.ts`; there is no separate local analytics env var. Vercel Analytics renders only when Vercel sets `VERCEL=1`.

Shared conversion events are sent to both providers by `src/scripts/analytics.ts`. Trackable links and forms opt in with `data-analytics-event`, plus optional `data-analytics-placement` and `data-analytics-label` attributes. Do not put email addresses, names, form values, or other personal data in these attributes. Current funnel events are `program_interest`, `application_started`, `newsletter_signup`, `event_registration_started`, `event_details_opened`, `event_calendar_opened`, `founder_ama_opened`, `blog_post_opened`, `substack_publication_opened`, and `substack_post_opened`.

## Search indexing

The production site exposes:

- `https://www.886studios.com/robots.txt`
- `https://www.886studios.com/sitemap.xml`
- `https://www.886studios.com/llms.txt`
- `https://www.886studios.com/indexnow-key.txt`

After the initial production deployment or a site-wide content refresh, notify
IndexNow-compatible search engines with the full sitemap:

```bash
npm run build
npm run indexnow
```

Use `npm run indexnow:dry-run` to inspect the URL count and request configuration without
making a submission. The command reads canonical URLs from the generated sitemap, verifies
that the public key file is live, and submits the URL set to the shared IndexNow endpoint.

For routine releases, submit only URLs that were added, changed, redirected, or removed:

```bash
npm run indexnow -- \
  --url=https://www.886studios.com/resources/example \
  --url=https://www.886studios.com/old-page
```

Google Search Console, Bing Webmaster Tools, Yandex Webmaster, and Baidu Search Resource
Platform still require an owner account. Add any requested HTML meta verification token as a
production environment variable and redeploy:

```bash
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
YANDEX_SITE_VERIFICATION=
BAIDU_SITE_VERIFICATION=
```

Enter `https://www.886studios.com/sitemap.xml` in each webmaster dashboard after ownership
verification. Bing can also import the verified property and sitemap directly from Google
Search Console.

## Blog content

The Blog supports two sources that are merged by publication date during the static build:

- ikigai Insights posts imported from the Substack RSS feed;
- website-only Markdown articles stored in `src/content/blog/`.

To add a website-only article, copy `src/content/blog/local-article-template.md`, rename it to
the intended URL slug, replace the frontmatter and body, and set `draft: false`.

```md
---
title: "Article title"
description: "A concise description used on the Blog page and in search metadata."
publishedAt: 2026-07-28
author: "886 Studios"
image: "/assets/blog/article-image.jpg"
imageAlt: "A useful description of the image"
imageWidth: 1600
imageHeight: 900
draft: false
---

Write the article in Markdown here.
```

The filename becomes the URL by default, such as
`src/content/blog/founder-lessons.md` → `/blog/founder-lessons`. An optional `slug` field can
override the filename. Store article images in `public/assets/blog/`.

Local articles use the same Blog index and article design as Substack posts. They do not show
the “Originally published in ikigai Insights” footer unless an optional `substackUrl` is added.
If a local article and a Substack post share a slug, the local article takes precedence.
Drafts are excluded from builds, the sitemap, and the Blog index.

If the Substack feed is unreachable, invalid, or empty, the build fails to protect
published article URLs from being removed. Retry after the feed recovers; Vercel
keeps the previous successful production deployment live.

Newsletter forms open Substack's subscription page in a new tab with the entered
email prefilled. Substack handles confirmation and any signup errors.

## Deployment

The site is a static Astro build deployed on Vercel.

- Build command: `npm run build`
- Output directory: `dist/`
- Canonical site URL: `https://www.886studios.com`
- Redirects and security headers: `vercel.json`
- Optional production env vars: the four search-engine verification tokens listed above
- Production branch: pushes to `main` deploy through the connected Vercel project

The Events page is generated from `src/data/luma-events.json`; no Luma API key is required. The
`Sync Luma events` GitHub Actions workflow checks Luma's public calendar every 30 minutes, merges
new and updated events into the archive, and commits only when the event data changes. That commit
triggers the normal Vercel rebuild. Past events are retained permanently even after they fall out of
Luma's limited public history feed, while unpublished future events are removed.

The Contact page links directly to `it@886studios.com` with a `mailto:` URL, so
it does not require an email provider or server-side configuration.

## Common Pitfalls

- If `npm ci` fails after dependency edits, regenerate the lockfile intentionally with `npm install` and commit `package-lock.json`.
- If `/events` is stale locally, run `npm run events:sync` before building. The sync reads Luma's
  public calendar and does not need `LUMA_API_KEY`.
- If the scheduled event sync fails, use the `Sync Luma events` workflow's manual run button and
  inspect its log. The script falls back to Luma's public iCal feed if the richer event feed is unavailable.
- If `npm run dev` is already using port `4173`, use the alternate URL printed by Astro or stop the existing process.
- If `npm run preview` serves stale output, run `npm run build` first.
- If `npm run check:seo` says `dist` is missing, run `npm run build` first or use `npm run validate`.
- If `npm run check:seo` reports sitemap parity errors, ensure every indexable page has one self-referencing canonical and that `src/pages/sitemap.xml.ts` contains the same route set.
- If a changed image still looks stale in the browser, confirm the asset URL changed or clear the browser/CDN cache. Public assets are served by stable paths unless renamed.
- Do not edit generated files in `dist/`; source changes belong under `src/`.
- Keep screenshots, traces, `.env` files, and OS metadata out of the repo.

## Architecture Map

```text
src/
  components/
    PageHero.astro              shared inner-page hero scaffold
    SiteNav.astro               global navigation markup
    SiteFooter.astro            global footer markup
    GoogleAnalytics.astro       gtag wrapper
    VercelAnalytics.astro       Vercel analytics wrapper
    pages/                      route body components
  config/
    site.ts                     canonical URL, metadata, analytics, route preloads
  content/
    blog/                       website-only Markdown blog articles
  content.config.ts             typed schema and loader for local articles
  data/
    siteContent.ts              global/nav/page copy and structured content
    partnerProfiles.ts          partner profile content and lookup map
    resourceArticles.ts         resource article content
  layouts/
    BaseLayout.astro            document shell, metadata, global chrome
  lib/
    blog.ts                     merged local Markdown and Substack blog source
    luma.ts                     archived Luma event-card normalization
    seo.ts                      metadata content and reusable JSON-LD helpers
    substack.ts                 Substack RSS adapter and article normalization
    urls.ts                     shared safe-link helpers for data-driven links
  pages/                        Astro route entrypoints and generated sitemap
  scripts/
    site.ts                     global browser behavior
    home.ts                     homepage-only browser behavior
  styles/
    global.css                  visual system and page styles
public/                         static assets
scripts/
  check-seo.mjs                 generated-site SEO regression checks
  submit-indexnow.mjs           IndexNow URL submission utility
vercel.json                     redirects and production security headers
```

Keep images in `public/` unless Astro image processing is intentionally introduced later.

## Editing Workflow

Use this path for most changes:

1. Identify the route in `src/pages/`.
2. Open the matching body component in `src/components/pages/`.
3. Edit copy/data in `src/data/` when possible.
4. Edit metadata, canonical behavior, analytics IDs, or preloads in `src/config/site.ts`.
5. Edit shared chrome in `SiteNav.astro`, `SiteFooter.astro`, or `BaseLayout.astro`.
6. Edit browser behavior in `src/scripts/`, not inline in page markup.
7. Run `npm run validate`.
8. For visual or interaction changes, start `npm run dev` and live-test the affected route.

Commit small, reviewed slices.

## Notion Task Tracker

Use the Notion database as the source of truth for project tasks:

- Database: [886 Studios website redesign](https://app.notion.com/p/352b93834d698023b0baefba50c701a7)
- Data source: `collection://352b9383-4d69-8013-a35a-000bb4fa79e2`
- Task properties: `Task`, `Progress`, `Page`, `PIC`, `Date last edited`
- Progress values: `Not started`, `In process`, `Complete`
- Page values: `Home`, `About`, `Programs`, `Events`, `Contact`, `Resources`, `General`

When working from this tracker, fetch the database first to confirm the current schema. Before implementing a task, update its `Progress` to `In process`; after code changes and validation, update it to `Complete`. Add new project tasks directly to the same data source with at least `Task`, `Progress`, and `Page` set.

## Content Boundaries

- Navigation and main CTA: `siteContent.nav`
- Homepage copy and logo wall: `siteContent.home`
- Programs and Launch Station copy: `siteContent.programs`
- Resources landing page: `siteContent.resources`
- About page team and partner lists: `siteContent.about`
- Events labels/supporting copy: `siteContent.events`
- Events archive: `src/data/luma-events.json` (maintained by `npm run events:sync`)
- Contact page form labels: `siteContent.contact`
- Page titles, descriptions, and structured data: `src/lib/seo.ts`
- Long-form resource pages: `src/data/resourceArticles.ts`
- Partner detail pages: `src/data/partnerProfiles.ts`

The `/apply` route redirects to the shared nav CTA URL. Do not rebuild a local application form unless product direction changes.

## Design Context

Read `.impeccable.md` before making visual changes. It captures the target audience, brand tone, and design constraints for the site.

Current visual direction: dark 886 language, restrained purple accents, real founder photos, strong typography, and direct founder-facing copy. Avoid generic marketing sections, decorative effects beyond existing intentional treatments, or large visual rewrites without live screenshots.

## Validation Checklist

For routine changes:

```bash
npm run validate
```

`npm run check:seo` reads generated files from `dist/`, so do not run it before the first
build. The regression suite checks titles, descriptions, canonicals, Open Graph and Twitter
metadata, JSON-LD parsing, internal links, image attributes, labels, `robots.txt`, `llms.txt`,
the sitemap, and production URL safety.

For local performance checks, build and serve the production output first:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Then run Lighthouse against the affected route and save the report outside tracked source:

```bash
mkdir -p .artifacts/performance
npx --yes lighthouse http://127.0.0.1:4173/programs \
  --only-categories=performance \
  --preset=desktop \
  --chrome-flags="--headless=new" \
  --output=html \
  --output-path=.artifacts/performance/programs-desktop.html
```

For production Core Web Vitals, run WebPageTest against the deployed URL with at least 3 runs, first-view and repeat-view enabled, and the same route set used for frontend QA. Store exported reports under `.artifacts/performance/`.

For frontend QA, verify at least:

- `/`
- `/programs`
- `/about`
- `/events`
- `/contact`
- mobile navigation open/close
- `/apply` redirect markup when touching CTA or redirect behavior

For security-sensitive changes, review `vercel.json` and run `npm audit` when network access is explicitly approved.

For dependency maintenance:

```bash
npm outdated --long
npm audit --audit-level=moderate
```

The project has no committed Playwright suite. Use the available browser tooling in the current environment for live validation and keep generated QA artifacts outside the repo.
