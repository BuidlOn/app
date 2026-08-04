"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import {
  useLeaderboard,
  useSeasons,
} from "../hooks/use-leaderboard";
import { YourRankingCard } from "./your-ranking-card";
import { StandingsTable } from "./standings-table";

export function LeaderboardView() {
  const { data: user } = useCurrentUser();
  const { data: seasons, isLoading: seasonsLoading } = useSeasons();
  const [seasonId, setSeasonId] = useState<string>("");
  const [page, setPage] = useState(1);

  // Default to the first (active) season once seasons load.
  const activeSeasonId = seasonId || seasons?.[0]?.id || "";

  const { data, isLoading, isError, refetch } = useLeaderboard({
    seasonId: activeSeasonId,
    page,
  });

  const rangeStart = data ? (data.page - 1) * data.limit + 1 : 0;
  const rangeEnd = data ? Math.min(data.page * data.limit, data.total) : 0;

  return (
    <div className="mx-auto max-w-[1600px] space-y-gap-8 p-4 sm:p-container-padding">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-primary">
            Ecosystem Metrics
          </p>
          <h1 className="font-page-title text-page-title">Leaderboard</h1>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="season-select"
            className="font-mono-label text-[10px] uppercase text-outline"
          >
            Active Season
          </label>
          {seasonsLoading || !seasons ? (
            <Skeleton className="h-10 w-64" />
          ) : (
            <div className="relative inline-block w-full md:w-64">
              <select
                id="season-select"
                value={activeSeasonId}
                onChange={(e) => {
                  setSeasonId(e.target.value);
                  setPage(1);
                }}
                className="w-full appearance-none border border-outline-variant bg-surface-container-low px-4 py-2 pr-10 text-sm font-medium outline-none focus:border-primary"
              >
                {seasons.map((season) => (
                  <option key={season.id} value={season.id}>
                    {season.name}
                  </option>
                ))}
              </select>
              <Icon
                name="expand_more"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline"
              />
            </div>
          )}
        </div>
      </section>

      <YourRankingCard seasonId={activeSeasonId} />

      <section className="border border-outline-variant bg-surface-container-low">
        <div className="flex items-center justify-between border-b border-outline-variant px-6 py-4">
          <h2 className="font-section-heading text-lg">Global Standings</h2>
        </div>

        {isError ? (
          <div className="p-12 text-center">
            <Icon name="warning" className="mb-4 text-4xl text-error" />
            <p className="mb-6 font-body font-bold uppercase text-on-surface">
              Failed to load standings.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="bg-error px-6 py-2 font-mono-label text-sm font-bold uppercase text-on-error hover:brightness-110"
            >
              Retry
            </button>
          </div>
        ) : (
          <StandingsTable
            entries={data?.items}
            loading={isLoading}
            currentUsername={user?.githubUsername}
          />
        )}

        {data && (
          <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant px-6 py-4 sm:flex-row">
            <p className="font-mono-label text-xs uppercase tracking-wider text-outline">
              Showing {rangeStart}-{rangeEnd} of {data.total} Contributors
            </p>
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </section>
    </div>
  );
}
