# 886 Studios Website

Astro static site for 886 Studios. The codebase is intentionally small and structured for agentic maintenance: thin route files, page-level Astro components, shared site configuration, data-driven content, and isolated browser scripts.

## Prerequisites

- Node `18.20.8`, `20.3.0+`, or `22+`
- npm `9.6.5+`

This repo uses `package-lock.json`, so prefer npm over pnpm or yarn unless the package manager strategy changes.

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://127.0.0.1:4173/`.

Before handing work back, run:

```bash
npm run check
npm run build
```

To inspect the production build locally:

```bash
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

## Environment

`.env.example` contains the only local environment variable currently used:

```bash
LUMA_API_KEY=
```

`LUMA_API_KEY` is optional. Without it, the Events page renders the configured fallback state. With it, `npm run build` fetches approved Luma events through `src/lib/luma.ts`.

Do not commit `.env`, `.env.local`, or any `.env.*.local` file. Google Analytics uses the production fallback ID in `src/config/site.ts`; there is no separate local analytics env var.

## Common Pitfalls

- If `/events` shows fallback copy locally, confirm `LUMA_API_KEY` is present in `.env` and restart the dev server.
- If `npm run build` logs a Luma warning, check the API key and network access. The page should still render a fallback state.
- If `npm run dev` is already using port `4173`, stop the existing process or run Astro on another port.
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

The project has no committed Playwright suite. Use the available browser tooling in the current environment for live validation and keep generated QA artifacts outside the repo.
