"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { testimonials } from "@/content/testimonials";
import { press } from "@/content/press";
import { easeOutQuint } from "@/lib/motion";

const AUTOPLAY = 6000;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex justify-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < count ? "size-4 fill-race-500 text-race-500" : "size-4 text-carbon-600"}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const count = testimonials.length;
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((step: number) => setState(([i]) => [(i + step + count) % count, step]), [count]);
  const jump = useCallback((to: number) => setState(([i]) => [to, to > i ? 1 : -1]), []);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setState(([i]) => [(i + 1) % count, 1]), AUTOPLAY);
    return () => clearInterval(t);
  }, [reduce, paused, count]);

  const active = testimonials[index];
  const shift = reduce ? 0 : 48;

  return (
    <Section tone="panel">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <h2 className="max-w-2xl font-heading text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-carbon-50">
            Hung, and happy.
          </h2>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid size-11 place-items-center rounded-full border border-carbon-700 text-carbon-200 transition-colors hover:border-race-500 hover:text-race-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="size-[1.15rem]" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid size-11 place-items-center rounded-full border border-carbon-700 text-carbon-200 transition-colors hover:border-race-500 hover:text-race-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowRight className="size-[1.15rem]" />
            </button>
          </div>
        </div>

        <div
          className="relative mt-10 min-h-[19rem] sm:min-h-[16rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.figure
              key={active.id}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? shift : -shift }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir >= 0 ? -shift : shift }}
              transition={{ duration: reduce ? 0 : 0.5, ease: easeOutQuint }}
              className="mx-auto max-w-3xl text-center"
            >
              <Stars count={active.rating} />
              <blockquote className="mt-6 font-heading text-[clamp(1.35rem,1.1rem+1.1vw,2rem)] leading-snug font-medium tracking-[-0.01em] text-balance text-carbon-50">
                <span className="text-race-500">&ldquo;</span>
                {active.quote}
                <span className="text-race-500">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium text-carbon-100">{active.name}</span>
                <span className="text-carbon-400"> · {active.location}</span>
                <span className="mt-0.5 block text-carbon-400">{active.context}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2.5">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => jump(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-race-500" : "w-1.5 bg-carbon-600 hover:bg-carbon-400"
              }`}
            />
          ))}
        </div>

        {/* Press marquee */}
        <div className="mt-16 border-t border-carbon-800 pt-8">
          <p className="text-center text-xs font-medium tracking-[0.14em] text-carbon-400 uppercase">As seen in</p>
          <div className="group relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="marquee-track flex w-max items-center gap-14">
              {[...press, ...press].map((name, i) => (
                <span key={i} className="font-heading text-2xl text-carbon-500" aria-hidden={i >= press.length}>
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
