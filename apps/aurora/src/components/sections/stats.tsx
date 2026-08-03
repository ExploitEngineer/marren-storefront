"use client";

import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { useInViewOnce } from "@/lib/use-in-view";
import { easeOutExpo } from "@/lib/motion";
import { stats, type Stat } from "@/content/stats";

function Counter({ stat }: { stat: Stat }) {
  const reduce = useReducedMotion();
  const { ref, shown } = useInViewOnce<HTMLSpanElement>();
  // Start on the final value so SSR / no-JS / reduced-motion render correctly.
  const [display, setDisplay] = useState(stat.value);

  useEffect(() => {
    if (!shown) return;
    if (reduce) {
      setDisplay(stat.value);
      return;
    }
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: easeOutExpo,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [shown, reduce, stat.value]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {stat.prefix}
      {formatted}
      {stat.suffix}
    </span>
  );
}

export function Stats() {
  return (
    <Section tone="panel" size="sm" className="border-y border-carbon-800">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center lg:text-left">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="flex flex-col">
                <span className="font-heading text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] font-semibold leading-none tracking-[-0.02em] text-carbon-50">
                  <Counter stat={stat} />
                </span>
                <span className="mt-3 flex items-center justify-center gap-2 text-sm text-carbon-300 lg:justify-start">
                  <span aria-hidden className="h-px w-5 bg-race-500" />
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
