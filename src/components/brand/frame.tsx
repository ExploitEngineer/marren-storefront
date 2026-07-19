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
  sm: { frame: "clamp(6px, 2%, 12px)", mat: "clamp(8px, 4%, 20px)" },
  md: { frame: "clamp(9px, 2.6%, 18px)", mat: "clamp(12px, 6.5%, 34px)" },
  lg: { frame: "clamp(12px, 3%, 26px)", mat: "clamp(16px, 7.5%, 46px)" },
};

/**
 * A photograph rendered inside a material-accurate frame moulding.
 * The core visual motif of the storefront: the product IS the frame around real art.
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

  const frameStyle: CSSProperties = {
    padding: w.frame,
    background: `linear-gradient(150deg, ${m.frameEdge}, ${m.frame} 42%, ${m.frame})`,
    boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 0 0 2px rgba(33,28,21,0.14), var(--shadow-md)`,
  };

  return (
    <div
      className={cn(
        "group/frame relative rounded-[3px]",
        interactive && "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1",
        className,
      )}
      style={frameStyle}
    >
      <div
        className="relative overflow-hidden rounded-[1px]"
        style={{
          padding: mat ? w.mat : 0,
          background: mat ? m.mat : "transparent",
          boxShadow: "inset 0 1px 3px rgba(33,28,21,0.16)",
        }}
      >
        <div className="relative overflow-hidden rounded-[1px] shadow-[0_1px_2px_rgba(33,28,21,0.25)]" style={{ aspectRatio: ratio }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-cover",
              interactive && "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/frame:scale-[1.04] group-hover:scale-[1.04]",
            )}
          />
          {/* faint glazing sheen */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.14), rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.06))" }}
          />
        </div>
      </div>
    </div>
  );
}
