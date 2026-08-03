"use client";

import { useSyncExternalStore } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/format";

export interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number; // cents
  qty: number;
}

const STORAGE_KEY = "aurora.cart.v1";
const EMPTY: CartItem[] = [];
const listeners = new Set<() => void>();

function read(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

// Client-only singleton, initialized from localStorage at module load.
let items: CartItem[] = typeof window === "undefined" ? EMPTY : read();

function commit(next: CartItem[]) {
  items = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/**
 * Minimal cart backed by an external store (localStorage). This is the seam
 * where a real cart / checkout integration (Stripe, Shopify) lands.
 */
export function useCart() {
  const state = useSyncExternalStore(subscribe, () => items, () => EMPTY);

  const count = state.reduce((n, i) => n + i.qty, 0);
  const subtotal = state.reduce((n, i) => n + i.qty * i.price, 0);

  function add(item: Omit<CartItem, "qty">) {
    const key = `${item.id}-${item.size}`;
    const existing = items.find((i) => `${i.id}-${i.size}` === key);
    commit(
      existing
        ? items.map((i) => (`${i.id}-${i.size}` === key ? { ...i, qty: i.qty + 1 } : i))
        : [...items, { ...item, qty: 1 }],
    );
    toast.success("Added to cart", { description: `${item.name} · ${item.size} · ${formatPrice(item.price)}` });
  }

  function clear() {
    commit([]);
  }

  return { items: state, count, subtotal, add, clear };
}

/** Kept as a thin boundary so the app root has an obvious cart mount point. */
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
