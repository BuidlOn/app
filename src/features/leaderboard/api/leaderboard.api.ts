import { apiRequest } from "@/services/api.client";
import type { LeaderboardEntry } from "@/types/domain";
import type { Paginated } from "@/types/api";
import type { LeaderboardFilters, MyRanking } from "../types";

/**
 * Paginated global standings for a season. Ranking is computed by the backend;
 * `seasonId` is required, so callers must resolve a season first.
 */
export async function getLeaderboard(
  filters: LeaderboardFilters,
): Promise<Paginated<LeaderboardEntry>> {
  return apiRequest<Paginated<LeaderboardEntry>>("/leaderboards/contributors", {
    params: { seasonId: filters.seasonId, page: filters.page, limit: filters.limit },
  });
}

/** Current user's standing in a season (rank, points, percentile, trend). */
export async function getMyRanking(seasonId: string): Promise<MyRanking> {
  return apiRequest<MyRanking>("/leaderboards/me", { params: { seasonId } });
}
