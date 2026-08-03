import { cn } from "@/lib/utils";

export function Logo({ className, mark = true }: { className?: string; mark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-heading text-2xl font-semibold tracking-[-0.02em] text-carbon-50", className)}>
      {mark && (
        <span
          aria-hidden
          className="size-3 rounded-[3px] bg-race-500 shadow-[0_0_14px_-1px_rgba(225,6,0,0.65)]"
        />
      )}
      Framies
    </span>
  );
}
