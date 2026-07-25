import { cn } from "@/lib/utils";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Material Symbols name, e.g. "code", "account_balance_wallet". */
  name: string;
  /** Render the filled variant of the symbol. */
  filled?: boolean;
}

/**
 * Thin wrapper around Material Symbols (Outlined). The Stitch design leans on
 * this icon set; keep icon usage going through here for consistency.
 */
export function Icon({ name, filled, className, style, ...props }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("material-symbols-outlined leading-none", className)}
      style={{
        ...(filled ? { fontVariationSettings: "'FILL' 1" } : {}),
        ...style,
      }}
      {...props}
    >
      {name}
    </span>
  );
}
