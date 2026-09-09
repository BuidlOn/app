"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Glyph } from "@/components/ui/icons";
import { MOBILE_NAV } from "@/constants/navigation";

/**
 * Mobile tab bar. Pinned to the bottom edge with the same heavy ink rule the
 * sidebar uses, and padded for the home indicator.
 */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t-2 border-outline bg-background px-2 pt-2.5 lg:hidden"
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
    >
      {MOBILE_NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex flex-col items-center gap-[3px] px-2 transition-colors",
              active ? "text-on-surface" : "text-on-surface-muted",
            )}
          >
            <Glyph name={item.icon} size={20} />
            <span className={cn("text-[9.5px]", active && "font-bold")}>
              {item.shortLabel ?? item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
