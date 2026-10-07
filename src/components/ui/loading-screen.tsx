import { cn } from "@/lib/utils";
import { BuidlonMark } from "@/components/brand/buidlon-mark";

/**
 * Full-bleed brand loading state: the mark assembles from its own six facets,
 * then a sweep track carries whatever wait is left.
 *
 * Mark only, no wordmark — the screen already names what it is doing in words
 * just below, so the lockup would say it twice.
 *
 * Deliberately a server component — it ships no JavaScript, so it can paint
 * from `loading.tsx` before any client bundle has arrived.
 *
 * Use this for whole-screen waits (first paint, OAuth return). Inside the app
 * shell, where the sidebar and header are already on screen, prefer `Skeleton`:
 * replacing a populated shell with a splash reads as a navigation, not a wait.
 */
export function LoadingScreen({
  label = "Loading",
  detail,
  surface = "light",
  className,
}: {
  /** Announced to screen readers and shown as the mono caption. */
  label?: string;
  /** Optional second line, for waits long enough to need explaining. */
  detail?: string;
  surface?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "flex min-h-screen flex-col items-center justify-center gap-8 px-6",
        surface === "dark" ? "bg-outline" : "bg-background",
        className,
      )}
    >
      <BuidlonMark
        surface={surface}
        animated
        title="BuidlOn"
        className="logo-breathe w-[min(132px,34vw)]"
      />

      <div className="flex w-[min(280px,70vw)] flex-col items-center gap-4">
        {/* Indeterminate track: ink rule, Sunbeam traveller. */}
        <div
          className={cn(
            "h-1.5 w-32 overflow-hidden rounded-buidl-pill",
            surface === "dark" ? "bg-ink-soft" : "bg-surface-muted",
          )}
        >
          <div className="loader-sweep h-full w-1/4 rounded-buidl-pill bg-primary motion-reduce:w-full motion-reduce:animate-none" />
        </div>

        <p
          className={cn(
            "text-center font-mono-label text-[11px] uppercase tracking-[0.1em]",
            surface === "dark" ? "text-surface-variant" : "text-on-surface-muted",
          )}
        >
          {label}
        </p>

        {detail && (
          <p
            className={cn(
              "max-w-xs text-center text-[13.5px]",
              surface === "dark" ? "text-surface-dim" : "text-on-surface-variant",
            )}
          >
            {detail}
          </p>
        )}
      </div>
    </div>
  );
}
