/** Money is stored as integer paisa throughout; format at the edge. */

/**
 * Deliberately not `style: "currency"`. The PKR symbol ICU emits differs
 * between the Node build on Vercel and the browser's own ICU, which shows up
 * as a hydration mismatch on a price. Format the number only and prefix a
 * literal "Rs".
 */
const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatPrice(paisa: number): string {
  return `Rs ${nf.format(Math.round(paisa / 100))}`;
}

export function formatPriceFrom(paisa: number): string {
  return `from ${formatPrice(paisa)}`;
}
