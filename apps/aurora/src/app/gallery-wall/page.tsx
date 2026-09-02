import type { Metadata } from "next";
import Link from "next/link";
import { Layers, Ruler, Frame as FrameIcon, Package } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { GalleryWallArrangement } from "@/components/shop/gallery-wall-arrangement";
import { GallerySets } from "@/components/sections/gallery-sets";
import { FaqSection } from "@/components/sections/faq";
import { ClosingCta } from "@/components/sections/closing-cta";
import { gallerySets } from "@/content/gallery-sets";
import { testimonials } from "@/content/testimonials";
import { landingFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Wall Sets",
  description: "Curated sets of wall art that already work together, with a hanging template so the whole wall goes up straight the first time.",
  path: "/gallery-wall",
});

const valueProps = [
  { icon: Layers, title: "Curated combinations", body: "Pieces and sizes chosen to balance on a wall, so nothing fights for attention." },
  { icon: Ruler, title: "Template included", body: "Tape it up, mark the spots, hang. Straight on the first try, no math." },
  { icon: FrameIcon, title: "One considered wall", body: "Every piece in a set is balanced in colour and scale, so the wall reads as one." },
  { icon: Package, title: "Ships ready", body: "Hardware in the box and every piece finished, protected, and ready the day it lands." },
];

export default function GalleryWallPage() {
  const hero = gallerySets[0];
  const quotes = testimonials.slice(0, 2);

  return (
    <SiteShell>
      {/* Hero */}
      <Section tone="base" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(90% 60% at 50% -10%, rgba(217,164,65,0.10), transparent 60%)" }}
        />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="rise text-eyebrow text-gold-500">Wall Sets</p>
            <h1 className="rise mt-4 font-heading text-[clamp(2.5rem,1.8rem+3.4vw,4rem)] leading-[1.03] font-medium tracking-[-0.02em] text-carbon-50" style={{ ["--rise-delay" as string]: "70ms" }}>
              One box. A whole wall.
            </h1>
            <p className="rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-carbon-200" style={{ ["--rise-delay" as string]: "150ms" }}>
              A curated set of pieces that already work together, with a hanging template so it goes up straight the
              first time.
            </p>
            <div className="rise mt-8 flex justify-center" style={{ ["--rise-delay" as string]: "230ms" }}>
              <Button asChild size="lg">
                <Link href="#sets">Shop wall sets</Link>
              </Button>
            </div>
          </div>

          <Reveal className="mt-14 sm:mt-16" y={28}>
            <div className="mx-auto max-w-4xl rounded-2xl bg-carbon-900/60 p-5 sm:p-10">
              <GalleryWallArrangement material={hero.material} pieces={hero.pieces} weight="md" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Value proposition */}
      <Section tone="panel">
        <Container>
          <h2 className="max-w-2xl font-heading text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-carbon-50">
            Everything a good wall needs, and nothing it does not.
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {valueProps.map((v, i) => (
              <Reveal key={v.title} delay={i * 70} y={18}>
                <div className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-500/10 text-gold-500">
                    <v.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-carbon-50">{v.title}</h3>
                    <p className="mt-1.5 text-carbon-300">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Sets (primary offer) */}
      <GallerySets tone="base" heading="See it on a wall." lead="Three ways in, sized for real rooms. Each ships with a hanging template." id="sets" />

      {/* Focused social proof */}
      <Section tone="raise" size="sm">
        <Container className="grid gap-10 md:grid-cols-2">
          {quotes.map((t) => (
            <figure key={t.id}>
              <blockquote className="font-heading text-xl leading-snug text-carbon-50">{`“${t.quote}”`}</blockquote>
              <figcaption className="mt-4 text-sm text-carbon-300">
                <span className="font-medium text-carbon-50">{t.name}</span> · {t.location} · {t.context}
              </figcaption>
            </figure>
          ))}
        </Container>
      </Section>

      <FaqSection faqs={landingFaqs} heading="Before you hang." tone="panel" />

      <ClosingCta
        heading="Hang your wall this weekend."
        sub="One box, a template, and an afternoon. That is the whole project."
        ctaLabel="Shop wall sets"
        ctaHref="#sets"
      />
    </SiteShell>
  );
}
