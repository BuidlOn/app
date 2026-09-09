import type { User } from "@/types/domain";
import { API_BASE_URL, apiRequest } from "./api.client";

/**
 * Auth is GitHub-OAuth only. The frontend never implements auth logic — it
 * hands off to the backend's OAuth entrypoint, which redirects back to
 * /auth/callback with the access token.
 */
export function getGithubOAuthUrl(): string {
  return `${API_BASE_URL.replace(/\/$/, "")}/auth/github`;
}

/**
 * Current authenticated user. The backend already returns the domain `User`
 * shape verbatim, so there is nothing to map — inventing a mapping here is how
 * the username, avatar and points silently came back empty before.
 */
export async function getCurrentUser(): Promise<User> {
  return apiRequest<User>("/auth/me");
}
