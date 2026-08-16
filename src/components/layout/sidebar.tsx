"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Glyph } from "@/components/ui/icons";
import { BrandMark } from "./brand-mark";
import type { NavItem } from "@/constants/navigation";

function isActive(pathname: string, href: string) {
  // "/admin" would otherwise match every admin subroute.
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Exact-match for index routes that are a prefix of their siblings. */
function isActiveExact(pathname: string, href: string, items: NavItem[]) {
  const deeper = items.some(
    (item) => item.href !== href && item.href.startsWith(`${href}/`),
  );
  return deeper ? pathname === href : isActive(pathname, href);
}

export function SidebarNav({
  items,
  onNavigate,
  className,
}: {
  items: NavItem[];
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-2", className)}>
      {items.map((item) => {
        const active = isActiveExact(pathname, item.href, items);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-[12px] px-[14px] py-[10px] text-[14px] transition-colors duration-150",
              active
                ? "bg-outline font-semibold text-background"
                : "font-medium text-on-surface-variant hover:bg-outline/5 hover:text-on-background",
            )}
          >
            <Glyph name={item.icon} size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Fixed 256px rail with a heavy ink edge. On viewports below `lg` it becomes an
 * off-canvas drawer driven by `open`.
 */
export function Sidebar({
  items,
  subtitle,
  variant = "app",
  open,
  onNavigate,
  header,
  footer,
}: {
  items: NavItem[];
  subtitle?: string;
  variant?: "app" | "admin";
  open?: boolean;
  onNavigate?: () => void;
  /** Slot between the brand block and the nav (admin's Create Season CTA). */
  header?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-screen w-sidebar flex-col border-r-2 border-outline bg-background transition-transform duration-200 lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <Link
        href={variant === "admin" ? "/admin" : "/dashboard"}
        onClick={onNavigate}
        className="px-6 py-7 transition-opacity hover:opacity-80"
      >
        <BrandMark subtitle={subtitle} variant={variant} />
      </Link>

      {header && <div className="px-6 pb-4">{header}</div>}

      <SidebarNav items={items} onNavigate={onNavigate} />

      {footer && (
        <div className="flex flex-col gap-2.5 border-t-2 border-outline/10 p-4">
          {footer}
        </div>
      )}
    </aside>
  );
}
