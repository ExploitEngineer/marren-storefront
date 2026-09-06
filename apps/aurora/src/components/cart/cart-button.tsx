"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

/**
 * Header cart affordance: icon plus a live count that links straight to /cart.
 * Replaces the slide-out sheet, which could only ever show a cramped summary.
 */
export function CartButton() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
      className="relative grid size-11 place-items-center rounded-[10px] text-carbon-50 transition-colors duration-200 hover:bg-carbon-800"
    >
      <ShoppingBag className="size-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-[0.65rem] font-semibold text-primary-foreground tabular-nums">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
