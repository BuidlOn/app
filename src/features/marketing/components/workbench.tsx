"use client";

export function Workbench() {
  return (
    <section className="mx-auto max-w-[1400px] px-container-padding relative z-10 mb-[64px]">
      <div className="flex flex-col items-center text-center gap-[12px] mb-[64px]">
        <div className="font-mono-label text-[11px] font-bold tracking-[0.1em] uppercase text-[#7C5CFC]">
          ENGINEERED FOR DEVS
        </div>
        <h2 className="font-page-title text-[40px] font-bold tracking-[-0.02em] text-[#161616] m-0">
          Developer Workbench
        </h2>
        <p className="font-body text-[16px] text-on-surface-variant max-w-[600px] m-0 leading-relaxed mt-2">
          A unified dashboard for tracking contributions, managing payments, and exploring the ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[120px] gap-y-[64px]">
        {/* Repository Explorer */}
        <div className="border-l-[4px] border-[#7C5CFC] pl-[24px]">
          <div className="flex items-center gap-3 mb-[12px]">
            <h3 className="font-page-title text-[20px] font-bold text-[#161616] m-0">Repository Explorer</h3>
            <span className="font-mono-label text-[9px] font-bold text-[#7C5CFC] tracking-[0.05em] uppercase">READY</span>
          </div>
          <p className="font-body text-[16px] leading-[1.6] text-on-surface-variant mb-[20px]">
            Advanced filtering for decentralized protocols, SDKs, and infrastructure layers. Find your niche in seconds.
          </p>
          <div className="flex gap-[16px]">
            <span className="font-mono-label text-[10px] font-bold text-[#8a867c]">Rust</span>
            <span className="font-mono-label text-[10px] font-bold text-[#8a867c]">Solidity</span>
            <span className="font-mono-label text-[10px] font-bold text-[#8a867c]">Go</span>
          </div>
        </div>

        {/* Issue Marketplace */}
        <div className="border-l-[4px] border-[#00C2A8] pl-[24px]">
          <div className="flex items-center gap-3 mb-[12px]">
            <h3 className="font-page-title text-[20px] font-bold text-[#161616] m-0">Issue Marketplace</h3>
            <span className="font-mono-label text-[9px] font-bold text-[#00C2A8] tracking-[0.05em] uppercase">LIVE</span>
          </div>
          <p className="font-body text-[16px] leading-[1.6] text-on-surface-variant mb-[20px]">
            Dynamic pricing based on issue difficulty and urgency. Algorithmic bounty distribution with transparent tracking.
          </p>
          <div className="flex items-center gap-[12px] max-w-[240px]">
            <div className="flex-1 h-[4px] bg-[#161616]/10">
              <div className="h-full w-[47%] bg-[#00C2A8]"></div>
            </div>
            <span className="font-mono-label text-[10px] font-bold text-[#8a867c] flex-shrink-0">47%</span>
          </div>
        </div>

        {/* Seasons & Leaderboards */}
        <div className="border-l-[4px] border-[#FFC53D] pl-[24px]">
          <div className="flex items-center gap-3 mb-[12px]">
            <h3 className="font-page-title text-[20px] font-bold text-[#161616] m-0">Seasons & Leaderboards</h3>
            <span className="font-mono-label text-[9px] font-bold text-[#a67c00] tracking-[0.05em] uppercase">ACTIVE</span>
          </div>
          <p className="font-body text-[16px] leading-[1.6] text-on-surface-variant mb-[20px]">
            Quarterly contribution sprints with bonus reward pools for top-tier builders and documentation legends.
          </p>
          <div className="flex gap-[16px]">
            <span className="font-mono-label text-[10px] font-bold text-[#8a867c]">JS</span>
            <span className="font-mono-label text-[10px] font-bold text-[#8a867c]">AI/ML</span>
          </div>
        </div>

        {/* On-chain Rewards */}
        <div className="border-l-[4px] border-[#161616] pl-[24px]">
          <div className="flex items-center gap-3 mb-[12px]">
            <h3 className="font-page-title text-[20px] font-bold text-[#161616] m-0">On-chain Rewards</h3>
            <span className="font-mono-label text-[9px] font-bold text-[#161616] tracking-[0.05em] uppercase">SECURE</span>
          </div>
          <p className="font-body text-[16px] leading-[1.6] text-on-surface-variant mb-[20px]">
            Instant multi-chain settlements in USDC or protocol tokens. Zero fees for verified active contributors.
          </p>
          <div className="font-mono-label text-[10px] text-[#7C5CFC] tracking-[0.05em] font-bold">
            TX: 0x7c3b...ed4 ✓ verified
          </div>
        </div>
      </div>
    </section>
  );
}
