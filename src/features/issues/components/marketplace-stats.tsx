"use client";

import { usePlatformStats } from "@/features/marketing/hooks/use-platform-stats";
import { StatTile } from "@/components/ui/stat";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, formatUsd } from "@/utils/format";

export function MarketplaceStats() {
  const { data, isLoading } = usePlatformStats();

  const cells = [
    {
      label: "Open issues",
      value: data ? formatNumber(data.openIssues) : null,
      hint: "Across connected repositories",
    },
    {
      label: "Total rewards",
      value: data ? formatUsd(data.rewardsPaidUsd, true) : null,
      hint: "Paid to contributors",
      // The money figure carries the Sunbeam field — it is why people are here.
      highlight: true,
    },
    {
      label: "Active contributors",
      value: data ? formatNumber(data.contributors) : null,
      hint: "Verified developers",
    },
  ];

  return (
    <section className="grid gap-2.5 sm:gap-4 md:grid-cols-3">
      {cells.map((cell) =>
        isLoading || cell.value === null ? (
          <div
            key={cell.label}
            className="rounded-buidl-lg border-2 border-outline bg-surface p-6 shadow-[4px_4px_0_#161616] flex flex-col gap-1.5"
          >
            <Skeleton className="mb-1 h-4 w-28" />
            <Skeleton className="h-8 w-24" />
          </div>
        ) : (
          <StatTile
            key={cell.label}
            label={cell.label}
            value={cell.value}
            hint={cell.hint}
            highlight={cell.highlight}
          />
        ),
      )}
    </section>
  );
}
