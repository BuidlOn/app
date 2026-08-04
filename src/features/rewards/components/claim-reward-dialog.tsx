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

        <div className="mb-8 border border-outline-variant bg-surface-container-lowest p-6">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono-label text-mono-label uppercase text-on-surface-variant">
              Source
            </span>
            <span className="font-body font-bold text-on-surface">
              {reward?.season.name ?? "—"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono-label text-mono-label uppercase text-on-surface-variant">
              Amount
            </span>
            <span className="font-page-title text-3xl font-extrabold text-primary">
              {reward ? formatUsd(reward.amountUsd) : "—"}{" "}
              <span className="font-section-heading text-body">USDC</span>
            </span>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex justify-between font-caption text-caption">
            <span className="text-on-surface-variant">Network Fee (Gas)</span>
            <span className="text-on-surface">~0.0042 ETH</span>
          </div>
          <div className="flex justify-between font-caption text-caption">
            <span className="text-on-surface-variant">Estimated Time</span>
            <span className="text-on-surface">&lt; 30 seconds</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 border border-outline-variant py-4 font-mono-label text-mono-label uppercase transition-colors hover:bg-surface-container"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={claim.isPending}
            className="flex-1 bg-primary-container py-4 font-mono-label text-mono-label font-bold uppercase tracking-widest text-on-primary-container transition-all hover:brightness-110 disabled:opacity-60"
          >
            {claim.isPending ? "Confirming..." : "Confirm Claim"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
