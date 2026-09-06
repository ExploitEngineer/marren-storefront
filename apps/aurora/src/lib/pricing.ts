import type { FrameSize, Product, ProductVariant } from "@/content/products";

/** Cheapest variant price, in paisa. Safe because `variants` is non-empty by type. */
export function priceFrom(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price));
}

/** Dearest variant price, in paisa. Used for the AggregateOffer high price. */
export function priceTo(product: Product): number {
  return Math.max(...product.variants.map((v) => v.price));
}

export function findVariant(product: Product, size: string): ProductVariant | undefined {
  return product.variants.find((v) => v.size === size);
}

/**
 * Percentage off, derived from the two prices and rounded. Never hardcode this:
 * a stored percentage drifts from the prices printed beside it.
 * Returns null when there is nothing to advertise, so the badge is simply absent.
 */
export function discountPercent(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round((1 - price / compareAtPrice) * 100);
}

/** The best percentage across a product's ladder, for the shop card chip. */
export function maxDiscountPercent(product: Product): number | null {
  const best = Math.max(...product.variants.map((v) => discountPercent(v.price, v.compareAtPrice) ?? 0));
  return best > 0 ? best : null;
}

export function sizesOf(product: Product): FrameSize[] {
  return product.variants.map((v) => v.size);
}
