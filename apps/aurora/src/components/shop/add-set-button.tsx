"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";

export function AddSetButton({
  id,
  name,
  frameCount,
  price,
  className,
}: {
  id: string;
  name: string;
  frameCount: number;
  price: number;
  className?: string;
}) {
  const { add } = useCart();
  return (
    <Button
      type="button"
      className={className}
      onClick={() => add({ id, name, size: `Set of ${frameCount}`, price })}
    >
      Add the set
    </Button>
  );
}
