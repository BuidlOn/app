import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import type { Achievement } from "../types";

const TONE: Record<Achievement["tone"], string> = {
  primary: "text-primary group-hover:text-primary",
  secondary: "text-secondary group-hover:text-secondary",
  tertiary: "text-tertiary group-hover:text-tertiary",
  neutral: "text-on-surface-variant group-hover:text-on-surface",
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
    <section className="border border-outline-variant bg-surface p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-section-heading text-section-heading text-on-surface">
          Achievements
        </h2>
        <span className="font-mono-label text-primary">
          {earned}/{total}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "group flex flex-col items-center border border-outline-variant p-4 transition-colors hover:bg-surface-container-low",
              !item.earned && "opacity-40",
            )}
            title={item.earned ? "Unlocked" : "Locked"}
          >
            <div className={cn("mb-3 flex h-12 w-12 items-center justify-center", TONE[item.tone])}>
              <Icon name={item.icon} className="text-[40px]" filled={item.earned} />
            </div>
            <span className="text-center font-mono-label text-[10px] uppercase tracking-tighter text-on-surface">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
