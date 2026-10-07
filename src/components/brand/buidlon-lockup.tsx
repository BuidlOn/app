import { cn } from "@/lib/utils";
import {
  FACET_STAGGER_MS,
  LOCKUP_VIEWBOX,
  LOGO_FILLS,
  MARK_FACETS,
  WORDMARK_GLYPHS,
  WORDMARK_OFFSET,
} from "./logo-geometry";

/** The wordmark follows the mark, one beat per letter at half the facet pace. */
const GLYPH_STAGGER_MS = 30;

/**
 * Mark plus "BUIDLON" wordmark. The letters are outlines, not type, so the
 * lockup renders identically before Bricolage has loaded.
 */
export function BuidlonLockup({
  surface = "light",
  animated = false,
  title = "BuidlOn",
  className,
}: {
  surface?: "light" | "dark";
  animated?: boolean;
  /** Accessible name. Pass `undefined` when adjacent text already names it. */
  title?: string;
  className?: string;
}) {
  const fills = LOGO_FILLS[surface];
  const markDuration = MARK_FACETS.length * FACET_STAGGER_MS;

  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
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
      <g fillRule="evenodd" transform={`translate(${WORDMARK_OFFSET.x} ${WORDMARK_OFFSET.y})`}>
        {WORDMARK_GLYPHS.map((glyph, i) => (
          /*
           * The letter is positioned by the wrapping <g> and animated on the
           * <path>. They cannot be the same element: `logo-facet` animates the
           * CSS transform property, which overrides the SVG transform
           * attribute, so a letter carrying both would lose its x offset and
           * stack on top of its neighbours.
           */
          <g key={glyph.x} transform={`translate(${glyph.x} 0)`}>
            <path
              d={glyph.d}
              className={cn(fills.body, animated && "logo-facet")}
              style={
                animated
                  ? { animationDelay: `${markDuration + i * GLYPH_STAGGER_MS}ms` }
                  : undefined
              }
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
