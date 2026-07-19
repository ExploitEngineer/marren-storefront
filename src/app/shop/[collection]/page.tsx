import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ProductGrid } from "@/components/shop/product-grid";
import { ClosingCta } from "@/components/sections/closing-cta";
import { collections, getCollection } from "@/content/collections";
import { productsByMaterial } from "@/content/products";
import { pageMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return collections.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return pageMetadata({
    title: `${collection.name} frames`,
    description: collection.intro,
    path: `/shop/${collection.slug}`,
  });
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = productsByMaterial(collection.material);
  const others = collections.filter((c) => c.slug !== collection.slug);

  return (
    <SiteShell>
      <Section tone="cream" size="sm">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm text-oat-600 transition-colors hover:text-clay-700">
              <ArrowLeft className="size-4" />
              All frames
            </Link>
          </nav>
          <h1 className="font-serif text-[clamp(2.25rem,1.7rem+2.4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.015em] text-oat-900">
            {collection.name}
          </h1>
          <p className="measure-wide mt-4 text-lg text-oat-700">{collection.intro}</p>
        </Container>
      </Section>

      <Section tone="cream" size="sm" className="pt-0">
        <Container>
          <ProductGrid products={items} priorityCount={4} />

          <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-oat-200 pt-8">
            <span className="text-sm text-oat-500">Other collections:</span>
            {others.map((c) => (
              <Link key={c.slug} href={`/shop/${c.slug}`} className="text-sm font-medium text-clay-600 transition-colors hover:text-clay-700">
                {c.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Shop", path: "/shop" },
            { name: collection.name, path: `/shop/${collection.slug}` },
          ]),
        )}
      />
    </SiteShell>
  );
}
