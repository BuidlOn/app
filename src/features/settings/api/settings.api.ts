import { apiRequest } from "@/services/api.client";
import type { User } from "@/types/domain";

/**
 * Editable profile fields.
 *
 * `null` means "clear this field" and the backend honours it, so a blank input
 * must be sent as null rather than omitted — otherwise a user can set a value
 * but never remove it.
 */
export interface ProfileUpdate {
  name: string | null;
  bio: string | null;
  country: string | null;
  website: string | null;
  skills: string[];
}

/** Update the current user's editable profile fields. */
export async function updateProfile(update: ProfileUpdate): Promise<User> {
  return apiRequest<User>("/users", { method: "PATCH", body: update });
}

/** Connect or update the payout wallet on the current user. */
export async function updateWallet(walletAddress: string): Promise<User> {
  return apiRequest<User>("/users", { method: "PATCH", body: { walletAddress } });
}
