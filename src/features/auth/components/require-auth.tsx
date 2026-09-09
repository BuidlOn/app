"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "../hooks/use-current-user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Glyph } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";

function GuardSkeleton() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
      <Skeleton className="h-10 w-64" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-buidl-lg" />
        ))}
      </div>
      <Skeleton className="h-72 rounded-buidl-lg" />
    </div>
  );
}

/**
 * Client-side protection for member routes.
 *
 * Deliberately not middleware: the `buidlon_token` cookie middleware reads
 * expires with the 15-minute access token, so a server-side guard would bounce
 * people who still hold a valid 7-day refresh token. Going through
 * `useCurrentUser` lets `apiRequest` refresh first and only fails if that
 * refresh genuinely fails. The API remains the real security boundary.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data: user, isSignedOut, isResolving } = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isSignedOut) return;
    const url = new URL("/login", window.location.origin);
    url.searchParams.set("redirect", pathname);
    router.replace(`${url.pathname}${url.search}`);
  }, [isSignedOut, pathname, router]);

  if (isResolving) return <GuardSkeleton />;

  if (isSignedOut || !user) {
    return (
      <Card className="mx-auto flex max-w-md flex-col items-center gap-4 p-10 text-center">
        <Glyph name="lock" size={32} className="text-on-surface-muted" />
        <div>
          <h1 className="font-page-title text-[19px] font-bold">Sign in to continue</h1>
          <p className="mt-1 text-[13.5px] text-on-surface-variant">
            Connect your GitHub account to view this page.
          </p>
        </div>
        <Button asChild size="sm">
          <a href="/login">Connect GitHub</a>
        </Button>
      </Card>
    );
  }

  return <>{children}</>;
}
