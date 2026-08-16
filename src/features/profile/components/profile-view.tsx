"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useContributorProfile } from "../hooks/use-contributor-profile";
import { ProfileHeader } from "./profile-header";
import { ProfileStatsRow } from "./profile-stats";
import { ContributionHeatmapCard } from "./contribution-heatmap";
import { RecentContributions } from "./recent-contributions";
import { AchievementsCard } from "./achievements-card";
import { TopPerformersCard } from "./top-performers-card";

function ProfileSkeleton() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 p-4 sm:gap-8 sm:p-container-padding">
      <div className="flex flex-col gap-8 lg:flex-row">
        <Skeleton className="h-[128px] w-[128px] rounded-[24px]" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
          <Skeleton className="h-8 w-72" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
      <Skeleton className="h-48 w-full" />
    </div>
  );
}

export function ProfileView({ username }: { username: string }) {
  const { data, isLoading, isError, refetch } = useContributorProfile(username);

  if (isLoading) return <ProfileSkeleton />;

  if (isError || !data) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-4 p-8 text-center">
        <Icon name="person_off" className="text-5xl text-error" />
        <h2 className="font-page-title text-[24px] font-bold text-on-surface">
          Contributor not found
        </h2>
        <p className="text-[14px] text-on-surface-variant">
          We couldn&apos;t find a contributor with the username @{username}.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="border-[1.5px] border-outline/15 px-6 py-2 font-mono-label text-[12px] uppercase hover:bg-outline/5"
          >
            Retry
          </button>
          <Link
            href="/leaderboard"
            className="bg-primary px-6 py-2 font-mono-label text-[12px] uppercase text-on-primary"
          >
            View leaderboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 sm:gap-8">
      <ProfileHeader user={data.user} isSelf={data.isSelf} />
      <ProfileStatsRow stats={data.stats} />

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <ContributionHeatmapCard heatmap={data.heatmap} loading={false} />
          <RecentContributions
            contributions={data.recentContributions}
            loading={false}
          />
        </div>
        <div className="flex flex-col gap-5">
          <AchievementsCard
            items={data.achievements.items}
            earned={data.achievements.earned}
            total={data.achievements.total}
          />
          <TopPerformersCard
            entries={data.topPerformers}
            highlightUsername={data.user.githubUsername}
          />
        </div>
      </div>
    </div>
  );
}
