import Link from "next/link";
import { Frame } from "@/components/brand/frame";
import { materialMeta } from "@/content/collections";
import { formatPriceFrom } from "@/lib/format";
import type { Product } from "@/content/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const material = materialMeta[product.material];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <div className="relative">
        <Frame
          material={product.material}
          src={product.art}
          alt={`${product.name}, a framed ${material.label} die-cast build`}
          ratio="4/5"
          weight="md"
          interactive
          priority={priority}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
        />
        {product.badges?.[0] && (
          <span
            className={cn(
              "absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide",
              product.badges[0] === "New" ? "bg-sage-100 text-sage-700" : "bg-oat-50/95 text-oat-800 shadow-xs",
            )}
          >
            {product.badges[0]}
          </span>
        )}
        {/* Hover affordance */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 sm:translate-y-2">
          <span className="rounded-full bg-oat-900/90 px-3.5 py-1.5 text-xs font-medium text-oat-50 backdrop-blur-sm">
            View build
          </span>
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="font-medium text-oat-900 transition-colors group-hover:text-clay-700">{product.name}</h3>
          <p className="mt-0.5 text-sm text-oat-600">
            {material.label} · {product.style}
          </p>
        </div>
        <p className="shrink-0 font-medium tabular-nums text-oat-900">{formatPriceFrom(product.priceFrom)}</p>
      </div>
    </Link>
  );
}
