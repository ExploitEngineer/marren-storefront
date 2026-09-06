import type { Material } from "@/content/collections";
import { products, productsByMaterial, type FrameSize, type Product } from "@/content/products";
import { priceFrom } from "@/lib/pricing";

export interface ShopQuery {
  material?: string;
  size?: string;
  style?: string;
  sort?: string;
}

export function filterAndSortProducts(query: ShopQuery, source: Product[] = products): Product[] {
  let list = source.filter((p) => {
    if (query.material && p.material !== query.material) return false;
    if (query.size && !p.variants.some((v) => v.size === query.size)) return false;
    if (query.style && p.style !== query.style) return false;
    return true;
  });

  switch (query.sort) {
    case "price-asc":
      list = [...list].sort((a, b) => priceFrom(a) - priceFrom(b));
      break;
    case "price-desc":
      list = [...list].sort((a, b) => priceFrom(b) - priceFrom(a));
      break;
    case "newest":
      list = [...list].sort((a, b) => Number(b.badges?.includes("New")) - Number(a.badges?.includes("New")));
      break;
    default: // featured: bestsellers first, preserve source order otherwise
      list = [...list].sort((a, b) => Number(b.badges?.includes("Bestseller")) - Number(a.badges?.includes("Bestseller")));
  }

  return list;
}

/** Display order for the size filter, widest concept first within each shape. */
const SIZE_ORDER: FrameSize[] = [
  "12x16 in",
  "12x24 in",
  "16x24 in",
  "12 in round",
  "16 in round",
  "24 in round",
  "32 in round",
];

export interface SizeFacets {
  /** Width x height pieces. */
  rect: FrameSize[];
  /** Diameter pieces (clocks). */
  round: FrameSize[];
}

/**
 * The sizes actually present in the catalogue, derived rather than hardcoded,
 * so adding a size to one product can never desync the filter chips.
 */
export function sizeFacets(source: Product[] = products): SizeFacets {
  const present = new Set<FrameSize>();
  for (const p of source) for (const v of p.variants) present.add(v.size);
  const ordered = SIZE_ORDER.filter((s) => present.has(s));
  return {
    rect: ordered.filter((s) => !s.includes("round")),
    round: ordered.filter((s) => s.includes("round")),
  };
}

/** Cheapest piece in a category. Derived, so it cannot go stale against the catalogue. */
export function collectionPriceFrom(material: Material): number {
  return Math.min(...productsByMaterial(material).map(priceFrom));
}
