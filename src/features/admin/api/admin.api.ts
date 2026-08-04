import { apiRequest, mockDelay, USE_MOCKS } from "@/services/api.client";
import { mockSeasons } from "@/services/mock/data";
import type { AdminOverview, RepoApproval } from "../types";

const mockApprovalQueue: RepoApproval[] = [
  { id: "pa_1", name: "nebula-protocol-sdk", owner: "@nebula-labs", stars: 1240, submittedAt: "2024-08-01T10:00:00.000Z" },
  { id: "pa_2", name: "solana-pay-integration", owner: "@crypto-dev-01", stars: 842, submittedAt: "2024-08-01T07:00:00.000Z" },
  { id: "pa_3", name: "zk-rollup-toolkit", owner: "@matter-labs", stars: 3110, submittedAt: "2024-07-31T18:00:00.000Z" },
  { id: "pa_4", name: "defi-oracle-feeds", owner: "@chainlink-dev", stars: 560, submittedAt: "2024-07-31T12:00:00.000Z" },
];

export const TREASURY_USD = 180_000;

const mockOverview: AdminOverview = {
  stats: {
    totalContributors: 12_842,
    contributorsDelta: "+4.2%",
    activeRepositories: 439,
    repositoriesDelta: "+12",
    openIssues: 2_105,
    rewardsDistributedUsd: 842_500,
  },
  treasuryUsd: TREASURY_USD,
  approvalQueue: mockApprovalQueue,
  recentDistributions: [
    { id: "d_1", recipient: "sarah_dev.eth", amountUsd: 1250, seasonName: "Season 4: Autumn Forge", status: "PAID" },
    { id: "d_2", recipient: "buidler_master", amountUsd: 450, seasonName: "Season 4: Autumn Forge", status: "PENDING" },
    { id: "d_3", recipient: "rust_wizard", amountUsd: 2000, seasonName: "Season 4: Autumn Forge", status: "PAID" },
    { id: "d_4", recipient: "0x_leia", amountUsd: 980, seasonName: "Season 4: Autumn Forge", status: "PAID" },
  ],
  activeSeason: {
    season: mockSeasons[0],
    progressPercent: 78,
    allocatedUsd: 78_000,
  },
  logs: [
    { time: "12:44:01", level: "INFO", message: "Auth hook triggered for @octobuidler" },
    { time: "12:43:52", level: "SUCCESS", message: "Batch payment #892 processed" },
    { time: "12:43:10", level: "WARN", message: "API latency spike in region US-EAST" },
    { time: "12:42:44", level: "INFO", message: "Repository sync completed for ava-labs/subnet-evm" },
  ],
};

export async function getAdminOverview(): Promise<AdminOverview> {
  if (USE_MOCKS) {
    return mockDelay({
      ...mockOverview,
      approvalQueue: mockApprovalQueue.map((r) => ({ ...r })),
    });
  }
  return apiRequest<AdminOverview>("/admin/overview");
}

export async function approveRepository(id: string): Promise<{ id: string }> {
  if (USE_MOCKS) {
    const idx = mockApprovalQueue.findIndex((r) => r.id === id);
    if (idx !== -1) mockApprovalQueue.splice(idx, 1);
    return mockDelay({ id }, 400);
  }
  return apiRequest<{ id: string }>(`/admin/repositories/${id}/approve`, {
    method: "POST",
  });
}

export async function rejectRepository(id: string): Promise<{ id: string }> {
  if (USE_MOCKS) {
    const idx = mockApprovalQueue.findIndex((r) => r.id === id);
    if (idx !== -1) mockApprovalQueue.splice(idx, 1);
    return mockDelay({ id }, 400);
  }
  return apiRequest<{ id: string }>(`/admin/repositories/${id}/reject`, {
    method: "POST",
  });
}

export interface CreateSeasonInput {
  name: string;
  startDate: string;
  endDate: string;
  rewardPool: number;
}

export async function createSeason(input: CreateSeasonInput): Promise<{ id: string }> {
  if (USE_MOCKS) return mockDelay({ id: `s_${Date.now()}` }, 700);
  return apiRequest<{ id: string }>("/admin/seasons", {
    method: "POST",
    body: input,
  });
}
