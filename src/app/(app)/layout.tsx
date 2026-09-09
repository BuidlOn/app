import { AppShell } from "@/components/layout/app-shell";
import { RequireAuth } from "@/features/auth/components/require-auth";

/**
 * Layout for authenticated, in-product routes (dashboard, issues, leaderboard,
 * rewards, settings...). Wraps everything in the sidebar + header shell and
 * bounces signed-out visitors to login.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <RequireAuth>{children}</RequireAuth>
    </AppShell>
  );
}
