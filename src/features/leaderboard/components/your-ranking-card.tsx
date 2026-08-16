"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { RankTrendIndicator } from "./rank-trend";
import { useMyRanking } from "../hooks/use-leaderboard";
import { formatNumber } from "@/utils/format";

import { Card } from "@/components/ui/card";

/** Parse "Top 5%" into the width of the accompanying percentile bar. */
function percentileWidth(label: string): number {
  const match = label.match(/(\d+)%/);
  const pct = match ? Number(match[1]) : 50;
  return Math.max(5, 100 - pct);
}

export function YourRankingCard({ seasonId }: { seasonId: string }) {
  const { data, isLoading } = useMyRanking(seasonId);

  return (
    <Card border="ink" className="relative grid grid-cols-1 overflow-hidden md:grid-cols-3">
      <div className="pointer-events-none absolute right-[-40px] top-[-40px] h-[140px] w-[140px] rounded-full bg-primary/10" />

      <div className="relative flex flex-col justify-center border-b-[1.5px] border-outline/10 px-8 py-6 md:border-b-0 md:border-r-[1.5px]">
        <p className="mb-2 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
          Current position
        </p>
        {isLoading || !data ? (
          <Skeleton className="h-10 w-24" />
        ) : (
          <div className="flex items-baseline gap-3">
            <span className="font-page-title text-[34px] font-bold text-primary">#{data.rank}</span>
            <RankTrendIndicator trend={data.trend} delta={data.rankDelta} />
          </div>
        )}
      </div>

      <div className="relative flex flex-col justify-center border-b-[1.5px] border-outline/10 px-8 py-6 md:border-b-0 md:border-r-[1.5px]">
        <p className="mb-2 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
          Total points
        </p>
        {isLoading || !data ? (
          <Skeleton className="h-10 w-28" />
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="font-page-title text-[34px] font-bold text-on-surface">{formatNumber(data.points)}</span>
            <span className="font-mono-label text-[11px] uppercase text-on-surface-muted">XP</span>
          </div>
        )}
      </div>

      <div className="relative flex flex-col justify-center px-8 py-6">
        <p className="mb-2 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
          Global percentile
        </p>
        {isLoading || !data ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          <div className="flex flex-col gap-2">
            <span className="text-[20px] font-bold text-secondary">
              {data.percentileLabel}
            </span>
            <div className="h-2 w-full rounded-full border-[1.5px] border-outline bg-outline/10">
              <div
                className="h-full rounded-full bg-secondary"
                style={{ width: `${percentileWidth(data.percentileLabel)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
