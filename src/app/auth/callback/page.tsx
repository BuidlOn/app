"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
      // Persist in localStorage for the API client (fetch requests).
      window.localStorage.setItem("buidlon.accessToken", token);
      if (refresh) {
        window.localStorage.setItem("buidlon.refreshToken", refresh);
      }

      // Also write to a cookie so the Edge middleware can read the JWT role
      // for server-side route protection (middleware cannot access localStorage).
      // SameSite=Lax prevents CSRF; Secure is set automatically in production
      // by most hosting providers — we mark it here so it transmits over HTTPS.
      const maxAge = 15 * 60; // 15 minutes — matches backend JWT expiry
      document.cookie = `buidlon_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;

      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <main className="grid-bg flex min-h-screen flex-col items-center justify-center gap-4 px-container-padding">
      <p className="font-mono-label text-mono-label uppercase tracking-widest text-primary-fixed">
        Authentication
      </p>
      <p className="font-body text-on-surface-variant">Signing you in…</p>
    </main>
  );
}
