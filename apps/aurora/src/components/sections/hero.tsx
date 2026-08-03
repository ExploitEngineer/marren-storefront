import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Frame } from "@/components/brand/frame";
import { Magnetic } from "@/components/motion/magnetic";
import { Parallax } from "@/components/motion/parallax";
import { DrawUnderline } from "@/components/motion/draw";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* warm ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 88% -8%, rgba(225,6,0,0.12), transparent 55%), radial-gradient(90% 70% at -5% 0%, rgba(43,108,255,0.06), transparent 52%)",
        }}
      />
      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="rise flex items-center gap-3 text-eyebrow text-race-500" style={{ ["--rise-delay" as string]: "0ms" }}>
            <span aria-hidden className="h-px w-8 bg-race-300" />
            Studio-built, ready to hang
          </p>
          <h1
            className="rise mt-5 font-heading text-[clamp(2.75rem,1.9rem+4vw,4.5rem)] leading-[1.02] font-medium tracking-[-0.02em] text-carbon-50"
            style={{ ["--rise-delay" as string]: "70ms" }}
          >
            Your dream car, on{" "}
            <span className="relative inline-block">
              display.
              <DrawUnderline className="absolute -bottom-1 left-0 h-[0.4em] w-full" delay={520} />
            </span>
          </h1>
          <p
            className="rise measure mt-6 text-lg leading-relaxed text-carbon-200"
            style={{ ["--rise-delay" as string]: "150ms" }}
          >
            Genuine die-cast supercars, mounted and shadow-boxed with a printed spec plate, finished by hand and ready to hang the day they arrive.
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ ["--rise-delay" as string]: "230ms" }}>
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/shop">Shop the garage</Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="secondary">
              <Link href="#frame-finder">Find your car</Link>
            </Button>
          </div>
          <p className="rise mt-6 text-sm text-carbon-400" style={{ ["--rise-delay" as string]: "300ms" }}>
            Free shipping over $75 · Lifetime guarantee
          </p>
        </div>

        {/* Gallery-wall cluster: varied sizes, slight tilt, opposing parallax on a soft wall */}
        <div className="rise relative" style={{ ["--rise-delay" as string]: "180ms", ["--rise-y" as string]: "1.75rem" }}>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-10"
            style={{ background: "radial-gradient(58% 52% at 56% 42%, rgba(225,6,0,0.10), transparent 72%)" }}
          />
          <div className="mx-auto grid max-w-lg grid-cols-2 gap-5 sm:gap-6 lg:max-w-none">
            <Parallax offset={26} className="flex flex-col gap-5 pt-12 sm:gap-6">
              <div style={{ rotate: "-1.6deg" }}>
                <Frame material="bugatti" src="/images/products/bugatti-chiron-sport.jpeg" alt="Framed Bugatti Chiron Sport die-cast build" ratio="3/4" weight="lg" interactive priority sizes="(max-width:1024px) 46vw, 26vw" />
              </div>
              <div style={{ rotate: "2deg" }}>
                <Frame material="porsche" src="/images/products/porsche-911-carrera-s.jpeg" alt="Framed Porsche 911 Carrera S die-cast build" ratio="1/1" weight="sm" interactive sizes="(max-width:1024px) 42vw, 22vw" />
              </div>
            </Parallax>
            <Parallax offset={-16} className="flex flex-col gap-5 sm:gap-6">
              <div style={{ rotate: "1.4deg" }}>
                <Frame material="audi" src="/images/products/audi-r8-2.jpeg" alt="Framed Audi R8 V10 die-cast build" ratio="4/5" interactive priority sizes="(max-width:1024px) 42vw, 24vw" />
              </div>
              <div style={{ rotate: "-1.2deg" }}>
                <Frame material="porsche" src="/images/products/porsche-918-spyder.jpeg" alt="Framed Porsche 918 Spyder die-cast build" ratio="4/5" interactive sizes="(max-width:1024px) 42vw, 24vw" />
              </div>
            </Parallax>
          </div>
        </div>
      </Container>
    </section>
  );
}
