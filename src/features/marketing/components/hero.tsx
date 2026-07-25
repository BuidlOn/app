import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-container-padding py-section-margin text-center">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="relative z-10 max-w-4xl">
        <span className="mb-4 inline-block border border-primary/20 bg-primary/5 px-3 py-1 font-mono-label text-mono-label uppercase text-primary-fixed">
          V2.4.0 Now Live
        </span>
        <h1 className="mb-8 font-page-title text-[40px] font-bold leading-[1.1] tracking-tight text-white sm:text-[56px] md:text-[64px]">
          Build for the future of open source.
        </h1>
        <p className="mx-auto mb-12 max-w-2xl font-body text-lg text-on-surface-variant md:text-xl">
          A technical ecosystem designed for elite contributors. Claim on-chain
          rewards for verified GitHub commits and pull requests.
        </p>
        <div className="flex flex-col items-center justify-center gap-gap-6 md:flex-row">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-primary-container px-10 py-4 font-mono-label text-lg font-bold uppercase tracking-widest text-on-primary-container transition-all hover:brightness-110 active:scale-95"
          >
            <Icon name="code" filled />
            Connect GitHub
          </Link>
          <Link
            href="/issues"
            className="border-b border-on-surface/30 py-2 font-mono-label text-on-surface transition-all hover:border-primary hover:text-primary"
          >
            Browse active issues →
          </Link>
        </div>
      </div>
    </section>
  );
}
