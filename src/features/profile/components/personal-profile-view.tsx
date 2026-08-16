"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/ui/status-badges";
import { Card } from "@/components/ui/card";
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
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 p-4 sm:p-container-padding">
        <div className="flex gap-6">
          <Skeleton className="h-[96px] w-[96px] rounded-[24px]" />
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
    <div className="mx-auto max-w-[1400px] p-4 sm:p-container-padding">
      {/* Hero */}
      <section className="mb-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[24px] border-[1.5px] border-outline bg-secondary font-page-title text-[32px] font-bold text-white">
            {user.avatarUrl ? (
              <Avatar
                src={user.avatarUrl}
                alt={user.name ?? user.githubUsername}
                size={96}
                className="h-full w-full rounded-none border-0"
              />
            ) : (
              (user.name ?? user.githubUsername).slice(0, 2).toUpperCase()
            )}
          </div>
          <div>
            <h1 className="m-0 flex items-center gap-3 font-page-title text-[28px] font-bold text-on-surface">
              {user.githubUsername}
              <span className="flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1 text-[12px] font-bold text-secondary-deep">
                ✓ Verified
              </span>
            </h1>
            <p className="m-0 mt-2 text-[14px] text-on-surface-variant">
              {user.bio ?? "BuidlOn contributor"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {user.rank && (
                <span className="rounded-full border-[1.5px] border-outline/15 px-3 py-1 font-mono-label text-[11px] font-bold uppercase text-secondary">
                  Rank #{user.rank}
                </span>
              )}
              <span className="rounded-full border-[1.5px] border-outline/15 bg-primary/10 px-3 py-1 font-mono-label text-[11px] font-bold uppercase text-primary-deep">
                {user.reputationLevel}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-full border-[1.5px] border-outline/15 px-5 py-2 font-mono-label text-[12px] font-bold text-on-surface transition-all hover:bg-outline/5"
          >
            <Icon name="account_balance_wallet" className="text-[16px]" />
            Wallet Settings
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-mono-label text-[12px] font-bold text-on-primary transition-all hover:brightness-110 shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Icon name="edit" className="text-[16px]" />
            Edit Profile
          </Link>
        </div>
      </section>

      {/* Bento grid */}
      <div className="mb-12 grid grid-cols-1 gap-[18px] md:grid-cols-12">
        <Card className="flex flex-col p-8 md:col-span-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="m-0 font-page-title text-[17px] font-bold text-on-surface">
              Contribution activity
            </h3>
            <span className="font-mono-label text-[12px] font-bold text-secondary">
              {formatNumber(profile.heatmap.totalLastYear)} commits / year
            </span>
          </div>
          <div className="flex flex-1 items-end justify-between gap-[3px] rounded-[16px] bg-outline/5 p-4">
            {bars.map((h, i) => (
              <div
                key={i}
                className="w-full rounded-t-[4px] bg-primary/50 transition-all hover:bg-primary"
                style={{ height: `${Math.max(4, h)}%` }}
                title={`Month ${i + 1}`}
              />
            ))}
          </div>
        </Card>

        <Card border="ink" className="flex flex-col justify-between p-8 md:col-span-4">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="m-0 font-mono-label text-[12px] uppercase tracking-widest text-secondary-deep/80">
                Total earnings
              </h3>
              <span className="flex items-center gap-1 rounded-full border-[1.5px] border-secondary-deep/20 bg-secondary/10 px-2 py-1">
                <Icon name="lock" className="text-[12px] text-secondary-deep" filled />
                <span className="font-mono-label text-[10px] font-bold uppercase text-secondary-deep">
                  Private
                </span>
              </span>
            </div>
            <p className="m-0 font-page-title text-[36px] font-bold text-secondary-deep">
              {summary ? formatUsd(summary.lifetimeEarningsUsd) : "—"}
            </p>
            <p className="m-0 mt-1 font-mono-label text-[13px] text-secondary-deep/80">
              {summary ? `+${formatUsd(summary.stakingYieldUsd)} lifetime yield` : ""}
            </p>
          </div>
          <div className="mt-8 border-t-[1.5px] border-secondary-deep/10 pt-5">
            <p className="m-0 font-mono-label text-[11px] font-bold uppercase tracking-widest text-secondary-deep/80">
              Reputation score
            </p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary-deep/10">
              <div className="h-full rounded-full bg-secondary-deep" style={{ width: `${reputationPct}%` }} />
            </div>
            <p className="m-0 mt-2 text-right font-mono-label text-[12.5px] font-bold text-secondary-deep">
              {user.reputationScore}/1000
            </p>
          </div>
        </Card>

        <div className="md:col-span-12">
          <AchievementsCard
            items={profile.achievements.items}
            earned={profile.achievements.earned}
            total={profile.achievements.total}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b-[1.5px] border-outline/10">
        <div className="flex gap-8">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "pb-3.5 font-mono-label text-[13px] uppercase tracking-widest transition-colors",
                tab === t
                  ? "border-b-[3px] border-primary font-bold text-on-surface"
                  : "text-on-surface-muted hover:text-on-surface",
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
          <Card className="mb-8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-left">
                <thead>
                  <tr className="bg-outline/5">
                    {["Project / Repository", "Type", "Status", "Reward", "Date"].map((h) => (
                      <th
                        key={h}
                        className="py-3 px-6 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {profile.recentContributions.map((c) => (
                    <tr
                      key={c.id}
                      className="border-t-[1px] border-outline/10 transition-colors hover:bg-outline/5"
                    >
                      <td className="py-4 px-6 text-[13px] font-bold text-on-surface">
                        <div className="flex items-center gap-2">
                          <Icon name="terminal" className="text-[16px] text-primary" />
                          {c.repository.fullName}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono-label text-[12px] text-on-surface-variant">
                        Pull Request
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="py-4 px-6 font-mono-label text-[13px] font-bold text-primary-deep">
                        {c.pointsAwarded ?? "—"} pts
                      </td>
                      <td className="py-4 px-6 font-mono-label text-[12px] text-on-surface-muted">
                        {formatDate(c.updatedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )
      ) : (
        <div className="mb-8 flex flex-col items-center justify-center rounded-[24px] border-[1.5px] border-outline/15 bg-outline/5 p-16 text-center">
          <Icon name="hourglass_empty" className="mb-4 text-[48px] text-outline/30" />
          <h4 className="m-0 font-page-title text-[19px] font-bold text-on-surface">Nothing here yet</h4>
          <p className="m-0 mt-2 max-w-xs text-[13.5px] text-on-surface-variant">
            {tab} will appear here as the ecosystem grows.
          </p>
        </div>
      )}
    </div>
  );
}

function EmptyContributions() {
  return (
    <div className="mb-8 flex flex-col items-center justify-center rounded-[24px] border-[1.5px] border-outline/15 bg-outline/5 p-16 text-center">
      <Icon name="list_alt" className="mb-4 text-[48px] text-outline/30" />
      <h4 className="m-0 mb-2 font-page-title text-[19px] font-bold text-on-surface">No contributions yet</h4>
      <p className="m-0 mb-8 max-w-xs text-[13.5px] text-on-surface-variant">
        Browse the marketplace to find issues that match your skill set.
      </p>
      <Link
        href="/issues"
        className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-mono-label text-[13px] font-bold text-on-primary transition-all hover:brightness-110 shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        Explore Marketplace
        <Icon name="arrow_forward" />
      </Link>
    </div>
  );
}
