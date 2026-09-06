"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon, Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lineKey, MAX_QTY, useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { discountPercent } from "@/lib/pricing";
import { site } from "@/content/site";

export function CartView() {
  const { items, count, subtotal, setQty, remove, clear } = useCart();

  if (items.length === 0) return <EmptyCart />;

  const compareTotal = items.reduce((n, i) => n + i.qty * (i.compareAtPrice ?? i.price), 0);
  const saved = compareTotal - subtotal;
  const remaining = Math.max(0, site.freeShippingThreshold - subtotal);
  const progress = Math.min(100, Math.round((subtotal / site.freeShippingThreshold) * 100));

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
      <section aria-label="Cart items">
        <div className="flex items-baseline justify-between border-b border-carbon-800 pb-4">
          <h2 className="font-heading text-lg text-carbon-50">
            {count} {count === 1 ? "item" : "items"}
          </h2>
          <button
            type="button"
            onClick={clear}
            className="text-sm text-carbon-400 underline underline-offset-4 transition-colors duration-200 hover:text-carbon-100"
          >
            Clear cart
          </button>
        </div>

        <ul className="divide-y divide-carbon-800">
          {items.map((item) => {
            const key = lineKey(item);
            const off = discountPercent(item.price, item.compareAtPrice);
            return (
              <li key={key} className="grid grid-cols-[5.5rem_1fr] gap-4 py-6 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-carbon-800 bg-carbon-900">
                  {item.image ? (
                    <Image src={item.image} alt="" fill sizes="112px" className="object-cover" />
                  ) : (
                    <span className="grid h-full place-items-center text-carbon-600">
                      <ImageIcon className="size-6" />
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-medium text-carbon-50">{item.name}</h3>
                      <p className="mt-1 text-sm text-carbon-300">
                        {item.kind === "set" ? "Wall set" : "Size"} · {item.size}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => remove(key)}
                      className="grid size-8 shrink-0 place-items-center rounded-md text-carbon-400 transition-colors duration-200 hover:bg-carbon-800 hover:text-carbon-50"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-medium tabular-nums text-carbon-50">{formatPrice(item.price)}</span>
                    {item.compareAtPrice && (
                      <s className="text-sm tabular-nums text-carbon-400">{formatPrice(item.compareAtPrice)}</s>
                    )}
                    {off !== null && (
                      <span className="rounded-full bg-gold-500/12 px-2 py-0.5 text-[0.7rem] font-semibold text-gold-500">
                        {off}% off
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border border-carbon-700 bg-carbon-850">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => setQty(key, item.qty - 1)}
                        className="grid size-9 place-items-center rounded-l-full text-carbon-200 transition-colors duration-200 hover:bg-carbon-800 hover:text-carbon-50"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span aria-live="polite" className="min-w-9 text-center text-sm tabular-nums text-carbon-50">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        disabled={item.qty >= MAX_QTY}
                        onClick={() => setQty(key, item.qty + 1)}
                        className="grid size-9 place-items-center rounded-r-full text-carbon-200 transition-colors duration-200 hover:bg-carbon-800 hover:text-carbon-50 disabled:pointer-events-none disabled:opacity-40"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>

                    <p className="text-right">
                      <span className="block text-xs text-carbon-400">Line total</span>
                      <span className="font-semibold tabular-nums text-carbon-50">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </p>
                  </div>

                  {item.qty >= MAX_QTY && (
                    <p className="mt-2 text-xs text-carbon-400">
                      {MAX_QTY} is the most we can ship per line. Message us for a bigger order.
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <aside aria-label="Order summary" className="lg:sticky lg:top-20">
        <div className="rounded-2xl border border-carbon-800 bg-carbon-950 p-5">
          <h2 className="font-heading text-lg text-carbon-50">Summary</h2>

          <div className="mt-4 rounded-xl border border-carbon-800 bg-carbon-900/60 p-4">
            <p className="text-sm text-carbon-200">
              {remaining > 0 ? (
                <>
                  Add <span className="font-medium text-gold-500">{formatPrice(remaining)}</span> for free shipping
                </>
              ) : (
                <span className="font-medium text-gold-500">You have earned free shipping</span>
              )}
            </p>
            <div
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-carbon-800"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progress towards free shipping"
            >
              <div className="h-full rounded-full bg-gold-500 transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-carbon-300">Subtotal</dt>
              <dd className="tabular-nums text-carbon-50">{formatPrice(subtotal)}</dd>
            </div>
            {saved > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-carbon-300">You save</dt>
                <dd className="tabular-nums text-gold-500">-{formatPrice(saved)}</dd>
              </div>
            )}
            <div className="flex items-center justify-between">
              <dt className="text-carbon-300">Shipping</dt>
              <dd className="text-carbon-50">{remaining > 0 ? "Calculated at checkout" : "Free"}</dd>
            </div>
          </dl>

          <div className="mt-4 flex items-baseline justify-between border-t border-carbon-800 pt-4">
            <span className="font-medium text-carbon-50">Total</span>
            <span className="font-heading text-2xl tabular-nums text-carbon-50">{formatPrice(subtotal)}</span>
          </div>

          <Button asChild size="lg" className="mt-5 w-full">
            <Link href="/checkout">
              Checkout <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="secondary" className="mt-2.5 w-full">
            <Link href="/shop">Keep shopping</Link>
          </Button>

          <ul className="mt-5 space-y-2.5 border-t border-carbon-800 pt-5 text-sm text-carbon-300">
            <li className="flex items-center gap-2.5">
              <Truck className="size-4 shrink-0 text-gold-500" aria-hidden />
              Free delivery over {formatPrice(site.freeShippingThreshold)}
            </li>
            <li className="flex items-center gap-2.5">
              <RotateCcw className="size-4 shrink-0 text-gold-500" aria-hidden />
              30-day returns
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="size-4 shrink-0 text-gold-500" aria-hidden />
              Card payment secured by Stripe
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="rounded-2xl border border-dashed border-carbon-700 bg-carbon-950 px-6 py-20 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-carbon-900 text-carbon-400">
        <ShoppingBag className="size-7" />
      </span>
      <h2 className="mt-6 font-heading text-2xl text-carbon-50">Your cart is empty.</h2>
      <p className="mx-auto mt-2 max-w-sm text-carbon-300">
        Pick a piece, choose a size, and it will show up here.
      </p>
      <Button asChild className="mt-7">
        <Link href="/shop">
          Browse the range <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
