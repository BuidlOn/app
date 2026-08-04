import { apiRequest, mockDelay, USE_MOCKS } from "@/services/api.client";
import { mockRepositories } from "@/services/mock/data";
import type { Repository } from "@/types/domain";
import type { Paginated } from "@/types/api";

export interface RepositoryFilters {
  search?: string;
  language?: string | null;
  page?: number;
  limit?: number;
}

const DEFAULT_LIMIT = 9;

export async function getRepositories(
  filters: RepositoryFilters = {},
): Promise<Paginated<Repository>> {
  if (USE_MOCKS) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? DEFAULT_LIMIT;
    const search = filters.search?.trim().toLowerCase();

    const filtered = mockRepositories.filter((repo) => {
      if (search) {
        const haystack = `${repo.fullName} ${repo.description ?? ""}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      if (filters.language && !repo.languages.includes(filters.language)) return false;
      return true;
    });

    const start = (page - 1) * limit;
    return mockDelay(
      {
        items: filtered.slice(start, start + limit),
        page,
        limit,
        total: filtered.length,
        totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
      },
      450,
    );
  }

  return apiRequest<Paginated<Repository>>("/repositories", {
    params: {
      search: filters.search || undefined,
      language: filters.language || undefined,
      page: filters.page,
      limit: filters.limit,
    },
  });
}

/** Register a repository by GitHub URL (maintainer ownership verified server-side). */
export async function registerRepository(url: string): Promise<{ id: string }> {
  if (USE_MOCKS) return mockDelay({ id: `r_${Date.now()}` }, 800);
  return apiRequest<{ id: string }>("/repositories", {
    method: "POST",
    body: { url },
  });
}
