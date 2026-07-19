import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/layout/site-shell";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "Marren is a small studio with one belief: the right frame turns a photo into something you keep.",
  path: "/about",
});

const pillars = [
  {
    title: "The beginning",
    body: "Framing a photograph should not require a trip to a custom shop or a small fortune. We built Marren to make the good version simple: a tight range, honest prices, ready to hang.",
  },
  {
    title: "The materials",
    body: "FSC-certified woods and brushed brass, low-glare shatter-resistant glazing, finished in small batches. We use what we would hang in our own homes, and nothing we would not.",
  },
  {
    title: "The standard",
    body: "Every frame is built to the same spec and covered for life against defects. A wall you love should stay that way for as long as you own it.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <Section tone="cream" size="sm">
        <Container className="max-w-3xl">
          <p className="text-eyebrow text-clay-600">Our story</p>
          <h1 className="mt-4 font-serif text-[clamp(2.25rem,1.7rem+2.6vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.02em] text-oat-900">
            We make the frame, so the moment lands.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-oat-700">
            Marren is a small studio with one belief: the right frame turns a photo into something you keep.
          </p>
        </Container>
      </Section>

      <Section tone="cream" size="sm" className="pt-0">
        <Container>
          <Reveal y={24}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg ring-1 ring-oat-900/5">
              <Image src="/images/scenes/studio.jpg" alt="Timber and finished frames on a workbench in the Marren studio" fill sizes="(max-width: 1280px) 92vw, 1120px" className="object-cover" priority />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="oat">
        <Container>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:divide-x lg:divide-oat-300">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} y={18}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <h2 className="font-serif text-2xl font-medium text-oat-900">{p.title}</h2>
                  <p className="mt-4 leading-relaxed text-oat-700">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingCta heading="Come find your frame." ctaLabel="Shop frames" ctaHref="/shop" />
    </SiteShell>
  );
}
