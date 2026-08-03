"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide Lenis smooth scrolling. Renders nothing; drives the rAF loop.
 * - Off entirely under prefers-reduced-motion (native scroll, no interception).
 * - `anchors` handles in-page #links with a sticky-header offset.
 * - Elements marked [data-lenis-prevent] (e.g. modal scroll areas) scroll natively.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -88 },
    });

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
