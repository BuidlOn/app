import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { StatusBadge } from "@/components/ui/status-badges";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRelativeTime } from "@/utils/format";
import type { Contribution } from "@/types/domain";

function ContributionCard({ contribution }: { contribution: Contribution }) {
  const resumable =
    contribution.status === "CLAIMED" || contribution.status === "IN_PROGRESS";

  return (
    <div className="group flex flex-col justify-between border border-outline-variant bg-surface p-5 transition-all hover:border-primary">
      <div>
        <div className="mb-4 flex items-start justify-between gap-2">
          <span className="border border-primary-container px-2 py-0.5 font-mono-label text-mono-label text-primary-container">
            {contribution.repository.fullName}
          </span>
          <StatusBadge status={contribution.status} />
        </div>
        <h4 className="mb-2 font-body text-body font-bold text-on-surface">
          {contribution.issue.title}
        </h4>
        <p className="font-caption text-caption text-on-surface-variant">
          {contribution.issue.difficulty}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="font-mono-label text-[10px] text-on-surface-variant">
          Updated {formatRelativeTime(contribution.updatedAt)}
        </span>
        {resumable ? (
          <Link
            href={`/contributions/${contribution.id}`}
            className="bg-on-surface px-4 py-1.5 text-sm font-bold text-background transition-colors hover:bg-primary"
          >
            RESUME
          </Link>
        ) : (
          <a
            href={contribution.prUrl ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="border border-outline-variant px-4 py-1.5 text-sm font-bold text-on-surface transition-colors hover:bg-surface-container"
          >
            VIEW_PR
          </a>
        )}
      </div>
    </div>
  );
}

export function ContinueProgress({
  contributions,
  loading,
}: {
  contributions?: Contribution[];
  loading: boolean;
}) {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2 font-section-heading text-section-heading text-on-surface">
        <Icon name="history" className="text-primary" filled />
        Continue Progress
      </h3>

      {loading || !contributions ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-44 w-full" />
          ))}
        </div>
      ) : contributions.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-outline-variant bg-surface px-4 py-16 text-center">
          <Icon name="rocket_launch" className="mb-4 text-4xl text-outline-variant" />
          <p className="font-body text-body font-bold text-on-surface">
            Nothing in progress
          </p>
          <p className="mt-1 font-caption text-caption text-on-surface-variant">
            Claim an issue from the marketplace to start your contribution timer.
          </p>
          <Link
            href="/issues"
            className="mt-6 border border-outline-variant px-6 py-2 font-mono-label text-mono-label uppercase hover:bg-surface-container"
          >
            Browse issues
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {contributions.map((contribution) => (
            <ContributionCard key={contribution.id} contribution={contribution} />
          ))}
        </div>
      )}
    </div>
  );
}
