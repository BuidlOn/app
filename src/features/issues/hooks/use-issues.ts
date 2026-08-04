"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getIssues } from "../api/issues.api";
import type { IssueFilters } from "../types";

export function useIssues(filters: IssueFilters) {
  return useQuery({
    queryKey: ["issues", filters],
    queryFn: () => getIssues(filters),
    placeholderData: keepPreviousData,
  });
}
