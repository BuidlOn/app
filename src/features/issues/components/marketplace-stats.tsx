"use client";

import { usePlatformStats } from "@/features/marketing/hooks/use-platform-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, formatUsd } from "@/utils/format";

export function MarketplaceStats() {
  const { data, isLoading } = usePlatformStats();

  const cells = [
    {
      label: "Open Issues",
      value: data ? formatNumber(data.openIssues) : null,
      hint: "Across connected repositories",
    },
    {
      label: "Total Rewards",
      value: data ? formatUsd(data.rewardsPaidUsd, true) : null,
      hint: "Paid to contributors",
    },
    {
      label: "Active Contributors",
      value: data ? formatNumber(data.contributors) : null,
      hint: "Verified developers",
    },
  ];

  return (
    <section className="mb-gap-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      {cells.map((cell) => (
        <div key={cell.label} className="border border-outline-variant bg-surface p-6">
          <p className="mb-2 font-mono-label text-mono-label uppercase text-on-surface-variant">
            {cell.label}
          </p>
          {isLoading || cell.value === null ? (
            <Skeleton className="h-8 w-28" />
          ) : (
            <h3 className="font-page-title text-3xl font-bold">{cell.value}</h3>
          )}
          <p className="mt-2 font-caption text-xs text-on-surface-variant">
            {cell.hint}
          </p>
        </div>
      ))}
    </section>
  );
}
