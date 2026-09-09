import type { PlatformStats } from "@/types/domain";
import { apiRequest } from "./api.client";

/** Aggregate platform metrics shown on the landing page stats band. */
export async function getPlatformStats(): Promise<PlatformStats> {
  return apiRequest<PlatformStats>("/analytics/platform");
}
