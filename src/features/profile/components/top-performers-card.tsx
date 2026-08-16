import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { formatCompactNumber } from "@/utils/format";
import { Card } from "@/components/ui/card";
import type { LeaderboardEntry } from "@/types/domain";

export function TopPerformersCard({
  entries,
  highlightUsername,
}: {
  entries: LeaderboardEntry[];
  highlightUsername?: string;
}) {
  return (
    <Card className="p-[24px]">
      <h3 className="m-0 mb-4 font-page-title text-[16px] font-bold text-on-surface">
        Nearby ranks
      </h3>
      <div className="flex flex-col gap-1">
        {entries.map((entry) => {
          const isHighlight = entry.user.githubUsername === highlightUsername;
          return (
            <div
              key={entry.user.id}
              className={cn(
                "flex items-center gap-2.5 py-2",
                isHighlight &&
                  "-mx-3 rounded-[12px] border-[1.5px] border-secondary/30 bg-secondary/10 px-3 py-2.5",
              )}
            >
              <span
                className={cn(
                  "w-5 font-mono-label text-[12px]",
                  isHighlight ? "font-bold text-secondary" : "text-on-surface-muted",
                )}
              >
                {entry.rank}
              </span>
              <Avatar
                src={entry.user.avatarUrl}
                alt={entry.user.githubUsername}
                size={26}
                className={cn(
                  "rounded-full",
                  !isHighlight && "bg-outline/10 grayscale",
                  isHighlight && "bg-ink border-[1.5px] border-ink",
                )}
              />
              <Link
                href={`/u/${entry.user.githubUsername}`}
                className={cn(
                  "flex-1 truncate text-[13px]",
                  isHighlight ? "font-bold text-secondary" : "text-on-surface transition-colors hover:text-secondary",
                )}
              >
                {entry.user.githubUsername}
              </Link>
              <span
                className={cn(
                  "font-mono-label text-[11px]",
                  isHighlight ? "font-bold text-secondary" : "text-on-surface-muted",
                )}
              >
                {formatCompactNumber(entry.points)}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
