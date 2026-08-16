import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Stat tile: mono eyebrow over a display-face figure, with an optional delta
 * riding the baseline. The `highlight` tone promotes one tile in a row to the
 * Sunbeam field — used for the reader's own rank.
 */
export function StatTile({
  label,
  value,
  delta,
  hint,
  deltaTone = "positive",
  highlight,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: React.ReactNode;
  delta?: React.ReactNode;
  /** Supporting line under the figure, e.g. "Across connected repositories". */
  hint?: React.ReactNode;
  deltaTone?: "positive" | "muted";
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-buidl-lg border-2 p-6 shadow-[4px_4px_0_#161616] flex flex-col gap-1.5 transition-transform hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0_#161616]",
        highlight ? "border-outline bg-primary" : "border-outline bg-surface",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "font-mono-label text-[12px] uppercase tracking-[0.06em]",
          highlight ? "text-on-primary-deep" : "text-on-surface-muted",
        )}
      >
        {label}
      </div>
      <div className="flex flex-wrap items-baseline gap-2 mt-1">
        <span className="font-page-title text-[32px] font-bold leading-none tracking-[-0.02em] text-on-background">
          {value}
        </span>
        {delta && (
          <span
            className={cn(
              "text-[14px] font-bold",
              highlight
                ? "text-on-primary-deep"
                : deltaTone === "positive"
                  ? "text-tertiary"
                  : "font-normal text-on-surface-muted",
            )}
          >
            {delta}
          </span>
        )}
      </div>
      {hint && (
        <div
          className={cn(
            "mt-1 text-[12.5px]",
            highlight ? "text-on-primary-deep" : "text-on-surface-muted",
          )}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

/**
 * Admin-style stat row: one rounded container whose cells are separated by
 * hairline gaps letting the ink wash beneath show through.
 */
export function StatGrid({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid gap-[1.5px] overflow-hidden rounded-buidl-lg border-hairline border-line bg-outline/10 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      {...props}
    />
  );
}

export function StatGridCell({
  label,
  value,
  delta,
  marker,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: React.ReactNode;
  delta?: React.ReactNode;
  /** Small glyph in the top-right corner, e.g. ↑ or ✓. */
  marker?: React.ReactNode;
}) {
  return (
    <div
      className={cn("flex flex-col gap-2.5 bg-surface px-6 py-[22px]", className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono-label text-[10.5px] uppercase tracking-[0.06em] text-on-surface-muted">
          {label}
        </span>
        {marker && <span className="shrink-0 text-points">{marker}</span>}
      </div>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-display text-[24px] font-bold leading-none tracking-[-0.02em]">
          {value}
        </span>
        {delta && <span className="text-[11px] font-bold text-points">{delta}</span>}
      </div>
    </div>
  );
}
