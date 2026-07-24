"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const STORAGE_KEY = "marren.announce.dismissed.v1";
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function isDismissed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function AnnouncementBar() {
  const reduce = useReducedMotion();
  // Server renders the bar (getServerSnapshot = false); the client hides it
  // for visitors who have dismissed it. No setState-in-effect, no flash for new visitors.
  const dismissed = useSyncExternalStore(subscribe, isDismissed, () => false);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
  }

  return (
    <AnimatePresence initial={false}>
      {!dismissed && (
        <motion.div
          initial={false}
          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden bg-oat-900 text-oat-100"
        >
          <div className="relative mx-auto flex max-w-7xl items-center justify-center px-10 py-2.5">
            <p className="text-center text-[0.8rem] tracking-wide text-oat-100/90">
              Free shipping over $75, and a lifetime guarantee on every build.
            </p>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="absolute right-3 grid size-7 place-items-center rounded-md text-oat-100/70 transition-colors hover:bg-white/10 hover:text-oat-100"
            >
              <X className="size-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
