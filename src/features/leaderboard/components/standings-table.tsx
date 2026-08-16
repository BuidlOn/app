import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/utils/format";
import { RankTrendIndicator } from "./rank-trend";
import type { LeaderboardEntry } from "@/types/domain";

const MEDAL: Record<number, { bar: string; text: string; bg: string }> = {
  1: { bar: "bg-primary", text: "text-primary", bg: "bg-primary/5" },
  2: { bar: "bg-on-surface-muted", text: "text-on-surface-muted", bg: "" },
  3: { bar: "bg-secondary", text: "text-secondary", bg: "" },
};

function RankCell({ rank }: { rank: number }) {
  const medal = MEDAL[rank];
  return (
    <div className="relative flex items-center">
      {medal && (
        <span className={cn("absolute bottom-2 left-0 top-2 w-1 rounded-r-[4px]", medal.bar)} />
      )}
      <span className="pl-3 font-mono-label font-bold text-on-surface">
        {String(rank).padStart(2, "0")}
      </span>
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
  const medal = MEDAL[entry.rank];
  return (
    <tr
      className={cn(
        "border-t border-outline/10 transition-colors hover:bg-outline/5",
        medal?.bg,
        isMe && "border-t-[1.5px] border-outline bg-tertiary/5 hover:bg-tertiary/10",
      )}
    >
      <td className="py-4 pl-0 pr-6 relative">
        <RankCell rank={entry.rank} />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={entry.user.avatarUrl}
            alt={entry.user.name ?? entry.user.githubUsername}
            size={36}
            className={cn(
              medal?.bar === "bg-primary" && "bg-primary",
              medal?.bar === "bg-secondary" && "bg-secondary",
              isMe && "bg-on-surface text-surface",
            )}
          />
          <div className="min-w-0">
            <Link
              href={`/u/${entry.user.githubUsername}`}
              className="block truncate text-[13.5px] font-bold text-on-surface hover:text-primary"
            >
              {entry.user.githubUsername}
              {isMe && (
                <span className="ml-1.5 font-mono-label text-[10px] text-tertiary">
                  YOU
                </span>
              )}
            </Link>
            <p className="truncate font-mono-label text-[11px] text-on-surface-muted">
              {entry.user.reputationLevel}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 font-mono-label font-semibold text-on-surface">
        {formatNumber(entry.points)}
      </td>
      <td className="px-6 py-4">
        <span className="rounded-full border-[1.5px] border-outline/15 px-2.5 py-1 text-[12px] font-semibold text-on-surface">
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
    <tr className="border-t border-outline/10">
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-6" />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
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
        <Skeleton className="h-6 w-16 rounded-full" />
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
          <tr className="bg-outline/5">
            {["Rank", "Contributor", "Points", "Contributions"].map((h) => (
              <th
                key={h}
                className="px-6 py-3 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted"
              >
                {h}
              </th>
            ))}
            <th className="px-6 py-3 text-right font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
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
