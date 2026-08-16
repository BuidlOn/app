import { IssueCard } from "./issue-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Glyph } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import type { Issue } from "@/types/domain";

const GRID = "grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3";

function IssueCardSkeleton() {
  return (
    <Card className="p-6">
      <div className="mb-4 flex justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-20 rounded-full" />
      </div>
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-10 h-4 w-2/3" />
      <div className="flex justify-between border-t-[1.5px] border-outline/10 pt-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-16" />
      </div>
      <Skeleton className="mt-4 h-10 w-full rounded-full" />
    </Card>
  );
}

/** Shared shape for the empty and error states. */
function GridMessage({
  icon,
  title,
  body,
  action,
}: {
  icon: "search" | "shield";
  title: string;
  body: string;
  action: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col items-center px-6 py-16 text-center">
      <Glyph name={icon} size={36} className="mb-4 text-on-surface-muted" />
      <h3 className="font-display text-[19px] font-bold">{title}</h3>
      <p className="mb-6 mt-1.5 max-w-sm text-[13.5px] text-on-surface-variant">{body}</p>
      {action}
    </Card>
  );
}

export function IssueGrid({
  issues,
  loading,
  error,
  onRetry,
  onClear,
  currentUserId,
}: {
  issues?: Issue[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  onClear: () => void;
  currentUserId?: string;
}) {
  if (error) {
    return (
      <GridMessage
        icon="shield"
        title="Failed to fetch issues"
        body="The marketplace didn't respond. Check your connection and try again."
        action={
          <Button type="button" variant="secondary" size="sm" onClick={onRetry}>
            Retry
          </Button>
        }
      />
    );
  }

  if (loading) {
    return (
      <div className={GRID}>
        {Array.from({ length: 6 }).map((_, i) => (
          <IssueCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!issues || issues.length === 0) {
    return (
      <GridMessage
        icon="search"
        title="No issues found"
        body="Try changing filters to find more opportunities."
        action={
          <Button type="button" variant="secondary" size="sm" onClick={onClear}>
            Clear filters
          </Button>
        }
      />
    );
  }

  return (
    <div className={GRID}>
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} currentUserId={currentUserId} />
      ))}
    </div>
  );
}
