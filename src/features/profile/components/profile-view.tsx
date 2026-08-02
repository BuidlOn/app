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
    <div className="mx-auto max-w-[1600px] space-y-8 p-4 sm:p-container-padding">
      <div className="flex flex-col gap-8 lg:flex-row">
        <Skeleton className="h-44 w-44" />
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
        <h2 className="font-section-heading text-section-heading text-on-surface">
          Contributor not found
        </h2>
        <p className="font-body text-on-surface-variant">
          We couldn&apos;t find a contributor with the username @{username}.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="border border-outline-variant px-6 py-2 font-mono-label text-mono-label uppercase hover:bg-surface-container"
          >
            Retry
          </button>
          <Link
            href="/leaderboard"
            className="bg-primary-container px-6 py-2 font-mono-label text-mono-label uppercase text-on-primary-container"
          >
            View leaderboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-8 p-4 sm:p-container-padding">
      <ProfileHeader user={data.user} isSelf={data.isSelf} />
      <ProfileStatsRow stats={data.stats} />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="flex flex-col gap-8 xl:col-span-2">
          <ContributionHeatmapCard heatmap={data.heatmap} loading={false} />
          <RecentContributions
            contributions={data.recentContributions}
            loading={false}
          />
        </div>
        <div className="flex flex-col gap-8">
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
