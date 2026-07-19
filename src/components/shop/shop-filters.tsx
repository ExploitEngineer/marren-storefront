"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { materialMeta, type Material } from "@/content/collections";
import type { FrameSize, FrameStyle } from "@/content/products";
import { cn } from "@/lib/utils";

const materials = Object.keys(materialMeta) as Material[];
const sizes: FrameSize[] = ["4x6", "5x7", "8x10", "11x14", "16x20", "18x24", "24x36"];
const styles: FrameStyle[] = ["Classic", "Wide", "Thin", "Float"];
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
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "border-clay-600 bg-clay-600 text-primary-foreground"
          : "border-oat-300 bg-surface text-oat-700 hover:border-oat-400 hover:text-oat-900",
      )}
    >
      {children}
    </button>
  );
}

export function ShopFilters() {
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
      <FilterGroup label="Wood">
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
          {sizes.map((s) => (
            <Chip key={s} active={size === s} onClick={() => setParam("size", s)}>
              {s.replace("x", "×")}
            </Chip>
          ))}
        </div>
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

      <FilterGroup label="Sort">
        <select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value === "featured" ? null : e.target.value)}
          className="w-full rounded-[10px] border border-oat-300 bg-surface px-3.5 py-2.5 text-sm text-oat-900 focus:border-clay-500 focus:ring-2 focus:ring-ring/30 focus:outline-none"
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </FilterGroup>

      {hasFilters && (
        <button
          type="button"
          onClick={() => router.replace(pathname, { scroll: false })}
          className="inline-flex items-center gap-1.5 text-sm text-oat-600 underline underline-offset-4 transition-colors hover:text-clay-700"
        >
          <X className="size-3.5" />
          Clear filters
        </button>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold tracking-[0.12em] text-oat-500 uppercase">{label}</h3>
      {children}
    </div>
  );
}
