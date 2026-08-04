import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { DifficultyBadge } from "@/components/ui/status-badges";
import { formatRelativeTime } from "@/utils/format";
import type { Issue } from "@/types/domain";

function ClaimAction({
  issue,
  currentUserId,
}: {
  issue: Issue;
  currentUserId?: string;
}) {
  if (issue.status === "AVAILABLE") {
    return (
      <Link
        href={`/issues/${issue.id}`}
        className="mt-6 block w-full bg-primary-container py-2 text-center font-mono-label text-sm font-bold uppercase tracking-widest text-on-primary-container transition-all hover:brightness-110"
      >
        Claim
      </Link>
    );
  }

  if (issue.claimedBy && issue.claimedBy.id === currentUserId) {
    if (issue.claimExpiresAt) {
      return (
        <div className="mt-6 flex w-full items-center justify-center gap-2 border border-primary py-2 text-center font-mono-label text-sm font-bold uppercase tracking-widest text-primary">
          <Icon name="schedule" className="text-sm" />
          Claimed until {formatRelativeTime(issue.claimExpiresAt)}
        </div>
      );
    }
    return (
      <div className="mt-6 w-full border border-outline-variant bg-surface-container-low py-2 text-center font-mono-label text-sm font-bold uppercase tracking-widest text-on-surface-variant">
        Claimed by you
      </div>
    );
  }

  return (
    <div className="mt-6 w-full border border-outline-variant bg-surface-container-low py-2 text-center font-mono-label text-sm font-bold uppercase tracking-widest text-on-surface-variant">
      {issue.status.replace(/_/g, " ")}
    </div>
  );
}

export function IssueCard({
  issue,
  currentUserId,
}: {
  issue: Issue;
  currentUserId?: string;
}) {
  const claimedByOther =
    issue.status !== "AVAILABLE" && issue.claimedBy?.id !== currentUserId;

  return (
    <article
      className={cn(
        "flex flex-col border border-outline-variant bg-surface p-6 transition-colors hover:border-primary",
        claimedByOther && "opacity-80",
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <span className="font-mono-label text-[11px] text-on-surface-variant">
          {issue.repository.fullName}
        </span>
        <DifficultyBadge difficulty={issue.difficulty} />
      </div>

      <h3 className="mb-6 flex-1 font-body text-lg font-bold text-on-surface">
        <Link href={`/issues/${issue.id}`} className="hover:text-primary">
          {issue.title}
        </Link>
      </h3>

      <div className="mt-auto flex items-center justify-between border-t border-outline-variant pt-6">
        <div>
          <p className="font-mono-label text-[10px] uppercase text-on-surface-variant">
            Reward
          </p>
          <p className="font-mono-label text-body font-bold text-primary">
            {issue.basePoints} pts
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono-label text-[10px] uppercase text-on-surface-variant">
            Language
          </p>
          <p className="font-mono-label text-caption">{issue.language ?? "—"}</p>
        </div>
      </div>

      <ClaimAction issue={issue} currentUserId={currentUserId} />
    </article>
  );
}
