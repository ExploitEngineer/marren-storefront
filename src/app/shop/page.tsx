import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ShopFilters } from "@/components/shop/shop-filters";
import { ProductGrid } from "@/components/shop/product-grid";
import { GallerySets } from "@/components/sections/gallery-sets";
import { FaqSection } from "@/components/sections/faq";
import { ClosingCta } from "@/components/sections/closing-cta";
import { filterAndSortProducts, type ShopQuery } from "@/lib/shop";
import { products } from "@/content/products";
import { shopFaqs } from "@/content/faqs";
import { pageMetadata, itemListJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Shop frames",
  description: "Every frame Marren makes, filterable by wood, size, and style. All ready to hang, all guaranteed for life.",
  path: "/shop",
});

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const query: ShopQuery = {
    material: first(sp.material),
    size: first(sp.size),
    style: first(sp.style),
    sort: first(sp.sort),
  };
  const results = filterAndSortProducts(query);

  return (
    <SiteShell>
      <Section tone="cream" size="sm">
        <Container>
          <h1 className="font-serif text-[clamp(2.25rem,1.7rem+2.4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.015em] text-oat-900">
            Every frame we make.
          </h1>
          <p className="measure-wide mt-4 text-lg text-oat-700">
            Filter by wood, size, and style. Every frame ships ready to hang.
          </p>
        </Container>
      </Section>

      <Section tone="cream" size="sm" className="pt-0">
        <Container className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Suspense fallback={<div className="h-72 animate-pulse rounded-xl bg-oat-100" />}>
              <ShopFilters />
            </Suspense>
          </aside>

          <div>
            <p className="mb-6 text-sm text-oat-500" aria-live="polite">
              {results.length} {results.length === 1 ? "frame" : "frames"}
            </p>
            {results.length > 0 ? (
              <ProductGrid products={results} priorityCount={4} />
            ) : (
              <div className="rounded-2xl border border-dashed border-oat-300 bg-oat-50 px-6 py-20 text-center">
                <p className="font-serif text-2xl text-oat-900">No frames match those filters yet.</p>
                <p className="mt-2 text-oat-600">Try clearing one to see more of the range.</p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <GallerySets tone="oat" />
      <FaqSection faqs={shopFaqs} id="faq" heading="Good to know." />
      <ClosingCta
        heading="Still deciding? Let us help."
        sub="The Frame Finder narrows the whole range to the frames that fit your photo, your room, and your look."
        ctaLabel="Start the Frame Finder"
        ctaHref="/#frame-finder"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(itemListJsonLd(products, "Marren frames"))} />
    </SiteShell>
  );
}
