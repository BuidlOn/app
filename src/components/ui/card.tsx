import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Cards come in two border weights. Hairline is the workhorse for dense app
 * surfaces; ink promotes a card to hero status (season progress, highlighted
 * stats). `lift` adds the accent-coloured offset shadow on hover.
 */
const cardVariants = cva("rounded-buidl-lg bg-surface", {
  variants: {
    border: {
      hairline: "border-[1.5px] border-outline/15",
      ink: "border-2 border-outline",
      none: "border-0",
    },
    /** Fill colour. `primary` is the Sunbeam highlight card. */
    tone: {
      surface: "bg-surface",
      primary: "bg-primary",
      ink: "bg-outline text-background",
      cream: "bg-background",
    },
    /** Accent offset shadow revealed on hover, with a small rise. */
    lift: {
      none: "",
      ink: "transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_#161616]",
      primary:
        "transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_#FFC53D]",
      secondary:
        "transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_#7C5CFC]",
      tertiary:
        "transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_#00C2A8]",
    },
    /** Static accent offset shadow (no hover needed). */
    shadow: {
      none: "",
      ink: "shadow-card-ink",
      primary: "shadow-card-primary",
      secondary: "shadow-card-secondary",
      tertiary: "shadow-card-tertiary",
    },
  },
  defaultVariants: {
    border: "hairline",
    tone: "surface",
    lift: "none",
    shadow: "none",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Swap the wrapper element when the card is semantically an article or section. */
  as?: "div" | "article" | "section";
}

export function Card({
  className,
  border,
  tone,
  lift,
  shadow,
  as: Comp = "div",
  ...props
}: CardProps) {
  return (
    <Comp
      className={cn(cardVariants({ border, tone, lift, shadow, className }))}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between gap-4 p-6 pb-0", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display text-card-title text-on-surface", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-body text-[13.5px] leading-relaxed text-on-surface-variant", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between gap-4 p-6 pt-0", className)}
      {...props}
    />
  );
}

/**
 * Uppercase mono eyebrow used above stats and card titles throughout the app.
 */
export function CardEyebrow({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "font-mono-label text-eyebrow uppercase text-on-surface-muted",
        className,
      )}
      {...props}
    />
  );
}

export { cardVariants };
