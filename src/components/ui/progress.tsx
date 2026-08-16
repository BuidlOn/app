import { cn } from "@/lib/utils";

type Tone = "tertiary" | "primary" | "secondary" | "ink";

const FILL: Record<Tone, string> = {
  tertiary: "bg-tertiary",
  primary: "bg-primary",
  secondary: "bg-secondary",
  ink: "bg-outline",
};

/**
 * Progress track. The ink border is what makes it read as part of the tactile
 * system rather than a generic meter; thin tracks (`size="sm"`) drop it.
 */
export function Progress({
  value,
  tone = "tertiary",
  size = "md",
  label,
  className,
}: {
  /** 0–1. */
  value: number;
  tone?: Tone;
  size?: "sm" | "md";
  label?: string;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn(
        "w-full overflow-hidden rounded-full bg-rule",
        size === "sm" ? "h-1.5 border-[1.5px] border-outline" : "h-2.5 border-2 border-outline",
        className,
      )}
    >
      <div
        className={cn("h-full rounded-buidl-pill transition-[width] duration-500", FILL[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
