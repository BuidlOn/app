import { apiRequest, mockDelay, USE_MOCKS } from "@/services/api.client";
import { mockRewards } from "@/services/mock/data";
import type { Reward } from "@/types/domain";
import type { RewardsSummary } from "../types";

function mockTxHash() {
  const hex = "0123456789abcdef";
  let out = "0x";
  for (let i = 0; i < 64; i++) out += hex[Math.floor(Math.random() * 16)];
  return out;
}

function computeSummary(): RewardsSummary {
  const lifetimeEarningsUsd = mockRewards
    .filter((r) => r.status === "Confirmed" || r.status === "Sent")
    .reduce((sum, r) => sum + r.amountUsd, 0);
  const unclaimedUsd = mockRewards
    .filter((r) => r.status === "Ready")
    .reduce((sum, r) => sum + r.amountUsd, 0);
  return {
    lifetimeEarningsUsd: lifetimeEarningsUsd || 12_450,
    bountiesWon: 42,
    stakingYieldUsd: 2_400,
    unclaimedUsd,
  };
}

/** All reward allocations for the current user across seasons. */
export async function getRewards(): Promise<Reward[]> {
  if (USE_MOCKS) return mockDelay(mockRewards.map((r) => ({ ...r })), 450);
  return apiRequest<Reward[]>("/rewards");
}

/** Aggregate reward summary (lifetime, unclaimed, bounties). */
export async function getRewardsSummary(): Promise<RewardsSummary> {
  if (USE_MOCKS) return mockDelay(computeSummary(), 300);
  return apiRequest<RewardsSummary>("/rewards/summary");
}

/** Claim a single Ready reward. Mock transitions it to Confirmed with a tx hash. */
export async function claimReward(id: string): Promise<Reward> {
  if (USE_MOCKS) {
    const found = mockRewards.find((r) => r.id === id);
    if (!found) throw new Error("Reward not found.");
    if (found.status !== "Ready") throw new Error("This reward is not claimable.");
    found.status = "Confirmed";
    found.txHash = mockTxHash();
    return mockDelay({ ...found }, 900);
  }
  return apiRequest<Reward>(`/rewards/${id}/claim`, { method: "POST" });
}

/** Claim every Ready reward at once. */
export async function claimAllRewards(): Promise<Reward[]> {
  if (USE_MOCKS) {
    mockRewards.forEach((r) => {
      if (r.status === "Ready") {
        r.status = "Confirmed";
        r.txHash = mockTxHash();
      }
    });
    return mockDelay(mockRewards.map((r) => ({ ...r })), 1100);
  }
  return apiRequest<Reward[]>("/rewards/claim-all", { method: "POST" });
}
