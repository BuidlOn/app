import { Icon } from "@/components/ui/icon";

const STEPS = [
  {
    index: "01",
    title: "Discover Issues",
    body: "Browse high-impact, verified issues matching your skills.",
    accent: "bg-primary",
    hoverShadow: "hover:shadow-brutal-primary",
    rotate: "hover:-rotate-1",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#161616" strokeWidth="2.2" />
        <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="#161616" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Commit & Push",
    body: "Build the solution and push to the connected repository.",
    accent: "bg-secondary",
    hoverShadow: "hover:shadow-brutal-secondary",
    rotate: "hover:rotate-1",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M9 6L4 12L9 18" stroke="#161616" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 6L20 12L15 18" stroke="#161616" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Claim Rewards",
    body: "Earn on-chain payouts immediately upon PR merge — watch the counter below tick live.",
    accent: "bg-tertiary",
    hoverShadow: "hover:shadow-brutal-tertiary",
    rotate: "hover:-rotate-1",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M4 10L12 4L20 10V19C20 19.55 19.55 20 19 20H5C4.45 20 4 19.55 4 19V10Z" stroke="#161616" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M12 14V17" stroke="#161616" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Workflow() {
  return (
    <section className="mx-auto max-w-[1200px] px-container-padding relative z-10 text-center mb-[120px]">
      <div className="mb-[64px]">
        <div className="font-mono-label text-[11px] font-bold tracking-[0.1em] uppercase text-on-surface-muted mb-6">
          WORKBENCH SECTION (3-STEP)
        </div>
        <h2 className="mb-[12px] font-page-title text-[48px] font-bold text-ink tracking-[-0.02em]">
          A frictionless workflow.
        </h2>
        <p className="mx-auto max-w-[480px] font-body text-[18px] text-on-surface-variant leading-[1.6]">
          Everything you need to find work, build solutions, and get paid.
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-7 md:grid-cols-3 text-left">
        {/* Dashed background connector line (hidden on mobile) */}
        <svg
          width="100%"
          height="2"
          className="absolute top-[68px] left-0 z-0 hidden md:block"
          preserveAspectRatio="none"
          viewBox="0 0 900 2"
        >
          <line
            x1="0"
            y1="1"
            x2="900"
            y2="1"
            stroke="#161616"
            strokeWidth="2"
            strokeDasharray="8 8"
            strokeLinecap="round"
          />
        </svg>

        {STEPS.map((step) => (
          <div
            key={step.index}
            className={`relative z-10 rounded-[32px] border-[2px] border-ink bg-white p-[40px] transition-all duration-200 ease-in-out hover:-translate-y-2 ${step.rotate} ${step.hoverShadow}`}
          >
            <div
              className={`w-[56px] h-[56px] rounded-[16px] border-[2px] border-ink flex items-center justify-center mb-[32px] ${step.accent}`}
            >
              {step.icon}
            </div>
            <div className="font-mono-label text-[11px] font-bold text-on-surface-muted mb-[12px]">
              {step.index}
            </div>
            <h3 className="font-page-title text-[24px] font-bold text-ink mb-[12px]">
              {step.title}
            </h3>
            <p className="font-body text-[16px] leading-[1.6] text-on-surface-variant m-0">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
