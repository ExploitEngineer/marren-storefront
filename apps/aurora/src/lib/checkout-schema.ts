import { z } from "zod";

export const MAX_QTY = 10;
export const MAX_LINES = 20;

/**
 * Every field caps at or under 500 characters, which is Stripe's per-metadata
 * value limit, so an address can never be silently truncated on the order record.
 */
export const deliverySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(80),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email.")
    .max(120),
  phone: z.string().trim().min(7, "Please enter a phone number we can reach you on.").max(32),
  line1: z.string().trim().min(4, "Please enter your street address.").max(200),
  city: z.string().trim().min(2, "Please enter your city.").max(80),
  postalCode: z.string().trim().min(3, "Please enter your postal code.").max(16),
  notes: z.string().trim().max(400).optional(),
});

export type DeliveryInput = z.infer<typeof deliverySchema>;

/**
 * What the client is allowed to say about a cart line: what it is and how many.
 * No name and no price - the server re-derives both from src/content.
 */
export const cartLineSchema = z.object({
  kind: z.enum(["product", "set"]),
  id: z.string().min(1).max(64),
  size: z.string().min(1).max(40),
  qty: z.number().int().min(1).max(MAX_QTY),
});

export const checkoutRequestSchema = z.object({
  address: deliverySchema,
  lines: z.array(cartLineSchema).min(1, "Your cart is empty.").max(MAX_LINES),
});

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;
