import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <SiteShell showAnnouncement={false}>
      <Section tone="base" size="sm">
        <Container>
          <h1 className="font-heading text-[clamp(2rem,1.6rem+1.8vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.015em] text-carbon-50">
            Checkout
          </h1>
          <p className="measure-wide mt-4 text-lg text-carbon-200">
            Tell us where it is going, then pay by card.
          </p>
        </Container>
      </Section>

      <Section tone="base" size="sm" className="pt-0">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
          <div>
            <h2 className="mb-6 text-eyebrow text-carbon-400">Delivery details</h2>
            <CheckoutForm />
          </div>
          <CheckoutSummary />
        </Container>
      </Section>
    </SiteShell>
  );
}
