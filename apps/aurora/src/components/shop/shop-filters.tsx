"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { materialMeta, type Material } from "@/content/collections";
import type { FrameSize, FrameStyle } from "@/content/products";
import { cn } from "@/lib/utils";

const materials = Object.keys(materialMeta) as Material[];
const sizes: FrameSize[] = ["A5", "A4", "A3"];
const styles: FrameStyle[] = ["3D Build", "Shadow Box", "Poster"];
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
          ? "border-race-500 bg-race-500 text-primary-foreground"
          : "border-carbon-700 bg-carbon-850 text-carbon-200 hover:border-carbon-600 hover:text-carbon-50",
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
      <FilterGroup label="Marque">
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
              {s}
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
          className="w-full rounded-[10px] border border-carbon-700 bg-carbon-850 px-3.5 py-2.5 text-sm text-carbon-50 focus:border-race-500 focus:ring-2 focus:ring-ring/30 focus:outline-none"
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
          className="inline-flex items-center gap-1.5 text-sm text-carbon-300 underline underline-offset-4 transition-colors hover:text-race-500"
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
      <h3 className="mb-3 text-xs font-semibold tracking-[0.12em] text-carbon-400 uppercase">{label}</h3>
      {children}
    </div>
  );
}
