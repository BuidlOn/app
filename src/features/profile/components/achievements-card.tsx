import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import type { Achievement } from "../types";

const TONE_CLASSES: Record<Achievement["tone"], { bg: string; text: string }> = {
  primary: { bg: "bg-tertiary/20", text: "text-tertiary-deep" },
  secondary: { bg: "bg-secondary/15", text: "text-secondary-deep" },
  tertiary: { bg: "bg-primary/30", text: "text-primary-deep" },
  neutral: { bg: "bg-outline/5", text: "text-on-surface-variant" },
};

export function AchievementsCard({
  items,
  earned,
  total,
}: {
  items: Achievement[];
  earned: number;
  total: number;
}) {
  return (
    <Card className="p-6">
      <div className="mb-[18px] flex items-center justify-between">
        <h3 className="m-0 font-page-title text-[16px] font-bold text-on-surface">
          Achievements
        </h3>
        <span className="font-mono-label text-[13px] font-bold text-secondary">
          {earned}/{total}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {items.map((item) => {
          const tone = TONE_CLASSES[item.tone];
          return (
            <div
              key={item.id}
              className={cn(
                "flex flex-col items-center rounded-[14px] border-[1.5px] border-outline/15 p-3.5 text-center transition-colors",
                item.earned ? tone.bg : "opacity-35",
              )}
              title={item.earned ? "Unlocked" : "Locked"}
            >
              <div
                className={cn(
                  "mb-1.5 flex h-[34px] w-[34px] items-center justify-center",
                  item.earned ? tone.text : "text-on-surface-variant",
                )}
              >
                <Icon
                  name={item.icon}
                  className="text-[28px]"
                  filled={item.earned}
                />
              </div>
              <span className="font-mono-label text-[9.5px] uppercase text-on-surface-muted">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
