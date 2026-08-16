"use client";

import { StatusPip } from "@/components/ui/status-pip";
import { Skeleton } from "@/components/ui/skeleton";
import { truncateHash } from "@/utils/format";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { ConnectWalletDialog } from "./connect-wallet-dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function WalletStatusCard() {
  const { data: user, isLoading } = useCurrentUser();
  const connected = Boolean(user?.walletAddress);

  return (
    <Card className="p-[22px]">
      <p className="mb-4 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
        Wallet status
      </p>

      {isLoading ? (
        <Skeleton className="h-24 w-full" />
      ) : connected ? (
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[38px] w-[38px] shrink-0 rounded-[10px] border-[1.5px] border-outline bg-tertiary" />
            <div>
              <p className="text-[11px] text-on-surface-muted">Connected address</p>
              <p className="font-mono-label text-[13px] font-bold text-on-surface">
                {truncateHash(user!.walletAddress!)}
              </p>
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-2.5 border-t-[1.5px] border-outline/10 pt-3.5">
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-on-surface-muted">Network</span>
              <span className="flex items-center gap-1.5 font-mono-label text-[11px] font-bold">
                <StatusPip tone="success" className="h-1.5 w-1.5" /> Ethereum Mainnet
              </span>
            </div>
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-on-surface-muted">Gas balance</span>
              <span className="font-mono-label text-[11px] font-bold">0.042 ETH</span>
            </div>
          </div>

          <ConnectWalletDialog
            trigger={
              <Button variant="outline" className="w-full text-[11.5px] font-semibold py-2">
                Change wallet
              </Button>
            }
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-[12.5px] text-on-surface-muted">
            Connect a wallet to receive your reward allocations.
          </p>
          <ConnectWalletDialog
            trigger={
              <Button variant="primary" className="w-full justify-center">
                Connect wallet
              </Button>
            }
          />
        </div>
      )}
    </Card>
  );
}
