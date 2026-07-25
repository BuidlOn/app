import { Icon } from "@/components/ui/icon";

const TILES = [
  {
    icon: "database",
    status: "Ready",
    title: "Repository Explorer",
    body: "Advanced filtering for decentralized protocols, SDKs, and infrastructure layers. Find your niche in seconds.",
    footer: (
      <div className="flex gap-2">
        {["Rust", "Solidity", "Go"].map((lang) => (
          <span
            key={lang}
            className="bg-surface-variant px-2 py-1 font-mono-label text-[10px] uppercase text-on-surface"
          >
            {lang}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: "shopping_cart",
    status: "Live",
    title: "Issue Marketplace",
    body: "Dynamic pricing based on issue difficulty and urgency. Algorithmic bounty distribution with transparent tracking.",
    footer: (
      <div className="flex items-center gap-2">
        <div className="h-1 flex-1 bg-surface-variant">
          <div className="h-full w-2/3 bg-primary" />
        </div>
        <span className="font-mono-label text-[10px]">67% Claimed</span>
      </div>
    ),
  },
  {
    icon: "trophy",
    status: "Active",
    title: "Seasons & Leaderboards",
    body: "Quarterly contribution sprints with bonus reward pools for top-tier builders and documentation legends.",
    footer: (
      <div className="flex -space-x-3">
        {["JD", "AK", "MT"].map((initials) => (
          <div
            key={initials}
            className="flex h-8 w-8 items-center justify-center border border-surface bg-surface-variant text-[10px] font-bold"
          >
            {initials}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: "account_balance_wallet",
    status: "Secure",
    title: "On-chain Rewards",
    body: "Instant multi-chain settlements in USDC or protocol tokens. Zero fees for verified active contributors.",
    footer: (
      <div className="font-mono-label text-[10px] text-primary">
        TX: 0x7c3a...ed44 verified
      </div>
    ),
  },
];

export function Workbench() {
  return (
    <section className="border-t border-outline-variant bg-surface-dim px-container-padding py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="mb-4 block font-mono-label uppercase tracking-[0.2em] text-primary">
              Engineered for Devs
            </span>
            <h2 className="font-page-title text-page-title text-white">
              Developer Workbench
            </h2>
          </div>
          <p className="hidden max-w-md text-right font-caption text-on-surface-variant md:block">
            A unified dashboard for tracking contributions, managing payments, and
            exploring the ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-outline-variant bg-outline-variant px-px md:grid-cols-2">
          {TILES.map((tile) => (
            <div
              key={tile.title}
              className="group relative overflow-hidden bg-surface p-10"
            >
              <div className="mb-12 flex items-start justify-between">
                <Icon name={tile.icon} className="text-4xl text-primary" />
                <span className="border border-outline-variant px-2 py-0.5 font-mono-label text-[10px] uppercase text-on-surface-variant">
                  {tile.status}
                </span>
              </div>
              <h4 className="mb-3 font-section-heading text-section-heading text-white">
                {tile.title}
              </h4>
              <p className="mb-8 text-on-surface-variant">{tile.body}</p>
              {tile.footer}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
