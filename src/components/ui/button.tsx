import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] border border-transparent font-sans font-medium whitespace-nowrap transition-[transform,background-color,box-shadow,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-clay-700 hover:shadow-md",
        secondary: "border-oat-300 bg-transparent text-oat-900 hover:bg-oat-100",
        outline: "border-oat-300 bg-surface text-oat-900 hover:bg-oat-100",
        ghost: "text-oat-900 hover:bg-oat-100",
        link: "rounded-none px-0 text-clay-600 underline-offset-4 hover:text-clay-700 hover:underline",
        inverse: "bg-oat-50 text-oat-900 shadow-sm hover:bg-white",
        destructive: "bg-destructive text-white shadow-sm hover:bg-destructive/90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-[0.95rem]",
        lg: "h-[3.25rem] px-7 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
