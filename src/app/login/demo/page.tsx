import Link from "next/link";
import { Icon } from "@/components/ui/icon";

/**
 * Placeholder OAuth landing used only in mock mode (no backend configured).
 * With a real backend, `getGithubOAuthUrl()` points at `/auth/github` instead
 * and this route is never hit.
 */
export default function DemoAuthPage() {
  return (
    <main className="flex min-h-[900px] flex-col items-center justify-center px-[20px] py-[60px]">
      <Link href="/" className="mb-[40px] flex items-center gap-[10px]">
        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border-[2px] border-outline bg-primary font-page-title text-[15px] font-bold text-outline">
          B
        </div>
        <span className="font-page-title text-[22px] font-bold text-outline">BuidlOn</span>
      </Link>

      <div className="w-full max-w-[440px] rounded-[28px] border-[2px] border-outline bg-white px-[32px] py-[44px] text-center">
        <div className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#00C2A8] bg-[rgba(0,194,168,0.12)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 0 0-1.4 0l-1.6 1.6-1.6-1.6a1 1 0 0 0-1.4 1.4l1.6 1.6-1.6 1.6a1 1 0 0 0 1.4 1.4l1.6-1.6 4.6 4.6a2 2 0 0 0 2.8-2.8L14.5 8L14.7 6.3Z" stroke="#00806e" strokeWidth="1.6" strokeLinejoin="round"/><path d="M8 16L4 20" stroke="#00806e" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </div>
        
        <span className="mb-[18px] inline-block rounded-full border-[1.5px] border-outline bg-[rgba(0,194,168,0.12)] px-[14px] py-[5px] font-mono-label text-[10.5px] font-bold tracking-[0.08em] text-outline">
          MOCK MODE
        </span>

        <h1 className="mb-[14px] font-page-title text-[23px] font-bold tracking-[-0.02em] text-outline">
          GitHub OAuth is stubbed
        </h1>

        <p className="mb-[28px] text-[14px] leading-[1.65] text-on-surface-variant">
          No backend is connected yet, so real GitHub sign-in isn&apos;t wired up. Set{" "}
          <code className="rounded-[6px] border border-outline/15 bg-[#FFF3D6] px-[6px] py-[2px] font-mono-label text-[12.5px] text-[#7a5c05]">
            NEXT_PUBLIC_API_BASE_URL
          </code>{" "}
          to route this button to the backend&apos;s{" "}
          <code className="rounded-[6px] border border-outline/15 bg-[#FFF3D6] px-[6px] py-[2px] font-mono-label text-[12.5px] text-[#7a5c05]">
            /auth/github
          </code>{" "}
          endpoint.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-[8px] rounded-full border-[2px] border-outline px-[22px] py-[12px] font-mono-label text-[13px] font-bold text-outline transition-colors hover:bg-outline/5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to home
        </Link>
      </div>
    </main>
  );
}
