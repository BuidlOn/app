import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { RankTrend } from "@/types/domain";

const CONFIG: Record<RankTrend, { icon: string; tone: string; label: string }> = {
  up: { icon: "north", tone: "text-secondary", label: "Up" },
  down: { icon: "south", tone: "text-error", label: "Down" },
  same: { icon: "remove", tone: "text-outline", label: "No change" },
};

export function RankTrendIndicator({
  trend,
  delta,
}: {
  trend: RankTrend;
  delta?: number;
}) {
  const { icon, tone, label } = CONFIG[trend];
  return (
    <span className={cn("inline-flex items-center gap-0.5", tone)} title={label}>
      <Icon name={icon} className="text-base" />
      {trend !== "same" && delta ? (
        <span className="font-mono-label text-xs">{delta}</span>
      ) : null}
      <span className="sr-only">{label}</span>
    </span>
  );
}
