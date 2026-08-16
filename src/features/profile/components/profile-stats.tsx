import { Card } from "@/components/ui/card";
import { formatNumber } from "@/utils/format";
import type { ProfileStats } from "../types";

export function ProfileStatsRow({ stats }: { stats: ProfileStats }) {
  const cells = [
    {
      label: "Total points",
      value: formatNumber(stats.totalPoints),
      accent: true,
      note: `+${formatNumber(stats.pointsThisWeek)} this wk`,
    },
    {
      label: "Merged PRs",
      value: formatNumber(stats.mergedPrs),
    },
    {
      label: "Seasons active",
      value: String(stats.seasonsActive),
    },
    {
      label: "Global rank",
      value: stats.globalRank ? `#${stats.globalRank}` : "—",
      valueClass: "text-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cells.map((cell) => (
        <Card
          key={cell.label}
          tone={cell.accent ? "primary" : "surface"}
          border={cell.accent ? "ink" : "hairline"}
          className="px-6 py-[22px]"
        >
          <div
            className={`mb-2.5 font-mono-label text-[11px] uppercase tracking-widest ${cell.accent ? "text-primary-deep" : "text-on-surface-muted"}`}
          >
            {cell.label}
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`font-page-title text-[28px] font-bold ${cell.valueClass ?? (cell.accent ? "text-on-surface" : "text-on-surface")}`}
            >
              {cell.value}
            </span>
            {cell.note && (
              <span
                className={`text-[12px] ${cell.accent ? "text-primary-deep" : "text-on-surface-variant"}`}
              >
                {cell.note}
              </span>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
