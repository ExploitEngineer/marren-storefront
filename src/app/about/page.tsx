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
  description: "Framies is a small workshop with one belief: the car you love deserves to be on the wall, done properly.",
  path: "/about",
});

const pillars = [
  {
    title: "The beginning",
    body: "It started with a die-cast Chiron and a spare frame on a workbench. We wanted the cars we obsess over on the wall, done properly - so we built the good version and never stopped.",
  },
  {
    title: "The build",
    body: "Genuine metal die-cast models, hand-mounted mid-launch over a printed livery and a spec plate matched to the car, behind low-glare glass. No stickers, no shortcuts.",
  },
  {
    title: "The standard",
    body: "Every build ships to the same spec and is covered for life against defects. A wall you love should stay that way for as long as you own it.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <Section tone="base" size="sm">
        <Container className="max-w-3xl">
          <p className="text-eyebrow text-race-500">Our story</p>
          <h1 className="mt-4 font-heading text-[clamp(2.25rem,1.7rem+2.6vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.02em] text-carbon-50">
            We build the frame, so the car lands.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-carbon-200">
            Framies is a small workshop with one belief: the car you love deserves to be on the wall, done properly.
          </p>
        </Container>
      </Section>

      <Section tone="base" size="sm" className="pt-0">
        <Container>
          <Reveal y={24}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
              <Image src="/images/products/collection-trio.jpeg" alt="Three finished Framies builds - two Porsche 911s and a Nissan GT-R - laid out on a workbench" fill sizes="(max-width: 1280px) 92vw, 1120px" className="object-cover" priority />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="raise">
        <Container>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:divide-x lg:divide-carbon-700">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} y={18}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <h2 className="font-heading text-2xl font-medium text-carbon-50">{p.title}</h2>
                  <p className="mt-4 leading-relaxed text-carbon-200">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingCta heading="Come find your car." ctaLabel="Shop builds" ctaHref="/shop" />
    </SiteShell>
  );
}
