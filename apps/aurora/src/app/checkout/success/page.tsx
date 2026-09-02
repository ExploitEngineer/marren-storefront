import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { ClearCartOnSuccess } from "@/components/checkout/clear-cart-on-success";
import { getStripe } from "@/lib/stripe";
import { formatPrice } from "@/lib/format";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface ConfirmedOrder {
  reference: string;
  email: string | null;
  total: number;
  lines: { name: string; qty: number; amount: number }[];
  shipping: string | null;
}

/** The query string is never trusted: the session is retrieved and checked. */
async function confirm(sessionId: string): Promise<ConfirmedOrder | null> {
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId, { expand: ["line_items"] });
    if (session.payment_status !== "paid") return null;

    const shipping = session.metadata
      ? [session.metadata.ship_name, session.metadata.ship_line1, session.metadata.ship_city, session.metadata.ship_postal]
          .filter(Boolean)
          .join(", ")
      : null;

    return {
      reference: session.id.slice(-12).toUpperCase(),
      email: session.customer_details?.email ?? null,
      total: session.amount_total ?? 0,
      lines: (session.line_items?.data ?? []).map((li) => ({
        name: li.description ?? "Item",
        qty: li.quantity ?? 1,
        amount: li.amount_total,
      })),
      shipping: shipping || null,
    };
  } catch (error) {
    console.error("[checkout] could not verify session", error);
    return null;
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const order = sessionId ? await confirm(sessionId) : null;

  return (
    <SiteShell showAnnouncement={false}>
      <Section tone="base">
        <Container>
          {order ? (
            <>
              <ClearCartOnSuccess />
              <div className="measure-wide">
                <span className="grid size-12 place-items-center rounded-full bg-gold-500/12 text-gold-500">
                  <CheckCircle2 className="size-6" />
                </span>
                <h1 className="mt-6 font-heading text-[clamp(2rem,1.6rem+1.8vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.015em] text-carbon-50">
                  Thank you, your order is confirmed.
                </h1>
                <p className="mt-4 text-lg text-carbon-200">
                  Order <span className="font-medium text-carbon-50 tabular-nums">{order.reference}</span>
                  {order.email && <> · a receipt is on its way to {order.email}</>}
                </p>

                <ul className="mt-8 divide-y divide-carbon-800 border-y border-carbon-800">
                  {order.lines.map((line) => (
                    <li key={line.name} className="flex items-start justify-between gap-4 py-3.5">
                      <span className="text-carbon-100">
                        {line.qty} × {line.name}
                      </span>
                      <span className="shrink-0 font-medium tabular-nums text-carbon-50">{formatPrice(line.amount)}</span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between gap-4 py-3.5">
                    <span className="font-medium text-carbon-50">Total paid</span>
                    <span className="font-semibold tabular-nums text-carbon-50">{formatPrice(order.total)}</span>
                  </li>
                </ul>

                {order.shipping && (
                  <p className="mt-6 text-sm leading-relaxed text-carbon-300">
                    Delivering to {order.shipping}. We will message you on {site.contact.phone} when it ships.
                  </p>
                )}

                <Button asChild className="mt-8">
                  <Link href="/shop">Keep browsing</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="measure-wide">
              <span className="grid size-12 place-items-center rounded-full bg-carbon-800 text-carbon-300">
                <AlertTriangle className="size-6" />
              </span>
              <h1 className="mt-6 font-heading text-[clamp(2rem,1.6rem+1.8vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.015em] text-carbon-50">
                We could not confirm this payment.
              </h1>
              <p className="mt-4 text-lg text-carbon-200">
                Your cart has been left as it was. If money has left your account, send us the details and we will sort it
                out.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/checkout">Back to checkout</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </SiteShell>
  );
}
