"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatUsd } from "@/utils/format";
import { useRewards } from "../hooks/use-rewards";
import { ClaimRewardDialog } from "./claim-reward-dialog";
import type { Reward, RewardStatus } from "@/types/domain";

const STATUS_META: Record<
  RewardStatus,
  { label: string; variant: NonNullable<BadgeProps["variant"]> }
> = {
  Pending: { label: "Pending", variant: "warning" },
  Validated: { label: "Validated", variant: "warning" },
  Ready: { label: "Claimable", variant: "success" },
  Sent: { label: "Sent", variant: "primary" },
  Confirmed: { label: "Claimed", variant: "neutral" },
  Failed: { label: "Failed", variant: "danger" },
  Cancelled: { label: "Cancelled", variant: "neutral" },
};

function RowAction({ reward, onClaim }: { reward: Reward; onClaim: (r: Reward) => void }) {
  if (reward.status === "Ready") {
    return (
      <button
        type="button"
        onClick={() => onClaim(reward)}
        className="bg-primary px-4 py-1.5 text-[11px] font-bold uppercase text-on-primary transition-all hover:brightness-110"
      >
        Claim
      </button>
    );
  }
  if (reward.status === "Confirmed" || reward.status === "Sent") {
    return (
      <Icon name="check_circle" className="text-outline-variant" filled />
    );
  }
  return <Icon name="schedule" className="text-outline-variant" />;
}

export function SeasonRewardsTable() {
  const { data, isLoading, isError, refetch } = useRewards();
  const [selected, setSelected] = useState<Reward | null>(null);
  const [open, setOpen] = useState(false);

  const openClaim = (reward: Reward) => {
    setSelected(reward);
    setOpen(true);
  };

  return (
    <div className="border border-outline-variant bg-surface">
      <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-6 py-4">
        <h3 className="font-section-heading text-body font-bold uppercase tracking-widest text-on-surface">
          Season Rewards
        </h3>
        {data && (
          <span className="bg-surface-container-highest px-2 py-1 font-mono-label text-[10px] uppercase text-on-surface-variant">
            {data.length} Total
          </span>
        )}
      </div>

      {isError ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Icon name="warning" className="mb-4 text-4xl text-error" />
          <p className="mb-6 font-body font-bold uppercase text-on-surface">
            Failed to load rewards.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="bg-error px-6 py-2 font-mono-label text-sm font-bold uppercase text-on-error hover:brightness-110"
          >
            Retry
          </button>
        </div>
      ) : !isLoading && data && data.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
          <Icon
            name="account_balance_wallet"
            className="mb-4 text-6xl text-outline-variant"
          />
          <h4 className="font-section-heading text-body font-bold text-on-surface">
            No rewards yet
          </h4>
          <p className="mt-2 max-w-xs font-body text-caption text-on-surface-variant">
            Contribute to earn rewards and build your reputation in the ecosystem.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-lowest">
                <th className="px-6 py-4 font-mono-label text-mono-label uppercase text-on-surface-variant">
                  Season Name
                </th>
                <th className="px-6 py-4 font-mono-label text-mono-label uppercase text-on-surface-variant">
                  Status
                </th>
                <th className="px-6 py-4 text-right font-mono-label text-mono-label uppercase text-on-surface-variant">
                  Allocation
                </th>
                <th className="px-6 py-4 font-mono-label text-mono-label uppercase text-on-surface-variant">
                  Date
                </th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {isLoading || !data
                ? Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="border-b border-outline-variant/30">
                      <td className="px-6 py-4">
                        <Skeleton className="h-4 w-32" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-4 w-16" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="ml-auto h-4 w-20" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="px-6 py-4" />
                    </tr>
                  ))
                : data.map((reward) => {
                    const meta = STATUS_META[reward.status];
                    const claimed =
                      reward.status === "Confirmed" || reward.status === "Sent";
                    return (
                      <tr
                        key={reward.id}
                        className="border-b border-outline-variant/30 transition-colors last:border-0 hover:bg-surface-container"
                      >
                        <td className="px-6 py-4 font-body text-body font-semibold text-on-surface">
                          {reward.season.name}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={meta.variant}>{meta.label}</Badge>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right font-mono-label text-body text-on-surface">
                          {reward.amountUsd > 0
                            ? `${formatUsd(reward.amountUsd)} USDC`
                            : "-- USDC"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-mono-label text-caption text-on-surface-variant">
                          {formatDate(reward.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            {claimed && reward.txHash && (
                              <a
                                href={`https://etherscan.io/tx/${reward.txHash}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-on-surface-variant hover:text-primary"
                                title="View transaction"
                              >
                                <Icon name="open_in_new" className="text-base" />
                              </a>
                            )}
                            <RowAction reward={reward} onClaim={openClaim} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      )}

      <ClaimRewardDialog reward={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
