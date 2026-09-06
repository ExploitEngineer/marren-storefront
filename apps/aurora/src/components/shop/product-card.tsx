import Link from "next/link";
import { Frame } from "@/components/brand/frame";
import { materialMeta } from "@/content/collections";
import { formatPriceFrom } from "@/lib/format";
import { maxDiscountPercent, priceFrom } from "@/lib/pricing";
import type { Product } from "@/content/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const material = materialMeta[product.material];
  const off = maxDiscountPercent(product);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {/* The overlays live inside the element the hover transform moves, so they
          travel with the image instead of detaching from its edge. */}
      <Frame
        material={product.material}
        src={product.art}
        alt={`${product.name}, a finished ${material.label.toLowerCase()} piece on a wall`}
        ratio="4/5"
        weight="md"
        interactive
        priority={priority}
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
      >
        {product.badges?.[0] && (
          <span
            className={cn(
              "absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide shadow-xs",
              product.badges[0] === "New"
                ? "bg-gold-500 text-carbon-950"
                : "bg-carbon-950/95 text-carbon-100",
            )}
          >
            {product.badges[0]}
          </span>
        )}
        {off !== null && (
          <span className="absolute top-3 right-3 rounded-full bg-carbon-950/95 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-gold-500 shadow-xs">
            Save {off}%
          </span>
        )}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0">
          <span className="rounded-full bg-black/90 px-3.5 py-1.5 text-xs font-medium text-carbon-50 backdrop-blur-sm">
            View piece
          </span>
        </span>
      </Frame>

      {/* Price on its own row: with the title beside it, `items-baseline` pinned
          the price to line 1 while the title ran on to lines 2 and 3. */}
      <div className="mt-4">
        <h3 className="line-clamp-2 font-medium text-carbon-50 transition-colors duration-200 group-hover:text-gold-500">
          {product.name}
        </h3>
        <p className="mt-0.5 truncate text-sm text-carbon-300">
          {material.label} · {product.style}
        </p>
        <p className="mt-1.5 font-medium tabular-nums text-carbon-50">{formatPriceFrom(priceFrom(product))}</p>
      </div>
    </Link>
  );
}
