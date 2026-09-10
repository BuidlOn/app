import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, formatRelativeTime } from "@/utils/format";
import { Card } from "@/components/ui/card";
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
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b-[1.5px] border-outline/10 px-[24px] py-[18px]">
        <h3 className="m-0 flex items-center gap-2 font-page-title text-[17px] font-bold text-on-surface">
          <Icon name="assignment_turned_in" className="text-[20px] text-primary" />
          Repository approval queue
        </h3>
        {items && (
          <span className="rounded-full bg-outline/5 px-3 py-1 font-mono-label text-[11px] font-bold text-on-surface-variant">
            {items.length} pending
          </span>
        )}
      </div>

      {!loading && items && items.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <Icon name="task_alt" className="mb-3 text-[48px] text-secondary" />
          <p className="m-0 font-page-title text-[19px] font-bold text-on-surface">Queue is clear</p>
          <p className="m-0 mt-2 text-[13.5px] text-on-surface-variant">
            No repositories awaiting review.
          </p>
        </div>
      ) : (
        <>
        {/* Stacked cards below md; the approve/reject controls stay reachable. */}
        <ul className="flex list-none flex-col gap-2 p-4 md:hidden">
          {loading || !items
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[86px] rounded-[14px]" />
              ))
            : items.map((repo) => (
                <li
                  key={repo.id}
                  className="rounded-[14px] border-[1.5px] border-outline/15 bg-surface p-3.5"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <Icon name="folder" className="text-[16px] text-outline/40" />
                    <span className="truncate text-[13px] font-bold">{repo.name}</span>
                  </div>
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-on-surface-variant">
                    <span className="truncate">{repo.owner}</span>
                    <span className="font-mono-label">★ {formatNumber(repo.stars)}</span>
                    <span className="font-mono-label text-on-surface-muted">
                      {formatRelativeTime(repo.submittedAt)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => approve.mutate(repo.id)}
                      className="flex-1 rounded-full border-[1.5px] border-primary-deep/60 bg-primary/20 py-2 font-mono-label text-[12px] font-bold text-primary-deep disabled:opacity-40"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => reject.mutate(repo.id)}
                      className="flex-1 rounded-full border-[1.5px] border-error/40 bg-error/10 py-2 font-mono-label text-[12px] font-bold text-error disabled:opacity-40"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
        </ul>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="bg-outline/5">
                {["Repository", "Owner", "Stars", "Submitted", ""].map((h, i) => {
                  let wClass = "";
                  if (i === 0) wClass = "w-[26%] pl-[24px]";
                  if (i === 1) wClass = "w-[17%]";
                  if (i === 2) wClass = "w-[13%] text-right";
                  if (i === 3) wClass = "w-[16%]";
                  if (i === 4) wClass = "w-[28%] pr-[20px]";

                  return (
                    <th
                      key={h || i}
                      className={`py-3 px-1.5 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted ${wClass}`}
                    >
                      {h}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {loading || !items
                ? Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="border-t-[1px] border-outline/10">
                      <td className="py-3.5 px-1.5 pl-[24px]"><Skeleton className="h-4 w-40" /></td>
                      <td className="py-3.5 px-1.5"><Skeleton className="h-4 w-24" /></td>
                      <td className="py-3.5 px-1.5"><Skeleton className="ml-auto h-4 w-12" /></td>
                      <td className="py-3.5 px-1.5"><Skeleton className="h-4 w-16" /></td>
                      <td className="py-3.5 px-1.5 pr-[20px]"><Skeleton className="ml-auto h-4 w-16" /></td>
                    </tr>
                  ))
                : items.map((repo) => (
                    <tr
                      key={repo.id}
                      className="border-t-[1px] border-outline/10 transition-colors hover:bg-outline/5"
                    >
                      <td className="overflow-hidden whitespace-nowrap py-3.5 px-1.5 pl-[24px] text-[13px] font-bold text-on-surface">
                        <div className="flex items-center gap-2">
                          <Icon name="folder" className="text-[16px] text-outline/40" />
                          <span className="truncate">{repo.name}</span>
                        </div>
                      </td>
                      <td className="overflow-hidden whitespace-nowrap py-3.5 px-1.5 text-[12px] text-on-surface-variant">
                        <span className="truncate">{repo.owner}</span>
                      </td>
                      <td className="py-3.5 px-1.5 text-right font-mono-label text-[11.5px] text-on-surface">
                        {formatNumber(repo.stars)}
                      </td>
                      <td className="overflow-hidden whitespace-nowrap py-3.5 px-1.5 font-mono-label text-[10.5px] text-on-surface-muted">
                        {formatRelativeTime(repo.submittedAt)}
                      </td>
                      <td className="whitespace-nowrap py-3.5 px-1.5 pr-[20px] text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            aria-label={`Approve ${repo.name}`}
                            disabled={pending}
                            onClick={() => approve.mutate(repo.id)}
                            className="flex h-[28px] w-[28px] items-center justify-center rounded-full border-[1.5px] border-primary-deep/60 bg-primary/20 text-primary-deep transition-colors hover:bg-primary/40 disabled:opacity-40"
                          >
                            <Icon name="check" className="text-[16px]" />
                          </button>
                          <button
                            type="button"
                            aria-label={`Reject ${repo.name}`}
                            disabled={pending}
                            onClick={() => reject.mutate(repo.id)}
                            className="flex h-[28px] w-[28px] items-center justify-center rounded-full border-[1.5px] border-error/40 bg-error/10 text-error transition-colors hover:bg-error/20 disabled:opacity-40"
                          >
                            <Icon name="close" className="text-[16px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        </>
      )}
    </Card>
  );
}
