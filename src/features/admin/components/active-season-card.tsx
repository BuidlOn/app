import { Icon } from "@/components/ui/icon";
import { formatDate, formatCompactNumber } from "@/utils/format";
import { Card } from "@/components/ui/card";
import type { ActiveSeasonSummary } from "../types";

export function ActiveSeasonCard({ data }: { data: ActiveSeasonSummary }) {
  const { season, progressPercent, allocatedUsd } = data;

  return (
    <Card className="relative overflow-hidden border-[2px] border-ink p-[24px]">
      <div className="absolute right-[-30px] top-[-30px] h-[110px] w-[110px] rounded-full bg-primary/15" />
      <div className="relative z-10">
        <div className="mb-[14px] flex items-center gap-[8px]">
          <span className="h-[8px] w-[8px] rounded-full bg-secondary" />
          <span className="font-mono-label text-[10.5px] font-bold uppercase tracking-widest text-secondary-deep">
            Active season
          </span>
        </div>
        <h4 className="m-0 mb-1 font-page-title text-[21px] font-bold text-on-surface">{season.name}</h4>
        <p className="m-0 mb-[18px] text-[12.5px] text-on-surface-muted">
          Ends {formatDate(season.endDate)}
        </p>

        <div className="mb-[16px]">
          <div className="mb-[6px] flex justify-between font-mono-label text-[11px] font-bold text-on-surface">
            <span className="uppercase text-on-surface-muted">Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-[8px] w-full rounded-full border-[1.5px] border-ink bg-outline/10">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <p className="m-0 mb-1 font-mono-label text-[9.5px] uppercase text-on-surface-muted">
              Total pool
            </p>
            <p className="m-0 text-[15px] font-bold text-on-surface">
              ${formatCompactNumber(season.rewardPool)}{" "}
              <span className="text-[11px] font-normal text-on-surface-muted">USDC</span>
            </p>
          </div>
          <div>
            <p className="m-0 mb-1 font-mono-label text-[9.5px] uppercase text-on-surface-muted">
              Allocated
            </p>
            <p className="m-0 text-[15px] font-bold text-on-surface">
              ${formatCompactNumber(allocatedUsd)}{" "}
              <span className="text-[11px] font-normal text-on-surface-muted">USDC</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
