import * as React from "react";
import { cn } from "@/lib/utils";
import { Glyph, type GlyphName } from "@/components/ui/icons";

/**
 * Screen header: display-face title with a supporting line, and actions
 * pushed to the trailing edge (wrapping beneath on narrow viewports).
 */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-4",
        className,
      )}
    >
      <div>
        <h1 className="font-page-title text-[28px] font-bold leading-tight tracking-[-0.02em] sm:text-[32px]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-[14px] text-on-surface-variant sm:text-[15px]">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

const ICON_TONE: Record<string, string> = {
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  primary: "text-primary",
  ink: "text-on-surface",
};

/**
 * Section title inside a screen — optionally led by an accent-tinted glyph,
 * with a trailing slot for filters or a "view all" link.
 */
export function SectionHeading({
  title,
  icon,
  iconTone = "ink",
  actions,
  className,
}: {
  title: React.ReactNode;
  icon?: GlyphName;
  iconTone?: "secondary" | "tertiary" | "primary" | "ink";
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex items-center justify-between gap-4", className)}>
      <h2 className="flex items-center gap-2 font-page-title text-[17px] font-bold sm:text-[19px]">
        {icon && <Glyph name={icon} size={18} className={ICON_TONE[iconTone]} />}
        {title}
      </h2>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
