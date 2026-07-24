"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/content/products";
import { cn } from "@/lib/utils";

export function PdpPurchase({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const { add } = useCart();

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-oat-900">Frame size</span>
        <span className="text-sm text-oat-500">{size}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Frame size">
        {product.sizes.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={size === s}
            onClick={() => setSize(s)}
            className={cn(
              "min-w-16 rounded-[10px] border px-3.5 py-2.5 text-sm font-medium tabular-nums transition-colors",
              size === s
                ? "border-clay-600 bg-clay-50 text-clay-700"
                : "border-oat-300 bg-surface text-oat-700 hover:border-oat-400",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <Button
        size="lg"
        className="mt-7 w-full"
        onClick={() => add({ id: product.id, name: product.name, size, price: product.priceFrom })}
      >
        Add to cart · {formatPrice(product.priceFrom)}
      </Button>
      <p className="mt-3 text-center text-sm text-oat-500">Ships within one business day · Free over $75</p>
    </div>
  );
}
