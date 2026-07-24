import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { Frame } from "@/components/brand/frame";
import { ProductGrid } from "@/components/shop/product-grid";
import { PdpPurchase } from "@/components/shop/pdp-purchase";
import { products, getProduct, relatedProducts } from "@/content/products";
import { materialMeta, getCollection } from "@/content/collections";
import { pageMetadata, productJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${product.slug}`,
    images: [product.art],
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const material = materialMeta[product.material];
  const collection = getCollection(product.collection);
  const related = relatedProducts(product, 4);

  const details = [
    { label: "Marque", value: material.label },
    { label: "Presentation", value: product.style },
    { label: "Frame", value: product.finish },
    { label: "Glazing", value: "Low-glare glass front" },
    { label: "Hanging", value: "Hardware attached, ready to hang" },
    { label: "Sizes", value: product.sizes.join(", ") },
  ];

  return (
    <SiteShell>
      <Section tone="cream" size="sm">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-oat-500">
            <Link href="/shop" className="transition-colors hover:text-clay-700">Shop</Link>
            <span aria-hidden>/</span>
            {collection && (
              <>
                <Link href={`/shop/${collection.slug}`} className="transition-colors hover:text-clay-700">
                  {collection.name}
                </Link>
                <span aria-hidden>/</span>
              </>
            )}
            <span className="text-oat-700">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Visual */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="mx-auto max-w-md bg-oat-100/50 p-6 sm:p-10">
                <Frame
                  material={product.material}
                  src={product.art}
                  alt={`${product.name}, a framed ${material.label} die-cast build`}
                  ratio="4/5"
                  weight="lg"
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
                {product.gallery && product.gallery.length > 1 && (
                  <div className="mx-auto mt-4 grid max-w-md grid-cols-3 gap-3">
                    {product.gallery.map((src, i) => (
                      <Frame
                        key={src + i}
                        material={product.material}
                        src={src}
                        alt={`${product.name}, angle ${i + 1}`}
                        ratio="1/1"
                        weight="sm"
                        sizes="(max-width: 1024px) 28vw, 12vw"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Detail */}
            <div>
              {product.badges?.[0] && (
                <span className="text-eyebrow text-clay-600">{product.badges[0]}</span>
              )}
              <h1 className="mt-2 font-serif text-[clamp(2rem,1.6rem+1.8vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.015em] text-oat-900">
                {product.name}
              </h1>
              <p className="mt-3 text-2xl font-medium tabular-nums text-oat-900">
                from ${(product.priceFrom / 100).toFixed(0)}
              </p>
              <p className="measure mt-5 text-lg leading-relaxed text-oat-700">{product.description}</p>

              <PdpPurchase product={product} />

              <dl className="mt-10 divide-y divide-oat-200 border-t border-oat-200">
                {details.map((d) => (
                  <div key={d.label} className="flex justify-between gap-6 py-3.5">
                    <dt className="text-sm text-oat-500">{d.label}</dt>
                    <dd className="text-right text-sm font-medium text-oat-900">{d.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 text-sm leading-relaxed text-oat-600">
                Free shipping over $75 and a 30-day return window. Every frame is covered for life against defects.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <h2 className="font-serif text-2xl font-medium text-oat-900 sm:text-3xl">Pairs well with</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          productJsonLd({
            name: product.name,
            slug: product.slug,
            description: product.description,
            priceFrom: product.priceFrom,
            image: product.art,
            material: material.label,
          }),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Shop", path: "/shop" },
            ...(collection ? [{ name: collection.name, path: `/shop/${collection.slug}` }] : []),
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        )}
      />
    </SiteShell>
  );
}
