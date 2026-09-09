"use client";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useContributorDashboard } from "../hooks/use-contributor-dashboard";
import { DashboardStats } from "./dashboard-stats";
import { ContinueProgress } from "./continue-progress";
import { RecommendedIssues } from "./recommended-issues";
import { ActivityTimeline } from "./activity-timeline";
import { SeasonProgressCard } from "./season-progress-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { StatusFooter } from "@/components/layout/status-footer";

export function DashboardView() {
  const { data: user } = useCurrentUser();
  const { data, isLoading, isError, refetch } = useContributorDashboard();

  if (isError) {
    return (
      <Card className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 p-10 text-center">
        <p className="text-[15px] text-on-surface">
          Something went wrong loading your dashboard.
        </p>
        <Button type="button" variant="secondary" size="sm" onClick={() => refetch()}>
          Retry
        </Button>
      </Card>
    );
  }

  const firstName = user?.name?.split(" ")[0];

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 sm:gap-8">
      <PageHeader
        title={
          <>
            <span className="lg:hidden">Hey, {firstName ?? "there"} 👋</span>
            <span className="hidden lg:inline">Contributor Dashboard</span>
          </>
        }
        description={
          <>
            <span className="hidden lg:inline">
              Welcome back{firstName ? `, ${firstName}` : ""}.{" "}
            </span>
            You&apos;re in the <strong className="font-bold">top 5%</strong> this season.
          </>
        }
        actions={
          <>
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
              Export data
            </Button>
          </>
        }
      />

      <DashboardStats stats={data?.stats} loading={isLoading} />

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start lg:gap-6">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2 lg:gap-7">
          <ContinueProgress
            contributions={data?.activeContributions}
            loading={isLoading}
          />
          <RecommendedIssues issues={data?.recommendedIssues} loading={isLoading} />
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <ActivityTimeline events={data?.activity} loading={isLoading} />
          <SeasonProgressCard progress={data?.seasonProgress} loading={isLoading} />
        </div>
      </div>

      <StatusFooter />
    </div>
  );
}
