"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { lineKey, MAX_QTY, useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { site } from "@/content/site";

export function CartSheet() {
  const [open, setOpen] = useState(false);
  const { items, count, subtotal, setQty, remove, clear } = useCart();

  const remaining = Math.max(0, site.freeShippingThreshold - subtotal);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
          className="relative grid size-11 place-items-center rounded-[10px] text-carbon-50 transition-colors duration-200 hover:bg-carbon-800"
        >
          <ShoppingBag className="size-5" />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-[0.65rem] font-semibold text-primary-foreground tabular-nums">
              {count}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        data-lenis-prevent
        side="right"
        className="flex w-[min(26rem,92vw)] flex-col border-carbon-800 bg-background p-0 sm:max-w-none"
      >
        <SheetHeader className="border-b border-carbon-800 p-5">
          <SheetTitle className="font-heading text-xl">Your cart {count > 0 && `(${count})`}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-carbon-900 text-carbon-400">
              <ShoppingBag className="size-6" />
            </div>
            <p className="text-carbon-300">Your cart is empty.</p>
            <Button asChild variant="secondary" onClick={() => setOpen(false)}>
              <Link href="/shop">Browse the shop</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-carbon-800 overflow-y-auto">
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

            <SheetFooter className="gap-3 border-t border-carbon-800 p-5">
              <div className="flex items-center justify-between text-sm text-carbon-300">
                <span>
                  {remaining > 0 ? `${formatPrice(remaining)} away from free shipping` : "You've earned free shipping"}
                </span>
              </div>
              <div className="flex items-center justify-between text-base">
                <span className="font-medium text-carbon-50">Subtotal</span>
                <span className="font-semibold tabular-nums text-carbon-50">{formatPrice(subtotal)}</span>
              </div>
              <Button asChild size="lg" className="w-full" onClick={() => setOpen(false)}>
                <Link href="/checkout">Checkout</Link>
              </Button>
              <button
                type="button"
                onClick={clear}
                className="text-center text-xs text-carbon-400 underline underline-offset-4 transition-colors duration-200 hover:text-carbon-200"
              >
                Clear cart
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
