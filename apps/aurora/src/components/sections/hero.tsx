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
      {/* warm gold ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 88% -8%, rgba(217,164,65,0.14), transparent 55%), radial-gradient(90% 70% at -5% 0%, rgba(192,24,31,0.08), transparent 52%)",
        }}
      />
      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="rise flex items-center gap-3 text-eyebrow text-race-500" style={{ ["--rise-delay" as string]: "0ms" }}>
            <span aria-hidden className="h-px w-8 bg-race-300" />
            Hand-finished, ready to hang
          </p>
          <h1
            className="rise mt-5 font-heading text-[clamp(2.75rem,1.9rem+4vw,4.5rem)] leading-[1.02] font-medium tracking-[-0.02em] text-carbon-50"
            style={{ ["--rise-delay" as string]: "70ms" }}
          >
            Metal and light, on your{" "}
            <span className="relative inline-block">
              wall.
              <DrawUnderline className="absolute -bottom-1 left-0 h-[0.4em] w-full" delay={520} />
            </span>
          </h1>
          <p
            className="rise measure mt-6 text-lg leading-relaxed text-carbon-200"
            style={{ ["--rise-delay" as string]: "150ms" }}
          >
            Hand-finished metal and LED wall art, statement clocks, and fully custom pieces, cut from steel and ready to hang the day they land.
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ ["--rise-delay" as string]: "230ms" }}>
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/shop">Shop the collection</Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="secondary">
              <Link href="/shop/led">LED wall art</Link>
            </Button>
          </div>
          <p className="rise mt-6 text-sm text-carbon-400" style={{ ["--rise-delay" as string]: "300ms" }}>
            Free shipping over $75 · Lifetime guarantee
          </p>
        </div>

        {/* Cluster: varied sizes, slight tilt, opposing parallax on a soft wall */}
        <div className="rise relative" style={{ ["--rise-delay" as string]: "180ms", ["--rise-y" as string]: "1.75rem" }}>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-10"
            style={{ background: "radial-gradient(58% 52% at 56% 42%, rgba(217,164,65,0.12), transparent 72%)" }}
          />
          <div className="mx-auto grid max-w-lg grid-cols-2 gap-5 sm:gap-6 lg:max-w-none">
            <Parallax offset={26} className="flex flex-col gap-5 pt-12 sm:gap-6">
              <div style={{ rotate: "-1.6deg" }}>
                <Frame material="clocks" src="/images/products/decor-01.jpeg" alt="Aurelia gold wall clock" ratio="3/4" weight="lg" interactive priority sizes="(max-width:1024px) 46vw, 26vw" />
              </div>
              <div style={{ rotate: "2deg" }}>
                <Frame material="sports" src="/images/products/decor-13.jpeg" alt="Mbappe LED ring wall art" ratio="1/1" weight="sm" interactive sizes="(max-width:1024px) 42vw, 22vw" />
              </div>
            </Parallax>
            <Parallax offset={-16} className="flex flex-col gap-5 sm:gap-6">
              <div style={{ rotate: "1.4deg" }}>
                <Frame material="cars" src="/images/product.jpeg" alt="BMW M4 LED wall art" ratio="4/5" interactive priority sizes="(max-width:1024px) 42vw, 24vw" />
              </div>
              <div style={{ rotate: "-1.2deg" }}>
                <Frame material="led" src="/images/products/decor-16.jpeg" alt="Galloping horse LED wall art" ratio="4/5" interactive sizes="(max-width:1024px) 42vw, 24vw" />
              </div>
            </Parallax>
          </div>
        </div>
      </Container>
    </section>
  );
}
