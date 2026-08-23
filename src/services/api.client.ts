import type { ApiResponse } from "@/types/api";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/**
 * Mocks are used when explicitly enabled or when no backend URL is configured.
 * This lets the frontend be developed independently of the backend.
 */
export const USE_MOCKS =
  process.env.NEXT_PUBLIC_USE_MOCKS === "true" || API_BASE_URL === "";

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
}

function buildUrl(path: string, params?: RequestOptions["params"]) {
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

/**
 * Thin wrapper over fetch that unwraps the backend's `{ success, data }`
 * envelope and throws a typed ApiError on failure.
 */
export async function apiRequest<T>(
  path: string,
  { method = "GET", body, params, headers, ...rest }: RequestOptions = {},
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("buidlon.accessToken")
      : null;

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

  if (!res.ok || !payload.success) {
    const message = payload.success ? "Request failed." : payload.message;
    const errors = payload.success ? [] : payload.errors;
    throw new ApiError(message, res.status, errors);
  }

  return payload.data;
}

/** Small helper to simulate network latency for the mock layer. */
export function mockDelay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}
