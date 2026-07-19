import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  tone?: "cream" | "surface" | "oat" | "ink";
  size?: "default" | "sm";
}

const tones = {
  cream: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  oat: "bg-oat-100 text-foreground",
  ink: "bg-oat-900 text-oat-100",
};

export function Section({ tone = "cream", size = "default", className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(size === "sm" ? "section-y-sm" : "section-y", tones[tone], className)}
      {...props}
    >
      {children}
    </section>
  );
}
