"use client";

import { QueryProvider } from "./query-provider";

/**
 * Root-level provider stack. Auth/theme contexts get composed here as the
 * app grows (RootLayout -> ThemeProvider -> AuthProvider -> QueryProvider).
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
