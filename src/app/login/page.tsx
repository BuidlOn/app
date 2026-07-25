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
    <main className="grid-bg flex min-h-screen flex-col items-center justify-center px-container-padding py-16">
      <Link
        href="/"
        className="mb-12 font-page-title text-section-heading font-bold text-on-surface"
      >
        BuidlOn
      </Link>

      <div className="relative w-full max-w-md border-technical bg-surface-container p-8 md:p-10">
        <div className="absolute -left-4 -top-4 h-8 w-8 border-l border-t border-primary" />
        <div className="absolute -bottom-4 -right-4 h-8 w-8 border-b border-r border-primary" />

        <span className="mb-4 inline-block border border-primary/20 bg-primary/5 px-3 py-1 font-mono-label text-mono-label uppercase text-primary-fixed">
          Authentication
        </span>
        <h1 className="mb-3 font-page-title text-3xl font-bold leading-tight text-white">
          Connect your GitHub account
        </h1>
        <p className="mb-8 font-body text-on-surface-variant">
          Your GitHub account is your identity on BuidlOn. Claims, contributions,
          and rewards all trace back to verified activity.
        </p>

        <a
          href={oauthUrl}
          className="flex w-full items-center justify-center gap-3 bg-primary-container py-4 font-mono-label text-lg font-bold uppercase tracking-widest text-on-primary-container transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <Icon name="code" filled />
          Continue with GitHub
        </a>

        <div className="mt-8 flex flex-col gap-gap-4 border-t border-technical pt-8">
          {GUARANTEES.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 font-caption text-caption text-on-surface-variant"
            >
              <Icon name={item.icon} className="text-lg text-secondary" />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 max-w-md text-center font-caption text-caption text-on-surface-variant">
        By continuing you agree to the{" "}
        <Link href="#" className="text-primary underline underline-offset-4">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-primary underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
    </main>
  );
}
