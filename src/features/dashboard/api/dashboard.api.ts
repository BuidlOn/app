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
      key: "total_earned",
      label: "Total earned",
      value: "$14,280",
      delta: "+12%",
      deltaTone: "success",
    },
    {
      key: "prs_merged",
      label: "PRs merged",
      value: "47",
      delta: "+3 this week",
      deltaTone: "success",
    },
    {
      key: "global_rank",
      label: "Global rank",
      value: "#312",
      delta: "↑ 28",
      deltaTone: "success",
      accent: true,
    },
    {
      key: "streak",
      label: "Streak",
      value: "9 days",
      delta: "personal best: 21",
      deltaTone: "neutral",
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
    seasonName: "Season 7",
    label: "Season 7 — Contributor III",
    currentTier: "Contributor III",
    nextTier: "Contributor IV",
    percent: 68,
    note: "1,020 pts to next tier — merge 2 more PRs to get there.",
  },
};

/** Composite payload for the contributor dashboard. */
export async function getContributorDashboard(): Promise<ContributorDashboard> {
  if (USE_MOCKS) return mockDelay(mockDashboard);
  return apiRequest<ContributorDashboard>("/analytics/dashboard");
}
