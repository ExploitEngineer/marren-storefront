import "server-only";

/**
 * Read at call time, never at module scope: `next build` evaluates modules
 * without the runtime environment, so a top-level read of a required secret
 * turns a missing variable into a failed build instead of a failed request.
 */
function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const stripeSecretKey = () => required("STRIPE_SECRET_KEY");
export const stripeWebhookSecret = () => required("STRIPE_WEBHOOK_SECRET");

/**
 * Absolute origin for Stripe's success and cancel URLs.
 * NEXT_PUBLIC_SITE_URL is set on production only, so previews fall back to
 * their own VERCEL_URL rather than sending a buyer to the live site.
 */
export function siteOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3001";
}
