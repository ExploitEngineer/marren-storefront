import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

interface ClosingCtaProps {
  heading?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function ClosingCta({
  heading = "Your walls are waiting.",
  sub,
  ctaLabel = "Shop frames",
  ctaHref = "/shop",
}: ClosingCtaProps) {
  return (
    <Section tone="ink" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(80% 120% at 50% 0%, rgba(176,87,47,0.16), transparent 60%)" }}
      />
      <Container className="relative text-center">
        <Reveal y={20}>
          <span aria-hidden className="mx-auto mb-6 block h-8 w-8 rounded-[4px] border-2 border-clay-400/60" />
          <h2 className="mx-auto max-w-2xl font-serif text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.015em] text-oat-50">
            {heading}
          </h2>
          {sub && <p className="mx-auto mt-4 max-w-xl text-oat-100/75">{sub}</p>}
          <div className="mt-8">
            <Button asChild size="lg" variant="inverse">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
