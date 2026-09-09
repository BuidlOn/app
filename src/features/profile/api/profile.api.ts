import { apiRequest } from "@/services/api.client";
import type { ContributorProfile } from "../types";

/** Composite public profile payload (GET /users/:username/profile). */
export async function getContributorProfile(
  username: string,
): Promise<ContributorProfile> {
  return apiRequest<ContributorProfile>(`/users/${username}/profile`);
}
