import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/utils/format";
import { RankTrendIndicator } from "./rank-trend";
import type { LeaderboardEntry } from "@/types/domain";

const MEDAL: Record<number, { bar: string; text: string }> = {
  1: { bar: "bg-tertiary", text: "text-tertiary" },
  2: { bar: "bg-outline", text: "text-on-surface" },
  3: { bar: "bg-on-tertiary-fixed-variant", text: "text-on-tertiary-fixed-variant" },
};

function RankCell({ rank }: { rank: number }) {
  const medal = MEDAL[rank];
  return (
    <div className="relative flex items-center gap-3">
      {medal && (
        <span className={cn("absolute -left-6 top-1/2 h-8 w-1 -translate-y-1/2", medal.bar)} />
      )}
      <span className={cn("font-mono-label", medal ? medal.text : "text-outline")}>
        {String(rank).padStart(2, "0")}
      </span>
      {medal && (
        <Icon name="military_tech" className={cn("text-lg", medal.text)} filled />
      )}
    </div>
  );
}

function StandingRow({
  entry,
  isMe,
}: {
  entry: LeaderboardEntry;
  isMe: boolean;
}) {
  return (
    <tr
      className={cn(
        "border-b border-outline-variant/30 transition-colors hover:bg-surface-container",
        isMe && "bg-primary/5",
      )}
    >
      <td className="px-6 py-4">
        <RankCell rank={entry.rank} />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={entry.user.avatarUrl}
            alt={entry.user.name ?? entry.user.githubUsername}
            size={40}
          />
          <div className="min-w-0">
            <Link
              href={`/u/${entry.user.githubUsername}`}
              className="block truncate font-bold text-on-surface hover:text-primary"
            >
              {entry.user.githubUsername}
              {isMe && (
                <span className="ml-2 font-mono-label text-[10px] uppercase text-primary">
                  You
                </span>
              )}
            </Link>
            <p className="truncate font-mono-label text-xs text-outline">
              {entry.user.reputationLevel}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 font-mono-label">{formatNumber(entry.points)}</td>
      <td className="px-6 py-4">
        <span className="border border-outline-variant bg-surface-container-highest px-2 py-0.5 text-xs">
          {entry.mergedPrs} PRs
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <RankTrendIndicator trend={entry.trend} delta={entry.rankDelta} />
      </td>
    </tr>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-outline-variant/30">
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-6" />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-12" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-6 w-16" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="ml-auto h-4 w-4" />
      </td>
    </tr>
  );
}

export function StandingsTable({
  entries,
  loading,
  currentUsername,
}: {
  entries?: LeaderboardEntry[];
  loading: boolean;
  currentUsername?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-outline-variant bg-surface-container">
            {["Rank", "Contributor", "Points", "Contributions"].map((h) => (
              <th
                key={h}
                className="px-6 py-3 font-mono-label text-[10px] uppercase tracking-widest text-outline"
              >
                {h}
              </th>
            ))}
            <th className="px-6 py-3 text-right font-mono-label text-[10px] uppercase tracking-widest text-outline">
              Trend
            </th>
          </tr>
        </thead>
        <tbody>
          {loading || !entries
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
            : entries.map((entry) => (
                <StandingRow
                  key={entry.user.id}
                  entry={entry}
                  isMe={entry.user.githubUsername === currentUsername}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
}
