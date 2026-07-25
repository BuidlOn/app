import type { Contribution, Issue } from "@/types/domain";

export interface DashboardStat {
  key: string;
  label: string;
  value: string;
  /** Optional delta shown next to the value, e.g. "+12%". */
  delta?: string;
  deltaTone?: "success" | "warning" | "neutral";
  accent?: boolean;
}

export type ActivityKind =
  | "pr_merged"
  | "issue_claimed"
  | "reward_claimed"
  | "points_awarded"
  | "level_up";

export interface ActivityEvent {
  id: string;
  kind: ActivityKind;
  title: string;
  description: string;
  createdAt: string;
}

export interface SeasonProgress {
  seasonName: string;
  label: string;
  currentTier: string;
  nextTier: string;
  percent: number; // 0-100
  note: string;
}

export interface ContributorDashboard {
  stats: DashboardStat[];
  activeContributions: Contribution[];
  recommendedIssues: Issue[];
  activity: ActivityEvent[];
  seasonProgress: SeasonProgress;
}
