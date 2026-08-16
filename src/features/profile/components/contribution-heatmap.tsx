import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/utils/format";
import { Card } from "@/components/ui/card";
import type { ContributionHeatmap } from "../types";

const LEVEL_CLASS = [
  "bg-outline/5",
  "bg-secondary/20",
  "bg-secondary/40",
  "bg-secondary/70",
  "bg-secondary",
];

function Legend() {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-on-surface-muted">
      <span>Less</span>
      <div className="flex gap-[3px]">
        {LEVEL_CLASS.map((cls, i) => (
          <span key={i} className={cn("h-2.5 w-2.5 rounded-[3px]", cls)} />
        ))}
      </div>
      <span>More</span>
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
    <Card className="p-[26px]">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="m-0 font-page-title text-[17px] font-bold text-on-surface">
          Contribution activity
        </h3>
        <Legend />
      </div>

      {loading || !heatmap ? (
        <Skeleton className="h-28 w-full" />
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[640px] gap-[3px]">
            {heatmap.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((level, di) => (
                  <span
                    key={di}
                    className={cn(
                      "h-2.5 w-2.5 rounded-[3px] transition-transform hover:scale-125",
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

      <p className="m-0 mt-4 text-[12px] text-on-surface-muted">
        {heatmap
          ? `Last year: ${formatNumber(heatmap.totalLastYear)} contributions`
          : " "}
      </p>
    </Card>
  );
}
