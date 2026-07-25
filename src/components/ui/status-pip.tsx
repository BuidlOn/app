import { cn } from "@/lib/utils";

type Tone = "primary" | "success" | "warning" | "danger" | "neutral";

const TONE: Record<Tone, string> = {
  primary: "bg-primary",
  success: "bg-secondary",
  warning: "bg-tertiary",
  danger: "bg-error",
  neutral: "bg-outline",
};

/** Small circular status dot. Pips may be round even though containers are sharp. */
export function StatusPip({
  tone = "neutral",
  pulse,
  className,
}: {
  tone?: Tone;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      {pulse && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            TONE[tone],
          )}
        />
      )}
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", TONE[tone])} />
    </span>
  );
}
