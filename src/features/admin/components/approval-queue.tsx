import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, formatRelativeTime } from "@/utils/format";
import { useRepoApprovalActions } from "../hooks/use-admin";
import type { RepoApproval } from "../types";

export function ApprovalQueue({
  items,
  loading,
}: {
  items?: RepoApproval[];
  loading: boolean;
}) {
  const { approve, reject } = useRepoApprovalActions();
  const pending = approve.isPending || reject.isPending;

  return (
    <section className="border border-outline-variant bg-surface">
      <div className="flex items-center justify-between border-b border-outline-variant px-6 py-4">
        <div className="flex items-center gap-3">
          <Icon name="assignment_turned_in" className="text-primary" />
          <h3 className="font-section-heading text-[18px]">
            Repository Approval Queue
          </h3>
        </div>
        {items && (
          <span className="bg-surface-container-high px-2 py-0.5 font-mono-label text-[10px] text-on-surface-variant">
            {items.length} Pending
          </span>
        )}
      </div>

      {!loading && items && items.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <Icon name="task_alt" className="mb-3 text-4xl text-secondary" />
          <p className="font-body text-body text-on-surface">Queue is clear</p>
          <p className="mt-1 font-caption text-caption text-on-surface-variant">
            No repositories awaiting review.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low">
                {["Repository", "Owner", "Stars", "Submitted", ""].map((h, i) => (
                  <th
                    key={h || i}
                    className={`px-6 py-3 font-mono-label text-[11px] uppercase tracking-wider text-outline ${i === 2 || i === 4 ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading || !items
                ? Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="border-b border-outline-variant/50">
                      <td className="px-6 py-4"><Skeleton className="h-4 w-40" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-6 py-4"><Skeleton className="ml-auto h-4 w-12" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                      <td className="px-6 py-4"><Skeleton className="ml-auto h-4 w-16" /></td>
                    </tr>
                  ))
                : items.map((repo) => (
                    <tr
                      key={repo.id}
                      className="border-b border-outline-variant/50 transition-colors last:border-0 hover:bg-surface-container"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Icon name="folder" className="text-sm text-outline" />
                          <span className="text-sm font-medium">{repo.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">
                        {repo.owner}
                      </td>
                      <td className="px-6 py-4 text-right font-mono-label text-sm">
                        {formatNumber(repo.stars)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-on-surface-variant">
                        {formatRelativeTime(repo.submittedAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            aria-label={`Approve ${repo.name}`}
                            disabled={pending}
                            onClick={() => approve.mutate(repo.id)}
                            className="p-1 transition-colors hover:text-secondary disabled:opacity-40"
                          >
                            <Icon name="check" />
                          </button>
                          <button
                            type="button"
                            aria-label={`Reject ${repo.name}`}
                            disabled={pending}
                            onClick={() => reject.mutate(repo.id)}
                            className="p-1 transition-colors hover:text-error disabled:opacity-40"
                          >
                            <Icon name="close" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
