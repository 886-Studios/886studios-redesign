# 886 Studios portfolio perks

A separate, server-rendered portal served at **https://www.886studios.com/perks**. The main Astro site proxies `/perks` and its subpaths to the existing `886-studios-perks` Vercel project. The apex domain redirects to `www` through the main site's existing canonical-domain rule. No separate DNS setup is needed.

## Local preview

Requires Node 22.12 or later. No dependencies or installation are required.

```sh
cd apps/perks-portal
npm run dev
```

Open http://localhost:4186. The terminal prints the local access code, generated on first launch and stored in the ignored `private/dev-access.json`. The preview binds only to `127.0.0.1`. This development credential is never bundled in a production build. Use `PORT` to choose another local port.

```sh
npm run validate
```

This runs authentication, privacy, and content tests, then generates local Vercel Build Output API files in `.vercel/output`. It does not deploy anything.

## Content and sources

`private/catalog.json` contains 21 partner entries: 20 sourced offers and Zettabyte, whose credit amount and redemption link are unconfirmed. Its entry explicitly asks founders to contact the team. Negotiations, rejected applications, and unavailable offers are excluded.

The catalog was checked against the complete Notion founder-facing Perks database and Perks – Internal on September 22, 2026. Linear is included from its completed internal record. Zettabyte is included from the public 886 website and the August 31 partnership meeting note. Source URLs are retained per entry for maintenance but not rendered to portfolio visitors. Detailed source snapshots are kept locally in `private/source-records.json` and are never included in the build.

Each entry has an ID, name, category, short benefit, explanation, eligibility, instructions, redemption link, source, and optional program restrictions, secondary links, and redemption code. Prices and offer limits retain the qualification in the source. Contact-based perks use the recorded email or an introduction from the 886 team. The Google Cloud partner URL is preserved exactly as recorded; its unusual query string should be confirmed with the partner before launch.

The catalog and source snapshots are **git-ignored deliberately** so partner links and codes cannot accidentally enter a public repository. Back up the private catalog securely. A fresh clone needs the private catalog supplied before building; builds fail if it is absent. Edit this file on the server side; never move it into `public/` or import it into the browser script.

## Access

The shared code is checked on the server. Valid access sets a signed, HTTP-only, SameSite=Strict cookie with a seven-day expiry. Production cookies have the Secure attribute, use the `__Secure-` prefix, omit Domain, and are scoped to `/perks`. Root-mounted local/test deployments remain supported; secure root deployments use `__Host-`. Changing either the access code or session secret invalidates all sessions. Sign-out clears the current browser cookie; back/forward cache restoration revalidates the page.

Private HTML uses `no-store` for browser and CDN caches. Robots headers and robots.txt discourage indexing. Direct file requests cannot retrieve the private catalog, source files, environment files, or local development credentials. The login fails closed when the credentials or private catalog are absent. Same-origin form requests are required, with a same-origin referrer policy that sends no referrer to partner sites. CSP disallows third-party scripts and frames. Fonts and images are local, and the portal includes no analytics.

There is an eight-attempt, 15-minute throttle per process. For a multi-instance production deployment, also configure a durable/platform rate limit for POST `/login`; the in-process limiter is not a distributed guarantee. A shared code controls possession of access, not individual company identity. Only distribute the eventual production code to approved portfolio companies.

## Deployment

The main repository's root `vercel.json` forwards `/perks` and `/perks/:path*` to the same paths on `https://886-studios-perks.vercel.app`. The proxy explicitly disables caching and preserves no-index, same-origin referrer, and restrictive CSP headers for the portal. Styles, scripts, fonts, logos, form actions, and redirects use the portal base path.

Deploy the portal independently to the existing Vercel project `886-studios-perks`. Production configuration:

- `PERKS_ACCESS_CODE`: the chosen portfolio access code, stored as a sensitive environment variable.
- `PERKS_SESSION_SECRET`: a random server-side secret, stored as a sensitive environment variable.
- `APP_ORIGIN=https://www.886studios.com`
- `APP_BASE_PATH=/perks`

Build from the exact release commit after supplying the ignored private catalog, then deploy the prebuilt `.vercel/output` artifact to the linked perks project. Never deploy the portal to the public Astro project's target. The main site's normal protected-branch release publishes its proxy rules. The portal's Node function handles every request and contains the private catalog; no catalog data is emitted as a public static file. Source snapshots and development credentials are excluded from the artifact.

For a local subpath preview, run `APP_BASE_PATH=/perks npm run dev` and open `http://localhost:4186/perks`. Without this setting, the local preview stays at `/`.

## Design

Uses the 886 Studios logo, Geist typography, dark background, and restrained purple actions. The title is “886 Studios Exclusive Perks.” The header logo links to the main 886 website. There is no navigation title, subtitle, footer logo, portfolio lock badge, or decorative divider line.

Search and rounded type-filter buttons share one form. The buttons wrap on small screens and have at least 44px tap targets. Both work without JavaScript; when JavaScript is available, results update immediately and the URL preserves the current filters. Desktop entries use separate Partner, Type, and Perk columns.

At phone widths, each entry reads as partner, offer, then a compact Type field and an explicit View perk action. Expanded details use one opaque dark-purple box: separate Perk, Eligibility, and How to redeem columns on desktop, stacked sections on phones. The panel is a flat, opaque deep purple with a quiet border and minimal corner rounding. They follow Perk → Eligibility → How to redeem, with the redemption links grouped after the instructions. The organization ID is inline with its copy action, without a nested panel. A restrained heading, compact partner rows, and aligned columns organize the directory without divider lines, gradients, translucent fills, or glow effects. Inputs are 16px; the disclosure action and main buttons have at least 44px targets. The mobile access screen uses the same readable text sizes and a simple single column.

The portal tests cover access control, privacy, content, and subpath login, assets, filters, redirects, cookie scope, and private-path rejection. The main GitHub validation workflow also runs portal tests; the private-catalog check runs locally when the catalog is present. Browser checks covered actual CSS viewport widths of 320, 390, 430, 768, 843 (landscape), and 1280px. No horizontal overflow was found. Checked combined search/type filtering, retained filters after refresh, empty results and reset, expanded long terms, invalid and valid access codes, and authentication. Physical iPhone/Android devices have not been tested. Partner claims were not submitted.

The original concept in `design/directory-concept.png` predates the requested title, divider removal, and mobile hierarchy changes. It is ignored because it contains private offer amounts.
