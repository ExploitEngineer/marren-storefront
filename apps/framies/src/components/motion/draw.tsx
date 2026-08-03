"use client";

import { type CSSProperties, type ReactNode, type SVGProps } from "react";
import { useInViewOnce } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

interface DrawSVGProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  children: ReactNode;
  /** ms before the stroke starts drawing once in view */
  delay?: number;
  className?: string;
}

/**
 * Wrapper that draws any child SVG paths/lines marked `.draw` (each with pathLength={1})
 * from zero to full length once the SVG scrolls into view. Dots marked `.draw-dot` fade in.
 * Uses the shared in-view signal so it never leaves marks unstroked (headless/no-JS safe).
 */
export function DrawSVG({ children, delay = 0, className, style, ...rest }: DrawSVGProps) {
  const { ref, shown } = useInViewOnce<SVGSVGElement>();

  return (
    <svg
      ref={ref}
      aria-hidden
      fill="none"
      data-draw={shown === false ? "out" : "in"}
      className={cn("draw-svg", className)}
      style={{ ["--draw-delay" as string]: `${delay}ms`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </svg>
  );
}

interface DrawUnderlineProps {
  className?: string;
  delay?: number;
  /** stroke width in the 0..300 x 0..12 viewBox space */
  width?: number;
}

/**
 * A hand-drawn brush underline that strokes itself in on view. Colour follows `currentColor`,
 * so set text-* on the element. Stretches to its container (preserveAspectRatio: none).
 */
export function DrawUnderline({ className, delay = 140, width = 3 }: DrawUnderlineProps) {
  return (
    <DrawSVG
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      delay={delay}
      className={cn("pointer-events-none block overflow-visible text-race-400", className)}
    >
      <path
        className="draw"
        pathLength={1}
        d="M2 8.5C50 11.5 96 4.2 148 6.6C200 9 252 11 298 4.5"
        stroke="currentColor"
        strokeWidth={width}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </DrawSVG>
  );
}
