import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { DrawSVG } from "@/components/motion/draw";

interface ClosingCtaProps {
  heading?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function ClosingCta({
  heading = "Your garage wall is waiting.",
  sub,
  ctaLabel = "Shop builds",
  ctaHref = "/shop",
}: ClosingCtaProps) {
  return (
    <Section tone="contrast" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(80% 120% at 50% 0%, rgba(225,6,0,0.20), transparent 60%)" }}
      />
      <Container className="relative text-center">
        <Reveal y={20}>
          <DrawSVG viewBox="0 0 40 40" delay={120} className="mx-auto mb-6 h-9 w-9 text-race-400">
            <path className="draw" pathLength={1} d="M4 4 H36 V36 H4 Z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
            <path className="draw" pathLength={1} d="M12 12 H28 V28 H12 Z" stroke="currentColor" strokeWidth={1} strokeLinejoin="round" style={{ ["--draw-delay" as string]: "360ms" }} />
          </DrawSVG>
          <h2 className="mx-auto max-w-2xl font-heading text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.015em] text-carbon-50">
            {heading}
          </h2>
          {sub && <p className="mx-auto mt-4 max-w-xl text-carbon-100/75">{sub}</p>}
          <div className="mt-8">
            <Magnetic>
              <Button asChild size="lg" variant="inverse">
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
