"use client";

export function Workbench() {
  return (
    <section className="mx-auto max-w-[1400px] px-container-padding relative z-10 mb-[64px]">
      <div className="flex flex-col items-center text-center gap-[12px] mb-[64px]">
        <div className="font-mono-label text-[11px] font-bold tracking-[0.1em] uppercase text-secondary-deep">
          ENGINEERED FOR DEVS
        </div>
        <h2 className="font-page-title text-[40px] font-bold tracking-[-0.02em] text-on-surface m-0">
          Developer Workbench
        </h2>
        <p className="font-body text-[16px] text-on-surface-variant max-w-[600px] m-0 leading-relaxed mt-2">
          A unified dashboard for tracking contributions, managing payments, and exploring the ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[120px] gap-y-[64px]">
        {/* Repository Explorer */}
        <div className="border-l-[4px] border-secondary pl-[24px]">
          <div className="flex items-center gap-3 mb-[12px]">
            <h3 className="font-page-title text-[20px] font-bold text-on-surface m-0">Repository Explorer</h3>
            <span className="font-mono-label text-[9px] font-bold text-secondary-deep tracking-[0.05em] uppercase">READY</span>
          </div>
          <p className="font-body text-[16px] leading-[1.6] text-on-surface-variant mb-[20px]">
            Advanced filtering for decentralized protocols, SDKs, and infrastructure layers. Find your niche in seconds.
          </p>
          <div className="flex gap-[16px]">
            <span className="font-mono-label text-[10px] font-bold text-on-surface-muted">Rust</span>
            <span className="font-mono-label text-[10px] font-bold text-on-surface-muted">Solidity</span>
            <span className="font-mono-label text-[10px] font-bold text-on-surface-muted">Go</span>
          </div>
        </div>

        {/* Issue Marketplace */}
        <div className="border-l-[4px] border-tertiary pl-[24px]">
          <div className="flex items-center gap-3 mb-[12px]">
            <h3 className="font-page-title text-[20px] font-bold text-on-surface m-0">Issue Marketplace</h3>
            <span className="font-mono-label text-[9px] font-bold text-on-tertiary-deep tracking-[0.05em] uppercase">LIVE</span>
          </div>
          <p className="font-body text-[16px] leading-[1.6] text-on-surface-variant mb-[20px]">
            Dynamic pricing based on issue difficulty and urgency. Algorithmic bounty distribution with transparent tracking.
          </p>
          <div className="flex items-center gap-[12px] max-w-[240px]">
            <div className="flex-1 h-[4px] bg-ink/10">
              <div className="h-full w-[47%] bg-tertiary"></div>
            </div>
            <span className="font-mono-label text-[10px] font-bold text-on-surface-muted flex-shrink-0">47%</span>
          </div>
        </div>

        {/* Seasons & Leaderboards */}
        <div className="border-l-[4px] border-primary pl-[24px]">
          <div className="flex items-center gap-3 mb-[12px]">
            <h3 className="font-page-title text-[20px] font-bold text-on-surface m-0">Seasons & Leaderboards</h3>
            <span className="font-mono-label text-[9px] font-bold text-on-primary-tint tracking-[0.05em] uppercase">ACTIVE</span>
          </div>
          <p className="font-body text-[16px] leading-[1.6] text-on-surface-variant mb-[20px]">
            Quarterly contribution sprints with bonus reward pools for top-tier builders and documentation legends.
          </p>
          <div className="flex gap-[16px]">
            <span className="font-mono-label text-[10px] font-bold text-on-surface-muted">JS</span>
            <span className="font-mono-label text-[10px] font-bold text-on-surface-muted">AI/ML</span>
          </div>
        </div>

        {/* On-chain Rewards */}
        <div className="border-l-[4px] border-outline pl-[24px]">
          <div className="flex items-center gap-3 mb-[12px]">
            <h3 className="font-page-title text-[20px] font-bold text-on-surface m-0">On-chain Rewards</h3>
            <span className="font-mono-label text-[9px] font-bold text-on-surface tracking-[0.05em] uppercase">SECURE</span>
          </div>
          <p className="font-body text-[16px] leading-[1.6] text-on-surface-variant mb-[20px]">
            Instant multi-chain settlements in USDC or protocol tokens. Zero fees for verified active contributors.
          </p>
          <div className="font-mono-label text-[10px] text-secondary-deep tracking-[0.05em] font-bold">
            TX: 0x7c3b...ed4 ✓ verified
          </div>
        </div>
      </div>
    </section>
  );
}
