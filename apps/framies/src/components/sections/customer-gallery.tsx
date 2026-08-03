import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { customerGallery } from "@/content/customer-gallery";

export function CustomerGallery() {
  return (
    <Section tone="base">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-eyebrow text-race-500">Customer gallery</span>
            <h2 className="mt-3 font-heading text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-carbon-50">
              On walls everywhere.
            </h2>
          </div>
          <p className="text-sm text-carbon-300">
            Tag <span className="font-medium text-race-400">@framies</span> to be featured.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {customerGallery.map((shot, i) => (
            <Reveal key={shot.id} delay={i * 60} y={20}>
              <figure className="group relative overflow-hidden rounded-xl ring-1 ring-white/10">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 23vw"
                    className="object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between gap-2 p-3 text-xs opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-medium text-white">{shot.handle}</span>
                  <span className="text-white/70">{shot.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
