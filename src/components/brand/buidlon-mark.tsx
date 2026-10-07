import { cn } from "@/lib/utils";
import {
  FACET_STAGGER_MS,
  LOGO_FILLS,
  MARK_FACETS,
  MARK_VIEWBOX,
} from "./logo-geometry";

/**
 * The BuidlOn mark, inlined rather than served from `public/`.
 *
 * It is ~550 bytes of path data, and the screens that use it are showing
 * *because* something else has not loaded yet — a logo fetched over the network
 * would be the last thing to paint on the loading screen, which defeats it.
 */
export function BuidlonMark({
  surface = "light",
  animated = false,
  title,
  className,
}: {
  /** The ground the mark sits on, not the mark's own colour. */
  surface?: "light" | "dark";
  /** Assemble facet by facet. Overridden by `prefers-reduced-motion`. */
  animated?: boolean;
  /** Accessible name. Omit when a visible wordmark already names it. */
  title?: string;
  className?: string;
}) {
  const fills = LOGO_FILLS[surface];

  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={cn("h-auto w-full", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {MARK_FACETS.map((facet, i) => (
        <path
          key={facet.d}
          d={facet.d}
          className={cn(fills[facet.part], animated && "logo-facet")}
          style={animated ? { animationDelay: `${i * FACET_STAGGER_MS}ms` } : undefined}
        />
      ))}
    </svg>
  );
}
