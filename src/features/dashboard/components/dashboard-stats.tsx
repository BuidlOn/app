import { StatTile } from "@/components/ui/stat";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardStat } from "../types";

export function DashboardStats({
  stats,
  loading,
}: {
  stats?: DashboardStat[];
  loading: boolean;
}) {
  return (
    <section className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
      {loading || !stats
        ? Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-buidl-lg border-2 border-outline bg-surface p-6 shadow-[4px_4px_0_#161616] flex flex-col gap-1.5"
            >
              <Skeleton className="mb-1 h-4 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
          ))
        : stats.map((stat) => (
            <StatTile
              key={stat.key}
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
              deltaTone={stat.deltaTone === "neutral" ? "muted" : "positive"}
              highlight={stat.accent}
            />
          ))}
    </section>
  );
}
