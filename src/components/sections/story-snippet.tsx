import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

export function StorySnippet() {
  return (
    <Section tone="raise">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal y={24}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
            <Image
              src="/images/products/bugatti-chiron-sport-shelf.jpeg"
              alt="A framed Bugatti Chiron Sport build styled on a shelf beside a plant"
              fill
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={90} y={24}>
          <div className="max-w-xl">
            <h2 className="font-heading text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-carbon-50">
              Made by people who love the cars.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-carbon-200">
              Framies started at a workbench with a die-cast Chiron and a spare frame. We wanted a way to put the cars we
              obsess over on the wall, done properly - real models, real spec plates, finished by hand. Every build still
              leaves that same bench.
            </p>
            <Link
              href="/about"
              className="group mt-7 inline-flex items-center gap-2 font-medium text-race-500 transition-colors hover:text-race-500"
            >
              Read our story
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
