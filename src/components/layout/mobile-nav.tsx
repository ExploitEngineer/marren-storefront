"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { primaryNav } from "@/content/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-11 place-items-center rounded-[10px] text-oat-900 transition-colors hover:bg-oat-100 md:hidden"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(20rem,86vw)] border-oat-200 bg-background p-0">
        <SheetHeader className="border-b border-oat-200 p-5">
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col p-3" aria-label="Mobile">
          {primaryNav.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-4 py-3 font-serif text-xl text-oat-900 transition-colors hover:bg-oat-100",
                  active && "text-clay-700",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-oat-200 p-5">
          <Button asChild size="lg" className="w-full">
            <Link href="/shop" onClick={() => setOpen(false)}>
              Shop frames
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
