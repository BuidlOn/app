"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/auth.api";
import { ApiError, hasStoredSession } from "@/services/api.client";

/**
 * Whether a token is stored. Starts as `null` so the server render and the
 * first client render agree, then resolves once mounted.
 */
function useHasSession(): boolean | null {
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  useEffect(() => setHasSession(hasStoredSession()), []);
  return hasSession;
}

/**
 * Current authenticated user. Powers the header, greeting, and gated UI.
 *
 * The query stays disabled until a token exists, so public pages (landing,
 * login) never fire a request that is certain to 401.
 */
export function useCurrentUser() {
  const hasSession = useHasSession();

  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    enabled: hasSession === true,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      // apiRequest already tried a silent refresh; a 401 here is terminal.
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  return {
    ...query,
    /** No token at all, or the session was rejected. */
    isSignedOut:
      hasSession === false ||
      (query.error instanceof ApiError &&
        (query.error.status === 401 || query.error.status === 403)),
    /** Still deciding: token presence unknown, or the session is in flight. */
    isResolving: hasSession === null || (hasSession && query.isLoading),
  };
}
