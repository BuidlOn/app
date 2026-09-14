import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentUser } from "../auth.api";

/** The exact /auth/me body the live backend returns. */
const ME = {
  id: "cmtu3r8af00002ph5chyocnvv",
  githubUsername: "Omoboi-dev",
  name: "Bukunmi",
  avatarUrl: "https://avatars.githubusercontent.com/u/194638119?v=4",
  bio: "developer",
  country: "niger",
  website: "bukunmi.dev",
  skills: ["Rust", "TypeScript"],
  walletAddress: null,
  role: "contributor",
  reputationLevel: "Explorer",
  reputationScore: 12,
  totalPoints: 340,
  rank: 7,
  mergedPrs: 3,
  acceptanceRate: 0.9,
  githubConnected: true,
  createdAt: "2026-09-09T12:56:32.439Z",
};

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, message: "Success", data: ME }),
    }),
  );
});

afterEach(() => vi.unstubAllGlobals());

describe("getCurrentUser", () => {
  /**
   * Regression: the old implementation mapped an invented `MeResponse` shape and
   * hardcoded `bio: null, country: null, website: null, skills: []`. Profile
   * edits saved and persisted server-side, but were discarded on every read, so
   * they appeared to vanish after signing out and back in.
   */
  it("preserves the profile fields the backend returns", async () => {
    const user = await getCurrentUser();

    expect(user.bio).toBe("developer");
    expect(user.country).toBe("niger");
    expect(user.website).toBe("bukunmi.dev");
    expect(user.skills).toEqual(["Rust", "TypeScript"]);
  });

  it("preserves identity fields rather than reading absent keys", async () => {
    const user = await getCurrentUser();

    expect(user.githubUsername).toBe("Omoboi-dev");
    expect(user.name).toBe("Bukunmi");
    expect(user.avatarUrl).toContain("avatars.githubusercontent.com");
  });

  it("preserves reputation and points instead of zeroing them", async () => {
    const user = await getCurrentUser();

    expect(user.reputationLevel).toBe("Explorer");
    expect(user.totalPoints).toBe(340);
    expect(user.rank).toBe(7);
    expect(user.mergedPrs).toBe(3);
  });

  it("keeps the role the backend reports, which gates admin access", async () => {
    const user = await getCurrentUser();
    expect(user.role).toBe("contributor");
  });
});
