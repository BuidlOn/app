import type { Season } from "@/types/domain";

export interface AdminStats {
  totalContributors: number;
  contributorsDelta: string;
  activeRepositories: number;
  repositoriesDelta: string;
  openIssues: number;
  rewardsDistributedUsd: number;
}

export interface RepoApproval {
  id: string;
  name: string;
  owner: string;
  stars: number;
  submittedAt: string;
}

export interface DistributionRow {
  id: string;
  recipient: string;
  amountUsd: number;
  seasonName: string;
  status: "PAID" | "PENDING";
}

export interface ActiveSeasonSummary {
  season: Season;
  progressPercent: number;
  allocatedUsd: number;
}

export type LogLevel = "INFO" | "SUCCESS" | "WARN" | "ERROR";

export interface LogEntry {
  time: string;
  level: LogLevel;
  message: string;
}

export interface AdminOverview {
  stats: AdminStats;
  treasuryUsd: number;
  approvalQueue: RepoApproval[];
  recentDistributions: DistributionRow[];
  activeSeason: ActiveSeasonSummary;
  logs: LogEntry[];
}
