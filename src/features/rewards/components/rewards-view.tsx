"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { RewardsSummaryGrid } from "./rewards-summary";
import { SeasonRewardsTable } from "./season-rewards-table";
import { WalletStatusCard } from "./wallet-status-card";
import { ConnectWalletDialog } from "./connect-wallet-dialog";

export function RewardsView() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 sm:gap-8">
      <PageHeader
        title="Protocol Rewards"
        description="Manage your contributions across the ecosystem and claim your earned allocations from active reward seasons."
        actions={
          <ConnectWalletDialog
            trigger={
              <Button variant="primary" className="shrink-0">
                Connect wallet
              </Button>
            }
          />
        }
      />

      <RewardsSummaryGrid />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <SeasonRewardsTable />
        </div>
        <div className="flex flex-col gap-4 lg:col-span-1">
          <WalletStatusCard />
          <div className="rounded-r-[16px] border-l-[3px] border-tertiary bg-tertiary/10 p-5">
            <div className="mb-1 text-[13px] font-bold">Reward windows</div>
            <p className="m-0 text-[12px] leading-relaxed text-on-surface-variant">
              Claims for the active season close in 14 days. Ensure you have enough gas to complete the transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
