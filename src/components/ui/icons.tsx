import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Line icons lifted verbatim from the design files, including their original
 * stroke weights (the designs vary between 1.6 and 2.2 deliberately — heavier
 * for navigation, lighter for decorative tile glyphs). Colour follows
 * `currentColor`, so tone comes from the parent.
 *
 * For affordances the designs don't specify, use `Icon` (Material Symbols).
 */
const GLYPHS = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  repositories: (
    <>
      <path
        d="M8 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M21 3L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M21 3H15M21 3V9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  issues: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8V12L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  issueOpen: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7V17M9 10H15M9 14H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
  leaderboard: (
    <path
      d="M4 20V13M12 20V4M20 20V9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
  star: (
    <path
      d="M12 2L14.5 8.5L21 9L16 13.5L17.5 20L12 16.5L6.5 20L8 13.5L3 9L9.5 8.5L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 21C4 17 7.5 14.5 12 14.5C16.5 14.5 20 17 20 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M3 20C3 16.5 5.7 14.5 9 14.5C12.3 14.5 15 16.5 15 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M15.5 14.6C18 14.9 20 16.6 20 19.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.64 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.64a1.7 1.7 0 0 0 1-1.55V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.36 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
      <line
        x1="16.2"
        y1="16.2"
        x2="21"
        y2="21"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </>
  ),
  bell: (
    <>
      <path
        d="M18 8A6 6 0 006 8C6 15 3 17 3 17H21S18 15 18 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M13.7 21A2 2 0 0110.3 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
  menu: (
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  ),
  chevronLeft: (
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  code: (
    <>
      <path
        d="M9 6L4 12L9 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 6L20 12L15 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  home: (
    <>
      <path
        d="M4 10L12 4L20 10V19C20 19.55 19.55 20 19 20H5C4.45 20 4 19.55 4 19V10Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M12 14V17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4 6V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4 12V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V12"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </>
  ),
  cart: (
    <>
      <path
        d="M6 6H4L4.5 9M4.5 9H20L18 16H7L4.5 9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="20" r="1.3" fill="currentColor" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" />
    </>
  ),
  trophy: (
    <>
      <path
        d="M6 4H18V9C18 12.3 15.3 15 12 15C8.7 15 6 12.3 6 9V4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M6 6H3V8C3 9.66 4.34 11 6 11M18 6H21V8C21 9.66 19.66 11 18 11"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 15V19M8 21H16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  card: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10H21" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="14.5" r="1.3" fill="currentColor" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
      <path d="M8 2V6M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  lock: (
    <>
      <rect x="3" y="9" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 9V6a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  shield: (
    <path
      d="M12 2L20 5V11C20 16 16.5 20 12 22C7.5 20 4 16 4 11V5L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  ),
  clipboardCheck: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 9L11 12L16 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  chat: (
    <path
      d="M21 11.5C21 16.75 16.97 21 12 21C10.6 21 9.27 20.66 8.1 20.05L3 21L4.35 16.9C3.5 15.6 3 14.09 3 12.5C3 7.25 7.03 3 12 3C16.97 3 21 6.75 21 11.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  ),
  logout: (
    <>
      <path
        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 17l5-5-5-5M21 12H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  github: (
    <path
      d="M12 2C6.48 2 2 6.58 2 12.25c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-1.02-.01-1.85-2.79.6-3.38-1.19-3.38-1.19-.44-1.12-1.08-1.42-1.08-1.42-.87-.6.07-.58.07-.58.97.07 1.48 1 1.48 1 .86 1.48 2.27 1.05 2.82.8.09-.63.34-1.05.61-1.29-2.23-.25-4.57-1.12-4.57-4.98 0-1.1.39-2 1.03-2.71-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03a9.4 9.4 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.41.1 2.66.64.71 1.03 1.61 1.03 2.71 0 3.87-2.35 4.73-4.58 4.98.36.32.68.93.68 1.88 0 1.36-.01 2.46-.01 2.79 0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
      fill="currentColor"
    />
  ),
  twitter: (
    <path
      d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05A4.13 4.13 0 0 0 16.11 4c-2.28 0-4.13 1.87-4.13 4.17 0 .33.03.65.1.96A11.65 11.65 0 0 1 3.16 4.9a4.22 4.22 0 0 0-.56 2.1c0 1.45.72 2.72 1.82 3.47A4.1 4.1 0 0 1 2.6 9.9v.05c0 2.02 1.4 3.71 3.27 4.1-.34.1-.7.15-1.08.15-.26 0-.52-.02-.77-.07.52 1.66 2.03 2.87 3.82 2.9A8.24 8.24 0 0 1 1 18.58 11.62 11.62 0 0 0 7.29 20.4c7.55 0 11.68-6.32 11.68-11.8 0-.18 0-.36-.01-.53A8.35 8.35 0 0 0 22.46 6Z"
      fill="currentColor"
    />
  ),
} as const;

export type GlyphName = keyof typeof GLYPHS;

export interface GlyphProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: GlyphName;
  size?: number;
}

export function Glyph({ name, size = 18, className, ...props }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
      {...props}
    >
      {GLYPHS[name]}
    </svg>
  );
}
