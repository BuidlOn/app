import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Buttons are pill-shaped, ink-bordered, and physically pressable: a flat
 * offset shadow that lifts toward the pointer on hover and compresses to zero
 * on press. `shadow` picks the offset colour independently of the fill, which
 * is how the designs get e.g. an ink button with a teal shadow.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-buidl-pill border-ink font-mono-label font-medium tracking-[0.03em] transition-[transform,box-shadow,background-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:shadow-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** Sunbeam fill — the default call to action. */
        primary: "border-outline bg-primary text-on-primary hover:bg-primary-dim",
        /** Ink fill, cream text — the highest-emphasis action. */
        ink: "border-outline bg-outline text-background",
        /** White field, ink border — the standard secondary action. */
        secondary: "border-outline bg-surface text-on-surface",
        /** Violet fill. */
        accent: "border-outline bg-secondary text-on-secondary hover:bg-secondary-dim",
        /** Hairline-bordered, no fill — quiet tertiary action. */
        outline: "border-hairline border-line bg-surface text-on-surface hover:bg-rule",
        /** No chrome at all. */
        ghost: "border-transparent bg-transparent text-on-surface hover:bg-rule",
        danger: "border-outline bg-error text-white",
        link: "border-transparent tracking-normal text-secondary underline-offset-4 hover:underline",
      },
      /** Offset shadow colour. Depth scales with `size`. */
      shadow: {
        ink: "shadow-brutal-sm hover:shadow-brutal-sm-hover",
        primary: "shadow-brutal-primary-sm hover:shadow-brutal-primary-sm-hover",
        secondary: "shadow-brutal-secondary-sm hover:shadow-brutal-secondary-sm-hover",
        tertiary: "shadow-brutal-tertiary-sm hover:shadow-brutal-tertiary-sm-hover",
        none: "shadow-none",
      },
      size: {
        /** Compact pill — table row actions, chips-as-buttons. */
        xs: "px-4 py-1.5 text-[12px] font-bold hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5",
        sm: "px-4 py-2 text-[12.5px] hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5",
        md: "px-[22px] py-3 text-[13px] hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5",
        lg: "px-[34px] py-[18px] text-[15px] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5",
        icon: "h-10 w-10 p-0 hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5",
      },
    },
    compoundVariants: [
      // Landing-scale buttons carry a deeper 4px offset.
      { size: "lg", shadow: "ink", class: "shadow-brutal hover:shadow-brutal-hover" },
      {
        size: "lg",
        shadow: "primary",
        class: "shadow-brutal-primary hover:shadow-brutal-primary-hover",
      },
      {
        size: "lg",
        shadow: "secondary",
        class: "shadow-brutal-secondary hover:shadow-brutal-secondary-hover",
      },
      {
        size: "lg",
        shadow: "tertiary",
        class: "shadow-brutal-tertiary hover:shadow-brutal-tertiary-hover",
      },
      // Chrome-less variants never carry depth.
      { variant: "ghost", class: "shadow-none hover:translate-x-0 hover:translate-y-0" },
      { variant: "link", class: "shadow-none hover:translate-x-0 hover:translate-y-0" },
    ],
    defaultVariants: {
      variant: "primary",
      shadow: "ink",
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
  ({ className, variant, shadow, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, shadow, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
