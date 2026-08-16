import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Pill chips. Tinted variants pair a low-opacity accent fill with a darkened
 * ink of the same hue so the label stays legible on cream and on white.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-buidl-pill font-mono-label font-semibold leading-none",
  {
    variants: {
      variant: {
        /** Violet tint — repository slugs, language tags. */
        secondary: "bg-secondary/[0.12] text-secondary",
        /** Sunbeam tint — medium difficulty, warnings. */
        primary: "bg-primary/25 text-on-primary-deep",
        /** Teal tint — easy difficulty, rewards, healthy states. */
        tertiary: "bg-tertiary/15 text-on-tertiary-deep",
        /** Coral tint — hard difficulty, urgency. */
        accent: "bg-accent/15 text-on-accent-deep",
        /** Solid ink — the loudest state chip ("IN REVIEW", "LIVE"). */
        ink: "bg-outline text-white",
        /** Quiet grey fill — inactive/settled states ("CLAIMED"). */
        neutral: "bg-rule text-on-surface-variant",
        /** Ink-outlined, no fill ("READY", "SECURE"). */
        outline: "border-hairline border-outline bg-transparent text-on-surface",
        /** Hairline-outlined language/skill tag. */
        tag: "border-hairline border-line bg-transparent font-body font-semibold text-on-surface-variant",
        danger: "bg-error/15 text-on-error-deep",
      },
      size: {
        sm: "px-2.5 py-[3px] text-[10px]",
        md: "px-2.5 py-1 text-[11px]",
        lg: "px-3 py-1.5 text-[12px]",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size, className }))} {...props} />;
}

export { badgeVariants };
