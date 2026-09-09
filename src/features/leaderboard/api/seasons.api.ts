import { apiRequest } from "@/services/api.client";
import type { Season } from "@/types/domain";

/** All seasons, newest first. Powers the season selector. */
export async function getSeasons(): Promise<Season[]> {
  return apiRequest<Season[]>("/seasons");
}

/** The season currently in progress, or null when none is active. */
export async function getCurrentSeason(): Promise<Season | null> {
  return apiRequest<Season | null>("/seasons/current");
}
