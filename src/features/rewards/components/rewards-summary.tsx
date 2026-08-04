"use client";

import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/utils/format";
import { useRewardsSummary, useClaimAllRewards } from "../hooks/use-rewards";

export function RewardsSummaryGrid() {
  const { data, isLoading } = useRewardsSummary();
  const claimAll = useClaimAllRewards();
  const hasUnclaimed = (data?.unclaimedUsd ?? 0) > 0;

  return (
    <div className="mb-gap-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="group relative overflow-hidden border border-outline-variant bg-surface p-8 md:col-span-2">
        <div className="relative z-10">
          <p className="mb-4 font-mono-label text-mono-label uppercase text-on-surface-variant">
            Total Lifetime Earnings
          </p>
          {isLoading || !data ? (
            <Skeleton className="h-14 w-64" />
          ) : (
            <div className="flex items-baseline gap-3">
              <span className="font-page-title text-5xl font-extrabold text-on-surface md:text-6xl">
                {formatNumber(data.lifetimeEarningsUsd)}
              </span>
              <span className="font-section-heading text-section-heading text-primary">
                USDC
              </span>
            </div>
          )}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="border border-outline-variant/30 bg-surface-container-low p-4">
              <p className="mb-1 font-mono-label text-[10px] uppercase text-on-surface-variant">
                Bounties Won
              </p>
              <p className="font-section-heading text-body font-bold text-on-surface">
                {data ? formatNumber(data.bountiesWon) : "—"}
              </p>
            </div>
            <div className="border border-outline-variant/30 bg-surface-container-low p-4">
              <p className="mb-1 font-mono-label text-[10px] uppercase text-on-surface-variant">
                Staking Yield
              </p>
              <p className="font-section-heading text-body font-bold text-on-surface">
                {data ? `${formatNumber(data.stakingYieldUsd)} USDC` : "—"}
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-8 -right-8 opacity-5 transition-opacity duration-700 group-hover:opacity-10">
          <Icon name="payments" className="text-[180px]" />
        </div>
      </div>

      <div className="flex flex-col justify-between border border-outline-variant bg-primary-container p-8">
        <div>
          <p className="mb-4 font-mono-label text-mono-label uppercase text-on-primary-container/70">
            Unclaimed Allocations
          </p>
          {isLoading || !data ? (
            <Skeleton className="h-10 w-40 bg-white/20" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="font-page-title text-4xl font-bold text-white">
                {formatNumber(data.unclaimedUsd)}
              </span>
              <span className="font-mono-label text-mono-label text-white/80">USDC</span>
            </div>
          )}
        </div>
        <button
          type="button"
          disabled={!hasUnclaimed || claimAll.isPending}
          onClick={() => claimAll.mutate()}
          className="mt-8 w-full bg-white py-4 font-mono-label text-mono-label font-bold uppercase tracking-tighter text-primary-container transition-colors hover:bg-on-primary-container disabled:cursor-not-allowed disabled:opacity-60"
        >
          {claimAll.isPending
            ? "Claiming..."
            : hasUnclaimed
              ? "Claim All Rewards"
              : "Nothing to claim"}
        </button>
      </div>
    </div>
  );
}
