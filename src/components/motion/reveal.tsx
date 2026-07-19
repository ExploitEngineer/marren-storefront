"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** entrance delay in ms (use for staggering grid items) */
  delay?: number;
  /** translateY distance in px */
  y?: number;
  style?: CSSProperties;
}

/**
 * Scroll-into-view reveal that degrades gracefully:
 * content is visible by default (SSR / no-JS / headless), only hidden-then-revealed
 * once JS confirms the element is below the fold, and ALWAYS revealed by a safety
 * timer even if the IntersectionObserver never fires. Content can never stay hidden.
 */
export function Reveal({ children, className, delay = 0, y = 16, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<boolean | null>(null); // null = not yet enhanced (visible)

  useIso(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    // Already in (or near) the viewport on first paint: keep visible, no flash.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setShown(true);
      return;
    }

    setShown(false); // hide before paint (below the fold, so unseen)

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
    // Safety net: never leave content hidden if the observer doesn't fire.
    const timer = setTimeout(reveal, 1400);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-shown={shown === null ? undefined : String(shown)}
      style={{ ["--reveal-delay" as string]: `${delay}ms`, ["--reveal-y" as string]: `${y}px`, ...style }}
    >
      {children}
    </div>
  );
}
