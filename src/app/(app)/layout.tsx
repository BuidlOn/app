import { AppShell } from "@/components/layout/app-shell";

/**
 * Layout for authenticated, in-product routes (dashboard, issues, leaderboard,
 * rewards, settings...). Wraps everything in the sidebar + header shell.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
