import { LoadingScreen } from "@/components/ui/loading-screen";

/**
 * Fallback for top-level routes (landing, login, OAuth return, 403) while their
 * payload and chunks arrive. In-product routes are covered by the loading files
 * inside `(app)` and `(admin)`, which keep the shell on screen instead.
 */
export default function Loading() {
  return <LoadingScreen label="Loading BuidlOn" />;
}
