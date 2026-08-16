import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRelativeTime } from "@/utils/format";
import type { ActivityEvent, ActivityKind } from "../types";

/** Each event kind owns an accent, so the rail reads as a colour-coded log. */
const KIND_TONE: Record<ActivityKind, string> = {
  pr_merged: "bg-tertiary",
  reward_claimed: "bg-primary",
  issue_claimed: "bg-secondary",
  points_awarded: "bg-tertiary",
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
    <Card border="ink" className="p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-page-title text-[19px] font-bold text-on-surface">
          Recent activity
        </h3>
        <Link
          href="/profile"
          className="font-mono-label text-[11px] font-semibold uppercase"
        >
          View logs
        </Link>
      </div>

      {loading || !events ? (
        <div className="space-y-6 pl-[18px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3.5 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <ol className="flex flex-col gap-5 border-l-2 border-outline/10 pl-[18px]">
          {events.map((event) => (
            <li key={event.id} className="relative">
              <span
                className={cn(
                  "absolute -left-[23px] top-[3px] h-[9px] w-[9px] rounded-full border-2 border-surface",
                  KIND_TONE[event.kind],
                )}
              />
              <p className="text-[13.5px] font-bold text-on-surface">{event.title}</p>
              <p className="mt-0.5 text-[12px] text-on-surface-muted">
                {event.description}
              </p>
              <span className="mt-1 block font-mono-label text-[10px] text-on-surface-muted opacity-60">
                {formatRelativeTime(event.createdAt)}
              </span>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
