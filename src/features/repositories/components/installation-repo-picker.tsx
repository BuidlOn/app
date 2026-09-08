"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Glyph } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/providers/toast-provider";
import {
  getInstallationRepositories,
  registerRepository,
} from "../api/repositories.api";

/**
 * Visible repo picker shown after the GitHub App install round-trip.
 * Lists exactly the repositories the user granted on GitHub's install
 * screen for this installation, so they can add them to the platform.
 */
export function InstallationRepoPicker({
  installationId,
}: {
  installationId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [adding, setAdding] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["installation-repos", installationId],
    queryFn: () => getInstallationRepositories(installationId),
  });

  const toggle = (fullName: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(fullName)) next.delete(fullName);
      else next.add(fullName);
      return next;
    });
  };

  const toggleAll = (fullNames: string[]) => {
    setSelected((prev) =>
      prev.size === fullNames.length ? new Set() : new Set(fullNames),
    );
  };

  const addSelected = async () => {
    if (selected.size === 0 || adding) return;
    setAdding(true);
    const names = [...selected];
    let ok = 0;
    let failed: string | null = null;
    for (const fullName of names) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await registerRepository(fullName);
        ok += 1;
      } catch (e) {
        failed = e instanceof Error ? e.message : "Registration failed.";
      }
    }
    setAdding(false);
    if (ok > 0) {
      toast({
        variant: "success",
        title: `${ok} ${ok === 1 ? "repository" : "repositories"} added`,
        description:
          failed ?? "They will appear once ownership is verified.",
      });
      router.push("/repositories");
    } else {
      toast({
        variant: "error",
        title: "Could not add repositories",
        description: failed ?? "Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 sm:p-8">
        <Skeleton className="mb-3 h-6 w-64" />
        <Skeleton className="mb-2 h-12 w-full" />
        <Skeleton className="mb-2 h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="flex flex-col items-center border-error bg-error/10 px-6 py-10 text-center">
        <Glyph name="shield" size={32} className="mb-3 text-error" />
        <p className="text-[14px] font-semibold text-on-surface">
          Couldn&apos;t load the repositories from this installation
        </p>
        <p className="mb-5 mt-1 text-[13px] text-on-surface-variant">
          The installation may have been removed, or the GitHub App isn&apos;t
          configured on the backend yet.
        </p>
        <Button type="button" variant="secondary" size="sm" onClick={() => refetch()}>
          Retry
        </Button>
      </Card>
    );
  }

  const available = data.filter((r) => !r.registered);
  const alreadyAdded = data.filter((r) => r.registered);

  return (
    <Card className="p-6 sm:p-8">
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="text-[15px] font-semibold text-on-surface">
          Step 2 — Choose repositories to add
        </p>
        {available.length > 0 && (
          <button
            type="button"
            onClick={() => toggleAll(available.map((r) => r.fullName))}
            className="shrink-0 font-mono-label text-[12px] font-bold uppercase text-primary hover:underline"
          >
            {selected.size === available.length ? "Clear all" : "Select all"}
          </button>
        )}
      </div>
      <p className="mb-5 text-[13px] text-on-surface-variant">
        These are the repositories you granted on GitHub just now. Tick the
        ones you want on the platform.
      </p>

      {data.length === 0 ? (
        <p className="rounded-[12px] border-[1.5px] border-outline/10 p-5 text-center text-[13.5px] text-on-surface-variant">
          No repositories were granted. Go back to GitHub and include at least
          one repository in the installation.
        </p>
      ) : (
        <ul className="mb-6 space-y-2.5">
          {data.map((repo) => (
            <li key={repo.githubId}>
              <label
                className={
                  repo.registered
                    ? "flex items-center gap-3 rounded-[12px] border-[1.5px] border-outline/10 bg-surface p-4 opacity-60"
                    : "flex cursor-pointer items-center gap-3 rounded-[12px] border-[1.5px] border-outline/10 p-4 transition-colors hover:border-outline/30"
                }
              >
                <input
                  type="checkbox"
                  disabled={repo.registered}
                  checked={repo.registered || selected.has(repo.fullName)}
                  onChange={() => toggle(repo.fullName)}
                  className="h-[18px] w-[18px] shrink-0 accent-[#161616]"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold text-on-surface">
                    {repo.fullName}
                  </span>
                  {repo.description && (
                    <span className="block truncate text-[12.5px] text-on-surface-variant">
                      {repo.description}
                    </span>
                  )}
                </span>
                {repo.private && (
                  <span className="shrink-0 rounded-full border border-outline/15 px-2 py-0.5 text-[11px] font-medium text-on-surface-variant">
                    Private
                  </span>
                )}
                {repo.registered && (
                  <span className="shrink-0 rounded-full border border-outline/15 bg-outline/5 px-2 py-0.5 text-[11px] font-bold text-on-surface-variant">
                    Added
                  </span>
                )}
              </label>
            </li>
          ))}
        </ul>
      )}

      {available.length > 0 && (
        <Button
          type="button"
          variant="primary"
          className="w-full justify-center"
          disabled={selected.size === 0 || adding}
          onClick={addSelected}
        >
          {adding
            ? "Adding..."
            : selected.size === 0
              ? "Select repositories to continue"
              : `Add ${selected.size} ${selected.size === 1 ? "repository" : "repositories"}`}
        </Button>
      )}
      {available.length === 0 && data.length > 0 && (
        <p className="text-center text-[13px] text-on-surface-variant">
          All {alreadyAdded.length === 1 ? "repository is" : "repositories are"} already on the platform.
        </p>
      )}
    </Card>
  );
}
