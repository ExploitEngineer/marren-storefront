import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  as?: ElementType;
  size?: "default" | "wide" | "narrow";
}

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-[88rem]",
};

export function Container({ as: Tag = "div", size = "default", className, ...props }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", sizes[size], className)} {...props} />;
}
