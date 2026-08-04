import { IssueCard } from "./issue-card";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import type { Issue } from "@/types/domain";

const GRID = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";

function IssueCardSkeleton() {
  return (
    <div className="border border-outline-variant bg-surface p-6">
      <div className="mb-4 flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-12 h-4 w-2/3" />
      <div className="flex justify-between border-t border-outline-variant pt-6">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-16" />
      </div>
      <Skeleton className="mt-6 h-10 w-full" />
    </div>
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
      <div className="border border-error bg-error-container/10 p-12 text-center">
        <Icon name="warning" className="mb-4 text-4xl text-error" />
        <p className="mb-6 font-body font-bold uppercase text-on-surface">
          Failed to fetch issues.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="bg-error px-6 py-2 font-mono-label text-sm font-bold uppercase text-on-error hover:brightness-110"
        >
          Retry
        </button>
      </div>
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
      <div className="border border-outline-variant bg-surface-container-low p-20 text-center">
        <Icon name="search_off" className="mb-4 text-6xl text-on-surface-variant" />
        <h3 className="mb-2 font-section-heading text-xl font-bold">
          No issues found.
        </h3>
        <p className="mb-6 font-body text-on-surface-variant">
          Try changing filters to find more opportunities.
        </p>
        <button
          type="button"
          onClick={onClear}
          className="border border-primary px-6 py-2 font-mono-label text-sm uppercase text-primary transition-colors hover:bg-primary/10"
        >
          Clear Filters
        </button>
      </div>
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
