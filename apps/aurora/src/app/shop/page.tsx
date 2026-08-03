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
  title: "Shop builds",
  description: "Every car frame Aurora makes, filterable by marque, size, and style. All hand-built, all ready to hang, all guaranteed for life.",
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
      <Section tone="base" size="sm">
        <Container>
          <h1 className="font-heading text-[clamp(2.25rem,1.7rem+2.4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.015em] text-carbon-50">
            Every build we make.
          </h1>
          <p className="measure-wide mt-4 text-lg text-carbon-200">
            Filter by marque, size, and style. Every build ships ready to hang.
          </p>
        </Container>
      </Section>

      <Section tone="base" size="sm" className="pt-0">
        <Container className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Suspense fallback={<div className="h-72 animate-pulse rounded-xl bg-carbon-900" />}>
              <ShopFilters />
            </Suspense>
          </aside>

          <div>
            <p className="mb-6 text-sm text-carbon-400" aria-live="polite">
              {results.length} {results.length === 1 ? "build" : "builds"}
            </p>
            {results.length > 0 ? (
              <ProductGrid products={results} priorityCount={4} />
            ) : (
              <div className="rounded-2xl border border-dashed border-carbon-700 bg-carbon-950 px-6 py-20 text-center">
                <p className="font-heading text-2xl text-carbon-50">No builds match those filters yet.</p>
                <p className="mt-2 text-carbon-300">Try clearing one to see more of the range.</p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <GallerySets tone="raise" />
      <FaqSection faqs={shopFaqs} id="faq" heading="Good to know." />
      <ClosingCta
        heading="Still deciding? Let us help."
        sub="The Frame Finder narrows the whole range to the builds that fit your marque, your size, and your space."
        ctaLabel="Start the Frame Finder"
        ctaHref="/#frame-finder"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(itemListJsonLd(products, "Aurora builds"))} />
    </SiteShell>
  );
}
