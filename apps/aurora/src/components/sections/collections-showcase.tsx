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
  clocks: "/images/products/decor-01.jpeg",
  led: "/images/products/decor-04.jpeg",
  sports: "/images/products/decor-02.jpeg",
  cars: "/images/product.jpeg",
};

export function CollectionsShowcase() {
  return (
    <Section tone="base">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-heading text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-carbon-50">
              Four collections. One{" "}
              <span className="relative inline-block">
                finish
                <DrawUnderline className="absolute -bottom-1.5 left-0 h-[0.42em] w-full" />
              </span>
              .
            </h2>
            <p className="measure mt-4 text-carbon-200">
              Clocks, LED art, sports legends and metal car pieces, each cut from steel and hand-finished to hang like a statement.
            </p>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-medium text-race-500 transition-colors hover:text-race-500"
          >
            See everything
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
          {collections.map((collection, i) => (
            <Reveal key={collection.id} delay={(i % 4) * 80} y={20}>
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
                  <h3 className="font-heading text-xl font-medium text-carbon-50 transition-colors group-hover:text-race-500">
                    {collection.name}
                  </h3>
                  <span className="shrink-0 text-sm tabular-nums text-carbon-300">{formatPriceFrom(collection.priceFrom)}</span>
                </div>
                <p className="mt-1 text-sm text-carbon-300">{collection.tagline}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
