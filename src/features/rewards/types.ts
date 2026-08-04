export interface RewardsSummary {
  lifetimeEarningsUsd: number;
  bountiesWon: number;
  stakingYieldUsd: number;
  /** Sum of allocations that are Ready to claim. */
  unclaimedUsd: number;
}
