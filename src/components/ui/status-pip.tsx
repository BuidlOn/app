import { cn } from "@/lib/utils";

export type PipTone = "teal" | "amber" | "violet" | "coral" | "ink" | "muted";

const TONE: Record<PipTone, string> = {
  teal: "bg-tertiary",
  amber: "bg-primary",
  violet: "bg-secondary",
  coral: "bg-accent",
  ink: "bg-outline",
  muted: "bg-on-surface-muted",
};

const HALO: Record<PipTone, string> = {
  teal: "ring-4 ring-tertiary/25",
  amber: "ring-4 ring-primary/25",
  violet: "ring-4 ring-secondary/25",
  coral: "ring-4 ring-accent/25",
  ink: "ring-4 ring-outline/20",
  muted: "ring-4 ring-on-surface-muted/25",
};

/** Small circular status dot. Optional halo echoes the ticker's live pulse. */
export function StatusPip({
  tone = "teal",
  pulse,
  halo,
  size = 8,
  className,
}: {
  tone?: PipTone;
  pulse?: boolean;
  /** Soft ring of the same hue, as used on the live rewards ticker. */
  halo?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {pulse && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            TONE[tone],
          )}
        />
      )}
      <span
        className={cn(
          "relative inline-flex h-full w-full rounded-full",
          TONE[tone],
          halo && HALO[tone],
        )}
      />
    </span>
  );
}
