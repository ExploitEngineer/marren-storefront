import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { GalleryWallArrangement } from "@/components/shop/gallery-wall-arrangement";
import { AddSetButton } from "@/components/shop/add-set-button";
import { gallerySets } from "@/content/gallery-sets";
import { formatPrice } from "@/lib/format";

interface GallerySetsProps {
  heading?: string;
  lead?: string;
  id?: string;
  tone?: "cream" | "surface" | "oat";
}

export function GallerySets({
  heading = "Sets that hang together.",
  lead = "Curated combinations of builds, balanced to fill a wall, each with a hanging template in the box.",
  id = "sets",
  tone = "surface",
}: GallerySetsProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <div className="max-w-2xl">
          <span className="text-eyebrow text-race-500">Garage Wall Sets</span>
          <h2 className="mt-3 font-heading text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-carbon-50">
            {heading}
          </h2>
          <p className="measure mt-4 text-carbon-200">{lead}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {gallerySets.map((set, i) => (
            <Reveal key={set.id} delay={i * 90} y={22}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-carbon-800 bg-background">
                <div className="border-b border-carbon-800 bg-carbon-900/60 p-6">
                  <GalleryWallArrangement material={set.material} pieces={set.pieces} weight="sm" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-heading text-xl font-medium text-carbon-50">{set.name}</h3>
                    <span className="rounded-full bg-carbon-800 px-2.5 py-0.5 text-xs font-medium text-carbon-300">
                      Save {formatPrice(set.savings)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-carbon-300">
                    {set.frameCount} frames · {set.dimensions}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-carbon-300">{set.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-lg font-semibold tabular-nums text-carbon-50">{formatPrice(set.price)}</span>
                    <AddSetButton id={set.id} name={set.name} frameCount={set.frameCount} price={set.price} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
