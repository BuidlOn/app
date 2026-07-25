import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRelativeTime } from "@/utils/format";
import type { ActivityEvent, ActivityKind } from "../types";

const KIND_TONE: Record<ActivityKind, string> = {
  pr_merged: "bg-secondary",
  issue_claimed: "bg-primary",
  reward_claimed: "bg-tertiary",
  points_awarded: "bg-primary",
  level_up: "bg-secondary",
};

export function ActivityTimeline({
  events,
  loading,
}: {
  events?: ActivityEvent[];
  loading: boolean;
}) {
  return (
    <div className="h-full space-y-6 border border-outline-variant bg-surface p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-section-heading text-section-heading text-on-surface">
          Recent Activity
        </h3>
        <button
          type="button"
          className="font-mono-label text-xs uppercase text-primary hover:underline"
        >
          View logs
        </button>
      </div>

      {loading || !events ? (
        <div className="space-y-8 pl-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <ol className="relative space-y-8 pl-4 before:absolute before:bottom-2 before:left-px before:top-2 before:w-px before:bg-outline-variant">
          {events.map((event) => (
            <li key={event.id} className="relative">
              <span
                className={cn(
                  "absolute -left-[19px] top-1.5 h-2 w-2 rounded-full ring-4 ring-surface",
                  KIND_TONE[event.kind],
                )}
              />
              <p className="font-body text-sm font-bold text-on-surface">
                {event.title}
              </p>
              <p className="mt-1 font-caption text-xs text-on-surface-variant">
                {event.description}
              </p>
              <span className="mt-2 block font-mono-label text-[10px] uppercase text-outline">
                {formatRelativeTime(event.createdAt)}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
