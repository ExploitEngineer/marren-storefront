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
    <Section id="frame-finder" tone="cream">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-serif text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-oat-900">
            Two easy ways in.
          </h2>
          <p className="measure mt-4 text-oat-700">
            No custom builder, no guesswork. Tell us what you are framing, or start from a wall we have already arranged.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal y={24}>
            <FrameFinder />
          </Reveal>

          <Reveal delay={90} y={24}>
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl bg-oat-900 p-6 text-oat-100 sm:p-8">
              <div>
                <span className="text-eyebrow text-clay-300">Gallery Wall Sets</span>
                <h3 className="mt-3 font-serif text-2xl font-medium text-oat-50 sm:text-3xl">Gallery walls, already arranged.</h3>
                <p className="mt-3 max-w-md text-oat-100/75">
                  Pre-curated sets of frames that work together out of the box, with a hanging template so it goes up
                  straight the first time.
                </p>
              </div>

              <GalleryWallArrangement material={teaser.material} pieces={teaser.pieces.slice(0, 3)} weight="sm" />

              <Link
                href="/gallery-wall"
                className="group inline-flex items-center gap-2 font-medium text-clay-300 transition-colors hover:text-clay-200"
              >
                Shop Gallery Wall Sets
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
