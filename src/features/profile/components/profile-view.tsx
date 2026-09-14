"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { ApiError } from "@/services/api.client";
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
  const { data, isLoading, isError, error, refetch } = useContributorProfile(username);

  if (isLoading) return <ProfileSkeleton />;

  // A missing contributor and a failed request are different answers, and the
  // reader can act on one but not the other.
  const notFound = error instanceof ApiError && error.status === 404;

  if (notFound) {
    return (
      <div className="mx-auto max-w-lg">
        <EmptyState
          icon="user"
          title="Contributor not found"
          body={`No contributor with the username @${username}.`}
          action={
            <Button asChild size="sm">
              <Link href="/leaderboard">View leaderboard</Link>
            </Button>
          }
        />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-lg">
        <ErrorState
          title="Couldn't load this profile"
          body="The profile didn't come back. Check your connection and try again."
          onRetry={() => refetch()}
          action={
            <Button asChild variant="secondary" size="sm">
              <Link href="/leaderboard">View leaderboard</Link>
            </Button>
          }
        />
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
