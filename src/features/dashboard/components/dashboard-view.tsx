"use client";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useContributorDashboard } from "../hooks/use-contributor-dashboard";
import { DashboardStats } from "./dashboard-stats";
import { ContinueProgress } from "./continue-progress";
import { RecommendedIssues } from "./recommended-issues";
import { ActivityTimeline } from "./activity-timeline";
import { SeasonProgressCard } from "./season-progress-card";
import { StatusPip } from "@/components/ui/status-pip";
import { truncateHash } from "@/utils/format";

export function DashboardView() {
  const { data: user } = useCurrentUser();
  const { data, isLoading, isError, refetch } = useContributorDashboard();

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="font-body text-body text-on-surface">
          Something went wrong loading your dashboard.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="border border-outline-variant px-6 py-2 font-mono-label text-mono-label uppercase hover:bg-surface-container"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-8 p-4 sm:p-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-page-title text-page-title font-bold tracking-tight text-on-surface">
            Contributor Dashboard
          </h2>
          <p className="mt-1 font-body text-body text-on-surface-variant">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}. You&apos;re
            in the top 5% this season.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="border border-outline-variant px-4 py-2 font-mono-label text-mono-label uppercase transition-colors hover:bg-surface-container">
            Export_Data
          </button>
          <button className="bg-primary-container px-4 py-2 font-bold text-on-primary-container transition-opacity hover:opacity-90">
            Claim_All_Rewards
          </button>
        </div>
      </section>

      <DashboardStats stats={data?.stats} loading={isLoading} />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 space-y-6 lg:col-span-8">
          <ContinueProgress
            contributions={data?.activeContributions}
            loading={isLoading}
          />
          <RecommendedIssues
            issues={data?.recommendedIssues}
            loading={isLoading}
          />
        </div>

        <div className="col-span-12 space-y-8 lg:col-span-4">
          <ActivityTimeline events={data?.activity} loading={isLoading} />
          <SeasonProgressCard
            progress={data?.seasonProgress}
            loading={isLoading}
          />
        </div>
      </div>

      <footer className="flex flex-col gap-4 border-t border-outline-variant pb-8 pt-12 font-mono-label text-[10px] uppercase text-outline sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-8">
          <span className="flex items-center gap-2">
            <StatusPip tone="success" pulse /> System_Online
          </span>
          <span>Latency: 24ms</span>
          {user?.walletAddress && (
            <span>Connected_As: {truncateHash(user.walletAddress, 4, 4)}</span>
          )}
        </div>
        <div>© {new Date().getFullYear()} Buidlon_Protocol // Ver_4.2.0_Stable</div>
      </footer>
    </div>
  );
}
