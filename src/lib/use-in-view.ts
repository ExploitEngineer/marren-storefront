"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Options {
  /** Reveal instantly if the element starts within this fraction of the viewport height. */
  immediateRatio?: number;
  /** Safety-net delay (ms): reveal even if the IntersectionObserver never fires. */
  safety?: number;
}

/**
 * One-shot "is it in view yet" signal that degrades gracefully.
 *
 * `shown` is `null` until JS enhances (SSR / no-JS / headless keep content visible),
 * `false` only once we confirm the element is below the fold, then `true` on intersection
 * or after the safety timer. Shared by scroll-reveal and SVG draw-on-view animations so
 * both have identical, robust behaviour.
 */
export function useInViewOnce<T extends Element = HTMLElement>({ immediateRatio = 0.92, safety = 1400 }: Options = {}) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState<boolean | null>(null);

  useIso(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    if (el.getBoundingClientRect().top < window.innerHeight * immediateRatio) {
      setShown(true);
      return;
    }

    setShown(false);

    const reveal = () => setShown(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          reveal();
          io.disconnect();
          clearTimeout(timer);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    const timer = setTimeout(reveal, safety);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return { ref, shown };
}
