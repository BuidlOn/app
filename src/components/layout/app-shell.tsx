"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./dashboard-header";

/**
 * Authenticated app shell: fixed sidebar + header with a scrolling content
 * canvas. On mobile the sidebar becomes an off-canvas drawer with a scrim.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={navOpen} onNavigate={() => setNavOpen(false)} />

      {navOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <DashboardHeader onMenuClick={() => setNavOpen(true)} />

      <main className="min-h-screen pt-16 lg:ml-64">{children}</main>
    </div>
  );
}
