"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { StatusPip } from "@/components/ui/status-pip";
import { DifficultyBadge } from "@/components/ui/status-badges";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useIssueDetail } from "../hooks/use-issue-detail";
import { useReleaseClaim } from "../hooks/use-claim-issue";
import { ClaimIssueDialog } from "./claim-issue-dialog";
import { IssueDetailSidebar } from "./issue-detail-sidebar";
import type { IssueDetail } from "../types";

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-container-padding">
      <Skeleton className="mb-4 h-4 w-48" />
      <Skeleton className="mb-4 h-10 w-2/3" />
      <Skeleton className="mb-8 h-6 w-80" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <Skeleton className="h-96 lg:col-span-8" />
        <div className="space-y-6 lg:col-span-4">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    </div>
  );
}

function IssueActions({ issue, currentUserId }: { issue: IssueDetail; currentUserId?: string }) {
  const release = useReleaseClaim(issue.id);
  const mineClaimed = issue.status !== "AVAILABLE" && issue.claimedBy?.id === currentUserId;

  if (issue.status === "AVAILABLE") return <ClaimIssueDialog issue={issue} />;

  if (mineClaimed) {
    return (
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <span className="flex items-center justify-center gap-2 border border-primary px-6 py-3 font-mono-label text-sm font-bold uppercase tracking-widest text-primary">
          <Icon name="check_circle" className="text-base" filled />
          Claimed by you
        </span>
        <button
          type="button"
          onClick={() => release.mutate()}
          disabled={release.isPending}
          className="border border-outline-variant px-6 py-3 font-mono-label text-sm font-bold uppercase tracking-widest transition-colors hover:bg-surface-container disabled:opacity-60"
        >
          {release.isPending ? "Releasing..." : "Release"}
        </button>
      </div>
    );
  }

  return (
    <span className="border border-outline-variant bg-surface-container-low px-6 py-3 font-mono-label text-sm font-bold uppercase tracking-widest text-on-surface-variant">
      {issue.status.replace(/_/g, " ")}
    </span>
  );
}

export function IssueDetailView({ issueId }: { issueId: string }) {
  const { data: user } = useCurrentUser();
  const { data: issue, isLoading, isError, refetch } = useIssueDetail(issueId);

  if (isLoading) return <DetailSkeleton />;

  if (isError || !issue) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-4 p-8 text-center">
        <Icon name="error_outline" className="text-5xl text-error" />
        <h2 className="font-section-heading text-section-heading text-on-surface">
          Issue not found
        </h2>
        <p className="font-body text-on-surface-variant">
          This issue may have been closed on GitHub or removed from the marketplace.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="border border-outline-variant px-6 py-2 font-mono-label text-mono-label uppercase hover:bg-surface-container"
          >
            Retry
          </button>
          <Link
            href="/issues"
            className="bg-primary-container px-6 py-2 font-mono-label text-mono-label uppercase text-on-primary-container"
          >
            Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const [owner, repoName] = issue.repository.fullName.split("/");
  const open = issue.status === "AVAILABLE";

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-container-padding">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 font-caption text-caption">
        <Link href="/issues" className="text-on-surface-variant hover:text-primary">
          issues
        </Link>
        <Icon name="chevron_right" className="text-xs text-outline" />
        <span className="text-on-surface-variant">{owner}</span>
        <Icon name="chevron_right" className="text-xs text-outline" />
        <span className="text-on-surface-variant">{repoName}</span>
        <Icon name="chevron_right" className="text-xs text-outline" />
        <span className="text-primary">#{issue.githubNumber}</span>
      </nav>

      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <h1 className="mb-4 font-page-title text-page-title text-on-surface">
            {issue.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <DifficultyBadge difficulty={issue.difficulty} />
            <Badge variant="primary">{issue.basePoints} pts</Badge>
            {issue.language && <Badge variant="outline">{issue.language}</Badge>}
            <span className="ml-2 flex items-center gap-1.5">
              <StatusPip tone={open ? "success" : "warning"} pulse={open} />
              <span className="font-caption text-caption font-medium text-on-surface-variant">
                {open ? "Open" : issue.status.replace(/_/g, " ")}
              </span>
            </span>
            <a
              href={issue.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 font-caption text-caption text-primary hover:underline"
            >
              <Icon name="open_in_new" className="text-xs" />
              View on GitHub
            </a>
          </div>
        </div>
        <IssueActions issue={issue} currentUserId={user?.id} />
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <section className="border border-outline-variant bg-surface p-6 sm:p-8">
            <h2 className="mb-4 border-b border-outline-variant pb-2 font-section-heading text-section-heading text-on-surface">
              Summary
            </h2>
            <p className="mb-6 font-body text-body text-on-surface-variant">
              {issue.description}
            </p>

            <h2 className="mb-4 font-section-heading text-section-heading text-on-surface">
              Objectives
            </h2>
            <ul className="mb-6 list-disc space-y-2 pl-5 font-body text-body text-on-surface-variant">
              {issue.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>

            {issue.acceptanceCriteria && (
              <>
                <h2 className="mb-4 font-section-heading text-section-heading text-on-surface">
                  Acceptance Criteria
                </h2>
                <div className="border-l-4 border-primary bg-primary-container/5 p-4">
                  <p className="font-caption text-caption italic text-on-surface">
                    {issue.acceptanceCriteria}
                  </p>
                </div>
              </>
            )}

            {issue.labels.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2 border-t border-outline-variant pt-6">
                {issue.labels.map((label) => (
                  <Badge key={label} variant="outline">
                    {label}
                  </Badge>
                ))}
              </div>
            )}
          </section>

          <section className="border border-outline-variant bg-surface p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon name="forum" className="text-on-surface-variant" />
              <span className="font-section-heading leading-none text-on-surface">
                Activity
              </span>
            </div>
            <p className="font-caption text-caption text-on-surface-variant">
              Discussion lives on GitHub. The contribution timeline updates here as
              your pull request moves through review.
            </p>
          </section>
        </div>

        <IssueDetailSidebar issue={issue} />
      </div>
    </div>
  );
}
