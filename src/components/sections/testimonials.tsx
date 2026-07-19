import { Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/content/testimonials";
import { press } from "@/content/press";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={i < count ? "size-4 fill-clay-500 text-clay-500" : "size-4 text-oat-300"} aria-hidden />
      ))}
    </div>
  );
}

export function Testimonials() {
  const shown = testimonials.slice(0, 3);

  return (
    <Section tone="surface">
      <Container>
        <h2 className="max-w-2xl font-serif text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-oat-900">
          Hung, and happy.
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:divide-x lg:divide-oat-200">
          {shown.map((t, i) => (
            <Reveal key={t.id} delay={i * 80} y={18}>
              <figure className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <Stars count={t.rating} />
                <blockquote className="mt-4 font-serif text-xl leading-snug text-oat-900">{`“${t.quote}”`}</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-medium text-oat-900">{t.name}</span>
                  <span className="text-oat-500">
                    {" "}
                    · {t.location}
                  </span>
                  <span className="mt-0.5 block text-oat-500">{t.context}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Press marquee */}
        <div className="mt-16 border-t border-oat-200 pt-8">
          <p className="text-center text-xs font-medium tracking-[0.14em] text-oat-500 uppercase">As seen in</p>
          <div className="group relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="marquee-track flex w-max items-center gap-14">
              {[...press, ...press].map((name, i) => (
                <span key={i} className="font-serif text-2xl text-oat-400" aria-hidden={i >= press.length}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
