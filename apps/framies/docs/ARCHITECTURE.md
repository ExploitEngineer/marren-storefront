# Marren - Architecture

> How the site is structured, routed, and rendered.
> Companion to `PRD.md` (what) and `DESIGN-SYSTEM.md` (how it looks).

## 1. Stack

- Next.js 16, App Router, React 19, TypeScript, React Compiler enabled.
- Tailwind CSS v4 (CSS-first `@theme`), shadcn/ui (Radix primitives) for base components.
- Framer Motion for motion.
- react-hook-form + zod for the contact form.
- lucide-react for icons, sonner for toasts.
- Package manager: pnpm.

Rendering philosophy: server-first.
Pages and sections are React Server Components by default.
Client Components are used only where they earn it: motion wrappers, the mobile nav, shop filters, the Frame Finder, the contact form, and the announcement bar.
This keeps JavaScript shipped to the browser small and protects Core Web Vitals.

## 2. Folder structure

```
src/
  app/
    layout.tsx            # root: fonts, metadata defaults, header/footer, skip link, Toaster
    globals.css           # design tokens (CSS variables) + Tailwind theme mapping
    page.tsx              # Home
    shop/
      page.tsx            # Shop (all products, filterable)
      [collection]/page.tsx
    products/
      [slug]/page.tsx     # PDP
    gallery-wall/page.tsx # Landing
    contact/page.tsx      # Contact
    about/page.tsx        # About
    api/
      contact/route.ts    # form handler (validates, stubs delivery)
    sitemap.ts
    robots.ts
    not-found.tsx
  components/
    ui/                   # shadcn primitives (button, card, input, accordion, ...)
    layout/               # Header, Footer, AnnouncementBar, MobileNav, Container, Section
    motion/               # Reveal, Stagger, HoverLift, PageTransition (client)
    sections/             # composed page sections (Hero, Showcase, TrustStrip, Testimonials, ...)
    shop/                 # ProductCard, ProductGrid, Filters, FrameFinder, PDP pieces
    forms/                # ContactForm (client)
    brand/                # Logo, wordmark, decorative frame art
  content/                # typed content modules (CMS-ready)
    site.ts               # brand name, contact, socials, nav, legal
    products.ts
    collections.ts
    gallery-sets.ts
    testimonials.ts
    faqs.ts
    press.ts
  lib/
    utils.ts              # cn() and helpers
    seo.ts                # metadata + JSON-LD builders
    format.ts             # price/format helpers
public/
  images/                 # local placeholder assets (flagged for replacement)
docs/
```

## 3. Routing plan (App Router)

- Single root layout owns the shared chrome: announcement bar, sticky header, footer, skip link, and the Toaster.
- Every route file is a Server Component that composes section components and exports `metadata` (or `generateMetadata` for dynamic routes).
- Dynamic routes `shop/[collection]` and `products/[slug]` use `generateStaticParams` so they are statically generated from the local content at build time.
- `not-found.tsx` gives 404s the branded shell.
- The Landing page (`/gallery-wall`) deliberately renders a stripped-down header (logo plus one CTA) to minimize navigation distraction, passed as a prop or a layout variant.

## 4. Component architecture

Three layers, bottom to top:

1. Primitives (`components/ui`): shadcn/Radix components, restyled by our tokens. Never page-aware.
2. Building blocks (`components/layout`, `components/motion`, `components/brand`): Container, Section, Eyebrow, SectionHeading, motion wrappers, Logo. Reusable, tokenized, mostly server components except motion wrappers.
3. Sections (`components/sections`, `components/shop`, `components/forms`): composed, page-level blocks that accept typed content as props. Pages assemble these.

Rules:
- Sections receive data as props from the page; they do not import content modules directly (keeps them reusable and testable).
- Client boundaries are pushed as deep as possible. A section can be a server component that renders a small client motion wrapper around its children.
- Motion lives in dedicated wrappers so pages read cleanly and `prefers-reduced-motion` is handled in one place.

## 5. Content / data model

Content is local, typed TypeScript in `src/content`, shaped like a CMS response so it can be swapped for a real CMS (Sanity, Contentful, Shopify) with minimal churn.

Representative types:

```ts
type Material = "oak" | "walnut" | "black-ash" | "brass";
type FrameSize = "4x6" | "5x7" | "8x10" | "11x14" | "16x20" | "18x24" | "24x36";

interface Product {
  id: string;
  slug: string;
  name: string;
  collection: string;      // collection id
  material: Material;
  sizes: FrameSize[];
  priceFrom: number;       // cents
  finish: string;
  description: string;
  image: string;           // /images/...
  badges?: string[];       // "Bestseller", "New"
}

interface GallerySet {
  id: string; slug: string; name: string;
  frameCount: number; pieces: string[]; price: number; savings: number; image: string;
}
```

Money is stored in integer cents and formatted through `lib/format.ts`.
IDs and slugs are stable so routes and JSON-LD stay consistent.

## 6. State management

No global state library.
- Shop filters live in URL search params (shareable, back-button friendly) with a thin client component reading `useSearchParams`.
- Frame Finder holds transient selection in local `useState`, then navigates to a pre-filtered `/shop?...` URL.
- Cart in this build is a lightweight client context (add-to-cart updates a badge count and a toast); it is intentionally minimal and marked as the seam where a real cart/checkout integration lands.
- Announcement bar dismissal persists in `localStorage`.

## 7. Image and asset strategy

- All images use `next/image` with explicit `width`/`height` or `fill` plus aspect-ratio containers, so there is zero layout shift.
- Placeholder art is generated locally as lightweight SVG or tone-block components and static files under `public/images`, clearly labeled for replacement. No external image hosts (self-contained, CSP-safe, no network dependency).
- Fonts are self-hosted via `next/font/google` (Fraunces, Inter) with `display: swap` and preloaded variable axes, so text is fast and shift-free.
- Icons are tree-shaken from lucide-react.

## 8. Performance approach

- Server components by default; minimal client JS.
- Static generation for all marketing and catalog routes; dynamic only where truly needed.
- `next/image` responsive sizes and `sizes` attributes tuned per layout.
- Motion is opt-in per element, lazy below the fold, and fully disabled under reduced motion.
- No blocking third-party scripts. Analytics is deferred and added later behind a single component.
- Target Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.

## 9. SEO approach

- Per-route `metadata`/`generateMetadata` with title, description, canonical, OpenGraph, and Twitter card.
- A `lib/seo.ts` helper builds consistent metadata and JSON-LD.
- JSON-LD: `Organization` sitewide, `ItemList` on Shop, `Product` with `offers` on PDPs, `BreadcrumbList` on nested routes.
- `sitemap.ts` and `robots.ts` generated from content.
- Semantic HTML: one `h1` per page, logical heading order, landmarks (`header`, `nav`, `main`, `footer`), descriptive `alt` text, and a skip-to-content link.

## 10. Accessibility approach

- Semantic structure and landmarks on every page.
- Keyboard operability for all interactive elements, visible `:focus-visible` rings, logical tab order.
- Color pairings validated to WCAG AA (see `DESIGN-SYSTEM.md`).
- `aria-label`/`aria-current`/`aria-expanded` on nav, disclosure, and carousel controls.
- Forms: associated labels, inline error text tied via `aria-describedby`, and an accessible submission status.
- `prefers-reduced-motion` respected globally.

## 11. Quality gates

- `pnpm build` and `pnpm lint` clean at each milestone.
- End-to-end verification by driving the running app in a browser (nav, filters, form submit, responsive, keyboard, reduced motion) before a page is called done.
