"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatNumber } from "@/utils/format";
import { useRewards } from "../hooks/use-rewards";
import { ClaimRewardDialog } from "./claim-reward-dialog";
import type { Reward, RewardStatus } from "@/types/domain";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STATUS_META: Record<
  RewardStatus,
  { label: string; bg: string; text: string }
> = {
  Pending: { label: "Pending", bg: "bg-tertiary/15", text: "text-tertiary-deep" },
  Validated: { label: "VALIDATED", bg: "bg-primary/25", text: "text-primary-deep" },
  Ready: { label: "CLAIMABLE", bg: "bg-secondary/15", text: "text-secondary-deep" },
  Sent: { label: "SENT", bg: "bg-outline/10", text: "text-on-surface-muted" },
  Confirmed: { label: "CLAIMED", bg: "bg-outline/10", text: "text-on-surface-muted" },
  Failed: { label: "FAILED", bg: "bg-error/15", text: "text-error" },
  Cancelled: { label: "CANCELLED", bg: "bg-outline/10", text: "text-on-surface-muted" },
};

function RowAction({ reward, onClaim }: { reward: Reward; onClaim: (r: Reward) => void }) {
  if (reward.status === "Ready") {
    return (
      <Button
        variant="primary"
        onClick={() => onClaim(reward)}
        className="px-3.5 py-1.5 text-[11px] font-bold"
      >
        Claim
      </Button>
    );
  }
  if (reward.status === "Confirmed" || reward.status === "Sent") {
    return null; // The link icon is rendered separately in the row
  }
  return <span className="text-[14px] text-on-surface-muted">⏱</span>;
}

/** Mobile row: season and status on the left, amount and action on the right. */
function RewardCard({
  reward,
  onClaim,
}: {
  reward: Reward;
  onClaim: (r: Reward) => void;
}) {
  const meta = STATUS_META[reward.status];
  return (
    <li className="flex items-center justify-between gap-3 rounded-[14px] border-[1.5px] border-outline/15 bg-surface p-3.5">
      <div className="min-w-0">
        <div className="mb-1 truncate text-[13.5px] font-bold">{reward.season.name}</div>
        <span
          className={`rounded-full px-2 py-[3px] text-[10px] font-bold ${meta.bg} ${meta.text}`}
        >
          {meta.label}
        </span>
      </div>
      <div className="shrink-0 text-right">
        <div className="font-mono-label text-[13px] font-bold">
          {reward.amountUsd > 0 ? `$${formatNumber(reward.amountUsd)}` : "--"}
        </div>
        {reward.status === "Ready" ? (
          <button
            type="button"
            onClick={() => onClaim(reward)}
            className="text-[11px] font-bold text-secondary"
          >
            Claim →
          </button>
        ) : (
          <span className="font-mono-label text-[10.5px] text-on-surface-muted">
            {reward.status === "Pending" || reward.status === "Validated"
              ? "Pending"
              : formatDate(reward.createdAt)}
          </span>
        )}
      </div>
    </li>
  );
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
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b-[1.5px] border-outline/10 px-6 py-[18px]">
        <h3 className="m-0 font-page-title text-[17px] font-bold text-on-surface">
          Season rewards
        </h3>
        {data && (
          <span className="rounded-full bg-outline/5 px-3 py-1 font-mono-label text-[11px] text-on-surface-muted">
            {data.length} total
          </span>
        )}
      </div>

      {isError ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Icon name="warning" className="mb-4 text-4xl text-error" />
          <p className="mb-6 font-page-title text-[19px] font-bold text-on-surface">
            Failed to load rewards.
          </p>
          <Button variant="secondary" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : !isLoading && data && data.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
          <Icon
            name="account_balance_wallet"
            className="mb-4 text-[48px] text-outline/30"
          />
          <h4 className="font-page-title text-[19px] font-bold text-on-surface">
            No rewards yet
          </h4>
          <p className="mt-2 max-w-xs text-[13.5px] leading-relaxed text-on-surface-variant">
            Contribute to earn rewards and build your reputation in the ecosystem.
          </p>
        </div>
      ) : (
        <>
        {/* Five columns will not fit a phone; stack them as cards below md. */}
        <ul className="flex list-none flex-col gap-2 p-4 md:hidden">
          {isLoading || !data
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[70px] rounded-[14px]" />
              ))
            : data.map((reward) => (
                <RewardCard key={reward.id} reward={reward} onClaim={openClaim} />
              ))}
        </ul>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="bg-outline/5">
                <th className="w-[20%] py-3 pl-6 pr-1.5 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
                  Season
                </th>
                <th className="w-[24%] py-3 px-1.5 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
                  Status
                </th>
                <th className="w-[28%] py-3 px-1.5 text-right font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
                  Allocation
                </th>
                <th className="w-[15%] py-3 px-1.5 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
                  Date
                </th>
                <th className="w-[13%] py-3 pl-1.5 pr-6" />
              </tr>
            </thead>
            <tbody>
              {isLoading || !data
                ? Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="border-t-[1.5px] border-outline/10">
                      <td className="py-[15px] pl-6 pr-1.5">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="py-[15px] px-1.5">
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </td>
                      <td className="py-[15px] px-1.5">
                        <Skeleton className="ml-auto h-4 w-20" />
                      </td>
                      <td className="py-[15px] px-1.5">
                        <Skeleton className="h-4 w-16" />
                      </td>
                      <td className="py-[15px] pl-1.5 pr-6" />
                    </tr>
                  ))
                : data.map((reward) => {
                    const meta = STATUS_META[reward.status];
                    const claimed =
                      reward.status === "Confirmed" || reward.status === "Sent";
                    return (
                      <tr
                        key={reward.id}
                        className="border-t border-outline/10 transition-colors hover:bg-outline/5"
                      >
                        <td className="overflow-hidden whitespace-nowrap py-[15px] pl-6 pr-1.5 text-[13px] font-bold text-on-surface">
                          {reward.season.name}
                        </td>
                        <td className="overflow-hidden whitespace-nowrap py-[15px] px-1.5">
                          <span
                            className={`whitespace-nowrap rounded-full px-2 py-[3px] text-[10.5px] font-bold ${meta.bg} ${meta.text}`}
                          >
                            {meta.label}
                          </span>
                        </td>
                        <td className="overflow-hidden whitespace-nowrap py-[15px] px-1.5 text-right font-mono-label text-[12.5px] font-bold text-on-surface">
                          {reward.amountUsd > 0
                            ? `$${formatNumber(reward.amountUsd)} USDC`
                            : "-- USDC"}
                        </td>
                        <td className="overflow-hidden whitespace-nowrap py-[15px] px-1.5 font-mono-label text-[11.5px] text-on-surface-muted">
                          {reward.status === "Pending" || reward.status === "Validated"
                            ? "Pending"
                            : formatDate(reward.createdAt)}
                        </td>
                        <td className="whitespace-nowrap py-[15px] pl-1.5 pr-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                            {claimed && reward.txHash && (
                              <a
                                href={`https://etherscan.io/tx/${reward.txHash}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-on-surface-muted hover:text-primary"
                                title="View transaction"
                              >
                                ↗
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
        </>
      )}

      <ClaimRewardDialog reward={selected} open={open} onOpenChange={setOpen} />
    </Card>
  );
}
