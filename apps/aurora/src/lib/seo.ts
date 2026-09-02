import type { Metadata } from "next";
import { site } from "@/content/site";

const baseUrl = site.url;

interface PageMetaInput {
  title?: string;
  description?: string;
  path?: string;
  images?: string[];
}

/** Build consistent per-route metadata (title, canonical, OG, Twitter). */
export function pageMetadata({
  title,
  description = site.description,
  path = "/",
  images = ["/images/product.jpeg"],
}: PageMetaInput = {}): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · ${site.tagline}`;
  const url = `${baseUrl}${path}`;

  return {
    title: title ?? undefined,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      url,
      locale: site.locale,
      images: images.map((src) => ({ url: src, width: 1200, height: 630 })),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}

/** Sitewide Organization JSON-LD. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
    url: baseUrl,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressLocality: site.contact.city,
      addressCountry: site.countryCode,
    },
    sameAs: site.socials.map((s) => s.href),
  };
}

interface ItemListEntry {
  name: string;
  slug: string;
}

/** ItemList JSON-LD for a product listing (Shop / collection). */
export function itemListJsonLd(items: ItemListEntry[], name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseUrl}/products/${item.slug}`,
      name: item.name,
    })),
  };
}

interface ProductLd {
  name: string;
  slug: string;
  description: string;
  /** The product's price ladder, in paisa. */
  variants: readonly { size: string; price: number }[];
  image: string;
  material: string;
}

/** Paisa to the major-unit decimal string schema.org expects. */
const ld = (paisa: number) => (paisa / 100).toFixed(2);

/** Product JSON-LD with an offer, for a PDP. */
export function productJsonLd(p: ProductLd) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: `${baseUrl}${p.image}`,
    material: p.material,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      // AggregateOffer, because a piece is sold in several sizes at several prices.
      "@type": "AggregateOffer",
      priceCurrency: site.currency,
      lowPrice: ld(Math.min(...p.variants.map((v) => v.price))),
      highPrice: ld(Math.max(...p.variants.map((v) => v.price))),
      offerCount: p.variants.length,
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/products/${p.slug}`,
    },
  };
}

/** BreadcrumbList JSON-LD. */
export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${baseUrl}${c.path}`,
    })),
  };
}

/** Small helper to embed a JSON-LD object as a script tag payload. */
export function jsonLdScript(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data) };
}

export { baseUrl };
