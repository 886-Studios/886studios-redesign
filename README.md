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
npm run check
npm run build
```

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
| `npm run preview` | Serve the latest `dist/` build locally. |

Use `npm install <package>` only when intentionally changing dependencies. For normal setup and CI-style installs, use `npm ci` so `package-lock.json` is respected exactly.

## Environment

`.env.example` contains the only local environment variable currently used:

```bash
LUMA_API_KEY=
```

`LUMA_API_KEY` is optional. Without it, the Events page renders the configured fallback state. With it, `npm run build` fetches approved Luma events through `src/lib/luma.ts`. If the key is missing, invalid, or the Luma API request fails, the site should still build successfully with fallback Events copy.

Do not commit `.env`, `.env.local`, or any `.env.*.local` file. These files are ignored by git and should hold local or deployment secrets only.

Google Analytics uses the production fallback ID in `src/config/site.ts`; there is no separate local analytics env var. Vercel Analytics renders only when Vercel sets `VERCEL=1`.

## Deployment

The site is a static Astro build deployed on Vercel.

- Build command: `npm run build`
- Output directory: `dist/`
- Canonical site URL: `https://www.886studios.com`
- Redirects and security headers: `vercel.json`
- Required production env vars: none
- Optional production env vars: `LUMA_API_KEY`

If `LUMA_API_KEY` is present in production, the Events page is generated from approved Luma events at build time. If it is absent or the API request fails, the build still completes and the page renders fallback copy.

## Common Pitfalls

- If `npm ci` fails after dependency edits, regenerate the lockfile intentionally with `npm install` and commit `package-lock.json`.
- If `/events` shows fallback copy locally, confirm `LUMA_API_KEY` is present in `.env` and restart the dev server.
- If `npm run build` logs a Luma warning, check the API key and network access. The page should still render a fallback state.
- If `npm run dev` is already using port `4173`, use the alternate URL printed by Astro or stop the existing process.
- If `npm run preview` serves stale output, run `npm run build` first.
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
  data/
    siteContent.ts              global/nav/page copy and structured content
    partnerProfiles.ts          partner profile content and lookup map
    resourceArticles.ts         resource article content
  layouts/
    BaseLayout.astro            document shell, metadata, global chrome
  lib/
    luma.ts                     Luma API adapter and event-card normalization
    urls.ts                     shared safe-link helpers for data-driven links
  pages/                        Astro route entrypoints
  scripts/
    site.ts                     global browser behavior
    home.ts                     homepage-only browser behavior
  styles/
    global.css                  visual system and page styles
public/                         static assets
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
7. Run `npm run check` and `npm run build`.
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
- Events labels/fallback copy: `siteContent.events`
- Contact page form labels: `siteContent.contact`
- Long-form resource pages: `src/data/resourceArticles.ts`
- Partner detail pages: `src/data/partnerProfiles.ts`

The `/apply` route redirects to the shared nav CTA URL. Do not rebuild a local application form unless product direction changes.

## Design Context

Read `.impeccable.md` before making visual changes. It captures the target audience, brand tone, and design constraints for the site.

Current visual direction: dark 886 language, restrained purple accents, real founder photos, strong typography, and direct founder-facing copy. Avoid generic marketing sections, decorative effects beyond existing intentional treatments, or large visual rewrites without live screenshots.

## Validation Checklist

For routine changes:

```bash
npm run check
npm run build
```

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
