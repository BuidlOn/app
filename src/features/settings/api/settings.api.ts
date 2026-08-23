import { apiRequest, mockDelay, USE_MOCKS } from "@/services/api.client";
import { mockCurrentUser } from "@/services/mock/data";
import type { User } from "@/types/domain";

export interface ProfileUpdate {
  name: string | null;
  bio: string | null;
  country: string | null;
  website: string | null;
  skills: string[];
}

/** Update the current user's editable profile fields. */
export async function updateProfile(update: ProfileUpdate): Promise<User> {
  if (USE_MOCKS) {
    Object.assign(mockCurrentUser, update);
    return mockDelay({ ...mockCurrentUser }, 600);
  }
  return apiRequest<User>("/users", { method: "PATCH", body: update });
}

/** Connect / update the wallet address on the current user (legacy plain-text path). */
export async function updateWallet(walletAddress: string): Promise<User> {
  if (USE_MOCKS) {
    mockCurrentUser.walletAddress = walletAddress;
    return mockDelay({ ...mockCurrentUser }, 600);
  }
  return apiRequest<User>("/users", {
    method: "PATCH",
    body: { walletAddress },
  });
}

// ─── Wallet signature challenge / verify ──────────────────────────────────────

export interface WalletChallengeResponse {
  nonce: string;
  expiresAt: string;
}

/**
 * Request a one-time nonce from the backend that the user must sign with
 * their wallet private key (EIP-191 personal_sign).
 */
export async function walletChallenge(): Promise<WalletChallengeResponse> {
  if (USE_MOCKS) {
    return mockDelay(
      { nonce: `buidlon-nonce-mockabc123`, expiresAt: new Date(Date.now() + 300_000).toISOString() },
      300,
    );
  }
  return apiRequest<WalletChallengeResponse>("/auth/wallet/challenge", {
    method: "POST",
  });
}

/**
 * Submit the signed nonce to the backend for verification.
 * On success the backend binds the wallet address to the user's account.
 */
export async function walletVerify(
  address: string,
  signature: string,
): Promise<{ success: boolean; walletAddress: string }> {
  if (USE_MOCKS) {
    mockCurrentUser.walletAddress = address;
    return mockDelay({ success: true, walletAddress: address }, 600);
  }
  return apiRequest<{ success: boolean; walletAddress: string }>(
    "/auth/wallet/verify",
    { method: "POST", body: { address, signature } },
  );
}

