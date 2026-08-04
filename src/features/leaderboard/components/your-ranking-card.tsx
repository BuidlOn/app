"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { RankTrendIndicator } from "./rank-trend";
import { useMyRanking } from "../hooks/use-leaderboard";
import { formatNumber } from "@/utils/format";

/** Parse "Top 5%" into the width of the accompanying percentile bar. */
function percentileWidth(label: string): number {
  const match = label.match(/(\d+)%/);
  const pct = match ? Number(match[1]) : 50;
  return Math.max(5, 100 - pct);
}

export function YourRankingCard({ seasonId }: { seasonId: string }) {
  const { data, isLoading } = useMyRanking(seasonId);

  return (
    <section className="relative grid grid-cols-1 overflow-hidden border border-primary/30 bg-surface-container-lowest md:grid-cols-3">
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-32 translate-x-32 rotate-45 border-r border-t border-primary" />
      </div>

      <div className="flex flex-col justify-center border-b border-outline-variant p-gap-6 md:border-b-0 md:border-r">
        <p className="mb-2 font-mono-label text-[10px] uppercase tracking-wider text-outline">
          Current Position
        </p>
        {isLoading || !data ? (
          <Skeleton className="h-10 w-24" />
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary">#{data.rank}</span>
            <RankTrendIndicator trend={data.trend} delta={data.rankDelta} />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center border-b border-outline-variant p-gap-6 md:border-b-0 md:border-r">
        <p className="mb-2 font-mono-label text-[10px] uppercase tracking-wider text-outline">
          Total Points Accumulated
        </p>
        {isLoading || !data ? (
          <Skeleton className="h-10 w-28" />
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{formatNumber(data.points)}</span>
            <span className="font-mono-label text-xs uppercase text-outline">XP</span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center p-gap-6">
        <p className="mb-2 font-mono-label text-[10px] uppercase tracking-wider text-outline">
          Global Percentile
        </p>
        {isLoading || !data ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold text-secondary">
              {data.percentileLabel}
            </span>
            <div className="h-1 w-full bg-surface-container-highest">
              <div
                className="h-full bg-secondary"
                style={{ width: `${percentileWidth(data.percentileLabel)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
