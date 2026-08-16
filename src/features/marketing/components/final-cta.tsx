import Link from "next/link";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden px-container-padding animate-slide-up mb-40">
      <div className="mx-auto max-w-[720px] relative border-2 border-outline rounded-[32px] bg-surface px-6 md:px-12 py-16 text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-[50px] -left-[50px] w-[160px] h-[160px] rounded-full bg-primary pointer-events-none" />
        <div className="absolute -bottom-[60px] -right-[40px] w-[190px] h-[190px] rounded-full bg-tertiary opacity-70 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 border-2 border-outline rounded-full px-4 py-1.5 font-mono-label text-[11px] font-bold bg-secondary text-white mb-6 uppercase tracking-wider">
            8,940+ DEVELOPERS ALREADY BUILDING
          </span>
          
          <h2 className="font-page-title text-[38px] font-bold tracking-[-0.02em] text-on-background mb-4">
            Ready to start building?
          </h2>
          
          <p className="text-[16px] leading-[1.6] text-on-surface-variant max-w-[460px] mb-8">
            Your GitHub account is your ticket. Connect once, claim your first issue today.
          </p>
          
          <Link
            href="/login"
            className="font-mono-label text-[15px] font-bold bg-outline text-background border-2 border-outline rounded-full px-[34px] py-[17px] shadow-brutal-primary transition-all duration-150 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0_#FFC53D] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[0px_0px_0_#FFC53D]"
          >
            → Connect GitHub account
          </Link>
          
          <div className="flex justify-center gap-6 mt-7 flex-wrap">
            <span className="text-[12px] font-semibold text-on-surface-variant">✕ No KYC</span>
            <span className="text-[12px] font-semibold text-on-surface-variant">⚡ Instant payouts</span>
            <span className="text-[12px] font-semibold text-on-surface-variant">◇ Open source</span>
          </div>
        </div>
      </div>
    </section>
  );
}
