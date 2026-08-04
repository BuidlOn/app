"use client";

import { RewardsSummaryGrid } from "./rewards-summary";
import { SeasonRewardsTable } from "./season-rewards-table";
import { WalletStatusCard } from "./wallet-status-card";
import { ConnectWalletDialog } from "./connect-wallet-dialog";

export function RewardsView() {
  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-container-padding">
      <header className="mb-gap-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="mb-2 font-page-title text-page-title text-on-surface">
            Protocol Rewards
          </h1>
          <p className="max-w-2xl font-body text-body text-on-surface-variant">
            Manage your contributions across the BuidlOn ecosystem and claim your
            earned allocations from active reward seasons.
          </p>
        </div>
        <ConnectWalletDialog
          trigger={
            <button className="shrink-0 bg-primary-container px-6 py-2 font-mono-label text-mono-label uppercase tracking-widest text-on-primary-container transition-all hover:brightness-110">
              Connect Wallet
            </button>
          }
        />
      </header>

      <RewardsSummaryGrid />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <SeasonRewardsTable />
        </div>
        <div className="lg:col-span-1">
          <WalletStatusCard />
        </div>
      </div>
    </div>
  );
}
