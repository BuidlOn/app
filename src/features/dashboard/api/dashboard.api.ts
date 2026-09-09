import { apiRequest } from "@/services/api.client";
import type { ContributorDashboard } from "../types";

/** Composite payload for the contributor dashboard. */
export async function getContributorDashboard(): Promise<ContributorDashboard> {
  return apiRequest<ContributorDashboard>("/analytics/dashboard");
}
