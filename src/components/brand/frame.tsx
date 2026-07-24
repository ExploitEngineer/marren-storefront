import Image from "next/image";
import { cn } from "@/lib/utils";
import { materialMeta, type Material } from "@/content/collections";
import type { CSSProperties } from "react";

interface FrameProps {
  material: Material;
  src: string;
  alt: string;
  /** aspect ratio of the display window, e.g. "4/5" | "1/1" | "3/4" */
  ratio?: string;
  /** relative keyline + card weight */
  weight?: "sm" | "md" | "lg";
  /** kept for API compatibility; ignored (photos are pre-framed). */
  mat?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** enable hover lift + subtle zoom (when inside an interactive card) */
  interactive?: boolean;
}

const weights = {
  sm: { pad: "clamp(3px, 1.1%, 6px)", radius: "6px" },
  md: { pad: "clamp(4px, 1.4%, 9px)", radius: "8px" },
  lg: { pad: "clamp(5px, 1.8%, 12px)", radius: "10px" },
};

/**
 * A finished build shown as a glass-fronted display card: a slim dark keyline
 * echoing the real moulding, a soft glazing reflection, and a layered warm
 * shadow that lifts on hover. Because every product photo already contains its
 * own physical frame, this presentation stays deliberately minimal - it reads
 * as the piece behind glass, not a frame around a frame.
 */
export function Frame({
  material,
  src,
  alt,
  ratio = "4/5",
  weight = "md",
  priority = false,
  sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw",
  className,
  interactive = false,
}: FrameProps) {
  const m = materialMeta[material];
  const w = weights[weight];

  const keylineStyle: CSSProperties = {
    padding: w.pad,
    borderRadius: w.radius,
    background: `linear-gradient(135deg, ${m.frameEdge} 0%, ${m.frame} 45%, ${m.frame} 60%, #0d0d0c 100%)`,
    boxShadow: [
      "inset 1px 1px 0 rgba(255,255,255,0.18)", // top-left catch-light
      "inset -1px -1px 0 rgba(0,0,0,0.35)", // bottom-right shade
    ].join(", "),
  };

  return (
    <div
      className={cn(
        "group/frame relative shadow-[0_1px_2px_rgba(33,28,21,0.10),0_9px_22px_-8px_rgba(33,28,21,0.26),0_26px_50px_-22px_rgba(33,28,21,0.24)]",
        interactive &&
          "transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:-translate-y-1.5 group-hover/frame:shadow-[0_2px_4px_rgba(33,28,21,0.12),0_18px_34px_-10px_rgba(33,28,21,0.32),0_40px_70px_-24px_rgba(33,28,21,0.30)] group-hover:-translate-y-1.5",
        className,
      )}
      style={{ borderRadius: w.radius }}
    >
      <div className="relative overflow-hidden" style={keylineStyle}>
        <div
          className="relative overflow-hidden rounded-[2px]"
          style={{ aspectRatio: ratio, boxShadow: "inset 0 1px 3px rgba(13,13,12,0.45)" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-cover",
              interactive &&
                "transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:scale-[1.045] group-hover:scale-[1.045]",
            )}
          />
          {/* glazing: soft diagonal reflection + faint top highlight */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(125deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 16%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 78%, rgba(255,255,255,0.10) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
