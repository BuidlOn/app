import Link from "next/link";
import { Icon } from "@/components/ui/icon";

/**
 * Placeholder OAuth landing used only in mock mode (no backend configured).
 * With a real backend, `getGithubOAuthUrl()` points at `/auth/github` instead
 * and this route is never hit.
 */
export default function DemoAuthPage() {
  return (
    <main className="grid-bg flex min-h-screen flex-col items-center justify-center px-container-padding py-16 text-center">
      <div className="relative w-full max-w-md border-technical bg-surface-container p-10">
        <Icon
          name="construction"
          className="mb-4 text-4xl text-tertiary"
        />
        <span className="mb-4 block font-mono-label text-mono-label uppercase text-on-surface-variant">
          Mock mode
        </span>
        <h1 className="mb-3 font-page-title text-2xl font-bold text-white">
          GitHub OAuth is stubbed
        </h1>
        <p className="mb-8 font-body text-on-surface-variant">
          No backend is connected yet, so real GitHub sign-in is not wired. Set{" "}
          <code className="font-mono text-primary">NEXT_PUBLIC_API_BASE_URL</code>{" "}
          to route this button to the backend&apos;s{" "}
          <code className="font-mono text-primary">/auth/github</code> endpoint.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-outline-variant px-6 py-3 font-mono-label text-mono-label uppercase tracking-widest text-on-surface transition-colors hover:bg-surface-container-high"
        >
          <Icon name="arrow_back" className="text-base" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
