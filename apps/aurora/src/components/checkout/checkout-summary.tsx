"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { lineKey, MAX_QTY, useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { site } from "@/content/site";

export function CheckoutSummary() {
  const { items, subtotal, setQty, remove } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-carbon-800 bg-carbon-950 p-6">
        <p className="text-carbon-300">Nothing in your cart yet.</p>
        <Link href="/shop" className="mt-2 inline-block text-sm text-gold-500 underline underline-offset-4 transition-colors duration-200 hover:text-gold-400">
          Browse the shop
        </Link>
      </div>
    );
  }

  const remaining = Math.max(0, site.freeShippingThreshold - subtotal);

  return (
    <div className="rounded-2xl border border-carbon-800 bg-carbon-950">
      <h2 className="border-b border-carbon-800 p-5 font-heading text-lg text-carbon-50">Your order</h2>

      <ul className="divide-y divide-carbon-800">
        {items.map((item) => {
          const key = lineKey(item);
          return (
            <li key={key} className="flex items-start gap-3 p-5">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-carbon-50">{item.name}</p>
                <p className="mt-0.5 text-sm text-carbon-300">
                  {item.size} · {formatPrice(item.price)} each
                </p>
                <div className="mt-3 inline-flex items-center rounded-full border border-carbon-700 bg-carbon-850">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => setQty(key, item.qty - 1)}
                    className="grid size-8 place-items-center rounded-l-full text-carbon-200 transition-colors duration-200 hover:bg-carbon-800 hover:text-carbon-50"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span aria-live="polite" className="min-w-8 text-center text-sm tabular-nums text-carbon-50">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${item.name}`}
                    disabled={item.qty >= MAX_QTY}
                    onClick={() => setQty(key, item.qty + 1)}
                    className="grid size-8 place-items-center rounded-r-full text-carbon-200 transition-colors duration-200 hover:bg-carbon-800 hover:text-carbon-50 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button
                  type="button"
                  aria-label={`Remove ${item.name} from cart`}
                  onClick={() => remove(key)}
                  className="grid size-7 place-items-center rounded-md text-carbon-400 transition-colors duration-200 hover:bg-carbon-800 hover:text-carbon-50"
                >
                  <X className="size-4" />
                </button>
                <p className="font-medium tabular-nums text-carbon-50">{formatPrice(item.price * item.qty)}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="space-y-2 border-t border-carbon-800 p-5">
        <div className="flex items-center justify-between text-sm text-carbon-300">
          <span>Shipping</span>
          <span>{remaining > 0 ? `${formatPrice(remaining)} away from free` : "Free"}</span>
        </div>
        <div className="flex items-center justify-between text-base">
          <span className="font-medium text-carbon-50">Subtotal</span>
          <span className="font-semibold tabular-nums text-carbon-50">{formatPrice(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}
