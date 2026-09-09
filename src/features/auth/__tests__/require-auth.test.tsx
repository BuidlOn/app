import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen } from "@/test/utils";
import { makeUser } from "@/test/fixtures";
import { RequireAuth } from "../components/require-auth";
import { ApiError } from "@/services/api.client";

const replace = vi.fn();
const currentUser = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace, push: vi.fn(), back: vi.fn() }),
  usePathname: () => "/rewards",
}));

vi.mock("../hooks/use-current-user", () => ({
  useCurrentUser: () => currentUser(),
}));

beforeEach(() => vi.clearAllMocks());

describe("RequireAuth", () => {
  it("shows a skeleton rather than content while the session resolves", () => {
    currentUser.mockReturnValue({ data: undefined, isResolving: true, isSignedOut: false });
    renderWithProviders(
      <RequireAuth>
        <p>secret</p>
      </RequireAuth>,
    );
    expect(screen.queryByText("secret")).not.toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it("renders content for a signed-in user", () => {
    currentUser.mockReturnValue({ data: makeUser(), isResolving: false, isSignedOut: false });
    renderWithProviders(
      <RequireAuth>
        <p>secret</p>
      </RequireAuth>,
    );
    expect(screen.getByText("secret")).toBeInTheDocument();
  });

  it("never renders protected content once the session is rejected", () => {
    currentUser.mockReturnValue({
      data: undefined,
      isResolving: false,
      isSignedOut: true,
    });
    renderWithProviders(
      <RequireAuth>
        <p>secret</p>
      </RequireAuth>,
    );
    expect(screen.queryByText("secret")).not.toBeInTheDocument();
    expect(screen.getByText(/sign in to continue/i)).toBeInTheDocument();
  });

  it("redirects a rejected session to login, preserving the target", () => {
    currentUser.mockReturnValue({
      data: undefined,
      isResolving: false,
      isSignedOut: true,
    });
    renderWithProviders(
      <RequireAuth>
        <p>secret</p>
      </RequireAuth>,
    );
    expect(replace).toHaveBeenCalledWith("/login?redirect=%2Frewards");
  });

  /**
   * A non-auth failure must not look like being signed out. The API client
   * already retried a silent refresh; only a 401/403 means the session is gone.
   */
  it("does not sign the user out on a server error", () => {
    currentUser.mockReturnValue({
      data: makeUser(),
      isResolving: false,
      isSignedOut: false,
      error: new ApiError("Internal error", 500),
    });
    renderWithProviders(
      <RequireAuth>
        <p>secret</p>
      </RequireAuth>,
    );
    expect(screen.getByText("secret")).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });
});
