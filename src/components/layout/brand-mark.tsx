import { cn } from "@/lib/utils";
import { Glyph } from "@/components/ui/icons";

/**
 * The BuidlOn lockup: a rounded ink-bordered tile plus the wordmark. The
 * contributor app uses a Sunbeam "B" tile; the admin console swaps in an ink
 * tile with an amber shield to signal elevated privilege.
 */
export function BrandMark({
  subtitle,
  variant = "app",
  size = "md",
  className,
}: {
  /** Mono caption under the wordmark, e.g. "DEV PORTAL". */
  subtitle?: string;
  variant?: "app" | "admin";
  size?: "sm" | "md";
  className?: string;
}) {
  const tile = size === "sm" ? "h-6 w-6 rounded-[7px] text-[11px]" : "h-9 w-9 rounded-[10px] text-[17px]";

  return (
    <span className={cn("flex items-center gap-3", size === "sm" && "gap-[7px]", className)}>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center border-outline font-page-title font-bold",
          size === "sm" ? "border-[1.5px]" : "border-2",
          tile,
          variant === "admin" ? "bg-outline text-background" : "bg-primary text-on-background",
        )}
      >
        {variant === "admin" ? (
          <Glyph name="shield" size={18} className="text-primary" />
        ) : (
          "B"
        )}
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block font-page-title font-bold leading-none text-on-background",
            size === "sm" ? "text-[14px]" : "text-[16px]",
          )}
        >
          BuidlOn
        </span>
        {subtitle && (
          <span className="mt-[3px] block font-mono-label text-[10px] uppercase tracking-[0.05em] text-on-surface-muted">
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
}
