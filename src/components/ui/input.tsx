import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Form fields sit on white with a hairline border and a soft 12px radius.
 * Search fields use the `pill` shape and leave room for a leading icon.
 * Focus darkens the border to ink rather than adding a glow.
 */
const fieldVariants = cva(
  "w-full bg-surface font-body text-[13.5px] text-on-surface outline-none transition-colors placeholder:text-on-surface-muted focus-visible:border-outline disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      shape: {
        rounded: "rounded-buidl-sm px-3.5 py-2.5",
        /** Compact admin fields. */
        compact: "rounded-[10px] px-3 py-2.5 text-[12.5px]",
        /** Search bar — pill with room for a leading icon. */
        pill: "rounded-buidl-pill py-2.5 pl-10 pr-4",
      },
      invalid: {
        true: "border-[1.5px] border-error focus-visible:border-error",
        false: "border-[1.5px] border-outline/15",
      },
    },
    defaultVariants: {
      shape: "rounded",
      invalid: false,
    },
  },
);

type FieldShape = NonNullable<VariantProps<typeof fieldVariants>["shape"]>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  shape?: FieldShape;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, shape, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(fieldVariants({ shape, invalid: !!error }), className)}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  shape?: FieldShape;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, shape, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(
        fieldVariants({ shape, invalid: !!error }),
        "resize-none font-body",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  shape?: FieldShape;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, shape, ...props }, ref) => (
    <select
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(fieldVariants({ shape, invalid: !!error }), "cursor-pointer", className)}
      {...props}
    />
  ),
);
Select.displayName = "Select";

/** Small mono field label. */
export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "mb-1.5 block font-mono-label text-eyebrow uppercase text-on-surface-muted",
        className,
      )}
      {...props}
    />
  );
}

/** Inline validation message. */
export function FieldError({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  if (!children) return null;
  return (
    <p className={cn("mt-1.5 text-[12px] text-error", className)} {...props}>
      {children}
    </p>
  );
}

export { fieldVariants };
