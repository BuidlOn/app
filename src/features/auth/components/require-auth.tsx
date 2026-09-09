"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../auth-context";
import { rememberPostLoginPath } from "../redirect";
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
 * Client-side route protection. The API is the real security boundary — this
 * exists so members are sent to login instead of watching every panel fail,
 * and so non-admins never see the admin console shell.
 */
export function RequireAuth({
  children,
  role,
}: {
  children: React.ReactNode;
  /** Require a specific role on top of being signed in. */
  role?: "admin";
}) {
  const { status, user, login } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status !== "unauthenticated") return;
    // Preserve where they were headed so login can return them there.
    rememberPostLoginPath(pathname);
    router.replace("/login");
  }, [status, pathname, router]);

  if (status === "loading") return <GuardSkeleton />;

  if (status === "unauthenticated") {
    return (
      <Card className="mx-auto flex max-w-md flex-col items-center gap-4 p-10 text-center">
        <Glyph name="lock" size={32} className="text-on-surface-muted" />
        <div>
          <h1 className="font-page-title text-[19px] font-bold">Sign in to continue</h1>
          <p className="mt-1 text-[13.5px] text-on-surface-variant">
            Connect your GitHub account to view this page.
          </p>
        </div>
        <Button type="button" onClick={login} size="sm">
          Connect GitHub
        </Button>
      </Card>
    );
  }

  if (role === "admin" && user?.role !== "admin") {
    return (
      <Card className="mx-auto flex max-w-md flex-col items-center gap-4 p-10 text-center">
        <Glyph name="shield" size={32} className="text-on-surface-muted" />
        <div>
          <h1 className="font-page-title text-[19px] font-bold">Admins only</h1>
          <p className="mt-1 text-[13.5px] text-on-surface-variant">
            Your account doesn&apos;t have permission to open the admin console.
          </p>
        </div>
        <Button asChild variant="secondary" size="sm">
          <a href="/dashboard">Back to dashboard</a>
        </Button>
      </Card>
    );
  }

  return <>{children}</>;
}
