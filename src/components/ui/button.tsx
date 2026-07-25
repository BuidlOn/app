import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Buttons follow the Technical Precision spec: sharp corners, no shadows,
 * mono-label typography for the "instrument-panel" feel.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-mono-label uppercase tracking-widest whitespace-nowrap transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-container text-on-primary-container hover:brightness-110",
        secondary:
          "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
        outline:
          "border border-outline-variant bg-transparent text-on-surface hover:bg-surface-container",
        ghost: "bg-transparent text-on-surface hover:bg-surface-container",
        danger: "bg-error-container text-on-error-container hover:brightness-110",
        link: "text-primary underline-offset-4 hover:underline tracking-normal normal-case",
      },
      size: {
        sm: "h-8 px-3 text-[11px]",
        md: "h-10 px-6 text-mono-label",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
