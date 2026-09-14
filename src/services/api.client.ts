import type { ApiResponse } from "@/types/api";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors: string[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  /** Internal: set on retry to avoid infinite refresh loops. */
  _retried?: boolean;
}

function buildUrl(path: string, params?: RequestOptions["params"]) {
  if (!API_BASE_URL) {
    // Without this the URL constructor throws a bare "Invalid URL", which is
    // impossible to trace back to a missing deployment variable.
    throw new ApiError(
      "NEXT_PUBLIC_API_BASE_URL is not set, so the app cannot reach the API.",
      0,
    );
  }

  // Using `new URL(relativePath, base)` drops any path segments that exist on
  // the base (e.g. `new URL("issues", "https://api.example.com/v1/")` resolves
  // to `https://api.example.com/issues`, silently losing `/v1`). Instead we
  // do a manual join so the base-path prefix is always preserved.
  const base = API_BASE_URL.replace(/\/+$/, ""); // strip trailing slashes
  const endpoint = path.startsWith("/") ? path : `/${path}`; // ensure leading slash
  const raw = `${base}${endpoint}`;

  // Append query params via a URL object (handles encoding correctly).
  const url = new URL(raw);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

const ACCESS_KEY = "buidlon.accessToken";
const REFRESH_KEY = "buidlon.refreshToken";

/** True when a session token is stored. Used to avoid guaranteed-401 fetches. */
export function hasStoredSession(): boolean {
  return getAccessToken() !== null;
}

function getAccessToken(): string | null {
  return typeof window !== "undefined"
    ? window.localStorage.getItem(ACCESS_KEY)
    : null;
}

/** Persist a fresh token pair (localStorage for fetch + cookie for Edge middleware). */
export function persistAuthTokens(accessToken: string, refreshToken?: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_KEY, accessToken);
  if (refreshToken) {
    window.localStorage.setItem(REFRESH_KEY, refreshToken);
  }
  // Keep the middleware cookie in sync — it only guards /admin but must not go stale.
  const maxAge = 15 * 60; // 15 minutes — matches backend access-token expiry
  document.cookie = `buidlon_token=${accessToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/** Drop all local session state (used when refresh fails or user logs out). */
export function clearAuthTokens(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_KEY);
  window.localStorage.removeItem(REFRESH_KEY);
  document.cookie = "buidlon_token=; path=/; max-age=0; SameSite=Lax";
}

// Shared in-flight refresh so parallel 401s trigger only one /auth/refresh call.
let refreshPromise: Promise<string | null> | null = null;

function refreshAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const rt = window.localStorage.getItem(REFRESH_KEY);
        if (!rt) return null;
        const res = await fetch(buildUrl("/auth/refresh", { token: rt }), {
          method: "POST",
        });
        const payload = (await res.json()) as ApiResponse<{
          accessToken: string;
          refreshToken: string;
        }>;
        if (!res.ok || !payload.success) return null;
        persistAuthTokens(payload.data.accessToken, payload.data.refreshToken);
        return payload.data.accessToken;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

/**
 * Thin wrapper over fetch that unwraps the backend's `{ success, data }`
 * envelope and throws a typed ApiError on failure.
 *
 * On 401 it silently tries the refresh token once (7-day lifetime) and
 * retries the original request, so short-lived 15-minute access tokens
 * don't force a full GitHub login on every return visit.
 */
export async function apiRequest<T>(
  path: string,
  { method = "GET", body, params, headers, _retried = false, ...rest }: RequestOptions = {},
): Promise<T> {
  const token = getAccessToken();

  const res = await fetch(buildUrl(path, params), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...rest,
  });

  let payload: ApiResponse<T>;
  try {
    payload = (await res.json()) as ApiResponse<T>;
  } catch {
    throw new ApiError("Unexpected server response.", res.status);
  }

  // Access token expired? Try one silent refresh (never for the refresh call itself).
  if (res.status === 401 && !_retried && path !== "/auth/refresh") {
    const fresh = await refreshAccessToken();
    if (fresh) {
      return apiRequest<T>(path, {
        method,
        body,
        params,
        headers,
        _retried: true,
        ...rest,
      });
    }
    clearAuthTokens();
  }

  if (!res.ok || !payload.success) {
    const message = payload.success ? "Request failed." : payload.message;
    const errors = payload.success ? [] : payload.errors;
    throw new ApiError(message, res.status, errors);
  }

  return payload.data;
}
