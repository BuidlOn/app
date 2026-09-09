import { apiRequest } from "@/services/api.client";
import type { Repository } from "@/types/domain";
import type { Paginated } from "@/types/api";

export interface RepositoryFilters {
  search?: string;
  language?: string | null;
  page?: number;
  limit?: number;
}

/** Paginated repository list. Search and filtering happen server-side. */
export async function getRepositories(
  filters: RepositoryFilters = {},
): Promise<Paginated<Repository>> {
  return apiRequest<Paginated<Repository>>("/repositories", {
    params: {
      search: filters.search || undefined,
      language: filters.language || undefined,
      page: filters.page,
      limit: filters.limit,
    },
  });
}

/** Register a repository by GitHub URL or owner/repo full name (ownership verified server-side). */
export async function registerRepository(input: string): Promise<{ id: string }> {
  const isFullName = /^[\w.-]+\/[\w.-]+$/.test(input.trim());
  return apiRequest<{ id: string }>("/repositories", {
    method: "POST",
    body: isFullName ? { fullName: input.trim() } : { url: input },
  });
}

export interface InstallationRepository {
  githubId: number;
  fullName: string;
  private: boolean;
  description: string | null;
  language: string | null;
  registered: boolean;
}

/**
 * Repos the user granted on the GitHub App install screen for this
 * installation (arrives via `?installation_id=` after the setup redirect).
 */
export async function getInstallationRepositories(
  installationId: string,
): Promise<InstallationRepository[]> {
  return apiRequest<InstallationRepository[]>(
    `/github/installations/${installationId}/repositories`,
  );
}
