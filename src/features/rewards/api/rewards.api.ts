import { apiRequest } from "@/services/api.client";
import type { Reward } from "@/types/domain";
import type { RewardsSummary } from "../types";

/** All reward allocations for the current user, newest season first. */
export async function getRewards(): Promise<Reward[]> {
  return apiRequest<Reward[]>("/rewards");
}

/** Aggregate earnings figures shown above the rewards table. */
export async function getRewardsSummary(): Promise<RewardsSummary> {
  return apiRequest<RewardsSummary>("/rewards/summary");
}

/** Claim a single reward allocation. */
export async function claimReward(id: string): Promise<Reward> {
  return apiRequest<Reward>(`/rewards/${id}/claim`, { method: "POST" });
}

/** Claim every reward currently marked ready. */
export async function claimAllRewards(): Promise<Reward[]> {
  return apiRequest<Reward[]>("/rewards/claim-all", { method: "POST" });
}
