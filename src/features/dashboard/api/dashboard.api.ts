import { apiRequest, mockDelay, USE_MOCKS } from "@/services/api.client";
import { mockIssues } from "@/services/mock/data";
import type { Contribution } from "@/types/domain";
import type { ContributorDashboard } from "../types";

const mockActiveContributions: Contribution[] = [
  {
    id: "c_1",
    issue: {
      id: "i_10",
      title: "Refactor authentication hooks for Web3 providers",
      difficulty: "Feature",
    },
    repository: { id: "r_1", name: "core", fullName: "BuidlOn/core" },
    status: "IN_PROGRESS",
    pointsAwarded: null,
    prUrl: null,
    createdAt: "2024-07-22T09:00:00.000Z",
    updatedAt: "2024-07-25T14:00:00.000Z",
  },
  {
    id: "c_2",
    issue: {
      id: "i_11",
      title: "Fix contrast ratios on accessible components",
      difficulty: "Bug Fix",
    },
    repository: { id: "r_4", name: "ui-kit", fullName: "BuidlOn/ui-kit" },
    status: "UNDER_REVIEW",
    pointsAwarded: null,
    prUrl: "https://github.com/BuidlOn/ui-kit/pull/312",
    createdAt: "2024-07-20T09:00:00.000Z",
    updatedAt: "2024-07-25T02:00:00.000Z",
  },
];

const mockDashboard: ContributorDashboard = {
  stats: [
    {
      key: "season_points",
      label: "SEASON_POINTS",
      value: "2,450",
      delta: "+12%",
      deltaTone: "success",
      accent: true,
    },
    {
      key: "issues_claimed",
      label: "ISSUES_CLAIMED",
      value: "03",
      delta: "Active",
      deltaTone: "neutral",
    },
    {
      key: "issues_merged",
      label: "ISSUES_MERGED",
      value: "12",
      delta: "Lifetime",
      deltaTone: "warning",
    },
    {
      key: "global_rank",
      label: "GLOBAL_RANK",
      value: "Top 5%",
      delta: "↑",
      deltaTone: "success",
    },
  ],
  activeContributions: mockActiveContributions,
  recommendedIssues: mockIssues.filter((issue) => issue.status === "AVAILABLE"),
  activity: [
    {
      id: "a_1",
      kind: "pr_merged",
      title: "PR #124 merged in 'BuidlOn/core'",
      description: "Refactored the gateway routing logic. +250 XP earned.",
      createdAt: "2024-07-25T14:00:00.000Z",
    },
    {
      id: "a_2",
      kind: "issue_claimed",
      title: "Claimed issue #89",
      description: "Joined the 'UI Migration' task force.",
      createdAt: "2024-07-24T10:00:00.000Z",
    },
    {
      id: "a_3",
      kind: "reward_claimed",
      title: "Reward Claimed: Alpha Badge",
      description: "Completed 5 successful PRs in a single week.",
      createdAt: "2024-07-22T10:00:00.000Z",
    },
  ],
  seasonProgress: {
    seasonName: "Season 4",
    label: "SEASON_PHASE_2",
    currentTier: "Core Builder",
    nextTier: "Elite Tier",
    percent: 85,
    note: "Only 450 points left to unlock exclusive hackathon priority access.",
  },
};

/** Composite payload for the contributor dashboard. */
export async function getContributorDashboard(): Promise<ContributorDashboard> {
  if (USE_MOCKS) return mockDelay(mockDashboard);
  return apiRequest<ContributorDashboard>("/analytics/dashboard");
}
