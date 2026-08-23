import Link from "next/link";

export const metadata = { title: "403 – Access Denied | BuidlOn" };

/**
 * Shown when an authenticated user without the ADMIN role attempts to
 * access an admin-only route.
 */
export default function ForbiddenPage() {
  return (
    <main className="grid-bg flex min-h-screen flex-col items-center justify-center gap-6 px-8 text-center">
      <p className="font-mono-label text-[11px] uppercase tracking-widest text-error">
        403 · Forbidden
      </p>
      <h1 className="font-page-title text-[28px] font-bold tracking-tight text-on-surface">
        Access denied
      </h1>
      <p className="max-w-[340px] font-body text-[15px] text-on-surface-variant">
        Your account does not have permission to view this page. Admin access is
        required.
      </p>
      <Link
        href="/dashboard"
        className="rounded-buidl-pill bg-primary px-6 py-3 font-mono-label text-[13px] font-bold text-on-primary transition-opacity hover:opacity-80"
      >
        Back to dashboard
      </Link>
    </main>
  );
}
