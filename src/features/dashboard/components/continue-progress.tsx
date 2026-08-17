import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Glyph } from "@/components/ui/icons";
import { StatusBadge } from "@/components/ui/status-badges";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/layout/page-header";
import { formatRelativeTime } from "@/utils/format";
import type { Contribution } from "@/types/domain";

/** Cards alternate their hover accent so a row of them reads as a set. */
const LIFTS = ["secondary", "primary", "tertiary"] as const;

function ContributionCard({
  contribution,
  index,
}: {
  contribution: Contribution;
  index: number;
}) {
  const resumable =
    contribution.status === "CLAIMED" || contribution.status === "IN_PROGRESS";

  return (
    <Card lift={LIFTS[index % LIFTS.length]} border="ink" className="flex flex-col p-6">
      <div className="mb-3.5 flex items-start justify-between gap-2">
        <Badge variant="secondary">{contribution.repository.fullName}</Badge>
        <StatusBadge status={contribution.status} size="sm" />
      </div>

      <h4 className="mb-1.5 text-[13.5px] font-bold leading-snug text-on-surface sm:text-[15px]">
        {contribution.issue.title}
      </h4>
      <p className="mb-5 text-[12.5px] text-on-surface-muted">
        {contribution.issue.difficulty}
        {contribution.pointsAwarded !== null && ` · ${contribution.pointsAwarded} pts`}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="font-mono-label text-[11px] text-on-surface-muted">
          Updated {formatRelativeTime(contribution.updatedAt)}
        </span>
        {resumable ? (
          <Button asChild variant="ink" shadow="none" size="xs">
            <Link href={`/issues/${contribution.issue.id}`}>RESUME</Link>
          </Button>
        ) : (
          <Button asChild variant="outline" shadow="none" size="xs">
            <a href={contribution.prUrl ?? "#"} target="_blank" rel="noreferrer">
              VIEW PR
            </a>
          </Button>
        )}
      </div>
    </Card>
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
    <section>
      <SectionHeading title="Continue progress" icon="clock" iconTone="secondary" />

      {loading || !contributions ? (
        <div className="grid gap-2.5 sm:gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-44 w-full rounded-buidl-lg" />
          ))}
        </div>
      ) : contributions.length === 0 ? (
        <Card className="flex flex-col items-center px-6 py-14 text-center">
          <Glyph name="issueOpen" size={32} className="mb-4 text-on-surface-muted" />
          <p className="text-[15px] font-bold text-on-surface">Nothing in progress</p>
          <p className="mt-1 max-w-sm text-[13px] text-on-surface-muted">
            Apply for an issue from the marketplace to start your contribution timer.
          </p>
          <Button asChild variant="secondary" size="sm" className="mt-6">
            <Link href="/issues">Browse issues</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-2.5 sm:gap-4 md:grid-cols-2">
          {contributions.map((contribution, i) => (
            <ContributionCard key={contribution.id} contribution={contribution} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
