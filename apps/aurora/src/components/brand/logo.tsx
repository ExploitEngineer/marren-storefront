import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Decor.HBX brand mark - the circular logo badge.
 * Decorative: every caller wraps it in a link that carries the accessible name,
 * so an alt and an sr-only span here would announce the brand three times.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/images/logo.jpeg"
        alt=""
        width={48}
        height={48}
        priority
        className="h-10 w-10 rounded-full object-cover ring-1 ring-gold-500/30"
      />
    </span>
  );
}
