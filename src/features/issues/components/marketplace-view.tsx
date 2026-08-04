"use client";

import { useState } from "react";
import { useIssues } from "../hooks/use-issues";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { MarketplaceStats } from "./marketplace-stats";
import { IssueFilterBar } from "./issue-filter-bar";
import { IssueGrid } from "./issue-grid";
import { Pagination } from "@/components/ui/pagination";
import { DEFAULT_ISSUE_PAGE_SIZE } from "@/constants/issues";
import type { IssueFilters } from "../types";

const INITIAL_FILTERS: IssueFilters = {
  search: "",
  difficulty: null,
  language: null,
  status: "all",
  page: 1,
  limit: DEFAULT_ISSUE_PAGE_SIZE,
};

export function MarketplaceView() {
  const [filters, setFilters] = useState<IssueFilters>(INITIAL_FILTERS);
  const { data: user } = useCurrentUser();
  const { data, isLoading, isError, isFetching, refetch } = useIssues(filters);

  // Applying filters resets to page 1; paging keeps the current filters.
  const apply = (next: IssueFilters) => setFilters({ ...next, page: 1 });
  const clear = () => setFilters(INITIAL_FILTERS);
  const goToPage = (page: number) => setFilters((f) => ({ ...f, page }));

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-container-padding">
      <div className="mb-gap-8 flex items-end justify-between">
        <div>
          <h1 className="font-page-title text-page-title font-bold tracking-tight text-on-surface">
            Issue Marketplace
          </h1>
          <p className="mt-1 font-body text-body text-on-surface-variant">
            Claim verified issues and earn points toward this season&apos;s rewards.
          </p>
        </div>
      </div>

      <MarketplaceStats />

      <IssueFilterBar filters={filters} onApply={apply} onClear={clear} />

      <IssueGrid
        issues={data?.items}
        loading={isLoading}
        error={isError}
        onRetry={() => refetch()}
        onClear={clear}
        currentUserId={user?.id}
      />

      {data && data.totalPages > 1 && (
        <div className="mt-gap-12" aria-busy={isFetching}>
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            onPageChange={goToPage}
          />
        </div>
      )}
    </div>
  );
}
