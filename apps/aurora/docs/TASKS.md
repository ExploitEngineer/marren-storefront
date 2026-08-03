# Marren - Build Tasks

Ordered milestones. Check off as completed.

## Milestone 0 - Scaffold (done)
- [x] Next.js (App Router, TS) + Tailwind v4 + ESLint + src dir + `@/*` alias, via pnpm.
- [x] shadcn/ui init (Radix) + components: button, badge, card, input, textarea, label, accordion, navigation-menu, sheet, sonner, separator, carousel.
- [x] Install framer-motion, react-hook-form, zod, @hookform/resolvers, lucide-react.
- [x] Build sharp (image optimization).

## Milestone 1 - Foundational docs (done)
- [x] PRD.md
- [x] ARCHITECTURE.md
- [x] DESIGN-SYSTEM.md
- [x] CONTENT-PLAN.md
- [x] TASKS.md
- [ ] CHECKPOINT: review with stakeholder before page code.

## Milestone 2 - Design tokens + foundation
- [ ] Encode palette, type, radius, shadow, motion tokens into `globals.css` + Tailwind theme.
- [ ] Wire fonts (Fraunces display, Inter text) via `next/font`.
- [ ] Global reduced-motion guard, base metadata, skip link, Toaster in root layout.
- [ ] Layout primitives: Container, Section, Eyebrow, SectionHeading.
- [ ] Motion wrappers: Reveal, Stagger, HoverLift, PageTransition.
- [ ] Brand: Logo/wordmark, framed-art placeholder art components.

## Milestone 3 - Content modules
- [ ] `site.ts`, `products.ts`, `collections.ts`, `gallery-sets.ts`, `testimonials.ts`, `faqs.ts`, `press.ts`.
- [ ] `lib/format.ts` (price), `lib/seo.ts` (metadata + JSON-LD).

## Milestone 4 - Shared chrome
- [ ] AnnouncementBar (dismissible, persisted).
- [ ] Header (sticky, condense on scroll, cart affordance, primary CTA).
- [ ] MobileNav (Sheet).
- [ ] Footer (columns, newsletter, socials, legal).
- [ ] Minimal cart context + toast.

## Milestone 5 - Pages (impeccable pass before each)
- [ ] Home (`/`)
- [ ] Shop (`/shop`) + filters + Gallery Wall Sets + FAQ.
- [ ] Collection (`/shop/[collection]`).
- [ ] PDP (`/products/[slug]`).
- [ ] Landing (`/gallery-wall`).
- [ ] Contact (`/contact`) + `api/contact` route.
- [ ] About (`/about`).
- [ ] `sitemap.ts`, `robots.ts`, `not-found.tsx`.

## Milestone 6 - Cross-cutting polish
- [ ] Responsive audit (mobile/tablet/desktop, no horizontal scroll, no CLS).
- [ ] Accessibility audit (landmarks, keyboard, focus, aria, contrast).
- [ ] SEO audit (metadata, OG, JSON-LD, headings).
- [ ] Motion audit (purposeful, reduced-motion honored).

## Milestone 7 - Verify + review
- [ ] `pnpm build` and `pnpm lint` clean.
- [ ] Drive site in browser: nav, filters, PDP add-to-cart, contact submit, responsive, keyboard, reduced motion.
- [ ] Review summary: what shipped, placeholders to replace, prioritized next steps (real content/images, payment/checkout, analytics, deployment).
