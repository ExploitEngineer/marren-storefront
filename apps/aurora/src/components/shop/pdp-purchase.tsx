"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { discountPercent, findVariant } from "@/lib/pricing";
import type { Product } from "@/content/products";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function PdpPurchase({ product }: { product: Product }) {
  const [size, setSize] = useState<string>(product.variants[0].size);
  const { add } = useCart();
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const variant = findVariant(product, size) ?? product.variants[0];
  const off = discountPercent(variant.price, variant.compareAtPrice);
  const isRound = variant.size.includes("round");

  /**
   * A radiogroup owns its arrow keys and exposes a single tab stop, so the
   * roving tabindex below is part of the ARIA contract, not a nicety.
   */
  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const last = product.variants.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setSize(product.variants[next].size);
    optionRefs.current[next]?.focus();
  }

  return (
    <div className="mt-8">
      <div className="flex items-baseline gap-3">
        <span className="font-heading text-3xl text-carbon-50 tabular-nums">{formatPrice(variant.price)}</span>
        {variant.compareAtPrice && (
          <s className="text-lg text-carbon-400 tabular-nums decoration-carbon-500">
            {formatPrice(variant.compareAtPrice)}
          </s>
        )}
        {off !== null && (
          <span className="rounded-full bg-gold-500/12 px-2.5 py-1 text-xs font-semibold tracking-wide text-gold-500">
            {off}% off
          </span>
        )}
      </div>

      <div className="mt-7 flex items-center justify-between">
        <span id="pdp-size-label" className="text-sm font-medium text-carbon-50">
          {isRound ? "Diameter" : "Size"}
        </span>
        <span className="text-sm text-carbon-400">{variant.size}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-labelledby="pdp-size-label">
        {product.variants.map((v, i) => (
          <button
            key={v.size}
            ref={(el) => {
              optionRefs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={size === v.size}
            tabIndex={size === v.size ? 0 : -1}
            onClick={() => setSize(v.size)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "min-w-16 rounded-[10px] border px-3.5 py-2.5 text-sm font-medium tabular-nums transition-colors duration-200",
              size === v.size
                ? "border-gold-500 bg-gold-500/12 text-gold-500 hover:bg-gold-500/20"
                : "border-carbon-700 bg-carbon-850 text-carbon-200 hover:border-carbon-500 hover:bg-carbon-800 hover:text-carbon-50",
            )}
          >
            {v.size}
          </button>
        ))}
      </div>

      <Button
        size="lg"
        className="mt-7 w-full"
        onClick={() =>
          add({
            kind: "product",
            id: product.id,
            name: product.name,
            size: variant.size,
            price: variant.price,
            compareAtPrice: variant.compareAtPrice,
            image: product.art,
          })
        }
      >
        Add to cart · {formatPrice(variant.price)}
      </Button>
      <p className="mt-3 text-center text-sm text-carbon-400">
        Ships within two business days · Free over {formatPrice(site.freeShippingThreshold)}
      </p>
    </div>
  );
}
