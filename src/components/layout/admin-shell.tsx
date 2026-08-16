"use client";

import Link from "next/link";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./dashboard-header";
import { Button } from "@/components/ui/button";
import { Glyph } from "@/components/ui/icons";
import { ADMIN_NAV } from "@/constants/navigation";

/** Ink pill with an amber pip — the standing reminder you hold elevated rights. */
function AdminBadge() {
  return (
    <div className="hidden items-center gap-2 rounded-buidl-pill bg-outline px-4 py-[7px] font-mono-label text-[11px] font-bold uppercase tracking-[0.05em] text-background sm:flex">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      Admin Console
    </div>
  );
}

/**
 * Admin console shell. Same rail geometry as the contributor app, but the
 * brand tile inverts to ink-on-amber and the primary CTA sits above the nav
 * rather than below it.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const close = () => setNavOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        items={ADMIN_NAV}
        subtitle="Platform Control"
        variant="admin"
        open={navOpen}
        onNavigate={close}
        header={
          <Button asChild size="sm" className="w-full">
            <Link href="/admin/seasons" onClick={close}>
              + Create Season
            </Link>
          </Button>
        }
        footer={
          <Link
            href="/dashboard"
            onClick={close}
            className="flex items-center gap-2.5 rounded-buidl-sm px-3 py-2.5 text-[13px] font-medium text-on-surface-variant transition-colors hover:bg-outline/[0.06] hover:text-on-surface"
          >
            <Glyph name="logout" size={16} />
            Exit to app
          </Link>
        }
      />

      {navOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={close}
          className="fixed inset-0 z-40 bg-outline/40 lg:hidden"
        />
      )}

      <DashboardHeader
        onMenuClick={() => setNavOpen(true)}
        searchPlaceholder="Search resources..."
        badge={<AdminBadge />}
      />

      <main className="px-4 pb-16 pt-[calc(theme(spacing.header)+1.5rem)] sm:px-6 lg:ml-sidebar lg:px-10 lg:pt-[calc(theme(spacing.header)+2.25rem)]">
        {children}
      </main>
    </div>
  );
}
