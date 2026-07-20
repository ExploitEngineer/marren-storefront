import Image from "next/image";
import { cn } from "@/lib/utils";
import { materialMeta, type Material } from "@/content/collections";
import type { CSSProperties } from "react";

interface FrameProps {
  material: Material;
  src: string;
  alt: string;
  /** aspect ratio of the artwork opening, e.g. "4/5" | "1/1" | "3/4" */
  ratio?: string;
  /** relative frame + mat thickness */
  weight?: "sm" | "md" | "lg";
  /** show the mat (passe-partout); off for a tighter, modern look */
  mat?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** enable hover lift + art zoom (when inside an interactive card) */
  interactive?: boolean;
}

const weights = {
  sm: { frame: "clamp(7px, 2.2%, 13px)", mat: "clamp(8px, 4%, 20px)" },
  md: { frame: "clamp(10px, 2.8%, 19px)", mat: "clamp(12px, 6.5%, 34px)" },
  lg: { frame: "clamp(13px, 3.2%, 28px)", mat: "clamp(16px, 7.5%, 46px)" },
};

/** Grain strength per material (darker woods carry a touch more). */
const grainOpacity: Record<Material, number> = {
  oak: 0.15,
  walnut: 0.17,
  "black-ash": 0.22,
  brass: 0.14,
};

/**
 * Desaturated fractal noise stretched horizontally into wood-grain streaks.
 * Inline data-URI so it is asset-free, tintable via blend mode, and SSR-safe.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.62' numOctaves='3' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

/**
 * A photograph rendered inside a material-accurate wooden frame: a directional
 * moulding with a carved bevel, wood grain, mitred corner joints, a beveled mat
 * window, and a layered cast shadow. Light source is top-left throughout.
 * The core visual motif of the storefront.
 */
export function Frame({
  material,
  src,
  alt,
  ratio = "4/5",
  weight = "md",
  mat = true,
  priority = false,
  sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw",
  className,
  interactive = false,
}: FrameProps) {
  const m = materialMeta[material];
  const w = weights[weight];

  const frameShadow = `color-mix(in oklab, ${m.frame}, #211c15 26%)`;
  const frameDeep = `color-mix(in oklab, ${m.frame}, #211c15 44%)`;
  const matCore = `color-mix(in oklab, ${m.mat}, white 45%)`;

  const mouldingStyle: CSSProperties = {
    padding: w.frame,
    background: `linear-gradient(135deg, ${m.frameEdge} 0%, ${m.frame} 40%, ${m.frame} 60%, ${frameShadow} 100%)`,
    boxShadow: [
      "inset 1.5px 1.5px 0 rgba(255,255,255,0.30)", // outer top-left catch-light
      "inset -1.5px -1.5px 0 rgba(0,0,0,0.28)", // outer bottom-right shade
      `inset 0 0 0 1px ${frameDeep}`, // thin keyline around the profile
    ].join(", "),
  };

  // Mitred corner seams: a thin diagonal line across a frame-width square in each corner.
  const seamMain = "linear-gradient(45deg, transparent 46%, rgba(0,0,0,0.22) 49%, rgba(0,0,0,0.22) 51%, transparent 54%)"; // top-left, bottom-right
  const seamAnti = "linear-gradient(135deg, transparent 46%, rgba(0,0,0,0.22) 49%, rgba(0,0,0,0.22) 51%, transparent 54%)"; // top-right, bottom-left
  const corner = (pos: string, image: string): CSSProperties => ({
    position: "absolute",
    width: w.frame,
    height: w.frame,
    backgroundImage: image,
    ...(pos === "tl" ? { top: 0, left: 0 } : pos === "tr" ? { top: 0, right: 0 } : pos === "bl" ? { bottom: 0, left: 0 } : { bottom: 0, right: 0 }),
  });

  const art = (
    <div
      className="relative overflow-hidden rounded-[1px]"
      style={{ aspectRatio: ratio, boxShadow: "inset 0 1px 3px rgba(33,28,21,0.30)" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover",
          interactive && "transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:scale-[1.045] group-hover:scale-[1.045]",
        )}
      />
      {/* glazing: soft diagonal reflection + faint top highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(125deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 18%, rgba(255,255,255,0) 42%, rgba(255,255,255,0) 76%, rgba(255,255,255,0.09) 100%)",
        }}
      />
    </div>
  );

  return (
    <div
      className={cn(
        "group/frame relative rounded-[4px] shadow-[0_1px_2px_rgba(33,28,21,0.10),0_9px_22px_-8px_rgba(33,28,21,0.26),0_26px_50px_-22px_rgba(33,28,21,0.24)]",
        interactive &&
          "transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:-translate-y-1.5 group-hover/frame:shadow-[0_2px_4px_rgba(33,28,21,0.12),0_18px_34px_-10px_rgba(33,28,21,0.32),0_40px_70px_-24px_rgba(33,28,21,0.30)] group-hover:-translate-y-1.5",
        className,
      )}
    >
      {/* Moulding */}
      <div className="relative overflow-hidden rounded-[3px]" style={mouldingStyle}>
        {/* wood grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{ backgroundImage: GRAIN, backgroundSize: "180% 120%", opacity: grainOpacity[material] }}
        />
        {/* mitred corners */}
        <span aria-hidden style={corner("tl", seamMain)} />
        <span aria-hidden style={corner("tr", seamAnti)} />
        <span aria-hidden style={corner("bl", seamAnti)} />
        <span aria-hidden style={corner("br", seamMain)} />

        {mat ? (
          <div
            className="relative z-10 rounded-[1.5px]"
            style={{ padding: w.mat, background: m.mat, boxShadow: "inset 0 1px 2px rgba(33,28,21,0.10)" }}
          >
            {/* beveled mat window: bright cut edge with top-left light */}
            <div
              className="rounded-[1.5px]"
              style={{
                padding: "clamp(2px, 0.9%, 4px)",
                background: matCore,
                boxShadow: "inset 1.5px 1.5px 1px rgba(255,255,255,0.75), inset -1.5px -1.5px 2px rgba(33,28,21,0.24)",
              }}
            >
              {art}
            </div>
          </div>
        ) : (
          <div className="relative z-10">{art}</div>
        )}
      </div>
    </div>
  );
}
