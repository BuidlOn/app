import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badges: small sharp-edged rectangles in mono-label type. Neutral variants use
 * muted surfaces; semantic variants use low-opacity functional colors.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-1 font-mono-label text-[10px] uppercase tracking-wider whitespace-nowrap border",
  {
    variants: {
      variant: {
        neutral: "border-outline-variant bg-surface-variant text-on-surface",
        outline: "border-outline-variant bg-transparent text-on-surface-variant",
        primary: "border-primary/20 bg-primary/10 text-primary",
        success: "border-secondary/20 bg-secondary/10 text-secondary",
        warning: "border-tertiary/20 bg-tertiary/10 text-tertiary",
        danger: "border-error/20 bg-error/10 text-error",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { badgeVariants };
