"use client";

import { useState } from "react";
import { useIssues } from "../hooks/use-issues";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { MarketplaceStats } from "./marketplace-stats";
import { IssueFilterBar } from "./issue-filter-bar";
import { IssueGrid } from "./issue-grid";
import { Pagination } from "@/components/ui/pagination";
import { PageHeader } from "@/components/layout/page-header";
import { StatusFooter } from "@/components/layout/status-footer";
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
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 sm:gap-8">
      <PageHeader
        title="Issue Marketplace"
        description="Apply for verified issues and earn points toward this season's rewards."
      />

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
        <div aria-busy={isFetching}>
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            onPageChange={goToPage}
          />
        </div>
      )}

      <StatusFooter />
    </div>
  );
}
