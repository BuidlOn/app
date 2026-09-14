import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    // Scope to src so Vitest never tries to execute the Playwright specs in
    // e2e/, which use @playwright/test and would fail under jsdom.
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "e2e"],
    // The API client refuses to build a URL without a base; give tests one.
    env: { NEXT_PUBLIC_API_BASE_URL: "https://api.test" },
    css: false,
  },
});
