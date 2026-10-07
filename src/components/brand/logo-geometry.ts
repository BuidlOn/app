/**
 * Path data for the BuidlOn logo, taken verbatim from the designer's export
 * (`logo-export/buidlon-mark.svg` and `buidlon-logo-lockup.svg`). Only the
 * fills differ: the export hardcodes hex, these resolve through tokens.
 *
 * Kept apart from the components so the mark and the lockup draw from one
 * source and cannot drift.
 */

export type LogoPart = "body" | "wing" | "spark";

/**
 * The six polygons of the mark, in build order: the chevron first, then the
 * body left to right, with the cyan spark landing last.
 *
 * The designer's export carried a seventh shape, a detached slate diamond at
 * x 2-52, outside the B's left edge. Dropped at the user's request; the
 * viewBoxes below are tightened to match so the mark is not left padded on
 * one side.
 */
export const MARK_FACETS: ReadonlyArray<{ d: string; part: LogoPart }> = [
  { part: "wing", d: "M108 1V57L64 100L20 57H50Z" },
  { part: "body", d: "M108 57V144H20Z" },
  { part: "body", d: "M108 1H200L224 25L192 56H108Z" },
  { part: "body", d: "M156 96L196 56L249 10V66L220 96Z" },
  { part: "body", d: "M154 100H220L249 129V146L195 200H108V146H196Z" },
  { part: "spark", d: "M108 146V200H53Z" },
];

/** B, U, I, D, L, O, N as outlines, so the lockup needs no webfont. */
export const WORDMARK_GLYPHS: ReadonlyArray<{ d: string; x: number }> = [
  {
    x: 0,
    d: "M0 0H37C50 0 59 8 59 18C59 25 56 30 50 33C58 36 63 42 63 52C63 66 53 75 38 75H0ZM15 13H35C40 13 44 16 44 20.5C44 25 40 28 35 28H15ZM15 41H36C42 41 47 44 47 51C47 58 42 62 36 62H15Z",
  },
  { x: 72, d: "M0 0H15V45C15 56 22 62 33.5 62C45 62 52 56 52 45V0H67V45C67 64 54 76 33.5 76C13 76 0 64 0 45Z" },
  { x: 151, d: "M0 0H15V75H0Z" },
  { x: 180, d: "M0 0H30C52 0 67 15 67 37.5C67 60 52 75 30 75H0ZM15 14H30C43 14 52 23 52 37.5C52 52 43 61 30 61H15Z" },
  { x: 259, d: "M0 0H15V61H56V75H0Z" },
  {
    x: 323,
    d: "M0 37.5A39.5 38.5 0 1 0 79 37.5A39.5 38.5 0 1 0 0 37.5ZM15 37.5A24.5 23.5 0 1 1 64 37.5A24.5 23.5 0 1 1 15 37.5Z",
  },
  { x: 413, d: "M0 0H14L52 50V0H66V75H52L14 25V75H0Z" },
];

/** Where the wordmark sits inside the lockup viewBox. */
export const WORDMARK_OFFSET = { x: 301, y: 65 } as const;

/**
 * Both boxes start at x=18 rather than 0: with the diamond gone the leftmost
 * ink is the chevron at x=20, and the designer's original kept a 2px margin.
 * Right edges are unchanged (mark 251, lockup 782), so the gap between the mark
 * and the wordmark is exactly as exported.
 */
export const MARK_VIEWBOX = "18 0 233 202";
export const LOCKUP_VIEWBOX = "18 0 764 202";

/** Milliseconds between facets. Seven land over 360ms, plus the 420ms pop. */
export const FACET_STAGGER_MS = 60;

/** Keyed by the ground the logo sits on, not by the logo's own colour. */
export const LOGO_FILLS: Record<"light" | "dark", Record<LogoPart, string>> = {
  light: { body: "fill-logo-body", wing: "fill-logo-wing", spark: "fill-logo-spark" },
  dark: {
    body: "fill-logo-body-inverse",
    wing: "fill-logo-wing-inverse",
    spark: "fill-logo-spark",
  },
};
