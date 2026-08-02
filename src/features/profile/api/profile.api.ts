import { apiRequest, mockDelay, USE_MOCKS } from "@/services/api.client";
import {
  mockCurrentUser,
  mockLeaderboard,
} from "@/services/mock/data";
import type { Contribution, LeaderboardEntry, User } from "@/types/domain";
import type {
  Achievement,
  ContributionHeatmap,
  ContributorProfile,
} from "../types";

/** Deterministic PRNG so a username always yields the same mock heatmap. */
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildHeatmap(username: string): ContributionHeatmap {
  const seed = [...username].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const rand = seededRandom(seed);
  const weeks: number[][] = [];
  let total = 0;

  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const r = rand();
      const level = r < 0.45 ? 0 : r < 0.7 ? 1 : r < 0.85 ? 2 : r < 0.95 ? 3 : 4;
      week.push(level);
      total += level * 2; // rough contribution count per level
    }
    weeks.push(week);
  }
  return { totalLastYear: total, weeks };
}

function buildAchievements(earnedCount: number): Achievement[] {
  const catalog: Omit<Achievement, "earned">[] = [
    { id: "architect", name: "Protocol Architect", icon: "architecture", tone: "primary" },
    { id: "bug_hunter", name: "Bug Hunter", icon: "pest_control", tone: "secondary" },
    { id: "top_1", name: "Top 1% Contributor", icon: "stars", tone: "tertiary" },
    { id: "genesis", name: "Genesis Member", icon: "diamond", tone: "neutral" },
    { id: "streak", name: "30-Day Streak", icon: "local_fire_department", tone: "tertiary" },
    { id: "reviewer", name: "Trusted Reviewer", icon: "reviews", tone: "primary" },
  ];
  return catalog.map((item, i) => ({ ...item, earned: i < earnedCount }));
}

function buildRecentContributions(username: string): Contribution[] {
  const base = [
    { repo: "BuidlOn/core", title: "Optimize ZK-proof verification", points: 200, difficulty: "Architecture" as const, days: 1 },
    { repo: "BuidlOn/sdk-js", title: "Implement WebSocket retry logic", points: 80, difficulty: "Feature" as const, days: 5 },
    { repo: "eth-global/indexer", title: "Fix race condition in block processor", points: 120, difficulty: "Critical Bug" as const, days: 10 },
    { repo: "BuidlOn/core", title: "Refactor consensus engine API", points: 200, difficulty: "Architecture" as const, days: 23 },
    { repo: "BuidlOn/cli", title: "Add dark mode to terminal output", points: 20, difficulty: "Good First Issue" as const, days: 27 },
  ];
  return base.map((item, i) => {
    const date = new Date();
    date.setDate(date.getDate() - item.days);
    const [, name] = item.repo.split("/");
    return {
      id: `${username}_c_${i}`,
      issue: { id: `${username}_i_${i}`, title: item.title, difficulty: item.difficulty },
      repository: { id: `repo_${i}`, name, fullName: item.repo },
      status: "MERGED",
      pointsAwarded: item.points,
      prUrl: `https://github.com/${item.repo}/pull/${100 + i}`,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    };
  });
}

function topPerformersAround(rank: number): LeaderboardEntry[] {
  const idx = mockLeaderboard.findIndex((e) => e.rank === rank);
  if (idx === -1) return mockLeaderboard.slice(0, 3);
  const start = Math.max(0, idx - 1);
  return mockLeaderboard.slice(start, start + 3);
}

function resolveUser(username: string): {
  user: User;
  isSelf: boolean;
  entry?: LeaderboardEntry;
} {
  if (username === mockCurrentUser.githubUsername) {
    const entry = mockLeaderboard.find((e) => e.user.githubUsername === username);
    return { user: mockCurrentUser, isSelf: true, entry };
  }

  const entry = mockLeaderboard.find((e) => e.user.githubUsername === username);
  const user: User = {
    id: entry?.user.id ?? `u_${username}`,
    githubUsername: username,
    name: entry?.user.name ?? username,
    avatarUrl:
      entry?.user.avatarUrl ?? "https://avatars.githubusercontent.com/u/0?v=4",
    bio: "Open source contributor on the BuidlOn ecosystem.",
    country: entry?.user.country ?? null,
    website: null,
    skills: ["TypeScript", "Rust"],
    walletAddress: "0x93f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
    role: "contributor",
    reputationLevel: entry?.user.reputationLevel ?? "Contributor",
    reputationScore: 480,
    totalPoints: entry?.points ?? 3200,
    rank: entry?.rank ?? null,
    mergedPrs: entry?.mergedPrs ?? 58,
    acceptanceRate: 0.88,
    githubConnected: true,
    createdAt: "2024-01-15T00:00:00.000Z",
  };
  return { user, isSelf: false, entry };
}

/** Composite public profile payload (GET /users/:username/profile). */
export async function getContributorProfile(
  username: string,
): Promise<ContributorProfile> {
  if (USE_MOCKS) {
    const { user, isSelf, entry } = resolveUser(username);
    const earned = Math.min(6, Math.max(2, Math.round(user.mergedPrs / 30)));

    return mockDelay({
      user,
      isSelf,
      stats: {
        totalPoints: user.totalPoints,
        pointsThisWeek: Math.round(user.totalPoints * 0.04),
        mergedPrs: user.mergedPrs,
        seasonsActive: 6,
        globalRank: user.rank,
      },
      heatmap: buildHeatmap(username),
      achievements: {
        earned,
        total: 24,
        items: buildAchievements(earned),
      },
      recentContributions: buildRecentContributions(username),
      topPerformers: entry ? topPerformersAround(entry.rank) : mockLeaderboard.slice(0, 3),
    });
  }

  return apiRequest<ContributorProfile>(`/users/${username}/profile`);
}
