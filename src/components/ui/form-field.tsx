import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldError, Label } from "./input";

interface ControlProps {
  /** Wire onto the control so the label's htmlFor matches. */
  id: string;
  /** Consumed by Input/Textarea/Select to switch the border to the error tone. */
  error: boolean;
  /** Wire onto the control's aria-describedby so SR users hear hint and error. */
  "aria-describedby": string | undefined;
}

/**
 * One place that ties a label, a control, a hint, and a validation message
 * together, including the aria wiring. Every form field goes through this so
 * an error can never render without being announced, and a control can never
 * lose its label.
 */
export function FormField({
  label,
  error,
  hint,
  required,
  htmlFor,
  className,
  children,
}: {
  label: string;
  /** Message from the resolver. Presence of a value marks the field invalid. */
  error?: string;
  /** Static guidance shown under the control while the field is valid. */
  hint?: React.ReactNode;
  required?: boolean;
  /** Override the generated id when the control needs a stable one. */
  htmlFor?: string;
  className?: string;
  children: (props: ControlProps) => React.ReactNode;
}) {
  const generated = React.useId();
  const id = htmlFor ?? generated;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const invalid = !!error;

  // Point at whichever messages are actually rendered, in reading order.
  const describedBy =
    [hint ? hintId : null, invalid ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("min-w-0", className)}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="ml-1 text-error" aria-hidden="true">
            *
          </span>
        )}
      </Label>

      {children({ id, error: invalid, "aria-describedby": describedBy })}

      {hint && !invalid && (
        <p id={hintId} className="mt-1.5 text-[12px] text-on-surface-muted">
          {hint}
        </p>
      )}

      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}
