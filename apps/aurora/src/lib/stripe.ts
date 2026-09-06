import "server-only";
import Stripe from "stripe";
import { stripeSecretKey } from "@/lib/env";

let client: Stripe | null = null;

/**
 * Lazy singleton. No explicit apiVersion: the installed SDK pins its own, and
 * hardcoding one is a string-literal type that breaks on every SDK bump.
 */
export function getStripe(): Stripe {
  if (!client) client = new Stripe(stripeSecretKey());
  return client;
}
