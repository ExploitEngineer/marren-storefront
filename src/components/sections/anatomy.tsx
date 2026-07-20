import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Frame } from "@/components/brand/frame";
import { Reveal } from "@/components/motion/reveal";
import { DrawSVG, DrawUnderline } from "@/components/motion/draw";

const parts = [
  { n: "01", title: "Solid hardwood moulding", body: "Milled from real oak, walnut, ash or brushed brass. Never foil-wrapped MDF." },
  { n: "02", title: "Acid-free window mat", body: "A conservation mount that lifts the print off the glazing and frames the image." },
  { n: "03", title: "Anti-glare glazing", body: "Shatter-resistant and low-reflection, so the photo reads clear from across the room." },
  { n: "04", title: "Ready-to-hang hardware", body: "Sawtooth and wire fitted in the studio, with a wall bumper tucked in the box." },
];

/** Corner crop-mark brackets that stroke themselves in around the framed art. */
function CropMarks() {
  return (
    <DrawSVG
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      delay={140}
      className="pointer-events-none absolute inset-0 h-full w-full text-clay-500/70"
    >
      <path className="draw" pathLength={1} d="M1 13 V1 H13" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <path className="draw" pathLength={1} d="M99 13 V1 H87" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <path className="draw" pathLength={1} d="M1 87 V99 H13" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <path className="draw" pathLength={1} d="M99 87 V99 H87" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
    </DrawSVG>
  );
}

export function Anatomy() {
  return (
    <Section tone="surface">
      <Container>
        <div className="max-w-xl">
          <h2 className="font-serif text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-oat-900">
            Anatomy of a{" "}
            <span className="relative inline-block">
              Marren frame
              <DrawUnderline className="absolute -bottom-1.5 left-0 h-[0.42em] w-full" />
            </span>
            .
          </h2>
          <p className="measure mt-4 text-oat-700">
            Every frame arrives as one finished object, hung and gone in a minute. Here is what is doing the work inside the box.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:mt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Framed art with drawn registration marks */}
          <Reveal y={24}>
            <div className="relative mx-auto w-full max-w-sm p-8 sm:p-10">
              <CropMarks />
              <Frame
                material="walnut"
                src="/images/art/06.jpg"
                alt="A walnut Marren frame holding a photographic print, shown with registration marks"
                ratio="4/5"
                weight="lg"
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 24vw"
              />
            </div>
          </Reveal>

          {/* Annotated part list */}
          <ol className="space-y-7 sm:space-y-8">
            {parts.map((part, i) => (
              <Reveal key={part.n} delay={i * 90} y={16}>
                <li className="flex items-start gap-4 sm:gap-5">
                  <div className="flex w-20 shrink-0 items-center gap-2 pt-1 sm:w-24">
                    <span className="font-serif text-lg text-clay-600 tabular-nums">{part.n}</span>
                    <DrawSVG viewBox="0 0 52 8" delay={i * 90 + 160} className="h-2 flex-1 text-oat-300" style={{ ["--dot-delay" as string]: `${i * 90 + 900}ms` }}>
                      <line className="draw" pathLength={1} x1="0" y1="4" x2="46" y2="4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                      <circle className="draw-dot" cx="49" cy="4" r="2.4" fill="var(--color-clay-500)" />
                    </DrawSVG>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-medium text-oat-900">{part.title}</h3>
                    <p className="mt-1 text-oat-600">{part.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
