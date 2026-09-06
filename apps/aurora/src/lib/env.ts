import "server-only";

/**
 * Read at call time, never at module scope: `next build` evaluates modules
 * without the runtime environment, so a top-level read of a required secret
 * turns a missing variable into a failed build instead of a failed request.
 */
export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

function required(name: string): string {
  // Dashboards and copy-paste routinely add a trailing newline or space.
  const value = process.env[name]?.trim();
  if (!value) throw new ConfigError(`Missing required environment variable: ${name}`);
  return value;
}

/**
 * Guards against the mis-paste that actually happens: two secrets concatenated
 * into one variable. A Stripe key is a single token with no whitespace and
 * exactly one recognisable prefix.
 */
function requiredToken(name: string, prefixes: string[]): string {
  const value = required(name);
  if (/\s/.test(value)) {
    throw new ConfigError(`${name} contains whitespace; it should be a single token.`);
  }
  if (!prefixes.some((p) => value.startsWith(p))) {
    throw new ConfigError(`${name} should start with one of: ${prefixes.join(", ")}.`);
  }
  // A second prefix inside the value means two secrets were pasted together.
  const extra = ["sk_test_", "sk_live_", "whsec_", "pk_test_", "pk_live_"].find(
    (p) => value.indexOf(p, 1) > 0,
  );
  if (extra) {
    throw new ConfigError(`${name} appears to contain a second secret ("${extra}..."); check for a bad paste.`);
  }
  return value;
}

export const stripeSecretKey = () => requiredToken("STRIPE_SECRET_KEY", ["sk_test_", "sk_live_"]);
export const stripeWebhookSecret = () => requiredToken("STRIPE_WEBHOOK_SECRET", ["whsec_"]);

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
