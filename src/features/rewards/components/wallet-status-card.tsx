"use client";

import { Icon } from "@/components/ui/icon";
import { StatusPip } from "@/components/ui/status-pip";
import { Skeleton } from "@/components/ui/skeleton";
import { truncateHash } from "@/utils/format";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { ConnectWalletDialog } from "./connect-wallet-dialog";

export function WalletStatusCard() {
  const { data: user, isLoading } = useCurrentUser();
  const connected = Boolean(user?.walletAddress);

  return (
    <div className="space-y-6">
      <div className="border border-outline-variant bg-surface p-6">
        <p className="mb-6 font-mono-label text-mono-label uppercase text-on-surface-variant">
          Wallet Status
        </p>

        {isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : connected ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-surface-container-high">
                <Icon
                  name="account_balance_wallet"
                  className="text-secondary"
                  filled
                />
              </div>
              <div>
                <p className="font-caption text-caption text-on-surface-variant">
                  Connected Address
                </p>
                <p className="font-mono-label text-body font-bold tracking-tighter text-on-surface">
                  {truncateHash(user!.walletAddress!)}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3 border-t border-outline-variant pt-4">
              <div className="flex items-center justify-between">
                <span className="font-caption text-caption text-on-surface-variant">
                  Network
                </span>
                <span className="flex items-center gap-1.5 font-mono-label text-[11px] text-on-surface">
                  <StatusPip tone="success" /> Ethereum Mainnet
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-caption text-caption text-on-surface-variant">
                  Gas Balance
                </span>
                <span className="font-mono-label text-[11px] text-on-surface">
                  0.042 ETH
                </span>
              </div>
            </div>
            <ConnectWalletDialog
              trigger={
                <button className="mt-4 w-full border border-outline-variant py-2 font-mono-label text-[11px] uppercase text-on-surface-variant transition-colors hover:bg-surface-container-high">
                  Change Wallet
                </button>
              }
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="font-caption text-caption text-on-surface-variant">
              Connect a wallet to receive your reward allocations.
            </p>
            <ConnectWalletDialog
              trigger={
                <button className="w-full bg-primary-container py-2.5 font-mono-label text-mono-label font-bold uppercase tracking-widest text-on-primary-container transition-all hover:brightness-110">
                  Connect Wallet
                </button>
              }
            />
          </div>
        )}
      </div>

      <div className="border border-outline-variant border-l-4 border-l-primary bg-surface-container-lowest p-6">
        <div className="flex gap-3">
          <Icon name="info" className="text-primary" />
          <div>
            <h4 className="font-body text-caption font-bold text-on-surface">
              Reward Windows
            </h4>
            <p className="mt-1 font-body text-[12px] leading-relaxed text-on-surface-variant">
              Claims for the active season close in 14 days. Ensure you have enough
              gas to complete the transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
