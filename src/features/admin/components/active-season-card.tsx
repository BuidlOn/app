import { Icon } from "@/components/ui/icon";
import { formatDate, formatCompactNumber } from "@/utils/format";
import type { ActiveSeasonSummary } from "../types";

export function ActiveSeasonCard({ data }: { data: ActiveSeasonSummary }) {
  const { season, progressPercent, allocatedUsd } = data;

  return (
    <div className="relative overflow-hidden border border-outline-variant bg-surface p-gap-6">
      <div className="absolute right-0 top-0 p-2">
        <Icon name="star" className="select-none text-[64px] text-primary/10" filled />
      </div>
      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          <span className="font-mono-label text-[10px] font-bold uppercase tracking-widest text-secondary">
            Active Season
          </span>
        </div>
        <h4 className="mb-1 font-section-heading text-[24px]">{season.name}</h4>
        <p className="mb-6 text-sm text-on-surface-variant">
          Ends {formatDate(season.endDate)}
        </p>

        <div className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between font-mono-label text-[11px]">
              <span className="uppercase text-outline">Progress</span>
              <span className="text-on-surface">{progressPercent}%</span>
            </div>
            <div className="h-1 w-full bg-surface-container-high">
              <div
                className="h-full bg-primary"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="mb-1 font-mono-label text-[10px] uppercase text-outline">
                Total Pool
              </p>
              <p className="font-mono-label text-lg font-bold">
                {formatCompactNumber(season.rewardPool)}{" "}
                <span className="text-xs font-normal">USDC</span>
              </p>
            </div>
            <div>
              <p className="mb-1 font-mono-label text-[10px] uppercase text-outline">
                Allocated
              </p>
              <p className="font-mono-label text-lg font-bold">
                {formatCompactNumber(allocatedUsd)}{" "}
                <span className="text-xs font-normal">USDC</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
