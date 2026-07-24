"use client";

import { useEffect, useRef } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { reels } from "@/content/reels";

/**
 * A horizontal, scroll-snapped rail of short vertical clips filmed in the
 * workshop. Each clip loops muted, and an IntersectionObserver keeps only the
 * on-screen videos playing so the rail stays light on mobile.
 */
export function Reel() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const videos = Array.from(rail.querySelectorAll("video"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { root: rail, threshold: 0.35 },
    );

    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <Section tone="ink" className="overflow-hidden">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-eyebrow text-clay-300">From the workshop</span>
            <h2 className="mt-3 font-serif text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.01em] text-oat-50">
              See them move.
            </h2>
            <p className="mt-4 max-w-md text-oat-100/70">
              Every build filmed off the bench - the die-cast detail, the shadow-box depth, the glass front catching the light.
            </p>
          </div>
          <p className="hidden text-sm text-oat-100/50 sm:block" aria-hidden>
            Scroll for more &rarr;
          </p>
        </div>
      </Container>

      <div
        ref={railRef}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 sm:mt-12 sm:gap-5 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reels.map((reel) => (
          <figure
            key={reel.id}
            className="group relative w-[70vw] shrink-0 snap-start sm:w-64 lg:w-72"
          >
            <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-black shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
              <video
                src={reel.src}
                poster={reel.poster}
                muted
                loop
                playsInline
                preload="none"
                className="h-full w-full object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(125deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 34%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.4) 100%)",
                }}
              />
            </div>
            <figcaption className="mt-3 text-sm text-oat-100/70">{reel.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
