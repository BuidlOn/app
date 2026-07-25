import type { PlatformStats } from "@/types/domain";
import { apiRequest, mockDelay, USE_MOCKS } from "./api.client";
import { mockPlatformStats } from "./mock/data";

/** Aggregate platform metrics shown on the landing page stats band. */
export async function getPlatformStats(): Promise<PlatformStats> {
  if (USE_MOCKS) return mockDelay(mockPlatformStats);
  return apiRequest<PlatformStats>("/analytics/platform");
}
