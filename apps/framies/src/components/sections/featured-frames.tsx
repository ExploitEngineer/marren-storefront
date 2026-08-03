"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/shop/product-card";
import { products } from "@/content/products";

const SPEED = 34; // px per second
const GAP = 20; // matches gap-5 (1.25rem) - used to compute a seamless loop period

function Header() {
  return (
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <span className="text-eyebrow text-race-500">The garage</span>
          <h2 className="mt-3 font-heading text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-carbon-50">
            Featured builds.
          </h2>
          <p className="mt-4 max-w-md text-carbon-300">
            A rolling look at the frames leaving the workshop this week. Hover to pause, then tap through to the build.
          </p>
        </div>
        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 font-medium text-race-400 transition-colors hover:text-race-300"
        >
          View all builds
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Container>
  );
}

export function FeaturedFrames() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const period = useRef(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) period.current = (trackRef.current.scrollWidth + GAP) / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || paused || !period.current) return;
    let next = x.get() - (delta / 1000) * SPEED;
    if (next <= -period.current) next += period.current;
    x.set(next);
  });

  // Reduced motion: a plain, native-scrollable rail with no autoplay.
  if (reduce) {
    return (
      <Section tone="base" className="overflow-hidden">
        <Header />
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((p) => (
            <div key={p.id} className="w-64 shrink-0 snap-start sm:w-72">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section tone="base" className="overflow-hidden">
      <Header />
      <div
        className="mt-10 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-5 px-5 sm:px-6 lg:px-8">
          {[...products, ...products].map((p, i) => {
            const clone = i >= products.length;
            return (
              <div
                key={`${p.id}-${i}`}
                className="w-64 shrink-0 sm:w-72"
                inert={clone || undefined}
                aria-hidden={clone || undefined}
              >
                <ProductCard product={p} />
              </div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
