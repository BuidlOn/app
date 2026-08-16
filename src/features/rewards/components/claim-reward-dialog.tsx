"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatUsd } from "@/utils/format";
import { useClaimReward } from "../hooks/use-rewards";
import type { Reward } from "@/types/domain";

export function ClaimRewardDialog({
  reward,
  open,
  onOpenChange,
}: {
  reward: Reward | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const claim = useClaimReward();

  const handleConfirm = async () => {
    if (!reward) return;
    await claim.mutateAsync(reward.id).catch(() => {});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Claim</DialogTitle>
        </DialogHeader>

        <div className="mb-[32px] rounded-[16px] border-[1.5px] border-outline/15 bg-white p-[24px]">
          <div className="mb-[24px] flex items-center justify-between">
            <span className="font-mono-label text-[11px] font-bold uppercase tracking-widest text-on-surface-muted">
              Source
            </span>
            <span className="text-[15px] font-bold text-on-surface">
              {reward?.season.name ?? "—"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono-label text-[11px] font-bold uppercase tracking-widest text-on-surface-muted">
              Amount
            </span>
            <span className="font-page-title text-[32px] font-bold text-primary-deep">
              {reward ? formatUsd(reward.amountUsd) : "—"}{" "}
              <span className="text-[15px]">USDC</span>
            </span>
          </div>
        </div>

        <div className="mb-[32px] flex flex-col gap-[16px]">
          <div className="flex justify-between font-mono-label text-[10.5px]">
            <span className="uppercase text-on-surface-muted">Network Fee (Gas)</span>
            <span className="font-bold text-on-surface">~0.0042 ETH</span>
          </div>
          <div className="flex justify-between font-mono-label text-[10.5px]">
            <span className="uppercase text-on-surface-muted">Estimated Time</span>
            <span className="font-bold text-on-surface">&lt; 30 seconds</span>
          </div>
        </div>

        <div className="flex gap-[16px]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-full border-[2px] border-ink bg-surface py-[12px] font-mono-label text-[13px] font-bold text-ink transition-all shadow-brutal-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={claim.isPending}
            className="flex-1 rounded-full border-[2px] border-ink bg-ink py-[12px] font-mono-label text-[13px] font-bold text-white transition-all shadow-brutal-success active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-60"
          >
            {claim.isPending ? "Confirming..." : "Confirm claim"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
