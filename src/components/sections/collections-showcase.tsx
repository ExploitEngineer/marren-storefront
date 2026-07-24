import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Frame } from "@/components/brand/frame";
import { Reveal } from "@/components/motion/reveal";
import { DrawUnderline } from "@/components/motion/draw";
import { collections } from "@/content/collections";
import { formatPriceFrom } from "@/lib/format";

const tileArt: Record<string, string> = {
  porsche: "/images/products/porsche-918-spyder.jpeg",
  audi: "/images/products/audi-r8-1.jpeg",
  bugatti: "/images/products/bugatti-chiron.jpeg",
  lamborghini: "/images/products/lamborghini-huracan.jpeg",
  nissan: "/images/products/collection-trio.jpeg",
};

export function CollectionsShowcase() {
  return (
    <Section tone="cream">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-serif text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-oat-900">
              Five marques. One{" "}
              <span className="relative inline-block">
                standard
                <DrawUnderline className="absolute -bottom-1.5 left-0 h-[0.42em] w-full" />
              </span>
              .
            </h2>
            <p className="measure mt-4 text-oat-700">
              Each collection is a single marque, hand-mounted and shadow-boxed to read like a museum plate.
            </p>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-medium text-clay-600 transition-colors hover:text-clay-700"
          >
            See all builds
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-5">
          {collections.map((collection, i) => (
            <Reveal key={collection.id} delay={(i % 5) * 80} y={20}>
              <Link href={`/shop/${collection.slug}`} className="group block rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background">
                <Frame
                  material={collection.material}
                  src={tileArt[collection.slug]}
                  alt={`${collection.name} frame, ${collection.tagline.toLowerCase()}`}
                  ratio="4/5"
                  interactive
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 22vw"
                />
                <div className="mt-4 flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-xl font-medium text-oat-900 transition-colors group-hover:text-clay-700">
                    {collection.name}
                  </h3>
                  <span className="shrink-0 text-sm tabular-nums text-oat-600">{formatPriceFrom(collection.priceFrom)}</span>
                </div>
                <p className="mt-1 text-sm text-oat-600">{collection.tagline}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
