import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { getGithubOAuthUrl } from "@/services/auth.api";

export const metadata: Metadata = {
  title: "Connect GitHub",
  description:
    "Sign in to BuidlOn with GitHub to claim issues and earn on-chain rewards for your contributions.",
};

const GUARANTEES = [
  { icon: "verified_user", label: "GitHub is the only sign-in. No passwords." },
  { icon: "bolt", label: "Instant payouts to your wallet after merge." },
  { icon: "lock", label: "We never gain write access to your repositories." },
];

export default function LoginPage() {
  const oauthUrl = getGithubOAuthUrl();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-[20px] py-[60px]">
      <Link href="/" className="mb-[40px] flex items-center gap-[10px]">
        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border-[2px] border-outline bg-primary font-page-title text-[15px] font-bold text-outline">
          B
        </div>
        <span className="font-page-title text-[22px] font-bold text-outline">BuidlOn</span>
      </Link>

      <div className="relative w-full max-w-[440px] p-[6px]">
        {/* Frame corners */}
        <div className="absolute left-0 top-0 h-[24px] w-[24px] rounded-tl-[6px] border-l-[2.5px] border-t-[2.5px] border-primary" />
        <div className="absolute bottom-0 right-0 h-[24px] w-[24px] rounded-br-[6px] border-b-[2.5px] border-r-[2.5px] border-primary" />

        <div className="rounded-[28px] border-[2px] border-outline bg-white px-[32px] py-[40px] text-center">
          <span className="mb-[22px] inline-block rounded-full border-[1.5px] border-outline bg-[#FFF3D6] px-[14px] py-[5px] font-mono-label text-[10.5px] font-bold tracking-[0.08em] text-outline">
            AUTHENTICATION
          </span>

          <h1 className="mb-[16px] font-page-title text-[27px] font-bold leading-[1.15] tracking-[-0.02em] text-outline">
            Connect your GitHub account
          </h1>

          <p className="mb-[28px] text-[14.5px] leading-[1.6] text-on-surface-variant">
            Your GitHub account is your identity on BuidlOn. Claims, contributions, and rewards all trace back to verified activity. You&apos;ll be taken to github.com to sign in — no app installation required.
          </p>

          <a
            href={oauthUrl}
            className="group flex w-full items-center justify-center gap-[10px] rounded-full border-[2px] border-outline bg-outline p-[15px] font-mono-label text-[14px] font-bold text-background shadow-[3px_3px_0_#7C5CFC] transition-all duration-150 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0_#7C5CFC] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-1.02-.01-1.85-2.79.6-3.38-1.19-3.38-1.19-.44-1.12-1.08-1.42-1.08-1.42-.87-.6.07-.58.07-.58.97.07 1.48 1 1.48 1 .86 1.48 2.27 1.05 2.82.8.09-.63.34-1.05.61-1.29-2.23-.25-4.57-1.12-4.57-4.98 0-1.1.39-2 1.03-2.71-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03a9.4 9.4 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.41.1 2.66.64.71 1.03 1.61 1.03 2.71 0 3.87-2.35 4.73-4.58 4.98.36.32.68.93.68 1.88 0 1.36-.01 2.46-.01 2.79 0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
            </svg>
            Continue with GitHub
          </a>

          <div className="mt-[28px] flex flex-col gap-[14px] rounded-[16px] border-[1.5px] border-outline/10 p-[18px] text-left">
            <div className="flex items-start gap-[10px]">
              <span className="mt-[1px] shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3L4 6V11C4 16 7.5 19.5 12 21C16.5 19.5 20 16 20 11V6L12 3Z" stroke="#7C5CFC" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12L11 14L15.5 9.5" stroke="#7C5CFC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span className="text-[13px] text-on-surface-variant">GitHub is the only sign-in. No passwords.</span>
            </div>
            <div className="flex items-start gap-[10px]">
              <span className="mt-[1px] shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14H11L10 22L20 9H13L13 2Z" stroke="#FFC53D" strokeWidth="1.8" strokeLinejoin="round"/></svg>
              </span>
              <span className="text-[13px] text-on-surface-variant">Instant payouts to your wallet after merge.</span>
            </div>
            <div className="flex items-start gap-[10px]">
              <span className="mt-[1px] shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2" stroke="#00C2A8" strokeWidth="1.8"/><path d="M8 10V7A4 4 0 0 1 16 7V10" stroke="#00C2A8" strokeWidth="1.8"/></svg>
              </span>
              <span className="text-[13px] text-on-surface-variant">We never gain write access to your repositories.</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-[28px] text-center text-[12.5px] text-on-surface-muted">
        By continuing you agree to the <Link href="#" className="text-secondary hover:underline">Terms of Service</Link> and <Link href="#" className="text-secondary hover:underline">Privacy Policy</Link>.
      </p>
    </main>
  );
}
