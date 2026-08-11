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

type BackendRole = "USER" | "MAINTAINER" | "ADMIN";

interface MeResponse {
  id: string;
  username: string;
  avatar: string | null;
  role: BackendRole;
  walletAddress: string | null;
  createdAt: string;
}

const roleMap: Record<BackendRole, User["role"]> = {
  USER: "contributor",
  MAINTAINER: "maintainer",
  ADMIN: "admin",
};

/** Current authenticated user (role, wallet + GitHub status, season). */
export async function getCurrentUser(): Promise<User> {
  if (USE_MOCKS) return mockDelay(mockCurrentUser, 200);
  const me = await apiRequest<MeResponse>("/auth/me");
  return {
    id: me.id,
    githubUsername: me.username,
    name: me.username,
    avatarUrl: me.avatar ?? "",
    bio: null,
    country: null,
    website: null,
    skills: [],
    walletAddress: me.walletAddress,
    role: roleMap[me.role] ?? "contributor",
    reputationLevel: "Builder",
    reputationScore: 0,
    totalPoints: 0,
    rank: null,
    mergedPrs: 0,
    acceptanceRate: 0,
    githubConnected: true,
    createdAt: me.createdAt,
  };
}
