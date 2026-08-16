"use client";

import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Glyph } from "@/components/ui/icons";
import { Label, Select } from "@/components/ui/input";
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
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 sm:gap-8">
      <PageHeader
        title="Leaderboard"
        description="Ecosystem-wide standings for verified contributors."
        actions={
          <div className="w-full sm:w-[220px]">
            <Label htmlFor="season-select" className="mb-2 block">
              Active season
            </Label>
            {seasonsLoading || !seasons ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <div className="relative">
                <Select
                  id="season-select"
                  shape="pill"
                  value={activeSeasonId}
                  onChange={(e) => {
                    setSeasonId(e.target.value);
                    setPage(1);
                  }}
                  className="w-full font-mono-label text-[13px] font-semibold pr-10"
                >
                  {seasons.map((season) => (
                    <option key={season.id} value={season.id}>
                      {season.name}
                    </option>
                  ))}
                </Select>
                <Glyph
                  name="expandMore"
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-surface"
                />
              </div>
            )}
          </div>
        }
      />

      <YourRankingCard seasonId={activeSeasonId} />

      <Card as="section" className="overflow-hidden">
        <div className="border-b-[1.5px] border-outline/10 px-6 py-5">
          <h2 className="font-page-title text-[17px] font-bold">Global standings</h2>
        </div>

        {isError ? (
          <div className="p-12 text-center">
            <Glyph name="shield" size={36} className="mb-4 text-error" />
            <p className="mb-6 font-page-title text-[19px] font-bold text-on-surface">
              Failed to load standings.
            </p>
            <Button
              type="button"
              variant="secondary"
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <StandingsTable
            entries={data?.items}
            loading={isLoading}
            currentUsername={user?.githubUsername}
          />
        )}

        {data && (
          <div className="flex flex-col items-center justify-between gap-4 border-t-[1.5px] border-outline/10 px-6 py-4 sm:flex-row">
            <p className="font-mono-label text-[11px] uppercase tracking-widest text-on-surface-muted">
              SHOWING {rangeStart}-{rangeEnd} OF {data.total} CONTRIBUTORS
            </p>
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
