import type { Transition } from "framer-motion";

/** Shared easing (ease-out-quint) matching the CSS token. */
export const easeOutQuint = [0.22, 1, 0.36, 1] as const;

/** Confident, decisive deceleration - used for the intro loader and reveals. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const durations = {
  fast: 0.18,
  base: 0.28,
  slow: 0.44,
  slower: 0.64,
} as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
};

/** Framer variants for orchestrated entrances (used where JS-driven motion is appropriate). */
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: durations.slower, ease: easeOutQuint } },
};

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
