"use client";

import { usePlatformStats } from "../hooks/use-platform-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCompactNumber, formatUsd } from "@/utils/format";

function StatCell({
  label,
  value,
  accent,
  loading,
}: {
  label: string;
  value?: string;
  accent?: boolean;
  loading: boolean;
}) {
  return (
    <div className="p-12 text-center">
      <div className="mb-2 font-mono-label text-mono-label uppercase text-on-surface-variant">
        {label}
      </div>
      {loading ? (
        <Skeleton className="mx-auto h-9 w-28" />
      ) : (
        <div
          className={`font-page-title text-4xl ${accent ? "text-primary" : "text-white"}`}
        >
          {value}
        </div>
      )}
    </div>
  );
}

export function StatsBand() {
  const { data, isLoading } = usePlatformStats();

  return (
    <section className="grid grid-cols-1 divide-y divide-outline-variant border-y border-outline-variant bg-surface-container-lowest md:grid-cols-3 md:divide-x md:divide-y-0">
      <StatCell
        label="Open Issues"
        loading={isLoading}
        value={data ? `${formatCompactNumber(data.openIssues)}+` : undefined}
      />
      <StatCell
        label="Rewards Paid"
        accent
        loading={isLoading}
        value={data ? formatUsd(data.rewardsPaidUsd, true) : undefined}
      />
      <StatCell
        label="Contributors"
        loading={isLoading}
        value={data ? formatCompactNumber(data.contributors) : undefined}
      />
    </section>
  );
}
