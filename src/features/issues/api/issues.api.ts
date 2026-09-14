import { apiRequest } from "@/services/api.client";
import type { Issue } from "@/types/domain";
import type { Paginated } from "@/types/api";
import type { IssueDetail, IssueFilters } from "../types";

/**
 * Paginated, filtered issue list for the marketplace. Searching and filtering
 * are the backend's job — the browser never filters a full dataset.
 */
export async function getIssues(
  filters: IssueFilters = {},
): Promise<Paginated<Issue>> {
  return apiRequest<Paginated<Issue>>("/issues", {
    params: {
      search: filters.search || undefined,
      difficulty: filters.difficulty || undefined,
      language: filters.language || undefined,
      status: filters.status && filters.status !== "all" ? filters.status : undefined,
      page: filters.page,
      limit: filters.limit,
    },
  });
}

/** Single issue detail (used by the issue detail screen). */
export async function getIssueDetail(id: string): Promise<IssueDetail> {
  return apiRequest<IssueDetail>(`/issues/${id}`);
}

/** Claim an issue for the current user. */
export async function claimIssue(id: string): Promise<Issue> {
  return apiRequest<Issue>(`/issues/${id}/claim`, { method: "POST" });
}

/** Release a claim the current user holds on an issue. */
export async function releaseClaim(id: string): Promise<Issue> {
  return apiRequest<Issue>(`/issues/${id}/claim`, { method: "DELETE" });
}
