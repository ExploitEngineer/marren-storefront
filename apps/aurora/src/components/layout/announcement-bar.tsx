"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { site } from "@/content/site";

const STORAGE_KEY = "aurora.announce.dismissed.v1";
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
          className="overflow-hidden bg-gold-500 text-carbon-950"
        >
          <div className="relative mx-auto flex max-w-7xl items-center justify-center py-2.5 pr-12 pl-4 sm:px-12">
            <p className="text-center text-[0.8rem] font-medium tracking-wide text-carbon-950/90">
              Free shipping over {formatPrice(site.freeShippingThreshold)}, and a lifetime guarantee on every piece.
            </p>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-carbon-950/70 transition-colors hover:bg-carbon-950/12 hover:text-carbon-950"
            >
              <X className="size-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
