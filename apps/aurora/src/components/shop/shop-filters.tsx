"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { materialMeta, type Material } from "@/content/collections";
import type { FrameStyle } from "@/content/products";
import type { SizeFacets } from "@/lib/shop";
import { cn } from "@/lib/utils";

const materials = Object.keys(materialMeta) as Material[];
const styles: FrameStyle[] = ["Backlit LED", "Metal Cut", "Vinyl Clock", "Steel Clock", "Custom"];
const sorts = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "newest", label: "Newest" },
];

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200",
        active
          ? "border-gold-500 bg-gold-500 text-primary-foreground hover:border-gold-400 hover:bg-gold-400"
          : "border-carbon-700 bg-carbon-850 text-carbon-200 hover:border-carbon-500 hover:bg-carbon-800 hover:text-carbon-50",
      )}
    >
      {children}
    </button>
  );
}

export function ShopFilters({ sizes }: { sizes: SizeFacets }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const material = params.get("material");
  const size = params.get("size");
  const style = params.get("style");
  const sort = params.get("sort") ?? "featured";
  const hasFilters = Boolean(material || size || style || (sort && sort !== "featured"));

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params.toString());
      if (value === null || next.get(key) === value) next.delete(key);
      else next.set(key, value);
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  return (
    <div className="space-y-8">
      <FilterGroup label="Category">
        <div className="flex flex-wrap gap-2">
          {materials.map((m) => (
            <Chip key={m} active={material === m} onClick={() => setParam("material", m)}>
              {materialMeta[m].label}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.rect.map((s) => (
            <Chip key={s} active={size === s} onClick={() => setParam("size", s)}>
              {s}
            </Chip>
          ))}
        </div>
        {sizes.round.length > 0 && (
          <>
            <p className="mt-4 mb-2 text-xs text-carbon-400">Clocks (diameter)</p>
            <div className="flex flex-wrap gap-2">
              {sizes.round.map((s) => (
                <Chip key={s} active={size === s} onClick={() => setParam("size", s)}>
                  {s}
                </Chip>
              ))}
            </div>
          </>
        )}
      </FilterGroup>

      <FilterGroup label="Style">
        <div className="flex flex-wrap gap-2">
          {styles.map((s) => (
            <Chip key={s} active={style === s} onClick={() => setParam("style", s)}>
              {s}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Sort" htmlFor="shop-sort">
        <div className="relative">
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => setParam("sort", e.target.value === "featured" ? null : e.target.value)}
            className="w-full appearance-none rounded-full border border-carbon-700 bg-carbon-850 py-1.5 pr-9 pl-3.5 text-sm text-carbon-200 transition-colors duration-200 hover:border-carbon-500 hover:bg-carbon-800 hover:text-carbon-50"
          >
            {sorts.map((s) => (
              // Colours the OS-drawn popup, which otherwise renders as a light
              // system menu on a near-black page.
              <option key={s.value} value={s.value} className="bg-carbon-850 text-carbon-50">
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-carbon-400" />
        </div>
      </FilterGroup>

      {hasFilters && (
        <button
          type="button"
          onClick={() => router.replace(pathname, { scroll: false })}
          className="inline-flex items-center gap-1.5 text-sm text-carbon-300 underline underline-offset-4 transition-colors duration-200 hover:text-gold-500"
        >
          <X className="size-3.5" />
          Clear filters
        </button>
      )}
    </div>
  );
}

function FilterGroup({ label, htmlFor, children }: { label: string; htmlFor?: string; children: React.ReactNode }) {
  // h2, not h3: the page heading is an h1 and there is nothing in between.
  return (
    <div>
      {htmlFor ? (
        <label htmlFor={htmlFor} className="mb-3 block text-xs font-semibold tracking-[0.12em] text-carbon-400 uppercase">
          {label}
        </label>
      ) : (
        <h2 className="mb-3 text-xs font-semibold tracking-[0.12em] text-carbon-400 uppercase">{label}</h2>
      )}
      {children}
    </div>
  );
}
