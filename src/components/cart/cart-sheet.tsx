"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { site } from "@/content/site";

export function CartSheet() {
  const [open, setOpen] = useState(false);
  const { items, count, subtotal, clear } = useCart();

  const remaining = Math.max(0, site.freeShippingThreshold - subtotal);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
          className="relative grid size-11 place-items-center rounded-[10px] text-oat-900 transition-colors hover:bg-oat-100"
        >
          <ShoppingBag className="size-5" />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-clay-600 px-1 text-[0.65rem] font-semibold text-primary-foreground tabular-nums">
              {count}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-[min(26rem,92vw)] flex-col border-oat-200 bg-background p-0">
        <SheetHeader className="border-b border-oat-200 p-5">
          <SheetTitle className="font-serif text-xl">Your cart {count > 0 && `(${count})`}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-oat-100 text-oat-500">
              <ShoppingBag className="size-6" />
            </div>
            <p className="text-oat-600">Your cart is empty.</p>
            <Button asChild variant="secondary" onClick={() => setOpen(false)}>
              <Link href="/shop">Browse frames</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-oat-200 overflow-y-auto">
              {items.map((item) => (
                <li key={`${item.id}-${item.size}`} className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <p className="font-medium text-oat-900">{item.name}</p>
                    <p className="text-sm text-oat-600">
                      {item.size} · Qty {item.qty}
                    </p>
                  </div>
                  <p className="font-medium tabular-nums text-oat-900">{formatPrice(item.price * item.qty)}</p>
                </li>
              ))}
            </ul>

            <SheetFooter className="gap-3 border-t border-oat-200 p-5">
              <div className="flex items-center justify-between text-sm text-oat-600">
                <span>{remaining > 0 ? `${formatPrice(remaining)} away from free shipping` : "You've earned free shipping"}</span>
              </div>
              <div className="flex items-center justify-between text-base">
                <span className="font-medium text-oat-900">Subtotal</span>
                <span className="font-semibold tabular-nums text-oat-900">{formatPrice(subtotal)}</span>
              </div>
              <Button size="lg" className="w-full" onClick={() => setOpen(false)}>
                Checkout
              </Button>
              <p className="text-center text-xs text-oat-500">
                Checkout is a demo. Payment integration is a documented next step.
              </p>
              <button type="button" onClick={clear} className="text-center text-xs text-oat-500 underline underline-offset-4 hover:text-oat-700">
                Clear cart
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
