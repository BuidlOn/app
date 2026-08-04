import type { RankTrend } from "@/types/domain";

export interface LeaderboardFilters {
  seasonId: string;
  page?: number;
  limit?: number;
}

export interface MyRanking {
  rank: number;
  points: number;
  percentileLabel: string;
  totalContributors: number;
  trend: RankTrend;
  rankDelta: number;
}
