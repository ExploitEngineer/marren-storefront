"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

/**
 * First-visit intro: a frame outline strokes itself in, "Marren" settles inside,
 * then the whole thing scales up and fades to reveal the site rendered underneath.
 *
 * Presence is CSS-gated by `html.intro-play`, which a pre-paint inline script in the
 * root layout sets only on a first visit with motion enabled. So: no flash on repeat
 * visits (the overlay is display:none), nothing under reduced-motion, and no stuck
 * overlay with JS disabled. A hard-stop timer removes it even if a callback never fires.
 */
export function Intro() {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    const el = document.documentElement;
    if (!el.classList.contains("intro-play")) return; // repeat visit / reduced-motion: overlay stays hidden

    const prevOverflow = el.style.overflow;
    el.style.overflow = "hidden";
    window.scrollTo(0, 0);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      el.classList.remove("intro-play");
      el.style.overflow = prevOverflow;
      try {
        sessionStorage.setItem("marren:intro", "1");
      } catch {
        /* private mode: fine, it just replays next load */
      }
      setDone(true);
    };
    finishRef.current = finish;

    const startLeave = setTimeout(() => setLeaving(true), 1850);
    const hardStop = setTimeout(finish, 2900); // safety net: never trap the page

    return () => {
      clearTimeout(startLeave);
      clearTimeout(hardStop);
    };
  }, []);

  if (done) return null;

  return (
    <div className="intro-overlay" aria-hidden>
      <motion.div
        className="relative w-[min(74vw,420px)]"
        initial={{ opacity: 1, scale: 1 }}
        animate={leaving ? { opacity: 0, scale: 1.07, filter: "blur(3px)" } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        onAnimationComplete={() => {
          if (leaving) finishRef.current();
        }}
      >
        <svg viewBox="0 0 220 150" fill="none" className="block w-full text-clay-600">
          {/* outer moulding */}
          <motion.rect
            x="6"
            y="6"
            width="208"
            height="138"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="2.5"
            pathLength={1}
            initial={{ pathLength: 0, opacity: 0.85 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.65, ease: easeOutExpo, delay: 0.1 }}
          />
          {/* inner mat opening */}
          <motion.rect
            x="26"
            y="26"
            width="168"
            height="98"
            rx="1.5"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            pathLength={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.5 }}
          />
        </svg>

        {/* wordmark, centred in the opening */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-2.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.85 }}
        >
          <span aria-hidden className="size-2.5 rounded-[3px] bg-clay-600 shadow-[0_0_0_4px_var(--color-clay-100)]" />
          <span className="font-serif text-[clamp(1.5rem,1.2rem+1.8vw,2.25rem)] font-semibold tracking-[-0.02em] text-oat-900">
            Marren
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
