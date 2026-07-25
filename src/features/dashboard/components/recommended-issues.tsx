import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { StatusPip } from "@/components/ui/status-pip";
import { DifficultyBadge } from "@/components/ui/status-badges";
import { Skeleton } from "@/components/ui/skeleton";
import type { Issue } from "@/types/domain";

export function RecommendedIssues({
  issues,
  loading,
}: {
  issues?: Issue[];
  loading: boolean;
}) {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-section-heading text-section-heading text-on-surface">
          <Icon name="auto_awesome" className="text-secondary" filled />
          Recommended for You
        </h3>
        <div className="hidden gap-4 sm:flex">
          <span className="flex items-center gap-1 font-mono-label text-mono-label text-on-surface-variant">
            <StatusPip tone="primary" /> TypeScript
          </span>
          <span className="flex items-center gap-1 font-mono-label text-mono-label text-on-surface-variant">
            <StatusPip tone="warning" /> Rust
          </span>
        </div>
      </div>

      <div className="border border-outline-variant bg-surface">
        {loading || !issues ? (
          <div className="space-y-px p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : issues.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
            <Icon
              name="filter_list_off"
              className="mb-4 text-4xl text-outline-variant"
            />
            <p className="font-body text-body font-bold text-on-surface">
              No issues match your filters
            </p>
            <p className="mt-1 font-caption text-caption text-on-surface-variant">
              Try expanding your tech stack or clearing difficulty settings.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="border-b border-outline-variant bg-surface-container-low">
                <tr>
                  <th className="px-4 py-3 font-mono-label text-mono-label uppercase text-on-surface-variant">
                    Repository
                  </th>
                  <th className="px-4 py-3 font-mono-label text-mono-label uppercase text-on-surface-variant">
                    Issue Title
                  </th>
                  <th className="px-4 py-3 text-center font-mono-label text-mono-label uppercase text-on-surface-variant">
                    Difficulty
                  </th>
                  <th className="px-4 py-3 text-right font-mono-label text-mono-label uppercase text-on-surface-variant">
                    Bounty
                  </th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr
                    key={issue.id}
                    className="group border-b border-outline-variant transition-colors last:border-0 hover:bg-surface-container"
                  >
                    <td className="whitespace-nowrap px-4 py-4 font-mono-label text-xs text-on-surface-variant">
                      {issue.repository.fullName}
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/issues/${issue.id}`}
                        className="font-body text-sm font-medium text-on-surface group-hover:text-primary"
                      >
                        {issue.title}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <DifficultyBadge difficulty={issue.difficulty} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-right font-mono-label text-sm text-secondary">
                      {issue.basePoints} pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
