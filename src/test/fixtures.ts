import type { Issue, User } from "@/types/domain";

/**
 * Test fixtures. Deliberately independent of the app's mock service layer so
 * tests keep working once that layer is removed in favour of the live backend.
 */
export function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: "u_1",
    githubUsername: "jlin_dev",
    name: "Jamie Lin",
    avatarUrl: "",
    bio: "Systems engineer.",
    country: "United States",
    website: "jamielin.dev",
    skills: ["Rust", "TypeScript"],
    walletAddress: "0x4f3b2a1c9d8e7f6a5b4c3d2e1f0a9b8c7d6e9a2c",
    role: "contributor",
    reputationLevel: "Contributor",
    reputationScore: 640,
    totalPoints: 2480,
    rank: 312,
    mergedPrs: 47,
    acceptanceRate: 0.92,
    githubConnected: true,
    createdAt: "2025-01-04T00:00:00.000Z",
    ...overrides,
  };
}

export function makeIssue(overrides: Partial<Issue> = {}): Issue {
  return {
    id: "i_1",
    githubNumber: 4821,
    title: "Reduce cold-start bundle size on macOS",
    repository: { id: "r_1", name: "tauri", fullName: "tauri-apps/tauri" },
    difficulty: "Good First Issue",
    basePoints: 320,
    language: "Rust",
    labels: ["performance", "macos"],
    status: "AVAILABLE",
    claimedBy: null,
    claimExpiresAt: null,
    createdAt: "2026-07-28T00:00:00.000Z",
    url: "https://github.com/tauri-apps/tauri/issues/4821",
    ...overrides,
  };
}
