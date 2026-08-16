"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/utils/format";
import { useRewardsSummary, useClaimAllRewards } from "../hooks/use-rewards";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RewardsSummaryGrid() {
  const { data, isLoading } = useRewardsSummary();
  const claimAll = useClaimAllRewards();
  const hasUnclaimed = (data?.unclaimedUsd ?? 0) > 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="relative overflow-hidden p-8 md:col-span-2">
        <div className="absolute -bottom-8 -right-3 text-[140px] opacity-5">
          $
        </div>
        <div className="relative z-10">
          <p className="mb-3.5 font-mono-label text-[11px] uppercase tracking-widest text-on-surface-muted">
            Total lifetime earnings
          </p>
          {isLoading || !data ? (
            <Skeleton className="h-14 w-64" />
          ) : (
            <div className="mb-7 flex items-baseline gap-2.5">
              <span className="font-page-title text-[48px] font-bold text-on-surface">
                ${formatNumber(data.lifetimeEarningsUsd)}
              </span>
              <span className="font-mono-label text-[16px] font-bold text-secondary">
                USDC
              </span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[12px] border-[1.5px] border-outline/10 p-3.5">
              <p className="mb-1 font-mono-label text-[9.5px] uppercase tracking-widest text-on-surface-muted">
                Bounties won
              </p>
              <p className="text-[15px] font-bold text-on-surface">
                {data ? formatNumber(data.bountiesWon) : "—"}
              </p>
            </div>
            <div className="rounded-[12px] border-[1.5px] border-outline/10 p-3.5">
              <p className="mb-1 font-mono-label text-[9.5px] uppercase tracking-widest text-on-surface-muted">
                Staking yield
              </p>
              <p className="text-[15px] font-bold text-on-surface">
                {data ? `$${formatNumber(data.stakingYieldUsd)} USDC` : "—"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card border="ink" tone="primary" className="flex flex-col justify-between p-7">
        <div>
          <p className="mb-3.5 font-mono-label text-[11px] uppercase tracking-widest text-primary-deep">
            Unclaimed allocations
          </p>
          {isLoading || !data ? (
            <Skeleton className="h-10 w-40 bg-black/10" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="font-page-title text-[34px] font-bold text-on-surface">
                ${formatNumber(data.unclaimedUsd)}
              </span>
              <span className="font-mono-label text-[13px] font-bold text-primary-deep">
                USDC
              </span>
            </div>
          )}
        </div>
        <Button
          variant="ink"
          shadow="none"
          disabled={!hasUnclaimed || claimAll.isPending}
          onClick={() => claimAll.mutate()}
          className="mt-6 w-full justify-center shadow-[3px_3px_0_rgba(0,0,0,0.25)]"
        >
          {claimAll.isPending
            ? "Claiming..."
            : hasUnclaimed
              ? "Claim all rewards"
              : "Nothing to claim"}
        </Button>
      </Card>
    </div>
  );
}
