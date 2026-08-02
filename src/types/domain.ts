/**
 * Domain models shaped to the BuidlOn backend. These are display contracts:
 * the frontend renders what the backend provides and never computes scores,
 * reputation, rankings, or rewards itself.
 */

export type UserRole = "contributor" | "maintainer" | "admin";

export type ReputationLevel =
  | "Explorer"
  | "Builder"
  | "Contributor"
  | "Senior Contributor"
  | "Core Builder"
  | "Maintainer"
  | "Ecosystem Champion";

export interface User {
  id: string;
  githubUsername: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  country: string | null;
  website: string | null;
  skills: string[];
  walletAddress: string | null;
  role: UserRole;
  reputationLevel: ReputationLevel;
  reputationScore: number;
  totalPoints: number;
  rank: number | null;
  mergedPrs: number;
  acceptanceRate: number; // 0-1
  githubConnected: boolean;
  createdAt: string;
}

export type IssueDifficulty =
  | "Good First Issue"
  | "Documentation"
  | "Bug Fix"
  | "Feature"
  | "Critical Bug"
  | "Security"
  | "Architecture";

export type ContributionStatus =
  | "AVAILABLE"
  | "CLAIMED"
  | "IN_PROGRESS"
  | "PR_OPEN"
  | "UNDER_REVIEW"
  | "MERGED"
  | "VERIFIED"
  | "SCORED";

export interface Repository {
  id: string;
  name: string;
  fullName: string; // owner/name
  description: string | null;
  languages: string[];
  topics: string[];
  stars: number;
  forks: number;
  openIssues: number;
  contributors: number;
  avatarUrl: string | null;
  isArchived: boolean;
}

export interface Issue {
  id: string;
  githubNumber: number;
  title: string;
  repository: Pick<Repository, "id" | "name" | "fullName">;
  difficulty: IssueDifficulty;
  basePoints: number;
  language: string | null;
  labels: string[];
  status: ContributionStatus;
  claimedBy: Pick<User, "id" | "githubUsername" | "avatarUrl"> | null;
  claimExpiresAt: string | null;
  createdAt: string;
  url: string;
}

export interface Contribution {
  id: string;
  issue: Pick<Issue, "id" | "title" | "difficulty">;
  repository: Pick<Repository, "id" | "name" | "fullName">;
  status: ContributionStatus;
  pointsAwarded: number | null;
  prUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type RankTrend = "up" | "down" | "same";

export interface LeaderboardEntry {
  rank: number;
  user: Pick<
    User,
    "id" | "githubUsername" | "name" | "avatarUrl" | "country" | "reputationLevel"
  >;
  points: number;
  mergedPrs: number;
  rewardEstimate: number | null;
  trend: RankTrend;
  rankDelta: number;
}

export type SeasonStatus =
  | "Draft"
  | "Scheduled"
  | "Active"
  | "Ending Soon"
  | "Locked"
  | "Reward Calculation"
  | "Completed"
  | "Archived";

export interface Season {
  id: string;
  name: string;
  status: SeasonStatus;
  startDate: string;
  endDate: string;
  rewardPool: number;
  contributors: number;
  projects: number;
  totalPoints: number;
  mergedPrs: number;
}

export type RewardStatus =
  | "Pending"
  | "Validated"
  | "Ready"
  | "Sent"
  | "Confirmed"
  | "Failed"
  | "Cancelled";

export interface Reward {
  id: string;
  season: Pick<Season, "id" | "name">;
  points: number;
  contributionPercent: number; // 0-1
  amountUsd: number;
  walletAddress: string | null;
  status: RewardStatus;
  txHash: string | null;
  createdAt: string;
}

export interface PlatformStats {
  openIssues: number;
  rewardsPaidUsd: number;
  contributors: number;
}
