import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  tone?: "base" | "raise" | "panel" | "contrast";
  size?: "default" | "sm";
}

const tones = {
  base: "bg-background text-foreground",
  raise: "bg-carbon-900 text-foreground",
  panel: "bg-carbon-850 text-foreground",
  contrast: "bg-black text-carbon-50",
};

export function Section({ tone = "base", size = "default", className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(size === "sm" ? "section-y-sm" : "section-y", tones[tone], className)}
      {...props}
    >
      {children}
    </section>
  );
}
