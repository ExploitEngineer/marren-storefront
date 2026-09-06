import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Payment cancelled",
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <SiteShell showAnnouncement={false}>
      <Section tone="base">
        <Container>
          <div className="measure-wide">
            <h1 className="font-heading text-[clamp(2rem,1.6rem+1.8vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.015em] text-carbon-50">
              Payment cancelled.
            </h1>
            <p className="mt-4 text-lg text-carbon-200">
              Nothing has been charged and your cart is exactly as you left it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/checkout">Try again</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/shop">Keep browsing</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
