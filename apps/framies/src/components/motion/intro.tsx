"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

/**
 * First-visit intro: twin headlight beams switch on across the dark, a race-red
 * accent streaks beneath them, and the "Framies" wordmark settles in before the
 * whole thing scales up and fades to reveal the site rendered underneath.
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
        sessionStorage.setItem("framies:intro", "1");
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
        className="relative flex w-[min(80vw,460px)] flex-col items-center"
        initial={{ opacity: 1, scale: 1 }}
        animate={leaving ? { opacity: 0, scale: 1.06, filter: "blur(4px)" } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        onAnimationComplete={() => {
          if (leaving) finishRef.current();
        }}
      >
        {/* Headlight beams */}
        <div className="relative mb-7 h-8 w-full">
          {/* main high-beam: expands outward from centre */}
          <motion.span
            aria-hidden
            className="absolute top-1/2 left-0 h-[3px] w-full -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ boxShadow: "0 0 26px 2px rgba(255,255,255,0.5)" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.1 }}
          />
          {/* race-red accent: streaks in from the left */}
          <motion.span
            aria-hidden
            className="absolute top-1/2 left-0 mt-2 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-race-500 via-race-400 to-transparent"
            style={{ boxShadow: "var(--glow-race)" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.5 }}
          />
        </div>

        {/* Wordmark */}
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.85 }}
        >
          <span
            aria-hidden
            className="size-2.5 rounded-[3px] bg-race-500"
            style={{ boxShadow: "var(--glow-race)" }}
          />
          <span className="font-heading text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] font-semibold tracking-[-0.02em] text-carbon-50">
            Framies
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
