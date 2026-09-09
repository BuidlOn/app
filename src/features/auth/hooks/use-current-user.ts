"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth-context";
import type { User } from "@/types/domain";

/**
 * Current authenticated user, read from the auth context so there is exactly
 * one session query in the app. Keeps a react-query-shaped return value so
 * screens can treat it like any other data hook.
 */
export function useCurrentUser(): {
  data: User | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
} {
  const { user, status } = useAuth();
  const queryClient = useQueryClient();

  return {
    data: user,
    isLoading: status === "loading",
    // A signed-out visitor is not an error; the route guard handles that case.
    isError: false,
    refetch: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  };
}
