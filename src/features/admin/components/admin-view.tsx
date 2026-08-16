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
        <Icon name="warning" className="text-[48px] text-error" />
        <p className="font-page-title text-[19px] font-bold text-on-surface">
          Failed to load the admin console.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-full bg-ink px-8 py-3 font-mono-label text-[13px] font-bold text-white transition-all shadow-brutal-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] p-4 sm:p-container-padding">
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="m-0 mb-2 font-page-title text-[32px] font-bold tracking-tight text-on-surface">
            Admin Console
          </h1>
          <p className="m-0 text-[15px] text-on-surface-variant">
            Manage seasons, repository approvals, and reward distributions.
          </p>
        </div>
      </div>

      {isLoading || !data ? (
        <Skeleton className="mb-8 h-[110px] w-full rounded-[20px]" />
      ) : (
        <AdminStatsRow stats={data.stats} />
      )}

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <ApprovalQueue items={data?.approvalQueue} loading={isLoading} />
          <DistributionsTable rows={data?.recentDistributions} loading={isLoading} />
        </div>

        <aside className="flex flex-col gap-6">
          {isLoading || !data ? (
            <Skeleton className="h-[250px] w-full rounded-[20px]" />
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
