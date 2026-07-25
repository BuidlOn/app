import { Skeleton } from "@/components/ui/skeleton";
import type { SeasonProgress } from "../types";

export function SeasonProgressCard({
  progress,
  loading,
}: {
  progress?: SeasonProgress;
  loading: boolean;
}) {
  if (loading || !progress) {
    return (
      <div className="border border-outline-variant bg-surface p-6">
        <Skeleton className="mb-6 h-4 w-32" />
        <Skeleton className="mb-4 h-4 w-full" />
        <Skeleton className="h-1 w-full" />
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden border border-outline-variant bg-surface p-6">
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <h4 className="mb-6 font-mono-label text-mono-label uppercase text-on-surface-variant">
        {progress.label}
      </h4>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <span className="font-body text-sm font-bold text-on-surface">
            Progress to {progress.nextTier}
          </span>
          <span className="font-mono-label text-xs">{progress.percent}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progress.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1 w-full bg-surface-container-highest"
        >
          <div
            className="h-full bg-primary transition-all duration-1000"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
        <p className="font-caption text-[11px] italic text-on-surface-variant">
          {progress.note}
        </p>
      </div>
    </div>
  );
}
