"use client";

import { type ReactNode, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Gentle scroll parallax: the wrapped block translates on the Y axis as it passes through
 * the viewport. Pairs with Lenis smooth scroll. No-op under prefers-reduced-motion.
 */
export function Parallax({
  children,
  offset = 40,
  className,
}: {
  children: ReactNode;
  /** total travel in px across the full scroll pass (positive = drifts up as you scroll down) */
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y: reduce ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
}
