# 886 Studios Website

Astro static site for 886 Studios. The codebase is intentionally small and structured for agentic maintenance: thin route files, page-level Astro components, shared site configuration, and isolated browser scripts.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4173/`.

Before handing work back, run:

```bash
npm run check
npm run build
```

For security-sensitive changes, also review `vercel.json` and run `npm audit` when network access is explicitly approved.

## Environment

Copy `.env.example` to `.env` for local data-backed builds:

```bash
LUMA_API_KEY=
```

`LUMA_API_KEY` is optional for local rendering, but the Events page will show its fallback state without it. Google Analytics uses the production ID defined in `src/config/site.ts`.

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
vercel.json                     production security headers
```

`public/` contains static assets. Keep images there unless Astro image processing is intentionally introduced later.

## Agent Workflow

Use this path for most changes:

1. Identify the route in `src/pages/`.
2. Open the matching body component in `src/components/pages/`.
3. Edit copy/data in `src/data/` when possible.
4. Edit global metadata, canonical behavior, or preloads in `src/config/site.ts`.
5. Edit shared chrome in `SiteNav.astro`, `SiteFooter.astro`, or `BaseLayout.astro`.
6. Edit browser behavior in `src/scripts/`, not inline in page markup.
7. Run `npm run check` and `npm run build`.
8. For visual or interaction changes, start `npm run dev` and live-test the affected route.

Commit small, reviewed slices. Do not include generated output from `dist/`, local `.env` files, screenshots, traces, or OS metadata.

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

The `/apply` route is a redirect to the shared nav CTA URL. Do not rebuild a local application form unless product direction changes.

## Design Context

Read `.impeccable.md` before making visual changes. It captures the target audience, brand tone, and design constraints for the site.

Current visual direction: dark 886 language, restrained purple accents, real founder photos, strong typography, and direct founder-facing copy. Avoid adding generic marketing sections, decorative blobs/orbs beyond existing intentional treatments, or large visual rewrites without live screenshots.

## Validation Notes

`npm run build` statically renders all routes, including Events. If `LUMA_API_KEY` is set, the build fetches Luma events through `src/lib/luma.ts`; otherwise it renders the configured fallback state.

For frontend QA, verify at least:

- `/`
- `/programs`
- `/about`
- `/events`
- `/contact`
- mobile navigation open/close
- `/apply` redirect markup when touching CTA or redirect behavior

The project has no committed Playwright suite. Use the available browser tooling in the current environment for live validation and keep screenshots outside the repo.
