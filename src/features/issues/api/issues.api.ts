import { apiRequest, mockDelay, USE_MOCKS } from "@/services/api.client";
import { mockCurrentUser, mockIssues, mockRepositories } from "@/services/mock/data";
import type { Issue, Repository } from "@/types/domain";
import type { Paginated } from "@/types/api";
import { DEFAULT_ISSUE_PAGE_SIZE } from "@/constants/issues";
import type { IssueDetail, IssueFilters, IssueTimelineStep } from "../types";

/**
 * Filtering + pagination is the backend's job. The mock reproduces that server
 * behavior so the UI never filters a full dataset in the browser.
 */
function applyMockFilters(filters: IssueFilters): Paginated<Issue> {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? DEFAULT_ISSUE_PAGE_SIZE;
  const search = filters.search?.trim().toLowerCase();

  const filtered = mockIssues.filter((issue) => {
    if (search) {
      const haystack = `${issue.title} ${issue.repository.fullName}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    if (filters.difficulty && issue.difficulty !== filters.difficulty) return false;
    if (filters.language && issue.language !== filters.language) return false;
    if (filters.status === "available" && issue.status !== "AVAILABLE") return false;
    if (filters.status === "claimed" && issue.status === "AVAILABLE") return false;
    return true;
  });

  const total = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return {
    items,
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

/** Paginated, filtered issue list for the marketplace. */
export async function getIssues(
  filters: IssueFilters = {},
): Promise<Paginated<Issue>> {
  if (USE_MOCKS) return mockDelay(applyMockFilters(filters), 500);

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

const FALLBACK_REPO: Repository = {
  id: "r_unknown",
  name: "repository",
  fullName: "buidlon/repository",
  description: null,
  languages: [],
  topics: [],
  stars: 0,
  forks: 0,
  openIssues: 0,
  contributors: 0,
  avatarUrl: null,
  isArchived: false,
};

function buildTimeline(issue: Issue): IssueTimelineStep[] {
  const claimed = issue.status !== "AVAILABLE";
  return [
    { label: "Issue Created", date: issue.createdAt, state: "done" },
    { label: "Published to Marketplace", date: issue.createdAt, state: "done" },
    {
      label: claimed ? "Claimed" : "Awaiting Claims",
      date: issue.claimExpiresAt,
      state: claimed ? "done" : "active",
    },
    { label: "PR Merged & Scored", date: null, state: "pending" },
  ];
}

/** Enrich a list-level issue into the detail payload the screen expects. */
function toIssueDetail(issue: Issue): IssueDetail {
  const repositoryDetail =
    mockRepositories.find((repo) => repo.id === issue.repository.id) ?? {
      ...FALLBACK_REPO,
      id: issue.repository.id,
      name: issue.repository.name,
      fullName: issue.repository.fullName,
    };

  return {
    ...issue,
    description: `This issue tracks work on "${issue.title}". GitHub remains the source of truth for the full discussion; the summary and acceptance criteria below mirror the upstream issue thread.`,
    objectives: [
      "Reproduce and confirm the reported behavior against the latest main branch.",
      "Implement the change with tests covering the new and existing paths.",
      "Keep the public API stable unless a breaking change is explicitly approved.",
      "Update documentation and changelog entries where relevant.",
    ],
    acceptanceCriteria:
      "All CI checks pass, new logic is covered by unit tests, and the change is reviewed and merged by a verified maintainer.",
    repositoryDetail,
    maintainer: {
      id: "u_maint",
      githubUsername: "dev_master_99",
      name: "Priya Nair",
      avatarUrl: "https://avatars.githubusercontent.com/u/3?v=4",
    },
    timeline: buildTimeline(issue),
  };
}

/** Single issue detail (used by the issue detail screen). */
export async function getIssueDetail(id: string): Promise<IssueDetail> {
  if (USE_MOCKS) {
    const found = mockIssues.find((issue) => issue.id === id);
    if (!found) throw new Error("Issue not found.");
    return mockDelay(toIssueDetail(found), 350);
  }
  return apiRequest<IssueDetail>(`/issues/${id}`);
}

/**
 * Claim an issue. In mock mode this mutates the in-memory issue so the change
 * persists across the marketplace and detail views for the session.
 */
export async function claimIssue(id: string): Promise<Issue> {
  if (USE_MOCKS) {
    const found = mockIssues.find((issue) => issue.id === id);
    if (!found) throw new Error("Issue not found.");
    if (found.status !== "AVAILABLE") {
      throw new Error("This issue has already been claimed.");
    }
    const expires = new Date();
    expires.setDate(expires.getDate() + 3);
    found.status = "CLAIMED";
    found.claimedBy = {
      id: mockCurrentUser.id,
      githubUsername: mockCurrentUser.githubUsername,
      avatarUrl: mockCurrentUser.avatarUrl,
    };
    found.claimExpiresAt = expires.toISOString();
    return mockDelay({ ...found }, 600);
  }
  return apiRequest<Issue>(`/issues/${id}/claim`, { method: "POST" });
}

/** Release a claim on an issue. */
export async function releaseClaim(id: string): Promise<Issue> {
  if (USE_MOCKS) {
    const found = mockIssues.find((issue) => issue.id === id);
    if (!found) throw new Error("Issue not found.");
    found.status = "AVAILABLE";
    found.claimedBy = null;
    found.claimExpiresAt = null;
    return mockDelay({ ...found }, 400);
  }
  return apiRequest<Issue>(`/issues/${id}/claim`, { method: "DELETE" });
}
