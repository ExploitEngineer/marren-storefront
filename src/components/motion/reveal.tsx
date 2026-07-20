"use client";

import { type CSSProperties, type ReactNode } from "react";
import { useInViewOnce } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

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
 * Scroll-into-view reveal that degrades gracefully: content is visible by default
 * (SSR / no-JS / headless), only hidden-then-revealed once JS confirms the element is
 * below the fold, and always revealed by a safety timer. Content can never stay hidden.
 */
export function Reveal({ children, className, delay = 0, y = 16, style }: RevealProps) {
  const { ref, shown } = useInViewOnce<HTMLDivElement>();

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
