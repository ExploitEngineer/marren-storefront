"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CartSheet } from "@/components/cart/cart-sheet";
import { primaryNav } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header({ variant = "default" }: { variant?: "default" | "minimal" }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const minimal = variant === "minimal";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 backdrop-blur-md transition-[background-color,border-color,box-shadow,padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "border-b border-oat-200 bg-background/85 shadow-xs" : "border-b border-transparent bg-background/60",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8",
          scrolled ? "h-16" : "h-[4.75rem]",
          "transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        )}
      >
        <Link href="/" aria-label="Marren home" className="rounded-md">
          <Logo />
        </Link>

        {!minimal && (
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {primaryNav.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-3.5 py-2 text-sm font-medium text-oat-700 transition-colors hover:text-oat-900",
                    active && "text-clay-700",
                  )}
                >
                  {link.label}
                  {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-px bg-clay-500" />}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-1 sm:gap-2">
          {minimal ? (
            <Button asChild size="sm" className="sm:h-11 sm:px-6">
              <Link href="/gallery-wall#sets">Shop the sets</Link>
            </Button>
          ) : (
            <>
              <CartSheet />
              <Button asChild className="hidden sm:inline-flex">
                <Link href="/shop">Shop frames</Link>
              </Button>
              <MobileNav />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
