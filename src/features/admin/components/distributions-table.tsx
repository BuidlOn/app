import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatUsd } from "@/utils/format";
import type { DistributionRow } from "../types";

export function DistributionsTable({
  rows,
  loading,
}: {
  rows?: DistributionRow[];
  loading: boolean;
}) {
  return (
    <section className="border border-outline-variant bg-surface">
      <div className="flex items-center justify-between border-b border-outline-variant px-6 py-4">
        <div className="flex items-center gap-3">
          <Icon name="monetization_on" className="text-primary" />
          <h3 className="font-section-heading text-[18px]">
            Recent Reward Distributions
          </h3>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container-low">
              {["Recipient", "Amount", "Source (Season)", "Status"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 font-mono-label text-[11px] uppercase tracking-wider text-outline"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading || !rows
              ? Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="border-b border-outline-variant/50">
                    <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-28" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-14" /></td>
                  </tr>
                ))
              : rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-outline-variant/50 transition-colors last:border-0 hover:bg-surface-container"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full border border-outline-variant bg-surface-container-high" />
                        <span className="text-sm">{row.recipient}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-mono-label text-sm">
                      {formatUsd(row.amountUsd)} USDC
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">
                      {row.seasonName}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "border px-2 py-0.5 font-mono-label text-[10px]",
                          row.status === "PAID"
                            ? "border-secondary text-secondary"
                            : "animate-pulse border-primary text-primary",
                        )}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
