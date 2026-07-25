import type { User } from "@/types/domain";
import { API_BASE_URL, apiRequest, mockDelay, USE_MOCKS } from "./api.client";
import { mockCurrentUser } from "./mock/data";

/**
 * Auth is GitHub-OAuth only. The frontend never implements auth logic — it
 * hands off to the backend's OAuth entrypoint and reads back the session.
 */
export function getGithubOAuthUrl(): string {
  // In mock mode we route to a local demo callback; against a real backend we
  // send the browser to the backend's GitHub redirect endpoint.
  if (USE_MOCKS || !API_BASE_URL) return "/login/demo";
  return `${API_BASE_URL.replace(/\/$/, "")}/auth/github`;
}

/** Current authenticated user (role, wallet + GitHub status, season). */
export async function getCurrentUser(): Promise<User> {
  if (USE_MOCKS) return mockDelay(mockCurrentUser, 200);
  return apiRequest<User>("/auth/me");
}
