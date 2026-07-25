import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardStat } from "../types";

const DELTA_TONE: Record<NonNullable<DashboardStat["deltaTone"]>, string> = {
  success: "text-secondary",
  warning: "text-tertiary",
  neutral: "text-on-surface-variant",
};

function StatCard({ stat }: { stat: DashboardStat }) {
  return (
    <div className="group border border-outline-variant bg-surface p-6 transition-colors hover:border-primary">
      <p className="mb-2 font-mono-label text-mono-label uppercase text-on-surface-variant">
        {stat.label}
      </p>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-page-title text-page-title font-bold",
            stat.accent ? "text-primary" : "text-on-surface",
          )}
        >
          {stat.value}
        </span>
        {stat.delta && (
          <span
            className={cn(
              "font-caption text-caption font-bold",
              DELTA_TONE[stat.deltaTone ?? "neutral"],
            )}
          >
            {stat.delta}
          </span>
        )}
      </div>
    </div>
  );
}

export function DashboardStats({
  stats,
  loading,
}: {
  stats?: DashboardStat[];
  loading: boolean;
}) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {loading || !stats
        ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border border-outline-variant bg-surface p-6">
              <Skeleton className="mb-3 h-4 w-24" />
              <Skeleton className="h-9 w-20" />
            </div>
          ))
        : stats.map((stat) => <StatCard key={stat.key} stat={stat} />)}
    </section>
  );
}
