import { Icon } from "@/components/ui/icon";
import { formatNumber, formatUsd } from "@/utils/format";
import type { AdminStats } from "../types";

export function AdminStatsRow({ stats }: { stats: AdminStats }) {
  const cells = [
    { label: "Total Contributors", value: formatNumber(stats.totalContributors), icon: "trending_up", tone: "text-secondary", note: stats.contributorsDelta, noteTone: "text-secondary" },
    { label: "Active Repositories", value: formatNumber(stats.activeRepositories), icon: "check_circle", tone: "text-secondary", note: stats.repositoriesDelta, noteTone: "text-secondary" },
    { label: "Open Issues", value: formatNumber(stats.openIssues), icon: "bug_report", tone: "text-error", note: "High Priority", noteTone: "text-error" },
    { label: "Rewards Distributed", value: formatUsd(stats.rewardsDistributedUsd, true), icon: "database", tone: "text-primary", note: "USDC", noteTone: "text-on-surface-variant" },
  ];

  return (
    <section className="mb-gap-8 grid grid-cols-1 gap-px border border-outline-variant bg-outline-variant md:grid-cols-4">
      {cells.map((cell) => (
        <div key={cell.label} className="bg-surface-container-low p-gap-6">
          <div className="mb-2 flex items-start justify-between">
            <p className="font-mono-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              {cell.label}
            </p>
            <Icon name={cell.icon} className={`text-sm ${cell.tone}`} />
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="font-mono-label text-[28px] font-bold text-on-surface">
              {cell.value}
            </h2>
            <span className={`font-mono-label text-[11px] ${cell.noteTone}`}>
              {cell.note}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
