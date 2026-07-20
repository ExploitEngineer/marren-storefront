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
            "radial-gradient(120% 80% at 88% -8%, rgba(176,87,47,0.08), transparent 55%), radial-gradient(90% 70% at -5% 0%, rgba(110,122,87,0.06), transparent 52%)",
        }}
      />
      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="rise flex items-center gap-3 text-eyebrow text-clay-600" style={{ ["--rise-delay" as string]: "0ms" }}>
            <span aria-hidden className="h-px w-8 bg-clay-300" />
            Ready to hang, made to last
          </p>
          <h1
            className="rise mt-5 font-serif text-[clamp(2.75rem,1.9rem+4vw,4.5rem)] leading-[1.02] font-medium tracking-[-0.02em] text-oat-900"
            style={{ ["--rise-delay" as string]: "70ms" }}
          >
            Frames worth the{" "}
            <span className="relative inline-block">
              wall.
              <DrawUnderline className="absolute -bottom-1 left-0 h-[0.4em] w-full" delay={520} />
            </span>
          </h1>
          <p
            className="rise measure mt-6 text-lg leading-relaxed text-oat-700"
            style={{ ["--rise-delay" as string]: "150ms" }}
          >
            Solid-wood picture frames, cut and finished to gallery standard, and ready to hang the day they arrive.
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ ["--rise-delay" as string]: "230ms" }}>
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/shop">Shop frames</Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="secondary">
              <Link href="#frame-finder">Find your frame</Link>
            </Button>
          </div>
          <p className="rise mt-6 text-sm text-oat-500" style={{ ["--rise-delay" as string]: "300ms" }}>
            Free shipping over $75 · Lifetime guarantee
          </p>
        </div>

        {/* Gallery-wall cluster: varied sizes, slight tilt, opposing parallax on a soft wall */}
        <div className="rise relative" style={{ ["--rise-delay" as string]: "180ms", ["--rise-y" as string]: "1.75rem" }}>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-10"
            style={{ background: "radial-gradient(58% 52% at 56% 42%, rgba(146,128,95,0.12), transparent 72%)" }}
          />
          <div className="mx-auto grid max-w-lg grid-cols-2 gap-5 sm:gap-6 lg:max-w-none">
            <Parallax offset={26} className="flex flex-col gap-5 pt-12 sm:gap-6">
              <div style={{ rotate: "-1.6deg" }}>
                <Frame material="walnut" src="/images/art/06.jpg" alt="A framed photograph in a walnut frame" ratio="3/4" weight="lg" interactive priority sizes="(max-width:1024px) 46vw, 26vw" />
              </div>
              <div style={{ rotate: "2deg" }}>
                <Frame material="brass" src="/images/art/11.jpg" alt="A small framed photograph in a brushed brass frame" ratio="1/1" weight="sm" interactive sizes="(max-width:1024px) 42vw, 22vw" />
              </div>
            </Parallax>
            <Parallax offset={-16} className="flex flex-col gap-5 sm:gap-6">
              <div style={{ rotate: "1.4deg" }}>
                <Frame material="oak" src="/images/art/03.jpg" alt="A framed landscape photograph in a light oak frame" ratio="4/5" interactive priority sizes="(max-width:1024px) 42vw, 24vw" />
              </div>
              <div style={{ rotate: "-1.2deg" }}>
                <Frame material="black-ash" src="/images/art/09.jpg" alt="A framed photograph in a near-black ash frame" ratio="4/5" interactive sizes="(max-width:1024px) 42vw, 24vw" />
              </div>
            </Parallax>
          </div>
        </div>
      </Container>
    </section>
  );
}
