import type { Issue, IssueDifficulty, Repository, User } from "@/types/domain";

export type IssueStatusFilter = "all" | "available" | "claimed";

export interface IssueTimelineStep {
  label: string;
  date: string | null;
  state: "done" | "active" | "pending";
}

/**
 * Richer payload returned by GET /issues/:id. Extends the list-level Issue with
 * description body, repository detail, maintainer, and a status timeline.
 */
export interface IssueDetail extends Issue {
  description: string;
  objectives: string[];
  acceptanceCriteria: string | null;
  repositoryDetail: Repository;
  maintainer: Pick<User, "id" | "githubUsername" | "name" | "avatarUrl">;
  timeline: IssueTimelineStep[];
}

export interface IssueFilters {
  search?: string;
  difficulty?: IssueDifficulty | null;
  language?: string | null;
  status?: IssueStatusFilter;
  page?: number;
  limit?: number;
}
