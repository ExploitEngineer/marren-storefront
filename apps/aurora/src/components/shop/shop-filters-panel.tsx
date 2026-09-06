"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShopFilters } from "@/components/shop/shop-filters";
import type { SizeFacets } from "@/lib/shop";

/**
 * Below lg the sidebar was ~450px of chips stacked above the grid, so the first
 * product started below the fold on every phone. On mobile it moves into a
 * drawer; on desktop it stays inline.
 */
export function ShopFiltersPanel({ sizes }: { sizes: SizeFacets }) {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const activeCount = ["material", "size", "style"].filter((k) => params.get(k)).length;

  return (
    <>
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontal />
              Filters
              {activeCount > 0 && (
                <span className="ml-1 grid min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-[0.65rem] font-semibold text-primary-foreground tabular-nums">
                  {activeCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            data-lenis-prevent
            side="left"
            className="w-[min(20rem,88vw)] overflow-y-auto border-carbon-800 bg-background p-5 sm:max-w-none"
          >
            <SheetHeader className="p-0 pb-2">
              <SheetTitle className="font-heading text-xl">Filters</SheetTitle>
            </SheetHeader>
            <ShopFilters sizes={sizes} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        <ShopFilters sizes={sizes} />
      </div>
    </>
  );
}
