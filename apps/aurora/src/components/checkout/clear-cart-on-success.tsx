"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart/cart-provider";

/**
 * Mounted only once the server has confirmed the session is paid, so a buyer
 * who lands here with an unpaid or unverifiable session keeps their cart.
 */
export function ClearCartOnSuccess() {
  const { clear } = useCart();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    clear();
  }, [clear]);

  return null;
}
