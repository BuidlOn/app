"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { APP_NAV } from "@/constants/navigation";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({
  open,
  onNavigate,
}: {
  /** Controls the off-canvas drawer on mobile. */
  open?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-outline-variant bg-background transition-transform duration-200 lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="flex h-8 w-8 items-center justify-center bg-primary font-bold text-on-primary">
          B
        </div>
        <div>
          <h1 className="font-page-title text-body font-bold leading-none text-primary">
            BuidlOn
          </h1>
          <p className="font-caption text-caption text-on-surface-variant">
            Dev Portal
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4">
        {APP_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-4 py-2 transition-colors duration-150 active:scale-[0.99]",
                active
                  ? "border-l-2 border-primary bg-surface-container font-bold text-primary"
                  : "font-body text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
              )}
            >
              <Icon name={item.icon} filled={active} />
              <span className="font-body text-body">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4">
        <Link
          href="/repositories/new"
          onClick={onNavigate}
          className="flex w-full items-center justify-center gap-2 bg-primary-container px-4 py-2.5 font-bold text-on-primary-container transition-all hover:opacity-90 active:scale-[0.98]"
        >
          <Icon name="add" className="text-sm" />
          New Repository
        </Link>
      </div>
    </aside>
  );
}
