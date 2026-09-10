
const STEPS = [
  {
    index: "01",
    indexColor: "text-[#FFC53D]", // Yellow
    title: "Discover Issues",
    body: "Browse high-impact, verified issues matching your skills.",
    offset: "mt-0",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#161616" strokeWidth="2.5" />
        <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="#161616" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    index: "02",
    indexColor: "text-[#7C5CFC]", // Purple
    title: "Commit & Push",
    body: "Build the solution and push to the connected repository.",
    offset: "md:mt-10",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 6L4 12L9 18" stroke="#161616" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 6L20 12L15 18" stroke="#161616" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    index: "03",
    indexColor: "text-[#00C2A8]", // Green
    title: "Claim Rewards",
    body: "Earn on-chain payouts immediately upon PR merge, watch the counter below tick live.",
    offset: "md:mt-20",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 10L12 4L20 10V19C20 19.55 19.55 20 19 20H5C4.45 20 4 19.55 4 19V10Z" stroke="#161616" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M12 14V17" stroke="#161616" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Workflow() {
  return (
    <section className="mx-auto max-w-[1300px] px-container-padding relative z-10 text-center mb-[120px]">
      <div className="mb-[64px]">
        <div className="font-mono-label text-[11px] font-bold tracking-[0.1em] uppercase text-on-surface-muted mb-6">
          How it works
        </div>
        <h2 className="mb-[12px] font-page-title text-[48px] font-bold text-ink tracking-[-0.02em]">
          A frictionless workflow.
        </h2>
        <p className="mx-auto max-w-[480px] font-body text-[18px] text-on-surface-variant leading-[1.6]">
          Everything you need to find work, build solutions, and get paid.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-[32px] text-left mx-auto max-w-[1500px]">
        {STEPS.map((step) => (
          <div key={step.index} className={`flex w-full max-w-[420px] flex-col ${step.offset}`}>
            <div className={`font-page-title text-[96px] leading-none font-bold mb-4 md:mb-0 ${step.indexColor}`}>
              {step.index}
            </div>
            <h3 className="font-page-title text-[20px] font-bold text-[#161616] mb-3 flex items-center gap-2">
              <span className="flex-shrink-0">{step.icon}</span>
              {step.title}
            </h3>
            <p className="font-body text-[14.5px] leading-[1.6] text-on-surface-variant m-0">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
