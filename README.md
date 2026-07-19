# Marren

> Frames worth the wall.

Marren is the marketing and storefront website for a premium, direct-to-consumer picture frame brand.
It sells a curated range of ready-to-hang, solid-wood frames, organized by material and size, with guided curation (a Frame Finder and pre-arranged Gallery Wall Sets) in place of a custom-build flow.

This repository contains an original, from-scratch build: a fast, accessible, SEO-sound Next.js site with its own visual identity. It is not templated from or copied off any existing brand.

## Tech stack

- **Next.js 16** (App Router, React 19, TypeScript, React Compiler)
- **Tailwind CSS v4** (CSS-first theming)
- **shadcn/ui** (Radix primitives) for base components
- **Framer Motion** for motion design
- **react-hook-form + zod** for form validation
- **lucide-react** icons, **sonner** toasts
- **pnpm** package manager

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home - flagship brand + conversion page |
| `/shop` | All frames, filterable, plus Gallery Wall Sets and FAQ |
| `/shop/[collection]` | A single collection (Oak, Walnut, Black Ash, Brass) |
| `/products/[slug]` | Product detail page |
| `/gallery-wall` | Landing - focused Gallery Wall Set campaign |
| `/contact` | Business info + validated contact form |
| `/about` | Brand story |

## Getting started

Prerequisites: Node 20+ and pnpm 9+.

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Scripts

```bash
pnpm dev      # start the dev server
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # run ESLint
```

## Project structure

```
src/
  app/          # App Router routes, layout, globals, api, sitemap/robots
  components/   # ui (shadcn), layout, motion, sections, shop, forms, brand
  content/      # typed, CMS-ready content modules
  lib/          # utils, seo, formatting
public/images/  # local placeholder assets (flagged for replacement)
docs/           # PRD, ARCHITECTURE, DESIGN-SYSTEM, CONTENT-PLAN, TASKS
```

## Documentation

Foundational docs live in [`/docs`](./docs):

- [PRD.md](./docs/PRD.md) - product requirements
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - structure, routing, rendering, SEO/a11y
- [DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) - original visual identity + tokens
- [CONTENT-PLAN.md](./docs/CONTENT-PLAN.md) - sitemap + in-voice copy
- [TASKS.md](./docs/TASKS.md) - build milestones

## Status

Active build. All content, imagery, prices, and contact details are placeholder and clearly flagged for replacement.
Payment/checkout, analytics, and email delivery are stubbed and tracked as next steps.

## License

[MIT](./LICENSE)
