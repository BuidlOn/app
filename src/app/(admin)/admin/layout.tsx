import { AdminShell } from "@/components/layout/admin-shell";

/**
 * Admin console layout. Access is enforced server-side by `src/middleware.ts`,
 * which verifies the JWT signature and the `ADMIN` role before this renders.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
