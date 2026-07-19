/** Money is stored as integer cents throughout; format at the edge. */

export function formatPrice(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function formatPriceFrom(cents: number, currency = "USD"): string {
  return `from ${formatPrice(cents, currency)}`;
}
