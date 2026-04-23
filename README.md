# 886 Studios Website

This repo is structured as a small Astro site so the current website can stay visually the same while the codebase becomes easier to maintain, extend, and collaborate on.

## Why this structure

- `src/` holds the website source files
- `public/` holds static files like logos
- each route has its own page file in `src/pages/`
- each major page body lives in its own component
- the project can be forked, cloned, previewed locally, and deployed as a standard static website

## Project structure

```text
public/
  assets/
    logos/
src/
  components/
    pages/
  layouts/
  pages/
  styles/
```

## Getting started

```bash
npm install
npm run dev
```

Then open `http://127.0.0.1:4173/`.

## Useful commands

```bash
npm run dev
npm run build
npm run preview
npm run check
```

## How to build on top of this

- edit most site copy in `src/data/siteContent.ts`
- edit visual styles in `src/styles/global.css`
- update shared chrome in `src/components/SiteNav.astro` and `src/components/SiteFooter.astro`
- update section structure in `src/components/pages/`
- add or reorganize subpages in `src/pages/`
