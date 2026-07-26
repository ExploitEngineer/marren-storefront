import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { FrameFinder } from "@/components/shop/frame-finder";
import { GalleryWallArrangement } from "@/components/shop/gallery-wall-arrangement";
import { gallerySets } from "@/content/gallery-sets";

export function Signature() {
  const teaser = gallerySets[0];

  return (
    <Section id="frame-finder" tone="base">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-heading text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-carbon-50">
            Two easy ways in.
          </h2>
          <p className="measure mt-4 text-carbon-200">
            No custom builder, no guesswork. Tell us which car you want, or start from a garage wall we have already arranged.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal y={24}>
            <FrameFinder />
          </Reveal>

          <Reveal delay={90} y={24}>
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl bg-carbon-850 p-6 text-carbon-100 ring-1 ring-white/5 sm:p-8">
              <div>
                <span className="text-eyebrow text-race-400">Garage Wall Sets</span>
                <h3 className="mt-3 font-heading text-2xl font-medium text-carbon-50 sm:text-3xl">Garage walls, already arranged.</h3>
                <p className="mt-3 max-w-md text-carbon-100/75">
                  Pre-curated sets of builds that work together out of the box, with a hanging template so it goes up
                  straight the first time.
                </p>
              </div>

              <GalleryWallArrangement material={teaser.material} pieces={teaser.pieces.slice(0, 3)} weight="sm" />

              <Link
                href="/gallery-wall"
                className="group inline-flex items-center gap-2 font-medium text-race-400 transition-colors hover:text-race-300"
              >
                Shop Garage Wall Sets
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
