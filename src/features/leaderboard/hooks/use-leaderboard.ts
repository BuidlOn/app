"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSeasons } from "../api/seasons.api";
import { getLeaderboard, getMyRanking } from "../api/leaderboard.api";
import type { LeaderboardFilters } from "../types";

export function useSeasons() {
  return useQuery({ queryKey: ["seasons"], queryFn: getSeasons });
}

export function useLeaderboard(filters: LeaderboardFilters) {
  return useQuery({
    queryKey: ["leaderboard", filters],
    queryFn: () => getLeaderboard(filters),
    enabled: Boolean(filters.seasonId),
    placeholderData: keepPreviousData,
  });
}

export function useMyRanking(seasonId: string) {
  return useQuery({
    queryKey: ["my-ranking", seasonId],
    queryFn: () => getMyRanking(seasonId),
    enabled: Boolean(seasonId),
  });
}
