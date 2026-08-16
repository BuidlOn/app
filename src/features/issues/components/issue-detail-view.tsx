"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { StatusPip } from "@/components/ui/status-pip";
import { DifficultyBadge } from "@/components/ui/status-badges";
import { Card } from "@/components/ui/card";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useIssueDetail } from "../hooks/use-issue-detail";
import { useReleaseClaim } from "../hooks/use-claim-issue";
import { ClaimIssueDialog } from "./claim-issue-dialog";
import { IssueDetailSidebar } from "./issue-detail-sidebar";
import type { IssueDetail } from "../types";

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] p-4 sm:p-container-padding">
      <Skeleton className="mb-4 h-4 w-48" />
      <Skeleton className="mb-4 h-10 w-2/3" />
      <Skeleton className="mb-8 h-6 w-80" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <Skeleton className="h-[400px] rounded-[20px] lg:col-span-8" />
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Skeleton className="h-[200px] rounded-[20px]" />
          <Skeleton className="h-[200px] rounded-[20px]" />
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
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <span className="flex items-center justify-center gap-2 rounded-full border-[1.5px] border-primary px-[20px] py-[10px] font-mono-label text-[12px] font-bold uppercase tracking-widest text-primary">
          <Icon name="check_circle" className="text-[16px]" filled />
          Claimed by you
        </span>
        <button
          type="button"
          onClick={() => release.mutate()}
          disabled={release.isPending}
          className="rounded-full border-[2px] border-ink bg-surface px-[24px] py-[10px] font-mono-label text-[13px] font-bold text-ink transition-all shadow-brutal-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-60"
        >
          {release.isPending ? "Releasing..." : "Release"}
        </button>
      </div>
    );
  }

  return (
    <span className="rounded-full border-[1.5px] border-outline/10 bg-outline/5 px-[20px] py-[10px] font-mono-label text-[12px] font-bold uppercase tracking-widest text-on-surface-variant">
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
      <div className="mx-auto flex min-h-[60vh] max-w-[720px] flex-col items-center justify-center gap-4 p-8 text-center">
        <Icon name="error_outline" className="text-[48px] text-error" />
        <h2 className="m-0 font-page-title text-[24px] font-bold text-on-surface">
          Issue not found
        </h2>
        <p className="m-0 text-[15px] text-on-surface-variant">
          This issue may have been closed on GitHub or removed from the marketplace.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-full border-[2px] border-ink bg-surface px-6 py-3 font-mono-label text-[13px] font-bold transition-all shadow-brutal-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Retry
          </button>
          <Link
            href="/issues"
            className="inline-flex rounded-full bg-ink px-6 py-3 font-mono-label text-[13px] font-bold text-white transition-all shadow-brutal-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
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
    <div className="mx-auto max-w-[1400px] p-4 sm:p-container-padding">
      <nav aria-label="Breadcrumb" className="mb-[16px] flex items-center gap-[8px] font-mono-label text-[11px] uppercase tracking-widest text-on-surface-muted">
        <Link href="/issues" className="hover:text-primary">
          issues
        </Link>
        <Icon name="chevron_right" className="text-[14px] text-outline/40" />
        <span>{owner}</span>
        <Icon name="chevron_right" className="text-[14px] text-outline/40" />
        <span>{repoName}</span>
        <Icon name="chevron_right" className="text-[14px] text-outline/40" />
        <span className="text-primary-deep">#{issue.githubNumber}</span>
      </nav>

      <div className="mb-[32px] flex flex-col gap-[24px] lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-[800px]">
          <h1 className="m-0 mb-[16px] font-page-title text-[32px] font-bold leading-tight text-on-surface">
            {issue.title}
          </h1>
          <div className="flex flex-wrap items-center gap-[12px]">
            <DifficultyBadge difficulty={issue.difficulty} />
            <Badge variant="primary">{issue.basePoints} pts</Badge>
            {issue.language && <Badge variant="outline">{issue.language}</Badge>}
            <span className="ml-[8px] flex items-center gap-[6px]">
              <StatusPip tone={open ? "success" : "warning"} pulse={open} />
              <span className="font-mono-label text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                {open ? "Open" : issue.status.replace(/_/g, " ")}
              </span>
            </span>
            <a
              href={issue.url}
              target="_blank"
              rel="noreferrer"
              className="ml-[8px] flex items-center gap-[4px] font-mono-label text-[11px] font-bold uppercase tracking-widest text-primary hover:underline"
            >
              <Icon name="open_in_new" className="text-[14px]" />
              View on GitHub
            </a>
          </div>
        </div>
        <IssueActions issue={issue} currentUserId={user?.id} />
      </div>

      <div className="grid grid-cols-1 items-start gap-[32px] lg:grid-cols-12">
        <div className="flex flex-col gap-[32px] lg:col-span-8">
          <Card className="p-[24px] sm:p-[32px]">
            <h2 className="m-0 mb-[16px] border-b-[1.5px] border-outline/10 pb-[12px] font-page-title text-[21px] font-bold text-on-surface">
              Summary
            </h2>
            <p className="m-0 mb-[24px] text-[15px] leading-relaxed text-on-surface-variant">
              {issue.description}
            </p>

            <h2 className="m-0 mb-[16px] font-page-title text-[21px] font-bold text-on-surface">
              Objectives
            </h2>
            <ul className="m-0 mb-[24px] flex list-disc flex-col gap-[8px] pl-[20px] text-[15px] text-on-surface-variant">
              {issue.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>

            {issue.acceptanceCriteria && (
              <>
                <h2 className="m-0 mb-[16px] font-page-title text-[21px] font-bold text-on-surface">
                  Acceptance criteria
                </h2>
                <div className="rounded-[12px] border-[1.5px] border-primary-deep/60 bg-primary/10 p-[16px]">
                  <p className="m-0 text-[13.5px] italic text-on-surface">
                    {issue.acceptanceCriteria}
                  </p>
                </div>
              </>
            )}

            {issue.labels.length > 0 && (
              <div className="mt-[24px] flex flex-wrap gap-[8px] border-t-[1.5px] border-outline/10 pt-[24px]">
                {issue.labels.map((label) => (
                  <Badge key={label} variant="outline">
                    {label}
               </Badge>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-[24px]">
            <div className="mb-[16px] flex items-center gap-[8px]">
              <Icon name="forum" className="text-[20px] text-on-surface-variant" />
              <span className="font-page-title text-[19px] font-bold leading-none text-on-surface">
                Activity
              </span>
            </div>
            <p className="m-0 text-[13.5px] text-on-surface-variant">
              Discussion lives on GitHub. The contribution timeline updates here as
              your pull request moves through review.
            </p>
          </Card>
        </div>

        <IssueDetailSidebar issue={issue} />
      </div>
    </div>
  );
}
