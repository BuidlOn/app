import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, screen, waitFor } from "@/test/utils";
import { makeUser } from "@/test/fixtures";
import { SettingsView } from "../settings-view";

const updateProfile = vi.fn();
const updateWallet = vi.fn();
const currentUser = vi.fn();

vi.mock("@/features/auth/hooks/use-current-user", () => ({
  useCurrentUser: () => currentUser(),
}));

vi.mock("../../hooks/use-settings", () => ({
  useUpdateProfile: () => ({ mutate: updateProfile, isPending: false }),
  useUpdateWallet: () => ({ mutate: updateWallet, isPending: false }),
}));

function loaded(overrides = {}) {
  return {
    data: makeUser(overrides),
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  currentUser.mockReturnValue(loaded());
});

describe("SettingsView states", () => {
  it("shows skeletons while loading", () => {
    currentUser.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
    });
    renderWithProviders(<SettingsView />);
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByText(/settings/i)).not.toBeInTheDocument();
  });

  it("offers a retry when the account fails to load", async () => {
    const refetch = vi.fn();
    currentUser.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch,
    });
    renderWithProviders(<SettingsView />);

    expect(screen.getByText(/couldn't load settings/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(refetch).toHaveBeenCalledOnce();
  });
});

describe("Profile form validation", () => {
  it("seeds fields from the current user", () => {
    renderWithProviders(<SettingsView />);
    expect(screen.getByLabelText(/display name/i)).toHaveValue("Jamie Lin");
    expect(screen.getByLabelText(/country/i)).toHaveValue("United States");
    expect(screen.getByLabelText(/skills/i)).toHaveValue("Rust, TypeScript");
  });

  // Regression: these four fields were validated but rendered no message,
  // so an over-length value failed silently with no feedback.
  it.each([
    ["display name", 81, /display name must be 80 characters or fewer/i],
    ["country", 61, /country must be 60 characters or fewer/i],
    ["bio", 281, /bio must be 280 characters or fewer/i],
  ])("surfaces the %s length error", async (label, length, message) => {
    renderWithProviders(<SettingsView />);
    const field = screen.getByLabelText(new RegExp(label, "i"));

    await userEvent.clear(field);
    await userEvent.paste("a".repeat(length));
    await userEvent.click(screen.getByRole("button", { name: /save profile/i }));

    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(updateProfile).not.toHaveBeenCalled();
    expect(field).toHaveAttribute("aria-invalid", "true");
  });

  it("rejects a malformed website", async () => {
    renderWithProviders(<SettingsView />);
    const website = screen.getByLabelText(/website/i);

    await userEvent.clear(website);
    await userEvent.type(website, "not a url");
    await userEvent.click(screen.getByRole("button", { name: /save profile/i }));

    expect(await screen.findByText(/enter a valid website/i)).toBeInTheDocument();
    expect(updateProfile).not.toHaveBeenCalled();
  });

  it("accepts a bare host and submits a trimmed payload", async () => {
    renderWithProviders(<SettingsView />);
    await userEvent.click(screen.getByRole("button", { name: /save profile/i }));

    await waitFor(() => expect(updateProfile).toHaveBeenCalledOnce());
    expect(updateProfile).toHaveBeenCalledWith({
      name: "Jamie Lin",
      bio: "Systems engineer.",
      country: "United States",
      website: "jamielin.dev",
      skills: ["Rust", "TypeScript"],
    });
  });

  // The backend treats null as "remove this value", so a cleared input must be
  // sent as null. Omitting it would leave the old value and make fields
  // impossible to clear once set.
  it("sends null for a field the user cleared", async () => {
    renderWithProviders(<SettingsView />);

    await userEvent.clear(screen.getByLabelText(/country/i));
    await userEvent.click(screen.getByRole("button", { name: /save profile/i }));

    await waitFor(() => expect(updateProfile).toHaveBeenCalledOnce());
    expect(updateProfile.mock.calls[0][0]).toMatchObject({ country: null });
  });
});

describe("Wallet form validation", () => {
  it("rejects an address that is not a 0x-prefixed 40 hex string", async () => {
    renderWithProviders(<SettingsView />);
    const wallet = screen.getByLabelText(/wallet address/i);

    await userEvent.clear(wallet);
    await userEvent.type(wallet, "0xnope");
    await userEvent.click(screen.getByRole("button", { name: /save wallet/i }));

    expect(await screen.findByText(/valid evm wallet address/i)).toBeInTheDocument();
    expect(updateWallet).not.toHaveBeenCalled();
  });

  it("submits a valid address", async () => {
    renderWithProviders(<SettingsView />);
    await userEvent.click(screen.getByRole("button", { name: /save wallet/i }));

    await waitFor(() => expect(updateWallet).toHaveBeenCalledOnce());
    expect(updateWallet).toHaveBeenCalledWith(
      "0x4f3b2a1c9d8e7f6a5b4c3d2e1f0a9b8c7d6e9a2c",
    );
  });
});
