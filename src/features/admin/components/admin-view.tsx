"use client";

import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminOverview } from "../hooks/use-admin";
import { AdminStatsRow } from "./admin-stats";
import { ApprovalQueue } from "./approval-queue";
import { DistributionsTable } from "./distributions-table";
import { ActiveSeasonCard } from "./active-season-card";
import { CreateSeasonForm } from "./create-season-form";
import { SystemLogs } from "./system-logs";
import { TREASURY_USD } from "../api/admin.api";

export function AdminView() {
  const { data, isLoading, isError, refetch } = useAdminOverview();

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
        <Icon name="warning" className="text-5xl text-error" />
        <p className="font-body text-body text-on-surface">
          Failed to load the admin console.
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
    <div className="mx-auto max-w-[1600px] p-4 sm:p-container-padding">
      {isLoading || !data ? (
        <Skeleton className="mb-gap-8 h-28 w-full" />
      ) : (
        <AdminStatsRow stats={data.stats} />
      )}

      <div className="grid grid-cols-1 items-start gap-gap-8 xl:grid-cols-3">
        <div className="space-y-gap-8 xl:col-span-2">
          <ApprovalQueue items={data?.approvalQueue} loading={isLoading} />
          <DistributionsTable rows={data?.recentDistributions} loading={isLoading} />
        </div>

        <aside className="space-y-gap-8">
          {isLoading || !data ? (
            <Skeleton className="h-56 w-full" />
          ) : (
            <ActiveSeasonCard data={data.activeSeason} />
          )}
          <CreateSeasonForm treasuryUsd={data?.treasuryUsd ?? TREASURY_USD} />
          {data && <SystemLogs logs={data.logs} />}
        </aside>
      </div>
    </div>
  );
}
