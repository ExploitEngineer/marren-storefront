import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { checkoutRequestSchema } from "@/lib/checkout-schema";
import { getStripe } from "@/lib/stripe";
import { ConfigError, siteOrigin } from "@/lib/env";
import { STRIPE_CURRENCY } from "@/lib/money";
import { getProductById } from "@/content/products";
import { getGallerySetById } from "@/content/gallery-sets";
import { findVariant } from "@/lib/pricing";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PricedLine {
  name: string;
  size: string;
  /** Paisa, resolved server-side from src/content. */
  unitAmount: number;
  qty: number;
  image: string;
}

/**
 * Re-price every line from the catalogue. Nothing the client sent reaches the
 * amount, the currency or the product name: the client only says which item,
 * which size and how many.
 */
function priceLines(lines: ReturnType<typeof checkoutRequestSchema.parse>["lines"]): PricedLine[] | { error: string } {
  const priced: PricedLine[] = [];

  for (const line of lines) {
    if (line.kind === "product") {
      const product = getProductById(line.id);
      if (!product) return { error: `We no longer stock one of the items in your cart.` };
      const variant = findVariant(product, line.size);
      if (!variant) return { error: `${product.name} is no longer available in ${line.size}.` };
      priced.push({
        name: `${product.name} - ${variant.size}`,
        size: variant.size,
        unitAmount: variant.price,
        qty: line.qty,
        image: product.art,
      });
    } else {
      const set = getGallerySetById(line.id);
      if (!set) return { error: `One of the wall sets in your cart is no longer available.` };
      // The client's size is ignored; the server names the line itself.
      const size = `Set of ${set.frameCount}`;
      priced.push({
        name: `${set.name} - ${size}`,
        size,
        unitAmount: set.price,
        qty: line.qty,
        image: set.pieces[0],
      });
    }
  }

  for (const line of priced) {
    if (!Number.isInteger(line.unitAmount) || line.unitAmount <= 0) {
      return { error: "We could not price your order. Please contact us." };
    }
  }

  return priced;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = checkoutRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check your delivery details." }, { status: 400 });
  }

  const { address, lines } = parsed.data;
  const priced = priceLines(lines);
  if ("error" in priced) {
    return NextResponse.json({ ok: false, error: priced.error }, { status: 400 });
  }

  const origin = siteOrigin();
  const itemCount = priced.reduce((n, l) => n + l.qty, 0);

  // Flat keys rather than one JSON blob: a blob clipped at Stripe's 500-character
  // limit becomes unparseable, and reads badly in the dashboard.
  const orderMeta: Record<string, string> = {
    ship_name: address.name,
    ship_phone: address.phone,
    ship_line1: address.line1,
    ship_city: address.city,
    ship_postal: address.postalCode,
    ship_notes: address.notes ?? "",
    order_summary: priced.map((l) => `${l.qty}x ${l.name}`).join("; ").slice(0, 500),
    item_count: String(itemCount),
    source: site.name,
  };

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = priced.map((l) => ({
    quantity: l.qty,
    price_data: {
      currency: STRIPE_CURRENCY,
      unit_amount: l.unitAmount,
      product_data: {
        name: l.name,
        images: l.image.startsWith("http") ? [l.image] : [`${origin}${l.image}`],
      },
    },
  }));

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: address.email,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: orderMeta,
      payment_intent_data: {
        description: `${site.name} order · ${itemCount} item${itemCount === 1 ? "" : "s"}`,
        // Collected on our own page, so Stripe is told the address rather than
        // asking for it again.
        shipping: {
          name: address.name,
          phone: address.phone,
          address: {
            line1: address.line1,
            city: address.city,
            postal_code: address.postalCode,
            country: site.countryCode,
          },
        },
        metadata: orderMeta,
      },
    });

    if (!session.url) {
      return NextResponse.json({ ok: false, error: "Could not start checkout." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    console.error("[checkout] session create failed", error);

    // Server misconfiguration, not a buyer problem. The reason names the
    // variable but never its value, so it is safe to return.
    if (error instanceof ConfigError) {
      return NextResponse.json(
        { ok: false, code: "config", error: "Payments are not configured yet.", reason: error.message },
        { status: 503 },
      );
    }

    const type = (error as { type?: string })?.type;
    if (type === "StripeAuthenticationError") {
      return NextResponse.json(
        { ok: false, code: "stripe_auth", error: "Payments are not configured yet.", reason: "Stripe rejected the API key." },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { ok: false, code: "stripe", error: "Could not start checkout. Please try again.", reason: type ?? "unknown" },
      { status: 502 },
    );
  }
}
