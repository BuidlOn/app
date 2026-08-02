import { StatusBadge } from "@/components/ui/status-badges";
import { Skeleton } from "@/components/ui/skeleton";
import { Icon } from "@/components/ui/icon";
import { formatDate } from "@/utils/format";
import type { Contribution } from "@/types/domain";

export function RecentContributions({
  contributions,
  loading,
}: {
  contributions?: Contribution[];
  loading: boolean;
}) {
  return (
    <section className="border border-outline-variant bg-surface">
      <div className="flex items-center justify-between border-b border-outline-variant p-6">
        <h2 className="font-section-heading text-section-heading text-on-surface">
          Recent Contributions
        </h2>
      </div>

      {loading || !contributions ? (
        <div className="space-y-3 p-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : contributions.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <Icon name="inbox" className="mb-3 text-4xl text-outline-variant" />
          <p className="font-body text-body text-on-surface">No contributions yet</p>
          <p className="mt-1 font-caption text-caption text-on-surface-variant">
            Merged pull requests will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-outline-variant bg-surface-container-low">
              <tr>
                {["Repository", "Title", "Points", "Date", "Status"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 font-mono-label text-[10px] uppercase tracking-wider text-on-surface-variant"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contributions.map((c) => (
                <tr
                  key={c.id}
                  className="group border-b border-outline-variant transition-colors last:border-0 hover:bg-surface-container"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-mono-label text-on-surface-variant group-hover:text-primary">
                    {c.repository.fullName}
                  </td>
                  <td className="px-6 py-4 font-body text-[14px] font-medium text-on-surface">
                    {c.issue.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-mono-label font-bold text-secondary">
                    {c.pointsAwarded ?? "—"} pts
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-caption text-on-surface-variant">
                    {formatDate(c.updatedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={c.status} />
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
