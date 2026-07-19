# Marren - Product Requirements Document

> Marren is a premium direct-to-consumer storefront for ready-made picture frames.
> This document defines what we are building, for whom, and how we will know it worked.
> It is the source of truth for scope. Design details live in `DESIGN-SYSTEM.md`; structure lives in `ARCHITECTURE.md`; copy lives in `CONTENT-PLAN.md`.

## 1. Business overview

Marren sells beautifully made, ready-to-hang picture frames.
The catalog is curated rather than infinite: a tight set of collections organized by material (oak, walnut, black ash, brass) and by size.
There is no custom-build or upload-your-art flow; every product is a finished frame a customer can add to cart and buy today.

The brand position is "premium minimal": quiet confidence, generous whitespace, tactile materials, no gimmicks.
The emotional promise is that the frame finishes the moment, and that choosing one should feel calm and considered instead of overwhelming.

## 2. Goals

Primary goal: sell frames online.
Every page is measured by whether it moves a visitor closer to adding a frame to cart and checking out.

Secondary goals:
- Establish Marren as a credible premium brand within the first screen.
- Reduce choice paralysis through guided curation (Frame Finder, Gallery Wall Sets).
- Build trust fast (materials, guarantee, returns, real support) so first-time buyers convert.
- Capture leads that are not ready to buy (newsletter, contact) without cheapening the experience.

Non-goals for this build:
- Real payment processing and checkout (stubbed; integration is a documented next step).
- A CMS backend (content is local and typed, but modeled to be CMS-ready).
- Account systems, reviews infrastructure, or inventory management.

## 3. Target audience

Primary: design-conscious adults, roughly 28-55, who are decorating a home they care about.
They buy prints, photographs, and art, and they want framing that looks intentional without a trip to a custom framer.
They are willing to pay more for materials and finish, and they respond to restraint, craft language, and social proof.

Secondary: gift buyers who want something that feels considered, and first-time apartment or new-home decorators building a gallery wall.

What they need from the site:
- To trust the quality quickly (materials, construction, guarantee).
- To find the right size and style without expertise.
- To picture frames in their own space (gallery wall sets, room context).
- To check out with confidence (shipping, returns, support).

## 4. Sitemap

Five lean pages plus lightweight commerce sub-routes.

- `/` Home - the flagship brand and conversion page.
- `/shop` Products - all collections, filterable, plus Gallery Wall Sets and FAQ.
  - `/shop/[collection]` - a single collection (for example Oak) as a filtered product grid.
  - `/products/[slug]` - a product detail page (PDP) so the buy flow reads as real.
- `/gallery-wall` Landing - a focused, single-offer campaign page for the Gallery Wall Set, distinct from Home and optimized for conversion.
- `/contact` Contact - business info plus a working, validated contact form.
- `/about` About - a short brand-story page that strengthens the premium narrative.

## 5. Page-by-page content requirements

### Home (`/`)
- Announcement/promo bar (dismissible): shipping or launch message.
- Sticky header: logo, primary nav, cart affordance, and a primary "Shop" CTA.
- Hero: strong headline, supporting subhead, primary and secondary CTA, and an original art-directed composition (framed-art tiles and warm tone blocks, not stock photography).
- Best-of showcase: a grid of featured collections or bestsellers with price and quick access to shop.
- Brand-story snippet: a short, tactile paragraph about materials and craft with a link to About.
- Signature differentiator: Frame Finder (guided selection by photo size, room, and style) and Gallery Wall Sets (pre-curated multi-frame bundles). This is Marren's "customization" equivalent.
- Social proof: testimonials with specific, real-feeling detail, plus an optional press/logo strip.
- Trust-signal strip: free shipping threshold, lifetime guarantee, easy returns, sustainable materials, real support.
- Footer: sitemap links, contact info, socials, newsletter, legal.

### Products / Shop (`/shop`)
- Intro header with a clear value line.
- Filterable product grid: filter by material, size, and style; sortable; graceful empty state.
- Packages section: Gallery Wall Sets presented as curated bundles with combined price and savings.
- FAQ accordion: sizing, hanging, materials, shipping, returns.
- Closing CTA band.
- `/shop/[collection]`: same grid pre-filtered to one collection with a collection-specific intro.
- `/products/[slug]`: gallery, name, price, size and finish selectors, add-to-cart, materials and care details, shipping and returns, and related products.

### Landing / Gallery Wall (`/gallery-wall`)
- One focused hero for a single offer (the Gallery Wall Set) with a single strong CTA.
- One core value proposition, expanded into three to four supporting points.
- Visual proof: what a finished gallery wall looks like, built from Marren frames.
- Social proof concentrated for this offer.
- Objection-handling FAQ (will it fit, how to hang, what if it is wrong).
- Repeated CTA at top and bottom. Minimal navigation to reduce distraction.

### Contact (`/contact`)
- Two-column layout.
- Left: business info (address, phone, email, hours, socials) and a small map or visual element.
- Right: a working, validated form (name, email, phone, message) with inline errors and a success confirmation.

### About (`/about`)
- Short brand origin and philosophy.
- Materials and craft, told simply.
- A closing CTA back into the shop.

## 6. Key user flows

- Browse to buy: Home hero or showcase -> Shop -> filter -> PDP -> add to cart -> (checkout intent).
- Guided buy: Home -> Frame Finder -> filtered Shop result -> PDP -> add to cart.
- Bundle buy: Home or Landing -> Gallery Wall Set -> add set to cart.
- Reassurance path: any page -> trust strip / FAQ / About -> back to Shop.
- Lead capture: any page -> newsletter or Contact form -> confirmation.

## 7. Success metrics

Conversion and engagement:
- Add-to-cart rate (primary).
- Product detail page view rate from Home and Shop.
- Frame Finder engagement and its downstream add-to-cart rate.
- Gallery Wall Set add rate.
- Contact form and newsletter submission rate.

Experience quality (leading indicators):
- Core Web Vitals: LCP under 2.5s, CLS under 0.1, INP under 200ms.
- Accessibility: no critical axe violations; full keyboard operability; AA contrast.
- Bounce rate on Home and Landing.

## 8. Constraints and assumptions

- Tech stack is fixed: Next.js (App Router, TypeScript), Tailwind CSS, shadcn/ui, Framer Motion.
- All imagery in this build is placeholder and self-contained; no external asset dependencies.
- Content is placeholder but written in-voice, and is structured to be swapped for real content or a CMS later.
- Payment, analytics, and email delivery are stubbed and listed as next steps.
