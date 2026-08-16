import { StatusBadge } from "@/components/ui/status-badges";
import { Skeleton } from "@/components/ui/skeleton";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import type { Contribution } from "@/types/domain";

export function RecentContributions({
  contributions,
  loading,
}: {
  contributions?: Contribution[];
  loading: boolean;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b-[1.5px] border-outline/10 px-[26px] py-[18px]">
        <h3 className="m-0 font-page-title text-[17px] font-bold text-on-surface">
          Recent contributions
        </h3>
      </div>

      {loading || !contributions ? (
        <div className="space-y-3 p-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : contributions.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <Icon name="inbox" className="mb-3 text-[48px] text-outline/30" />
          <p className="font-page-title text-[19px] font-bold text-on-surface">No contributions yet</p>
          <p className="mt-2 text-[13.5px] text-on-surface-variant">
            Merged pull requests will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="bg-outline/5">
                <th className="w-[20%] py-3 pl-[26px] pr-2.5 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
                  Repository
                </th>
                <th className="w-[34%] py-3 px-2.5 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
                  Title
                </th>
                <th className="w-[16%] py-3 px-2.5 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
                  Points
                </th>
                <th className="w-[30%] py-3 pl-2.5 pr-[26px] font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((c) => (
                <tr
                  key={c.id}
                  className="border-t-[1px] border-outline/10 transition-colors hover:bg-outline/5"
                >
                  <td className="overflow-hidden break-words py-3.5 pl-[26px] pr-2.5 font-mono-label text-[12px] text-on-surface-variant">
                    {c.repository.fullName}
                  </td>
                  <td className="whitespace-normal break-words py-3.5 px-2.5 text-[13.5px] font-medium text-on-surface">
                    {c.issue.title}
                  </td>
                  <td className="whitespace-nowrap py-3.5 px-2.5 font-mono-label text-[13px] font-bold text-primary-deep">
                    {c.pointsAwarded ?? "—"}{c.pointsAwarded ? " pts" : ""}
                  </td>
                  <td className="whitespace-nowrap py-3.5 pl-2.5 pr-[26px]">
                    <StatusBadge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
