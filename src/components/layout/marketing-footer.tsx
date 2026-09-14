import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="w-full bg-background mt-10 pt-14 border-t-0 px-container-padding">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 pb-12 border-b-[1.5px] border-outline/10">
          
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-[34px] h-[34px] rounded-[10px] bg-primary border-2 border-outline flex items-center justify-center font-page-title font-bold text-[15px] text-background">
                B
              </div>
              <span className="font-page-title font-bold text-[18px] text-on-background">BuidlOn</span>
            </div>
            <p className="text-[13.5px] leading-[1.6] text-on-surface-muted max-w-[260px] mb-5">
              A technical ecosystem for elite contributors — verified issues, real code review, on-chain payouts.
            </p>
            <div className="flex gap-2.5">
              <Link href="#" aria-label="BuidlOn on GitHub" className="w-[34px] h-[34px] rounded-full border-[1.5px] border-outline flex items-center justify-center text-outline hover:bg-outline hover:text-background transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-1.02-.01-1.85-2.79.6-3.38-1.19-3.38-1.19-.44-1.12-1.08-1.42-1.08-1.42-.87-.6.07-.58.07-.58.97.07 1.48 1 1.48 1 .86 1.48 2.27 1.05 2.82.8.09-.63.34-1.05.61-1.29-2.23-.25-4.57-1.12-4.57-4.98 0-1.1.39-2 1.03-2.71-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03a9.4 9.4 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.41.1 2.66.64.71 1.03 1.61 1.03 2.71 0 3.87-2.35 4.73-4.58 4.98.36.32.68.93.68 1.88 0 1.36-.01 2.46-.01 2.79 0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"/></svg>
              </Link>
              <Link href="#" aria-label="BuidlOn on X" className="w-[34px] h-[34px] rounded-full border-[1.5px] border-outline flex items-center justify-center text-outline hover:bg-outline hover:text-background transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05A4.13 4.13 0 0 0 16.11 4c-2.28 0-4.13 1.87-4.13 4.17 0 .33.03.65.1.96A11.65 11.65 0 0 1 3.16 4.9a4.22 4.22 0 0 0-.56 2.1c0 1.45.72 2.72 1.82 3.47A4.1 4.1 0 0 1 2.6 9.9v.05c0 2.02 1.4 3.71 3.27 4.1-.34.1-.7.15-1.08.15-.26 0-.52-.02-.77-.07.52 1.66 2.03 2.87 3.82 2.9A8.24 8.24 0 0 1 1 18.58 11.62 11.62 0 0 0 7.29 20.4c7.55 0 11.68-6.32 11.68-11.8 0-.18 0-.36-.01-.53A8.35 8.35 0 0 0 22.46 6Z"/></svg>
              </Link>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <div className="font-mono-label text-[11px] tracking-[0.08em] uppercase text-on-surface-muted mb-4">Product</div>
            <div className="flex flex-col gap-3 text-[14px]">
              <Link href="#" className="text-on-background hover:text-primary transition-colors">Browse issues</Link>
              <Link href="#" className="text-on-background hover:text-primary transition-colors">Leaderboard</Link>
              <Link href="#" className="text-on-background hover:text-primary transition-colors">Rewards</Link>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div>
            <div className="font-mono-label text-[11px] tracking-[0.08em] uppercase text-on-surface-muted mb-4">Resources</div>
            <div className="flex flex-col gap-3 text-[14px]">
              <Link href="#" className="text-on-background hover:text-primary transition-colors">System status</Link>
              <Link href="#" className="text-on-background hover:text-primary transition-colors">API reference</Link>
              <Link href="#" className="text-on-background hover:text-primary transition-colors">Security</Link>
            </div>
          </div>

          {/* Column 4: Legal */}
          <div>
            <div className="font-mono-label text-[11px] tracking-[0.08em] uppercase text-on-surface-muted mb-4">Legal</div>
            <div className="flex flex-col gap-3 text-[14px]">
              <Link href="#" className="text-on-background hover:text-primary transition-colors">Privacy policy</Link>
              <Link href="#" className="text-on-background hover:text-primary transition-colors">Terms of service</Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-center py-6 flex-wrap gap-3">
          <span className="text-[12.5px] text-on-surface-muted">
            © {new Date().getFullYear()} BuidlOn. Built for the open source community.
          </span>
          <span className="font-mono-label text-[11px] text-on-surface-muted flex items-center gap-1.5 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
