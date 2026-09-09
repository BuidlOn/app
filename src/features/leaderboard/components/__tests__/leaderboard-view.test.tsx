import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, screen } from "@/test/utils";
import { makeUser } from "@/test/fixtures";
import { LeaderboardView } from "../leaderboard-view";

const seasons = vi.fn();
const leaderboard = vi.fn();
const myRanking = vi.fn();

vi.mock("@/features/auth/hooks/use-current-user", () => ({
  useCurrentUser: () => ({ data: makeUser(), isLoading: false, isError: false, refetch: vi.fn() }),
}));

vi.mock("../../hooks/use-leaderboard", () => ({
  useSeasons: () => seasons(),
  useLeaderboard: () => leaderboard(),
  useMyRanking: () => myRanking(),
}));

const idle = { data: undefined, isLoading: false, isError: false, refetch: vi.fn() };

beforeEach(() => {
  vi.clearAllMocks();
  seasons.mockReturnValue({ ...idle, data: [] });
  leaderboard.mockReturnValue(idle);
  myRanking.mockReturnValue(idle);
});

describe("Leaderboard with no seasons", () => {
  // Regression: with zero seasons the standings query stays disabled, so the
  // table used to sit on skeleton rows forever instead of explaining itself.
  it("explains that no season is running instead of loading forever", () => {
    renderWithProviders(<LeaderboardView />);

    expect(screen.getByText(/no season is running/i)).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("offers a next step rather than a dead end", () => {
    renderWithProviders(<LeaderboardView />);
    expect(screen.getByRole("link", { name: /browse open issues/i })).toHaveAttribute(
      "href",
      "/issues",
    );
  });

  it("shows a placeholder instead of an empty season dropdown", () => {
    renderWithProviders(<LeaderboardView />);
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.getByText(/no seasons yet/i)).toBeInTheDocument();
  });

  it("hides the personal ranking card when there is no season to rank in", () => {
    renderWithProviders(<LeaderboardView />);
    expect(screen.queryByText(/current position/i)).not.toBeInTheDocument();
  });
});

describe("Leaderboard error handling", () => {
  it("surfaces a season-list failure with a retry", async () => {
    const refetch = vi.fn();
    seasons.mockReturnValue({ ...idle, isError: true, refetch });
    renderWithProviders(<LeaderboardView />);

    expect(screen.getByText(/couldn't load seasons/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(refetch).toHaveBeenCalledOnce();
  });

  it("surfaces a standings failure with a retry", async () => {
    const refetch = vi.fn();
    seasons.mockReturnValue({ ...idle, data: [{ id: "s_1", name: "Season 7" }] });
    leaderboard.mockReturnValue({ ...idle, isError: true, refetch });
    renderWithProviders(<LeaderboardView />);

    expect(screen.getByText(/couldn't load standings/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(refetch).toHaveBeenCalledOnce();
  });
});

describe("Leaderboard with a season but no entries", () => {
  it("says the board is empty rather than rendering a blank table", () => {
    seasons.mockReturnValue({ ...idle, data: [{ id: "s_1", name: "Season 7" }] });
    leaderboard.mockReturnValue({
      ...idle,
      data: { items: [], page: 1, limit: 10, total: 0, totalPages: 0 },
    });
    renderWithProviders(<LeaderboardView />);

    expect(screen.getByText(/no standings yet/i)).toBeInTheDocument();
  });
});
