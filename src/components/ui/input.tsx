import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input: 1px border, deep background. On focus the border switches to primary
 * with no glow. Error state switches the border to the error color.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          "h-10 w-full border bg-surface-container-lowest px-3 font-body text-body text-on-surface placeholder:text-outline",
          "focus-visible:outline-none focus-visible:border-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-error" : "border-outline-variant",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
