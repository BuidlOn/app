"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { StatusBadge } from "@/components/ui/status-badges";
import { formatNumber } from "@/utils/format";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useContributorProfile } from "../hooks/use-contributor-profile";
import { AchievementsCard } from "./achievements-card";
import { NearbyRanksCard } from "./nearby-ranks-card";

export function PersonalProfileView() {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const {
    data: profile,
    isLoading: profileLoading,
    isError,
    refetch,
  } = useContributorProfile(user?.githubUsername ?? "");

  // The profile query is keyed on the username, so it cannot start until the
  // session resolves. Only treat it as loading while something is in flight.
  const loading = userLoading || (!!user && profileLoading);

  if (isError) {
    return (
      <div className="mx-auto max-w-[1200px]">
        <ErrorState
          title="Couldn't load your profile"
          body="Your contribution history didn't come back. Try again in a moment."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 p-4 sm:p-container-padding">
        <Skeleton className="h-32 w-full rounded-[24px]" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  // Session resolved but no profile came back: nothing to render meaningfully.
  if (!user || !profile) {
    return (
      <div className="mx-auto max-w-[1200px]">
        <EmptyState
          icon="user"
          title="Profile unavailable"
          body="We couldn't find a contributor profile for your account yet."
          action={
            <Button asChild size="sm">
              <Link href="/settings">Complete your profile</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] p-4 sm:p-[40px]">
      
      {/* Header Profile Section */}
      <section className="mb-[32px] flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-outline bg-secondary font-page-title text-[32px] font-bold text-white">
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
            <h1 className="m-0 flex items-center gap-3 font-page-title text-[24px] font-bold text-on-surface">
              {user.name || user.githubUsername}
              <span className="font-mono-label text-[14px] font-normal tracking-wide text-secondary">@{user.githubUsername}</span>
              <span className="flex items-center gap-1.5 rounded-full bg-tertiary-wash px-2.5 py-0.5 font-mono-label text-[10px] font-bold text-points">
                ✓ Verified Contributor
              </span>
            </h1>
            <p className="m-0 mt-2 max-w-2xl text-[14px] leading-[1.6] text-on-surface-variant">
              {user.bio ?? "Rust and systems engineer contributing to developer tooling. Previously at a database startup."}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 rounded-full border border-outline/15 bg-white px-3 py-1 font-mono-label text-[11px] font-bold text-on-surface">
                <Icon name="lock" className="text-[14px]" />
                {user.walletAddress 
                  ? `${user.walletAddress.slice(0, 4)}...${user.walletAddress.slice(-4)}`
                  : "0x4f...9a2c"}
                <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
              </span>
              <span className="flex items-center gap-1.5 font-mono-label text-[11px] text-on-surface-variant">
                <span className="text-error">📍</span> {user.country || "San Francisco, CA"}
              </span>
              {user.website && (
                <a href={user.website} target="_blank" rel="noreferrer" className="font-mono-label text-[11px] text-secondary hover:underline">
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="flex shrink-0">
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-full border border-outline/15 bg-white px-5 py-2 font-mono-label text-[11px] font-bold text-on-surface transition-all hover:bg-black/5"
          >
            Edit profile
          </Link>
        </div>
      </section>

      {/* Top 4 Metrics */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex flex-col justify-center rounded-[16px] border border-outline bg-primary p-5 shadow-brutal-sm">
          <p className="m-0 font-mono-label text-[9.5px] font-bold tracking-widest text-on-primary-tint">
            TOTAL POINTS
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-page-title text-[28px] font-bold text-on-surface">
              {formatNumber(user.totalPoints)}
            </span>
            {profile.stats.pointsThisWeek > 0 && (
              <span className="font-mono-label text-[10px] font-bold text-on-primary-tint">
                +{formatNumber(profile.stats.pointsThisWeek)} this wk
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-[16px] border border-outline/10 bg-white p-5">
          <p className="m-0 font-mono-label text-[9.5px] font-bold tracking-widest text-on-surface-muted">
            MERGED PRS
          </p>
          <p className="m-0 mt-2 font-page-title text-[28px] font-bold text-on-surface">
            {formatNumber(user.mergedPrs)}
          </p>
        </div>
        <div className="flex flex-col justify-center rounded-[16px] border border-outline/10 bg-white p-5">
          <p className="m-0 font-mono-label text-[9.5px] font-bold tracking-widest text-on-surface-muted">
            SEASONS ACTIVE
          </p>
          <p className="m-0 mt-2 font-page-title text-[28px] font-bold text-on-surface">
            {formatNumber(profile.stats.seasonsActive)}
          </p>
        </div>
        <div className="flex flex-col justify-center rounded-[16px] border border-outline/10 bg-white p-5">
          <p className="m-0 font-mono-label text-[9.5px] font-bold tracking-widest text-on-surface-muted">
            GLOBAL RANK
          </p>
          <p className="m-0 mt-2 font-page-title text-[28px] font-bold text-secondary">
            {user.rank ? `#${formatNumber(user.rank)}` : "—"}
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Column: Activity & Recent Contributions */}
        <div className="flex flex-col gap-6">
          
          {/* Heatmap Card */}
          <div className="rounded-[16px] border border-outline/10 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="m-0 font-page-title text-[15px] font-bold text-on-surface">
                Contribution activity
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-mono-label text-[10px] text-on-surface-muted">Less</span>
                <div className="flex gap-[3px]">
                  <div className="h-[10px] w-[10px] rounded-[2px] bg-heat-1" />
                  <div className="h-[10px] w-[10px] rounded-[2px] bg-heat-2" />
                  <div className="h-[10px] w-[10px] rounded-[2px] bg-secondary" />
                  <div className="h-[10px] w-[10px] rounded-[2px] bg-heat-4" />
                </div>
                <span className="font-mono-label text-[10px] text-on-surface-muted">More</span>
              </div>
            </div>
            
            <div className="mb-4 flex">
              <div className="flex gap-[3px]">
                {/* Visual mock of the exact compact 7x7 heatmap layout from the screenshot */}
                {Array.from({ length: 7 }).map((_, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px]">
                    {Array.from({ length: 7 }).map((_, dIdx) => {
                      const dayIdx = wIdx * 7 + dIdx;
                      const flatDays = profile.heatmap.weeks.flat().slice(-49);
                      const level = flatDays[dayIdx] || 0;
                      return (
                        <div
                          key={dIdx}
                          className={cn(
                            "h-[10px] w-[10px] rounded-[2px] transition-colors",
                            level === 0 && "bg-ink/5",
                            level === 1 && "bg-heat-1",
                            level === 2 && "bg-heat-2",
                            level === 3 && "bg-secondary",
                            level >= 4 && "bg-heat-4",
                          )}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <p className="m-0 font-mono-label text-[10.5px] text-on-surface-muted">
              Last year: {formatNumber(profile.heatmap.totalLastYear)} contributions
            </p>
          </div>

          {/* Recent Contributions Card */}
          <div className="rounded-[16px] border border-outline/10 bg-white overflow-hidden">
            <div className="p-6 pb-4">
              <h3 className="m-0 font-page-title text-[15px] font-bold text-on-surface">
                Recent contributions
              </h3>
            </div>
            
            {profile.recentContributions.length === 0 ? (
              <div className="p-10 text-center">
                <p className="font-mono-label text-[12px] text-on-surface-muted">No contributions yet.</p>
              </div>
            ) : (
              <>
              {/* Stacked cards below md. */}
              <ul className="flex list-none flex-col gap-2 p-4 md:hidden">
                {profile.recentContributions.map((c) => (
                  <li
                    key={c.id}
                    className="rounded-[14px] border-[1.5px] border-outline/15 bg-white p-3.5"
                  >
                    <div className="mb-1.5 truncate font-mono-label text-[11px] text-on-surface-variant">
                      {c.repository.fullName}
                    </div>
                    <div className="mb-2.5 text-[13px] font-semibold leading-snug text-on-surface">
                      {c.issue.title}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <StatusBadge status={c.status} size="sm" />
                      <span className="font-mono-label text-[12px] font-bold text-points">
                        {c.pointsAwarded ? `${c.pointsAwarded} pts` : "—"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full table-fixed border-collapse text-left">
                  <thead>
                    <tr className="border-y border-outline/10">
                      <th className="w-[30%] py-3 px-6 font-mono-label text-[9.5px] font-bold tracking-widest text-on-surface-muted uppercase">
                        REPOSITORY
                      </th>
                      <th className="py-3 px-6 font-mono-label text-[9.5px] font-bold tracking-widest text-on-surface-muted uppercase">
                        TITLE
                      </th>
                      <th className="w-[18%] py-3 px-6 font-mono-label text-[9.5px] font-bold tracking-widest text-on-surface-muted uppercase">
                        POINTS
                      </th>
                      <th className="w-[20%] py-3 px-6 font-mono-label text-[9.5px] font-bold tracking-widest text-on-surface-muted uppercase">
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.recentContributions.map((c) => (
                      <tr
                        key={c.id}
                        className="border-b border-outline/5 transition-colors hover:bg-black/5"
                      >
                        <td className="py-4 px-6 font-mono-label text-[11px] text-on-surface-variant">
                          {c.repository.fullName}
                        </td>
                        <td className="py-4 px-6 text-[12.5px] font-medium text-on-surface">
                          <span className="line-clamp-2">{c.issue.title}</span>
                        </td>
                        <td className="py-4 px-6 font-mono-label text-[11px] font-bold text-points">
                          {c.pointsAwarded ? `${c.pointsAwarded} pts` : "—"}
                        </td>
                        <td className="py-4 px-6">
                          <StatusBadge status={c.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Achievements & Nearby Ranks */}
        <div className="flex flex-col gap-6">
          <AchievementsCard
            items={profile.achievements.items}
            earned={profile.achievements.earned}
            total={profile.achievements.total}
          />
          <NearbyRanksCard />
        </div>
      </div>
    </div>
  );
}
