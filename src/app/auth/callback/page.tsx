"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { persistAuthTokens } from "@/services/api.client";

/**
 * Receives the JWT pair that the backend appends to its OAuth redirect
 * (`<FRONTEND_URL>/auth/callback?token=..&refresh=..`), persists them, and
 * sends the user into the app. Errors fall back to /login.
 */
export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refresh = params.get("refresh");

    if (token) {
      // Persist in localStorage for the API client (fetch requests) and in
      // a cookie so the Edge middleware can read the JWT role for
      // server-side route protection (middleware cannot access localStorage).
      persistAuthTokens(token, refresh ?? undefined);

      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6">
      <p className="font-mono-label text-[11px] uppercase tracking-[0.1em] text-on-surface-muted">
        Authentication
      </p>
      <p className="font-page-title text-[19px] font-bold text-on-surface">Signing you in…</p>
    </main>
  );
}
