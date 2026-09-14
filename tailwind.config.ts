import type { Config } from "tailwindcss";

/**
 * BuidlOn "Soft-tactile maximalism" design system.
 * Ported from Claude Design. Brutalist confidence, softened:
 * thick ink borders + offset shadows, warm cream fields, round pill shapes,
 * and candy-bright accents instead of black-on-black.
 *
 * Two border weights carry the whole system:
 *   - ink      2px #161616         emphasis, buttons, shell dividers, hero
 *   - hairline 1.5px rgba(ink,.15) standard cards, inputs, chips
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2", // Cream (bg)
        surface: "#FFFFFF",    // Surface (card)
        "surface-dim": "#F3EFE8",
        "surface-bright": "#FFFFFF",
        "surface-variant": "#EAE4D8",

        primary: "#FFC53D", // Sunbeam
        "primary-dim": "#E5B036",
        "on-primary": "#161616",
        /** Legible text/icon ink for use on top of a Sunbeam field. */
        "on-primary-deep": "#4D3F05",
        /** The same deep amber used as a foreground accent on light fields. */
        "primary-deep": "#4D3F05",

        secondary: "#7C5CFC", // Violet
        "secondary-dim": "#6E51DF",
        "on-secondary": "#FAF7F2",
        /** Darkened violet, legible as text on cream and white. */
        "secondary-deep": "#5A00C6",

        tertiary: "#00C2A8", // Teal (reward)
        "on-tertiary": "#161616",
        /** Legible teal ink for tinted teal chips and point values. */
        "on-tertiary-deep": "#007A68",
        "tertiary-deep": "#007A68",

        accent: "#FF5A3C", // Coral — hard difficulty / high urgency
        "on-accent-deep": "#C2491C",

        /** The ink used for text, fills and heavy borders. */
        ink: "#161616",
        outline: "#161616", // Ink
        "outline-variant": "#46433D",
        /** Standard card/input border colour, paired with `border-hairline`. */
        line: "rgba(22,22,22,0.15)",
        /** Table row separators, progress tracks, subtle fills. */
        rule: "rgba(22,22,22,0.08)",

        technical: "#161616",

        // Text
        "on-background": "#161616",
        "on-surface": "#161616",
        "on-surface-variant": "#46433D",
        "on-surface-muted": "#8A867C",

        /** Points / earnings figures. */
        points: "#00806E",

        /** Pale accent washes used as card and row backgrounds. */
        "primary-wash": "#FFF3D6",
        "secondary-wash": "#F7F4FF",
        "tertiary-wash": "#E0F9F5",

        /** Accent inks legible on their own 15-25% tint, not on a solid field. */
        "on-primary-tint": "#7A5C05",
        "on-secondary-tint": "#3F008E",

        /** Contribution heatmap intensity ramp, level 1 to 4. */
        "heat-1": "#EDE0FF",
        "heat-2": "#D2BBFF",
        "heat-3": "#A882FF",
        "heat-4": "#5A00C6",

        /** Quietest text tone, below on-surface-muted. */
        "on-surface-faint": "#A4A095",
        /** Neutral fill for inactive track and bar segments. */
        "surface-muted": "#E6E4DF",
        /** Ink lifted one step, for hover on ink-filled surfaces. */
        "ink-soft": "#2B2B2B",

        error: "#EF4444",
        "on-error-deep": "#B42318",
      },
      borderWidth: {
        hairline: "1.5px",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "1.75rem",
        full: "9999px",
        // BuidlOn signature shapes
        "buidl-sm": "12px",
        "buidl-md": "16px",
        "buidl-lg": "20px",
        "buidl-xl": "28px",
        "buidl-2xl": "32px",
        "buidl-pill": "9999px",
      },
      boxShadow: {
        // Landing-scale press depth (4px)
        brutal: "4px 4px 0 #161616",
        "brutal-hover": "6px 6px 0 #161616",
        "brutal-active": "0 0 0 #161616",
        // App-scale press depth (3px) — denser UI, shallower depth
        "brutal-sm": "3px 3px 0 #161616",
        "brutal-sm-hover": "4px 4px 0 #161616",
        // Accent-shadowed buttons
        "brutal-primary": "4px 4px 0 #FFC53D",
        "brutal-primary-hover": "6px 6px 0 #FFC53D",
        "brutal-primary-sm": "3px 3px 0 #FFC53D",
        "brutal-primary-sm-hover": "4px 4px 0 #FFC53D",
        "brutal-secondary": "4px 4px 0 #7C5CFC",
        "brutal-secondary-hover": "6px 6px 0 #7C5CFC",
        "brutal-secondary-sm": "3px 3px 0 #7C5CFC",
        "brutal-secondary-sm-hover": "4px 4px 0 #7C5CFC",
        "brutal-tertiary": "4px 4px 0 #00C2A8",
        "brutal-tertiary-hover": "6px 6px 0 #00C2A8",
        "brutal-tertiary-sm": "3px 3px 0 #00C2A8",
        "brutal-tertiary-sm-hover": "4px 4px 0 #00C2A8",
        // Card lift shadows (5px, accent-coloured)
        "card-ink": "5px 5px 0 #161616",
        "card-primary": "5px 5px 0 #FFC53D",
        "card-secondary": "5px 5px 0 #7C5CFC",
        "card-tertiary": "5px 5px 0 #00C2A8",
        // Workflow-card hover lift (8px)
        "lift-primary": "8px 8px 0 #FFC53D",
        "lift-secondary": "8px 8px 0 #7C5CFC",
        "lift-tertiary": "8px 8px 0 #00C2A8",
        // Flat drop used by the hero CTA (no x-offset)
        "drop-heat": "0 4px 0 #A882FF",
        "drop-heat-sm": "0 2px 0 #A882FF",
        // Mobile frame
        frame: "0 20px 60px rgba(0,0,0,0.15)",
        none: "none",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        pop: "pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        floaty: "floaty 5s ease-in-out infinite",
        floaty2: "floaty2 6s ease-in-out infinite",
        dash: "dash 1.2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(15px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "60%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0) rotate(-3deg)" },
          "50%": { transform: "translateY(-10px) rotate(-1deg)" },
        },
        floaty2: {
          "0%, 100%": { transform: "translateY(0) rotate(4deg)" },
          "50%": { transform: "translateY(-14px) rotate(6deg)" },
        },
        dash: {
          to: { strokeDashoffset: "0" },
        },
      },
      spacing: {
        "gap-2": "0.5rem",
        "gap-4": "1rem",
        "gap-6": "1.5rem",
        "gap-8": "2rem",
        "gap-12": "3rem",
        "container-padding": "2rem",
        "section-margin": "4rem",
        sidebar: "256px",
        header: "72px",
      },
      fontFamily: {
        "page-title": ["var(--font-bricolage)", "sans-serif"],
        "section-heading": ["var(--font-bricolage)", "sans-serif"],
        display: ["var(--font-bricolage)", "sans-serif"],
        caption: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        "mono-label": ["var(--font-fragment-mono)", "monospace"],
        mono: ["var(--font-fragment-mono)", "monospace"],
      },
      fontSize: {
        "page-title": ["42px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "hero-title": ["68px", { lineHeight: "1.04", letterSpacing: "-0.03em", fontWeight: "700" }],
        "section-heading": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        /** Screen H1 inside the app shell. */
        "screen-title": ["32px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        /** Card/section H3 inside the app shell. */
        "card-title": ["19px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }],
        /** Big stat figure. */
        stat: ["28px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        caption: ["14px", { lineHeight: "1.6", letterSpacing: "0em", fontWeight: "400" }],
        body: ["16px", { lineHeight: "1.6", letterSpacing: "0em", fontWeight: "400" }],
        "mono-label": ["12px", { lineHeight: "1.6", letterSpacing: "0.1em", fontWeight: "500" }],
        /** Small uppercase mono eyebrow used on cards and table heads. */
        eyebrow: ["11px", { lineHeight: "1.5", letterSpacing: "0.06em", fontWeight: "500" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
