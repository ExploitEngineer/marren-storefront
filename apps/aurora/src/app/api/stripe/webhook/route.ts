import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { stripeWebhookSecret } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * There is no database yet, so this endpoint deliberately does one thing:
 * verify the signature and write a structured, searchable log line. Nothing
 * user-visible depends on it - the success page verifies the session itself,
 * and the cart is cleared there. It exists so that the day an email or
 * WhatsApp notification is added, the verified seam already exists.
 */
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  // Must be the raw body: request.json() breaks signature verification.
  const raw = await request.text();

  let event;
  try {
    event = await getStripe().webhooks.constructEventAsync(raw, signature, stripeWebhookSecret());
  } catch (error) {
    console.error("[stripe-webhook] signature verification failed", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    try {
      const full = await getStripe().checkout.sessions.retrieve(session.id, { expand: ["line_items"] });
      console.info(
        "[order]",
        JSON.stringify({
          sessionId: full.id,
          paymentStatus: full.payment_status,
          amountTotal: full.amount_total,
          currency: full.currency,
          email: full.customer_details?.email ?? null,
          shipping: full.metadata ?? null,
          items: (full.line_items?.data ?? []).map((li) => ({
            description: li.description,
            quantity: li.quantity,
            amount: li.amount_total,
          })),
        }),
      );
    } catch (error) {
      console.error("[stripe-webhook] could not expand session", session.id, error);
    }
  }

  return NextResponse.json({ received: true });
}
