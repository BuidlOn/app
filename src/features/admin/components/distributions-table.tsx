import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatUsd } from "@/utils/format";
import { Card } from "@/components/ui/card";
import type { DistributionRow } from "../types";

export function DistributionsTable({
  rows,
  loading,
}: {
  rows?: DistributionRow[];
  loading: boolean;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b-[1.5px] border-outline/10 px-[24px] py-[18px]">
        <h3 className="m-0 flex items-center gap-2 font-page-title text-[17px] font-bold text-on-surface">
          <Icon name="monetization_on" className="text-[20px] text-secondary" />
          Recent reward distributions
        </h3>
      </div>
        {/* Stacked cards below md. */}
        <ul className="flex list-none flex-col gap-2 p-4 md:hidden">
          {loading || !rows
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[76px] rounded-[14px]" />
              ))
            : rows.map((row) => (
                <li
                  key={row.id}
                  className="rounded-[14px] border-[1.5px] border-outline/15 bg-surface p-3.5"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <span className="truncate text-[12.5px] font-semibold">
                      {row.recipient}
                    </span>
                    <span className="shrink-0 font-mono-label text-[12px] font-bold">
                      {formatUsd(row.amountUsd)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-[11.5px] text-on-surface-variant">
                      {row.seasonName}
                    </span>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-[2px] font-mono-label text-[10px] font-bold ${
                        row.status === "PAID"
                          ? "border-tertiary-deep/60 text-tertiary-deep"
                          : "border-outline/20 text-on-surface-muted"
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                </li>
              ))}
        </ul>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="bg-outline/5">
              {["Recipient", "Amount", "Season", "Status"].map((h, i) => {
                let wClass = "";
                if (i === 0) wClass = "w-[32%] pl-[24px]";
                if (i === 1) wClass = "w-[26%]";
                if (i === 2) wClass = "w-[18%]";
                if (i === 3) wClass = "w-[24%] pr-[24px]";

                return (
                  <th
                    key={h}
                    className={`py-3 px-1.5 font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted ${wClass}`}
                  >
                    {h}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading || !rows
              ? Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="border-t-[1px] border-outline/10">
                    <td className="py-3.5 px-1.5 pl-[24px]"><Skeleton className="h-4 w-32" /></td>
                    <td className="py-3.5 px-1.5"><Skeleton className="h-4 w-20" /></td>
                    <td className="py-3.5 px-1.5"><Skeleton className="h-4 w-28" /></td>
                    <td className="py-3.5 px-1.5 pr-[24px]"><Skeleton className="h-4 w-14" /></td>
                  </tr>
                ))
              : rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t-[1px] border-outline/10 transition-colors hover:bg-outline/5"
                  >
                    <td className="overflow-hidden whitespace-nowrap py-3.5 px-1.5 pl-[24px]">
                      <div className="flex items-center gap-2">
                        <span className="text-[12.5px]">{row.recipient}</span>
                      </div>
                    </td>
                    <td className="overflow-hidden whitespace-nowrap py-3.5 px-1.5 font-mono-label text-[11.5px] font-bold text-on-surface">
                      {formatUsd(row.amountUsd)} USDC
                    </td>
                    <td className="overflow-hidden whitespace-nowrap py-3.5 px-1.5 text-[12px] text-on-surface-variant">
                      {row.seasonName}
                    </td>
                    <td className="overflow-hidden whitespace-nowrap py-3.5 px-1.5 pr-[24px]">
                      <span
                        className={cn(
                          "rounded-full border-[1.5px] px-2 py-[3px] font-mono-label text-[10px] font-bold uppercase",
                          row.status === "PAID"
                            ? "border-secondary-deep/60 text-secondary-deep"
                            : "animate-pulse border-primary-deep/60 text-primary-deep",
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
    </Card>
  );
}
