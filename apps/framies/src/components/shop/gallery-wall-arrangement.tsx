import { Frame } from "@/components/brand/frame";
import type { Material } from "@/content/collections";
import { cn } from "@/lib/utils";

const ratios = ["3/4", "1/1", "4/5", "4/3", "1/1", "3/4"];

/** Distribute pieces round-robin into N columns for a balanced salon wall. */
function toColumns<T>(items: T[], cols: number): T[][] {
  const out: T[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => out[i % cols].push(item));
  return out;
}

export function GalleryWallArrangement({
  material,
  pieces,
  weight = "sm",
  className,
}: {
  material: Material;
  pieces: string[];
  weight?: "sm" | "md";
  className?: string;
}) {
  const cols = pieces.length >= 5 ? 3 : pieces.length === 4 ? 2 : pieces.length;
  const columns = toColumns(pieces, cols);

  return (
    <div className={cn("grid gap-3 sm:gap-4", className)} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {columns.map((col, ci) => (
        <div key={ci} className={cn("flex flex-col gap-3 sm:gap-4", ci % 2 === 1 && "pt-6 sm:pt-10")}>
          {col.map((src, pi) => (
            <Frame
              key={src + pi}
              material={material}
              src={src}
              alt="Framed die-cast car build in a garage-wall arrangement"
              ratio={ratios[(ci + pi * cols) % ratios.length]}
              weight={weight}
              sizes="(max-width: 640px) 30vw, (max-width: 1024px) 22vw, 16vw"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
