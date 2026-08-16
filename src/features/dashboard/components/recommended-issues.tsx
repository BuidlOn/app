import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Glyph } from "@/components/ui/icons";
import { DifficultyBadge } from "@/components/ui/status-badges";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SectionHeading } from "@/components/layout/page-header";
import type { Issue } from "@/types/domain";

/** Rotate chip tints so the language filters read as distinct at a glance. */
const LANGUAGE_TINTS = ["secondary", "accent", "tertiary", "primary"] as const;

function LanguageChips({ issues }: { issues: Issue[] }) {
  const languages = [...new Set(issues.map((i) => i.language).filter(Boolean))].slice(0, 2);
  if (languages.length === 0) return null;

  return (
    <div className="hidden gap-2 sm:flex">
      {languages.map((language, i) => (
        <Badge key={language} variant={LANGUAGE_TINTS[i % LANGUAGE_TINTS.length]}>
          {language}
        </Badge>
      ))}
    </div>
  );
}

export function RecommendedIssues({
  issues,
  loading,
}: {
  issues?: Issue[];
  loading: boolean;
}) {
  return (
    <section>
      <SectionHeading
        title="Recommended for you"
        icon="star"
        iconTone="tertiary"
        actions={issues && <LanguageChips issues={issues} />}
      />

      {loading || !issues ? (
        <Skeleton className="h-56 w-full rounded-buidl-lg" />
      ) : issues.length === 0 ? (
        <Card className="flex flex-col items-center px-6 py-14 text-center">
          <Glyph name="search" size={32} className="mb-4 text-on-surface-muted" />
          <p className="text-[15px] font-bold text-on-surface">
            No issues match your filters
          </p>
          <p className="mt-1 max-w-sm text-[13px] text-on-surface-muted">
            Try expanding your tech stack or clearing difficulty settings.
          </p>
        </Card>
      ) : (
        <>
          {/* Desktop: dense table. */}
          <TableContainer className="hidden md:block">
            <Table>
              <TableHeader>
                <tr>
                  <TableHead>Repository</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead className="text-center">Difficulty</TableHead>
                  <TableHead className="text-right">Bounty</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue.id} className="group">
                    <TableCell className="whitespace-nowrap font-mono-label text-[12px] text-on-surface-variant">
                      {issue.repository.fullName}
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/issues/${issue.id}`} className="text-on-surface">
                        {issue.title}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <DifficultyBadge difficulty={issue.difficulty} size="sm" />
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-right font-mono-label text-[13px] font-bold text-points">
                      {issue.basePoints} pts
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Mobile: the same rows as stacked cards. */}
          <div className="flex flex-col gap-2.5 md:hidden">
            {issues.map((issue) => (
              <Card key={issue.id} className="p-4">
                <Link href={`/issues/${issue.id}`} className="block text-on-surface">
                  <div className="mb-2 font-mono-label text-[10.5px] text-on-surface-muted">
                    {issue.repository.fullName}
                  </div>
                  <div className="mb-3 text-[13.5px] font-semibold leading-snug">
                    {issue.title}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <DifficultyBadge difficulty={issue.difficulty} size="sm" />
                    <span className="font-mono-label text-[12.5px] font-bold text-points">
                      {issue.basePoints} pts
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
