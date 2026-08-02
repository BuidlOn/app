import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/utils/format";
import type { ContributionHeatmap } from "../types";

const LEVEL_CLASS = [
  "bg-surface-container",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/70",
  "bg-primary",
];

function Legend() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-caption text-caption text-on-surface-variant">Less</span>
      <div className="flex gap-1">
        {LEVEL_CLASS.map((cls, i) => (
          <span key={i} className={cn("h-3 w-3", cls)} />
        ))}
      </div>
      <span className="font-caption text-caption text-on-surface-variant">More</span>
    </div>
  );
}

export function ContributionHeatmapCard({
  heatmap,
  loading,
}: {
  heatmap?: ContributionHeatmap;
  loading: boolean;
}) {
  return (
    <section className="border border-outline-variant bg-surface p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-section-heading text-section-heading text-on-surface">
          Contribution Activity
        </h2>
        <Legend />
      </div>

      {loading || !heatmap ? (
        <Skeleton className="h-28 w-full" />
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[640px] gap-1">
            {heatmap.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((level, di) => (
                  <span
                    key={di}
                    className={cn(
                      "h-3 w-3 transition-transform hover:scale-125",
                      LEVEL_CLASS[level],
                    )}
                    title={`${level * 2} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="font-caption text-caption text-on-surface-variant">
          {heatmap
            ? `Last year: ${formatNumber(heatmap.totalLastYear)} contributions`
            : " "}
        </span>
      </div>
    </section>
  );
}
