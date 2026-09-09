import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1200px] px-container-padding pt-[140px] mb-40">
      <div className="relative border border-outline/20 rounded-[32px] bg-white overflow-hidden py-[80px] md:py-[120px] px-4 text-center">
        {/* Floating Shapes Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
          <div className="absolute top-[15%] left-[4%] w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-[20px] bg-primary animate-floaty hidden sm:block" />
          <div className="absolute top-[25%] right-[5%] w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-[16px] bg-secondary animate-floaty hidden sm:block" style={{ animationDelay: '-1.5s' }} />
          <div className="absolute bottom-[15%] right-[8%] w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-tertiary animate-floaty2 hidden sm:block" />
        </div>

        <div className="relative z-10 max-w-[720px] mx-auto animate-fade-in flex flex-col items-center">
          <span className="mb-8 inline-flex items-center gap-2 rounded-full bg-tertiary px-[16px] py-[6px] font-mono-label text-[10.5px] font-bold tracking-[0.06em] text-ink uppercase">
            <span className="h-[6px] w-[6px] rounded-full bg-ink"></span>
            V2.4 · Rewards Live On-Chain
          </span>

          <h1 className="mb-[24px] font-page-title text-[48px] md:text-[72px] font-bold leading-[1.05] tracking-[-0.03em] text-ink flex flex-col items-center">
            <span>Build for the future of</span>
            <span className="inline-block bg-primary px-[16px] py-[4px] mt-2 rounded-[12px] transform -rotate-[1deg]">
              open source.
            </span>
          </h1>

          <p className="mx-auto mb-[40px] max-w-[560px] font-body text-[16px] md:text-[18px] text-on-surface-variant leading-[1.6]">
            Connect your GitHub and wallet, ship verified pull requests, and claim on-chain rewards the moment your code merges.
          </p>

          <div className="flex flex-col items-center justify-center gap-[16px] sm:flex-row animate-slide-up w-full sm:w-auto">
            <Link
              href="/login"
              className="flex w-full sm:w-auto items-center justify-center rounded-full bg-[#161616] px-[32px] py-[16px] font-mono-label text-[13px] font-bold tracking-[0.03em] text-white transition-all duration-150 shadow-[0_4px_0_#A882FF] hover:translate-y-[2px] hover:shadow-[0_2px_0_#A882FF] active:translate-y-[4px] active:shadow-none"
            >
              Connect GitHub
            </Link>
            <Link
              href="/issues"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[#161616] bg-white px-[32px] py-[16px] font-mono-label text-[13px] font-bold tracking-[0.03em] text-[#161616] transition-all duration-150 shadow-[0_4px_0_rgba(22,22,22,0.1)] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgba(22,22,22,0.1)] active:translate-y-[4px] active:shadow-none"
            >
              Browse active issues
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
