import { cn } from "@/lib/utils";

export function Logo({ className, mark = true }: { className?: string; mark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-serif text-2xl font-semibold tracking-[-0.02em] text-oat-900", className)}>
      {mark && (
        <span
          aria-hidden
          className="size-3 rounded-[3px] bg-clay-600 shadow-[0_0_0_4px_var(--color-clay-100)]"
        />
      )}
      Framies
    </span>
  );
}
