"use client";

export function Workbench() {
  return (
    <section className="mx-auto max-w-[1200px] px-container-padding relative z-10 mb-[120px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-[24px] flex-wrap mb-[40px]">
        <div>
          <div className="font-mono-label text-[11px] font-bold tracking-[0.1em] uppercase text-secondary-deep mb-[8px]">
            ENGINEERED FOR DEVS
          </div>
          <h2 className="font-page-title text-[40px] font-bold tracking-[-0.02em] text-ink m-0">
            Developer Workbench
          </h2>
        </div>
        <p className="font-body text-[16px] text-on-surface-variant max-w-[320px] m-0 leading-relaxed">
          A unified dashboard for tracking contributions, managing payments, and exploring the ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
        {/* Repository Explorer */}
        <div className="border-[2px] border-ink rounded-[24px] bg-white p-[32px] shadow-brutal-secondary transition-transform hover:-translate-y-1 hover:-translate-x-1 duration-200">
          <div className="flex justify-between items-start mb-[24px]">
            <div className="w-[48px] h-[48px] rounded-[16px] bg-secondary border-[2px] border-ink flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="8" ry="3" stroke="#161616" strokeWidth="2"/><path d="M4 6V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V6" stroke="#161616" strokeWidth="2"/><path d="M4 12V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V12" stroke="#161616" strokeWidth="2"/></svg>
            </div>
            <span className="font-mono-label text-[10.5px] font-bold border-[1.5px] border-ink bg-white px-[10px] py-[4px] rounded-full text-ink tracking-wider">READY</span>
          </div>
          <h3 className="font-page-title text-[22px] font-bold mb-[8px] text-ink">Repository Explorer</h3>
          <p className="font-body text-[15px] leading-[1.6] text-on-surface-variant mb-[24px]">
            Advanced filtering for decentralized protocols, SDKs, and infrastructure layers. Find your niche in seconds.
          </p>
          <div className="flex gap-[8px]">
            <span className="text-[12px] font-bold border-[1.5px] border-outline/15 bg-surface px-[12px] py-[4px] rounded-full text-on-surface-variant">Rust</span>
            <span className="text-[12px] font-bold border-[1.5px] border-outline/15 bg-surface px-[12px] py-[4px] rounded-full text-on-surface-variant">Solidity</span>
            <span className="text-[12px] font-bold border-[1.5px] border-outline/15 bg-surface px-[12px] py-[4px] rounded-full text-on-surface-variant">Go</span>
          </div>
        </div>

        {/* Issue Marketplace */}
        <div className="border-[2px] border-ink rounded-[24px] bg-white p-[32px] shadow-brutal-tertiary transition-transform hover:-translate-y-1 hover:-translate-x-1 duration-200">
          <div className="flex justify-between items-start mb-[24px]">
            <div className="w-[48px] h-[48px] rounded-[16px] bg-tertiary border-[2px] border-ink flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6H4L4.5 9M4.5 9H20L18 16H7L4.5 9Z" stroke="#161616" strokeWidth="2" strokeLinejoin="round"/><circle cx="8" cy="20" r="1.5" fill="#161616"/><circle cx="17" cy="20" r="1.5" fill="#161616"/></svg>
            </div>
            <span className="font-mono-label text-[10.5px] font-bold border-[1.5px] border-ink bg-ink text-white px-[10px] py-[4px] rounded-full tracking-wider">LIVE</span>
          </div>
          <h3 className="font-page-title text-[22px] font-bold mb-[8px] text-ink">Issue Marketplace</h3>
          <p className="font-body text-[15px] leading-[1.6] text-on-surface-variant mb-[24px]">
            Dynamic pricing based on issue difficulty and urgency. Algorithmic bounty distribution with transparent tracking.
          </p>
          <div className="flex items-center gap-[12px]">
            <div className="flex-1 h-[8px] rounded-full bg-outline/10 border-[1.5px] border-ink overflow-hidden">
              <div className="h-full w-[47%] rounded-full bg-tertiary"></div>
            </div>
            <span className="font-mono-label text-[11px] font-bold text-on-surface-muted flex-shrink-0">47% claimed</span>
          </div>
        </div>

        {/* Seasons & Leaderboards */}
        <div className="border-[2px] border-ink rounded-[24px] bg-white p-[32px] shadow-brutal-primary transition-transform hover:-translate-y-1 hover:-translate-x-1 duration-200">
          <div className="flex justify-between items-start mb-[24px]">
            <div className="w-[48px] h-[48px] rounded-[16px] bg-primary border-[2px] border-ink flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 4H18V9C18 12.3 15.3 15 12 15C8.7 15 6 12.3 6 9V4Z" stroke="#161616" strokeWidth="2" strokeLinejoin="round"/><path d="M6 6H3V8C3 9.66 4.34 11 6 11M18 6H21V8C21 9.66 19.66 11 18 11" stroke="#161616" strokeWidth="2"/><path d="M12 15V19M8 21H16" stroke="#161616" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <span className="font-mono-label text-[10.5px] font-bold border-[1.5px] border-tertiary bg-tertiary/10 text-tertiary-deep px-[10px] py-[4px] rounded-full tracking-wider">ACTIVE</span>
          </div>
          <h3 className="font-page-title text-[22px] font-bold mb-[8px] text-ink">Seasons &amp; Leaderboards</h3>
          <p className="font-body text-[15px] leading-[1.6] text-on-surface-variant mb-[24px]">
            Quarterly contribution sprints with bonus reward pools for top-tier builders and documentation legends.
          </p>
          <div className="flex gap-[8px]">
            <span className="text-[12px] font-bold border-[1.5px] border-outline/15 bg-surface px-[12px] py-[4px] rounded-full text-on-surface-variant">JS</span>
            <span className="text-[12px] font-bold border-[1.5px] border-outline/15 bg-surface px-[12px] py-[4px] rounded-full text-on-surface-variant">AI/ML</span>
          </div>
        </div>

        {/* On-chain Rewards */}
        <div className="border-[2px] border-ink rounded-[24px] bg-white p-[32px] shadow-brutal-secondary transition-transform hover:-translate-y-1 hover:-translate-x-1 duration-200">
          <div className="flex justify-between items-start mb-[24px]">
            <div className="w-[48px] h-[48px] rounded-[16px] bg-secondary border-[2px] border-ink flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#161616" strokeWidth="2"/><path d="M3 10H21" stroke="#161616" strokeWidth="2"/><circle cx="17" cy="14.5" r="1.5" fill="#161616"/></svg>
            </div>
            <span className="font-mono-label text-[10.5px] font-bold border-[1.5px] border-ink bg-white px-[10px] py-[4px] rounded-full text-ink tracking-wider">SECURE</span>
          </div>
          <h3 className="font-page-title text-[22px] font-bold mb-[8px] text-ink">On-chain Rewards</h3>
          <p className="font-body text-[15px] leading-[1.6] text-on-surface-variant mb-[24px]">
            Instant multi-chain settlements in USDC or protocol tokens. Zero fees for verified active contributors.
          </p>
          <div className="font-mono-label text-[12px] text-secondary-deep tracking-widest font-bold">
            TX: 0x7c3b...ed4 ✓ verified
          </div>
        </div>
      </div>
    </section>
  );
}
