"use client";

import Link from "next/link";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./dashboard-header";
import { MobileNav } from "./mobile-nav";
import { APP_NAV } from "@/constants/navigation";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { truncateHash } from "@/utils/format";

/** Sidebar footer: the New Repository CTA over a live wallet chip. */
function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  const { data: user } = useCurrentUser();
  const wallet = user?.walletAddress ?? null;

  return (
    <>
      <Link
        href="/repositories/new"
        onClick={onNavigate}
        className="flex items-center justify-center gap-2 font-mono-label text-[12.5px] font-medium bg-primary text-on-background border-2 border-outline rounded-full py-[11px] shadow-brutal-sm transition-all duration-120 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-brutal active:translate-y-0.5 active:translate-x-0.5 active:shadow-none w-full"
      >
        + New Repository
      </Link>

      <Link
        href="/settings"
        onClick={onNavigate}
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] bg-surface border-[1.5px] border-outline/10 hover:bg-surface-dim transition-colors"
      >
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${wallet ? "bg-tertiary" : "bg-outline/20"}`}></span>
        <span className="min-w-0">
          <span className="block truncate font-mono-label text-[11px] font-medium text-on-background">
            {wallet ? truncateHash(wallet, 4, 4) : "Not connected"}
          </span>
          <span className="block text-[10px] text-on-surface-muted">
            {wallet ? "Wallet connected" : "Connect a wallet"}
          </span>
        </span>
      </Link>
    </>
  );
}

/**
 * Authenticated app shell: fixed sidebar and app bar around a scrolling
 * canvas. Below `lg` the sidebar becomes a drawer and a tab bar takes over
 * primary navigation, so the canvas leaves room for it.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const close = () => setNavOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        items={APP_NAV}
        subtitle="Dev Portal"
        open={navOpen}
        onNavigate={close}
        footer={<SidebarFooter onNavigate={close} />}
      />

      {navOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={close}
          className="fixed inset-0 z-40 bg-outline/40 lg:hidden"
        />
      )}

      <DashboardHeader onMenuClick={() => setNavOpen(true)} />

      <main className="px-4 pb-28 pt-[calc(theme(spacing.header)+1.5rem)] sm:px-6 lg:ml-sidebar lg:px-10 lg:pb-16 lg:pt-[calc(theme(spacing.header)+2.25rem)]">
        {children}
      </main>

      <MobileNav />
    </div>
  );
}
