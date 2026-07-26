import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] border border-transparent font-sans font-medium whitespace-nowrap transition-[transform,background-color,box-shadow,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-race-600 hover:shadow-md",
        secondary: "border-carbon-700 bg-transparent text-carbon-50 hover:bg-carbon-900",
        outline: "border-carbon-700 bg-carbon-850 text-carbon-50 hover:bg-carbon-900",
        ghost: "text-carbon-50 hover:bg-carbon-900",
        link: "rounded-none px-0 text-race-500 underline-offset-4 hover:text-race-500 hover:underline",
        inverse: "bg-carbon-950 text-carbon-50 shadow-sm hover:bg-white",
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
