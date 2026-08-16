import { Card, CardEyebrow } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { SeasonProgress } from "../types";

/**
 * Promoted to an ink border: this is the one card on the dashboard the reader
 * should always find. The teal bloom in the corner is the only soft shape in
 * the system and marks it as the reward surface.
 */
export function SeasonProgressCard({
  progress,
  loading,
}: {
  progress?: SeasonProgress;
  loading: boolean;
}) {
  if (loading || !progress) {
    return (
      <Card border="ink" className="p-6">
        <Skeleton className="mb-5 h-3 w-40" />
        <Skeleton className="mb-3 h-3.5 w-full" />
        <Skeleton className="h-2.5 w-full rounded-full" />
      </Card>
    );
  }

  return (
    <Card border="ink" className="relative overflow-hidden p-4 sm:p-6">
      <div className="pointer-events-none absolute -right-[30px] -top-[30px] h-[110px] w-[110px] rounded-full bg-tertiary/[0.12]" />

      <div className="relative">
        <CardEyebrow className="mb-4">{progress.label}</CardEyebrow>

        <div className="mb-2.5 flex items-baseline justify-between gap-3">
          <span className="text-[13px] font-bold sm:text-[14px]">
            Progress to {progress.nextTier}
          </span>
          <span className="font-mono-label text-[12px] font-bold">
            {progress.percent}%
          </span>
        </div>

        <Progress
          value={progress.percent / 100}
          label={`Progress to ${progress.nextTier}`}
        />

        <p className="mt-3.5 text-[12.5px] italic text-on-surface-muted">
          {progress.note}
        </p>
      </div>
    </Card>
  );
}
