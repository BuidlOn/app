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


