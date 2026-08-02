import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { formatCompactNumber } from "@/utils/format";
import type { LeaderboardEntry } from "@/types/domain";

export function TopPerformersCard({
  entries,
  highlightUsername,
}: {
  entries: LeaderboardEntry[];
  highlightUsername?: string;
}) {
  return (
    <section className="border border-outline-variant bg-surface p-6">
      <h2 className="mb-6 font-section-heading text-section-heading text-on-surface">
        Nearby Ranks
      </h2>
      <div className="flex flex-col gap-1">
        {entries.map((entry) => {
          const isHighlight = entry.user.githubUsername === highlightUsername;
          return (
            <div
              key={entry.user.id}
              className={cn(
                "flex items-center gap-3 py-2",
                isHighlight &&
                  "-mx-6 border-y border-primary/20 bg-primary/10 px-6",
              )}
            >
              <span
                className={cn(
                  "w-6 font-mono-label",
                  isHighlight ? "font-bold text-primary" : "text-on-surface-variant",
                )}
              >
                {entry.rank}
              </span>
              <Avatar
                src={entry.user.avatarUrl}
                alt={entry.user.githubUsername}
                size={32}
                className={cn(!isHighlight && "grayscale", isHighlight && "border-primary/50")}
              />
              <Link
                href={`/u/${entry.user.githubUsername}`}
                className={cn(
                  "flex-1 truncate font-caption hover:text-primary",
                  isHighlight && "font-bold text-primary",
                )}
              >
                {entry.user.githubUsername}
              </Link>
              <span
                className={cn(
                  "font-mono-label text-[10px]",
                  isHighlight && "text-primary",
                )}
              >
                {formatCompactNumber(entry.points)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
