import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Glyph } from "@/components/ui/icons";
import { DifficultyBadge } from "@/components/ui/status-badges";
import { formatRelativeTime } from "@/utils/format";
import type { Issue, IssueDifficulty } from "@/types/domain";

/** The hover accent echoes the issue's difficulty tint. */
const LIFT_BY_DIFFICULTY: Record<IssueDifficulty, "tertiary" | "secondary" | "primary"> = {
  "Good First Issue": "tertiary",
  Documentation: "primary",
  "Bug Fix": "primary",
  Feature: "secondary",
  Architecture: "secondary",
  "Critical Bug": "tertiary",
  Security: "tertiary",
};

/** Flat status chip standing in for the Claim button when action isn't available. */
function StateChip({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5 rounded-buidl-pill bg-outline/[0.06] px-4 py-2.5 font-mono-label text-[12px] font-bold text-on-surface-variant">
      {icon && <Glyph name="issues" size={13} />}
      {children}
    </div>
  );
}

function ClaimAction({
  issue,
  currentUserId,
}: {
  issue: Issue;
  currentUserId?: string;
}) {
  if (issue.status === "AVAILABLE") {
    return (
      <Button asChild variant="primary" size="sm" className="w-full">
        <Link href={`/issues/${issue.id}`}>Apply</Link>
      </Button>
    );
  }

  if (issue.claimExpiresAt && issue.claimedBy?.id === currentUserId) {
    return (
      <StateChip icon>Applied until {formatRelativeTime(issue.claimExpiresAt)}</StateChip>
    );
  }
  if (issue.claimedBy?.id === currentUserId)
    return (
      <StateChip>Applied by you</StateChip>
    );
  if (issue.claimedBy) return <StateChip>Applied by another dev</StateChip>;

  return <StateChip>{issue.status.replace(/_/g, " ")}</StateChip>;
}

export function IssueCard({
  issue,
  currentUserId,
}: {
  issue: Issue;
  currentUserId?: string;
}) {
  const claimedByOther =
    issue.status !== "AVAILABLE" && !!issue.claimedBy && issue.claimedBy.id !== currentUserId;

  return (
    <Card
      as="article"
      lift={claimedByOther ? "none" : LIFT_BY_DIFFICULTY[issue.difficulty]}
      className={cn("flex flex-col p-6", claimedByOther && "opacity-75")}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="font-mono-label text-[11px] text-on-surface-muted">
          {issue.repository.fullName}
        </span>
        <DifficultyBadge difficulty={issue.difficulty} size="sm" />
      </div>

      <h3 className="mb-6 flex-1 text-[16px] font-bold leading-snug text-on-surface">
        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
      </h3>

      <div className="mb-4 flex items-center justify-between gap-4 border-t-[1.5px] border-outline/10 pt-4">
        <div>
          <div className="font-mono-label text-[10px] uppercase text-on-surface-muted">
            Reward
          </div>
          <div className="font-mono-label text-[15px] font-bold text-points">
            {issue.basePoints} pts
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono-label text-[10px] uppercase text-on-surface-muted">
            Language
          </div>
          <div className="font-mono-label text-[13px]">{issue.language ?? "—"}</div>
        </div>
      </div>

      <ClaimAction issue={issue} currentUserId={currentUserId} />
    </Card>
  );
}
