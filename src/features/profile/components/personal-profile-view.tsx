"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/ui/status-badges";
import { formatDate, formatNumber, formatUsd } from "@/utils/format";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useRewardsSummary } from "@/features/rewards/hooks/use-rewards";
import { useContributorProfile } from "../hooks/use-contributor-profile";
import { AchievementsCard } from "./achievements-card";
import type { ContributionHeatmap } from "../types";

/** Collapse the 52-week heatmap into 12 monthly bars for the activity chart. */
function monthlyBars(heatmap: ContributionHeatmap): number[] {
  const totals = Array.from({ length: 12 }, (_, m) => {
    const start = Math.floor((m * heatmap.weeks.length) / 12);
    const end = Math.floor(((m + 1) * heatmap.weeks.length) / 12);
    return heatmap.weeks
      .slice(start, end)
      .flat()
      .reduce((sum, level) => sum + level, 0);
  });
  const max = Math.max(1, ...totals);
  return totals.map((t) => Math.round((t / max) * 100));
}

const TABS = ["Contributions", "Staked Projects", "Connections"] as const;
type Tab = (typeof TABS)[number];

export function PersonalProfileView() {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: profile, isLoading: profileLoading } = useContributorProfile(
    user?.githubUsername ?? "",
  );
  const { data: summary } = useRewardsSummary();
  const [tab, setTab] = useState<Tab>("Contributions");

  const loading = userLoading || profileLoading || !user || !profile;

  if (loading) {
    return (
      <div className="mx-auto max-w-[1600px] space-y-8 p-4 sm:p-container-padding">
        <div className="flex gap-6">
          <Skeleton className="h-24 w-24" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-72" />
          </div>
        </div>
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  const bars = monthlyBars(profile.heatmap);
  const reputationPct = Math.min(100, Math.round((user.reputationScore / 1000) * 100));

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-container-padding">
      {/* Hero */}
      <section className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 border-2 border-primary p-1">
            <Avatar
              src={user.avatarUrl}
              alt={user.name ?? user.githubUsername}
              size={88}
              className="h-full w-full border-0"
            />
          </div>
          <div>
            <h1 className="flex items-center gap-3 font-page-title text-page-title text-on-surface">
              {user.githubUsername}
              <Icon name="verified" className="text-secondary" filled />
            </h1>
            <p className="mt-1 font-mono-label text-on-surface-variant">
              {user.bio ?? "BuidlOn contributor"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {user.rank && (
                <span className="border border-outline-variant bg-surface-container px-2 py-0.5 font-mono-label text-[10px] uppercase text-secondary">
                  Rank #{user.rank}
                </span>
              )}
              <span className="border border-outline-variant bg-surface-container px-2 py-0.5 font-mono-label text-[10px] uppercase text-primary">
                {user.reputationLevel}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href="/settings"
            className="flex items-center gap-2 bg-outline-variant px-6 py-2 font-mono-label text-[14px] font-bold text-on-surface transition-all hover:bg-on-surface-variant hover:text-background"
          >
            <Icon name="account_balance_wallet" className="text-[18px]" />
            Wallet Settings
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 bg-primary-container px-6 py-2 font-mono-label text-[14px] font-bold text-on-primary-container transition-all hover:brightness-110"
          >
            <Icon name="edit" className="text-[18px]" />
            Edit Profile
          </Link>
        </div>
      </section>

      {/* Bento grid */}
      <div className="mb-12 grid grid-cols-1 gap-px border border-outline-variant bg-outline-variant md:grid-cols-12">
        <div className="bg-background p-8 md:col-span-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-mono-label text-[14px] uppercase tracking-widest text-on-surface-variant">
              Contribution Activity
            </h3>
            <span className="font-mono-label text-[12px] text-secondary">
              {formatNumber(profile.heatmap.totalLastYear)} commits / year
            </span>
          </div>
          <div className="flex h-48 w-full items-end justify-between gap-1 bg-surface-container-low p-4">
            {bars.map((h, i) => (
              <div
                key={i}
                className="w-full bg-primary/40 transition-all hover:bg-primary"
                style={{ height: `${Math.max(4, h)}%` }}
                title={`Month ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between bg-background p-8 md:col-span-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-mono-label text-[12px] uppercase tracking-widest text-on-surface-variant">
                Total Earnings
              </h3>
              <span className="flex items-center gap-1 border border-outline-variant bg-surface-container px-1.5 py-0.5">
                <Icon name="lock" className="text-[12px] text-primary" filled />
                <span className="font-mono-label text-[10px] uppercase text-primary">
                  Private
                </span>
              </span>
            </div>
            <p className="font-page-title text-[32px] text-on-background">
              {summary ? formatUsd(summary.lifetimeEarningsUsd) : "—"}
            </p>
            <p className="font-mono-label text-[14px] text-secondary">
              {summary ? `+${formatUsd(summary.stakingYieldUsd)} lifetime yield` : ""}
            </p>
          </div>
          <div className="mt-8 border-t border-outline-variant pt-4">
            <p className="font-mono-label text-[12px] text-on-surface-variant">
              REPUTATION SCORE
            </p>
            <div className="mt-2 h-1 w-full bg-surface-container-highest">
              <div className="h-full bg-secondary" style={{ width: `${reputationPct}%` }} />
            </div>
            <p className="mt-1 text-right font-mono-label text-[12px] text-on-surface">
              {user.reputationScore}/1000
            </p>
          </div>
        </div>

        <div className="bg-background p-8 md:col-span-12">
          <AchievementsCard
            items={profile.achievements.items}
            earned={profile.achievements.earned}
            total={profile.achievements.total}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-outline-variant">
        <div className="flex gap-8">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "pb-4 font-mono-label text-[14px] uppercase transition-colors",
                tab === t
                  ? "border-b-2 border-primary font-bold text-on-surface"
                  : "text-on-surface-variant hover:text-on-surface",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "Contributions" ? (
        profile.recentContributions.length === 0 ? (
          <EmptyContributions />
        ) : (
          <div className="mb-8 overflow-hidden border border-outline-variant bg-surface">
            <table className="w-full text-left font-mono-label text-[12px]">
              <thead className="bg-surface-container uppercase text-on-surface-variant">
                <tr>
                  {["Project / Repository", "Type", "Status", "Reward", "Date"].map((h) => (
                    <th key={h} className="border-b border-outline-variant px-6 py-4 font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {profile.recentContributions.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-surface-container-low">
                    <td className="px-6 py-4 text-on-surface">
                      <div className="flex items-center gap-2">
                        <Icon name="terminal" className="text-[18px] text-primary" />
                        {c.repository.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">Pull Request</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-6 py-4 text-on-surface">
                      {c.pointsAwarded ?? "—"} pts
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {formatDate(c.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="mb-8 flex flex-col items-center justify-center border border-outline-variant bg-surface-container-low p-16 text-center">
          <Icon name="hourglass_empty" className="mb-4 text-5xl text-outline-variant" />
          <h4 className="font-section-heading text-on-surface">Nothing here yet</h4>
          <p className="mt-2 max-w-xs font-mono-label text-on-surface-variant">
            {tab} will appear here as the ecosystem grows.
          </p>
        </div>
      )}
    </div>
  );
}

function EmptyContributions() {
  return (
    <div className="mb-8 flex flex-col items-center justify-center border border-outline-variant bg-surface-container-low p-16 text-center">
      <Icon name="list_alt" className="mb-4 text-5xl text-outline-variant" />
      <h4 className="mb-2 font-section-heading text-on-surface">No contributions yet</h4>
      <p className="mb-8 max-w-xs font-mono-label text-on-surface-variant">
        Browse the marketplace to find issues that match your skill set.
      </p>
      <Link
        href="/issues"
        className="flex items-center gap-2 border border-primary px-8 py-3 font-mono-label font-bold text-primary transition-all hover:bg-primary hover:text-on-primary"
      >
        Explore Marketplace
        <Icon name="arrow_forward" />
      </Link>
    </div>
  );
}
