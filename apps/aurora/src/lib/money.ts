/**
 * All money in this app is an integer number of PAISA (1 rupee = 100 paisa).
 *
 * Stripe treats PKR as a two-decimal currency, so `unit_amount` is paisa too:
 * a stored price passes straight through to Stripe with no multiplication
 * anywhere in the checkout path.
 */

/** Author a price in rupees; store paisa. */
export const pkr = (rupees: number): number => Math.round(rupees * 100);

/**
 * Identical to `pkr`, but marks a placeholder the owner still has to replace.
 * Find every one with: grep -rn "mockPkr" src/content
 */
export const mockPkr = (rupees: number): number => Math.round(rupees * 100);

/** Lowercase ISO code, the shape Stripe wants. */
export const STRIPE_CURRENCY = "pkr" as const;
