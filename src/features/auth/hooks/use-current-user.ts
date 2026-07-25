"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/auth.api";

/** Current authenticated user. Powers the header, greeting, and gated UI. */
export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
}
