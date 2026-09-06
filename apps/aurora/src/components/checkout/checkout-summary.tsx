"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageIcon, Pencil } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { site } from "@/content/site";

/** Read-only here on purpose: quantities are edited on /cart, in one place. */
export function CheckoutSummary() {
  const { items, count, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-carbon-800 bg-carbon-950 p-6">
        <p className="text-carbon-300">Nothing in your cart yet.</p>
        <Link
          href="/shop"
          className="mt-2 inline-block text-sm text-gold-500 underline underline-offset-4 transition-colors duration-200 hover:text-gold-400"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  const remaining = Math.max(0, site.freeShippingThreshold - subtotal);

  return (
    <div className="rounded-2xl border border-carbon-800 bg-carbon-950 lg:sticky lg:top-20">
      <div className="flex items-center justify-between border-b border-carbon-800 p-5">
        <h2 className="font-heading text-lg text-carbon-50">
          Your order <span className="text-carbon-400">({count})</span>
        </h2>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-sm text-carbon-300 transition-colors duration-200 hover:text-gold-500"
        >
          <Pencil className="size-3.5" aria-hidden />
          Edit
        </Link>
      </div>

      <ul className="divide-y divide-carbon-800">
        {items.map((item) => (
          <li key={`${item.kind}:${item.id}:${item.size}`} className="flex items-start gap-4 p-5">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-carbon-800 bg-carbon-900">
              {item.image ? (
                <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
              ) : (
                <span className="grid h-full place-items-center text-carbon-600">
                  <ImageIcon className="size-4" />
                </span>
              )}
              <span className="absolute -top-1.5 -right-1.5 grid min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-[0.65rem] font-semibold text-primary-foreground tabular-nums ring-2 ring-carbon-950">
                {item.qty}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 font-medium text-carbon-50">{item.name}</p>
              <p className="mt-0.5 text-sm text-carbon-300">{item.size}</p>
            </div>
            <p className="shrink-0 font-medium tabular-nums text-carbon-50">{formatPrice(item.price * item.qty)}</p>
          </li>
        ))}
      </ul>

      <div className="space-y-2 border-t border-carbon-800 p-5">
        <div className="flex items-center justify-between text-sm text-carbon-300">
          <span>Shipping</span>
          <span>{remaining > 0 ? `${formatPrice(remaining)} away from free` : "Free"}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="font-medium text-carbon-50">Total</span>
          <span className="font-heading text-2xl tabular-nums text-carbon-50">{formatPrice(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}
