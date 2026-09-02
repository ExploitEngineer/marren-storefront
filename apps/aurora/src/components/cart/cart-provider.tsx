"use client";

import { useSyncExternalStore } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/format";

/** Which content file the server re-prices this line from at checkout. */
export type CartKind = "product" | "set";

export interface CartItem {
  kind: CartKind;
  id: string;
  /** Display only. The server re-derives the name it sends to Stripe. */
  name: string;
  /** Variant label, or "Set of N". */
  size: string;
  /** Paisa. Display only. The server re-derives the amount it charges. */
  price: number;
  qty: number;
}

/**
 * v2: v1 carts hold USD cents and centimetre size labels, which would either
 * mis-display or fail server-side re-pricing at checkout. They are dropped.
 */
const STORAGE_KEY = "aurora.cart.v2";
const LEGACY_KEYS = ["aurora.cart.v1"];

export const MAX_QTY = 10;

const EMPTY: CartItem[] = [];
const listeners = new Set<() => void>();

/** Identity of a cart line: the same piece in two sizes is two lines. */
export function lineKey(item: Pick<CartItem, "kind" | "id" | "size">): string {
  return `${item.kind}:${item.id}:${item.size}`;
}

function read(): CartItem[] {
  try {
    for (const key of LEGACY_KEYS) localStorage.removeItem(key);
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
 * Minimal cart backed by an external store (localStorage). Prices here are for
 * display; /api/checkout re-prices every line from src/content before charging.
 */
export function useCart() {
  const state = useSyncExternalStore(subscribe, () => items, () => EMPTY);

  const count = state.reduce((n, i) => n + i.qty, 0);
  const subtotal = state.reduce((n, i) => n + i.qty * i.price, 0);

  function add(item: Omit<CartItem, "qty">) {
    const key = lineKey(item);
    const existing = items.find((i) => lineKey(i) === key);
    commit(
      existing
        ? items.map((i) => (lineKey(i) === key ? { ...i, qty: Math.min(MAX_QTY, i.qty + 1) } : i))
        : [...items, { ...item, qty: 1 }],
    );
    toast.success("Added to cart", { description: `${item.name} · ${item.size} · ${formatPrice(item.price)}` });
  }

  /** Clamped to 0-MAX_QTY; 0 removes the line. */
  function setQty(key: string, qty: number) {
    const next = Math.max(0, Math.min(MAX_QTY, Math.trunc(qty)));
    commit(
      next === 0
        ? items.filter((i) => lineKey(i) !== key)
        : items.map((i) => (lineKey(i) === key ? { ...i, qty: next } : i)),
    );
  }

  function remove(key: string) {
    setQty(key, 0);
  }

  function clear() {
    commit([]);
  }

  return { items: state, count, subtotal, add, setQty, remove, clear };
}

/** Kept as a thin boundary so the app root has an obvious cart mount point. */
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
