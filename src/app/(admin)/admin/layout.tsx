import { AdminShell } from "@/components/layout/admin-shell";
import { RequireAuth } from "@/features/auth/components/require-auth";

/**
 * Admin console layout. Access is role-based: the console is only reachable by
 * accounts the backend reports as `admin`.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell>
      <RequireAuth role="admin">{children}</RequireAuth>
    </AdminShell>
  );
}
