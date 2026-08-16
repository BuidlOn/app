import { Icon } from "@/components/ui/icon";
import { formatNumber, formatUsd } from "@/utils/format";
import { Card } from "@/components/ui/card";
import type { AdminStats } from "../types";

export function AdminStatsRow({ stats }: { stats: AdminStats }) {
  const cells = [
    { label: "Total contributors", value: formatNumber(stats.totalContributors), icon: "trending_up", tone: "text-primary-deep", note: stats.contributorsDelta, noteTone: "text-primary-deep" },
    { label: "Active repositories", value: formatNumber(stats.activeRepositories), icon: "check_circle", tone: "text-primary-deep", note: stats.repositoriesDelta, noteTone: "text-primary-deep" },
    { label: "Open issues", value: formatNumber(stats.openIssues), icon: "bug_report", tone: "text-error", note: "High priority", noteTone: "text-error" },
    { label: "Rewards distributed", value: formatUsd(stats.rewardsDistributedUsd, true), icon: "database", tone: "text-secondary-deep", note: "USDC", noteTone: "text-secondary-deep", highlight: true },
  ];

  return (
    <Card className="mb-8 grid grid-cols-1 overflow-hidden bg-outline/10 sm:grid-cols-2 md:grid-cols-4 gap-[1.5px]">
      {cells.map((cell) => (
        <div key={cell.label} className={`flex flex-col gap-2.5 p-[24px] py-[22px] ${cell.highlight ? "bg-secondary" : "bg-surface"}`}>
          <div className="flex items-start justify-between gap-2">
            <span className={`font-mono-label text-[10.5px] uppercase tracking-widest ${cell.highlight ? "text-secondary-deep" : "text-on-surface-muted"}`}>
              {cell.label}
            </span>
            <Icon name={cell.icon} className={`text-[16px] shrink-0 ${cell.highlight ? "text-secondary-deep" : cell.tone}`} />
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className={`font-page-title text-[24px] font-bold ${cell.highlight ? "text-ink" : "text-on-surface"}`}>
              {cell.value}
            </span>
            <span className={`font-mono-label text-[11px] font-bold ${cell.highlight ? "text-secondary-deep" : cell.noteTone}`}>
              {cell.note}
            </span>
          </div>
        </div>
      ))}
    </Card>
  );
}
