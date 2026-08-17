import Link from "next/link";

export function FinalCta() {
  return (
    <section className="px-container-padding animate-slide-up mb-[120px]">
      <div className="mx-auto max-w-[640px] text-center flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C2A8]" />
          <span className="font-mono-label text-[10px] font-bold text-[#7C5CFC] uppercase tracking-[0.1em]">
            8,940+ DEVELOPERS ALREADY BUILDING
          </span>
        </div>
        
        <h2 className="font-page-title text-[44px] font-bold tracking-[-0.02em] text-[#161616] mb-4">
          Ready to start <span className="relative inline-block">
            building?
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 8" preserveAspectRatio="none" fill="none">
              <path d="M0 6C30 2 70 2 100 6" stroke="#FFC53D" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        
        <p className="font-body text-[17px] leading-[1.6] text-on-surface-variant max-w-[420px] mx-auto mb-8">
          Your GitHub account is your ticket. Connect once, claim your first issue today.
        </p>
        
        <Link
          href="/login"
          className="relative inline-flex items-center gap-2 font-mono-label text-[13px] font-bold bg-[#161616] text-white rounded-[100px] px-[32px] py-[16px] transition-all duration-300 hover:-translate-y-1 hover:bg-[#2b2b2b]"
        >
          → Connect GitHub account
        </Link>
        
        <div className="flex justify-center gap-8 mt-10 flex-wrap">
          <span className="flex items-center gap-1.5 font-mono-label text-[11px] font-bold text-[#8a867c]">
            <span className="text-[#a4a095]">✕</span> No KYC
          </span>
          <span className="flex items-center gap-1.5 font-mono-label text-[11px] font-bold text-[#8a867c]">
            <span className="text-[#FFC53D]">⚡</span> Instant payouts
          </span>
          <span className="flex items-center gap-1.5 font-mono-label text-[11px] font-bold text-[#8a867c]">
            <span className="text-[#a4a095]">◇</span> Open source
          </span>
        </div>
      </div>
    </section>
  );
}
