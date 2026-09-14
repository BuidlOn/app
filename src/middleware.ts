import { NextRequest, NextResponse } from "next/server";

/**
 * Admin route protection — reads the JWT access token from the `buidlon_token`
 * cookie set at auth/callback, decodes and verifies the signature using the
 * Web Crypto API (Edge-runtime compatible), then checks the `role` claim.
 *
 * Flow:
 *  - No token  → redirect to /login?redirect=/admin
 *  - Valid token, role !== "ADMIN"  → redirect to /403
 *  - Valid token, role === "ADMIN"  → allow
 *  - Token present but signature invalid / expired → redirect to /login
 */

/**
 * Must match the backend's signing secret. There is deliberately no fallback:
 * a default committed to this repo would be public, so an unset value fails
 * closed (nobody reaches /admin) rather than open (anyone can mint a token
 * signed with the known default and render the console shell).
 */
const JWT_SECRET = process.env.JWT_SECRET;

/** Decode a base64url string into a Uint8Array (Edge-safe). */
function base64urlDecode(str: string): Uint8Array {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

/**
 * Verify a HS256 JWT using the Web Crypto API.
 * Returns the decoded payload on success, null on any failure.
 */
async function verifyJwt(token: string): Promise<{ sub: string; role: string; exp: number } | null> {
  if (!JWT_SECRET) {
    console.error(
      "[middleware] JWT_SECRET is not set — refusing all /admin access. " +
        "Set it to the backend's signing secret in the deployment environment.",
    );
    return null;
  }
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, sigB64] = parts;

    // Import the secret as a CryptoKey for HMAC-SHA256
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );

    // Verify signature over "header.payload"
    const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const sig = base64urlDecode(sigB64);
    // crypto.subtle.verify requires a concrete ArrayBuffer (not ArrayBufferLike)
    const sigBuffer = sig.buffer.slice(sig.byteOffset, sig.byteOffset + sig.byteLength) as ArrayBuffer;
    const valid = await crypto.subtle.verify("HMAC", key, sigBuffer, data);
    if (!valid) return null;

    // Decode payload
    const payload = JSON.parse(
      new TextDecoder().decode(base64urlDecode(payloadB64)),
    ) as { sub: string; role: string; exp: number };

    // Check expiry
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("buidlon_token")?.value;

  // No token — send to login with a redirect param so they come back after auth
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = await verifyJwt(token);

  // Invalid or expired token
  if (!payload) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Valid token but not an admin
  if (payload.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // All checks passed — allow the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
