import { apiRequest } from "@/services/api.client";
import type { AdminOverview } from "../types";

/** Console summary: stats, treasury, approval queue, distributions, logs. */
export async function getAdminOverview(): Promise<AdminOverview> {
  return apiRequest<AdminOverview>("/admin/overview");
}

export async function approveRepository(id: string): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/admin/repositories/${id}/approve`, {
    method: "POST",
  });
}

export async function rejectRepository(id: string): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/admin/repositories/${id}/reject`, {
    method: "POST",
  });
}

export interface CreateSeasonInput {
  name: string;
  startDate: string;
  endDate: string;
  rewardPool: number;
}

export async function createSeason(input: CreateSeasonInput): Promise<{ id: string }> {
  return apiRequest<{ id: string }>("/admin/seasons", {
    method: "POST",
    body: input,
  });
}
