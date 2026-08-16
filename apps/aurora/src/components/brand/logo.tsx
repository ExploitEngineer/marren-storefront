import Image from "next/image";
import { cn } from "@/lib/utils";

/** Decor.HBX brand mark - the circular logo badge. `mark` kept for API compatibility. */
export function Logo({ className, mark = true }: { className?: string; mark?: boolean }) {
  void mark;
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/images/logo.jpeg"
        alt="Decor.HBX"
        width={48}
        height={48}
        priority
        className="h-10 w-10 rounded-full object-cover ring-1 ring-race-500/30"
      />
      <span className="sr-only">Decor.HBX</span>
    </span>
  );
}
