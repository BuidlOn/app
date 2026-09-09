import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, screen } from "@/test/utils";
import { makeUser } from "@/test/fixtures";
import { AccountMenu } from "../account-menu";

const replace = vi.fn();
const clearAuthTokens = vi.fn();
const currentUser = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace, push: vi.fn() }),
  usePathname: () => "/dashboard",
}));

vi.mock("@/services/api.client", async (orig) => ({
  ...(await orig<typeof import("@/services/api.client")>()),
  clearAuthTokens: () => clearAuthTokens(),
}));

vi.mock("@/features/auth/hooks/use-current-user", () => ({
  useCurrentUser: () => currentUser(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  currentUser.mockReturnValue({
    data: makeUser({ name: "Jamie Lin", githubUsername: "jlin_dev" }),
    isResolving: false,
  });
});

describe("AccountMenu", () => {
  it("shows a placeholder until the session resolves", () => {
    currentUser.mockReturnValue({ data: undefined, isResolving: true });
    renderWithProviders(<AccountMenu />);
    expect(screen.queryByRole("button", { name: /account menu/i })).not.toBeInTheDocument();
  });

  it("keeps account actions behind the trigger until opened", () => {
    renderWithProviders(<AccountMenu />);
    expect(screen.queryByRole("menuitem", { name: /profile/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("menuitem", { name: /sign out/i })).not.toBeInTheDocument();
  });

  it("reveals profile, settings and sign out when opened", async () => {
    renderWithProviders(<AccountMenu />);
    await userEvent.click(screen.getByRole("button", { name: /account menu/i }));

    expect(await screen.findByRole("menuitem", { name: /profile/i })).toHaveAttribute(
      "href",
      "/profile",
    );
    expect(screen.getByRole("menuitem", { name: /settings/i })).toHaveAttribute(
      "href",
      "/settings",
    );
    expect(screen.getByRole("menuitem", { name: /sign out/i })).toBeInTheDocument();
  });

  it("identifies whose account it is", async () => {
    renderWithProviders(<AccountMenu />);
    await userEvent.click(screen.getByRole("button", { name: /account menu/i }));

    expect(await screen.findByText("Jamie Lin")).toBeInTheDocument();
    expect(screen.getByText("@jlin_dev")).toBeInTheDocument();
  });

  it("opens with the keyboard alone", async () => {
    renderWithProviders(<AccountMenu />);
    await userEvent.tab();
    expect(screen.getByRole("button", { name: /account menu/i })).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    expect(await screen.findByRole("menuitem", { name: /profile/i })).toBeInTheDocument();
  });

  it("clears the session and returns to login on sign out", async () => {
    renderWithProviders(<AccountMenu />);
    await userEvent.click(screen.getByRole("button", { name: /account menu/i }));
    await userEvent.click(await screen.findByRole("menuitem", { name: /sign out/i }));

    expect(clearAuthTokens).toHaveBeenCalledOnce();
    expect(replace).toHaveBeenCalledWith("/login");
  });
});
