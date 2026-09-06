"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";

export function AddSetButton({
  id,
  name,
  frameCount,
  price,
  compareAtPrice,
  image,
  className,
}: {
  id: string;
  name: string;
  frameCount: number;
  price: number;
  compareAtPrice?: number;
  image?: string;
  className?: string;
}) {
  const { add } = useCart();
  return (
    <Button
      type="button"
      className={className}
      onClick={() =>
        add({ kind: "set", id, name, size: `Set of ${frameCount}`, price, compareAtPrice, image })
      }
    >
      Add the set
    </Button>
  );
}
