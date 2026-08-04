import { apiRequest, mockDelay, USE_MOCKS } from "@/services/api.client";
import { mockCurrentUser, mockLeaderboard } from "@/services/mock/data";
import type { LeaderboardEntry } from "@/types/domain";
import type { Paginated } from "@/types/api";
import type { LeaderboardFilters, MyRanking } from "../types";

const DEFAULT_LIMIT = 10;

/** Paginated global standings for a season. Ranking is computed by the backend. */
export async function getLeaderboard(
  filters: LeaderboardFilters,
): Promise<Paginated<LeaderboardEntry>> {
  if (USE_MOCKS) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? DEFAULT_LIMIT;
    const start = (page - 1) * limit;
    const items = mockLeaderboard.slice(start, start + limit);
    return mockDelay(
      {
        items,
        page,
        limit,
        total: mockLeaderboard.length,
        totalPages: Math.max(1, Math.ceil(mockLeaderboard.length / limit)),
      },
      500,
    );
  }

  return apiRequest<Paginated<LeaderboardEntry>>("/leaderboards/contributors", {
    params: { seasonId: filters.seasonId, page: filters.page, limit: filters.limit },
  });
}

function percentileLabel(rank: number, total: number): string {
  const pct = Math.ceil((rank / total) * 100);
  if (pct <= 1) return "Top 1%";
  if (pct <= 5) return "Top 5%";
  if (pct <= 10) return "Top 10%";
  if (pct <= 25) return "Top 25%";
  return `Top ${pct}%`;
}

/** Current user's standing in a season (rank, points, percentile, trend). */
export async function getMyRanking(seasonId: string): Promise<MyRanking> {
  if (USE_MOCKS) {
    const total = mockLeaderboard.length;
    const entry = mockLeaderboard.find(
      (e) => e.user.githubUsername === mockCurrentUser.githubUsername,
    );
    const rank = entry?.rank ?? total;
    return mockDelay({
      rank,
      points: entry?.points ?? mockCurrentUser.totalPoints,
      percentileLabel: percentileLabel(rank, total),
      totalContributors: total,
      trend: entry?.trend ?? "same",
      rankDelta: entry?.rankDelta ?? 0,
    });
  }

  return apiRequest<MyRanking>("/leaderboards/me", { params: { seasonId } });
}
