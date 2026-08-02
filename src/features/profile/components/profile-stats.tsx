import { Icon } from "@/components/ui/icon";
import { formatNumber } from "@/utils/format";
import type { ProfileStats } from "../types";

export function ProfileStatsRow({ stats }: { stats: ProfileStats }) {
  const cells = [
    {
      label: "Total Points",
      value: formatNumber(stats.totalPoints),
      accent: true,
      note: `+${formatNumber(stats.pointsThisWeek)} this wk`,
    },
    {
      label: "Merged PRs",
      value: formatNumber(stats.mergedPrs),
      icon: "call_merge",
    },
    {
      label: "Seasons Active",
      value: String(stats.seasonsActive),
      note: "Consecutive",
    },
    {
      label: "Global Rank",
      value: stats.globalRank ? `#${stats.globalRank}` : "—",
      icon: "trending_up",
      iconTone: "text-secondary",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="flex flex-col gap-2 border border-outline-variant bg-surface p-6"
        >
          <span className="font-mono-label text-[10px] uppercase tracking-widest text-on-surface-variant">
            {cell.label}
          </span>
          <div className="flex items-end justify-between">
            <span
              className={`font-page-title text-[32px] leading-none ${cell.accent ? "text-primary" : "text-on-surface"}`}
            >
              {cell.value}
            </span>
            {cell.note ? (
              <span className="font-mono-label text-[12px] text-on-surface-variant">
                {cell.note}
              </span>
            ) : cell.icon ? (
              <Icon
                name={cell.icon}
                className={cell.iconTone ?? "text-on-surface-variant"}
              />
            ) : null}
          </div>
        </div>
      ))}
    </section>
  );
}
