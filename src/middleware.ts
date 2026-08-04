import { NextRequest, NextResponse } from "next/server";

/**
 * Temporary protection for the admin console.
 *
 * There is no real auth yet, so `/admin` is gated behind HTTP Basic Auth using
 * env credentials. When `ADMIN_USER` / `ADMIN_PASSWORD` are unset (e.g. local
 * dev) the gate is open. On the hosted deployment, set both in the host's env
 * to require a password. Replace this with role-based checks once GitHub OAuth
 * lands (admin = users whose `/auth/me` role is "admin").
 */
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  // Not configured -> leave the route open (keeps local dev frictionless).
  if (!user || !password) return NextResponse.next();

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const sep = decoded.indexOf(":");
    const u = decoded.slice(0, sep);
    const p = decoded.slice(sep + 1);
    if (u === user && p === password) return NextResponse.next();
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="BuidlOn Admin", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
