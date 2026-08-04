import { apiRequest, mockDelay, USE_MOCKS } from "@/services/api.client";
import { mockSeasons } from "@/services/mock/data";
import type { Season } from "@/types/domain";

/** All seasons, newest first. Powers the season selector. */
export async function getSeasons(): Promise<Season[]> {
  if (USE_MOCKS) return mockDelay(mockSeasons, 200);
  return apiRequest<Season[]>("/seasons");
}
