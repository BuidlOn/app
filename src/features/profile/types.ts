import type { Contribution, LeaderboardEntry, User } from "@/types/domain";

export interface ProfileStats {
  totalPoints: number;
  pointsThisWeek: number;
  mergedPrs: number;
  seasonsActive: number;
  globalRank: number | null;
}

/** Contribution activity heatmap. `weeks[w][d]` is an intensity level 0-4. */
export interface ContributionHeatmap {
  totalLastYear: number;
  weeks: number[][];
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  tone: "primary" | "secondary" | "tertiary" | "neutral";
  earned: boolean;
}

export interface ContributorProfile {
  user: User;
  isSelf: boolean;
  stats: ProfileStats;
  heatmap: ContributionHeatmap;
  achievements: {
    earned: number;
    total: number;
    items: Achievement[];
  };
  recentContributions: Contribution[];
  topPerformers: LeaderboardEntry[];
}
