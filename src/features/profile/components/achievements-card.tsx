import { cn } from "@/lib/utils";
import type { Achievement } from "../types";

const TONE_CLASSES: Record<Achievement["tone"], { bg: string; text: string }> = {
  primary: { bg: "bg-primary-wash border-primary/20", text: "text-on-primary-tint" }, // Yellow/Gold
  secondary: { bg: "bg-tertiary-wash border-tertiary/20", text: "text-points" }, // Cyan/Mint
  tertiary: { bg: "bg-heat-1 border-secondary/20", text: "text-on-secondary-tint" }, // Purple
  neutral: { bg: "bg-surface-container border-outline/10", text: "text-on-surface-variant" },
};

// Map icons to emojis for the soft-tactile feel
const EMOJI_MAP: Record<string, string> = {
  workspace_premium: "🥇",
  bolt: "🔥",
  military_tech: "💎",
  lock: "🚀",
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
    <div className="rounded-[16px] border border-outline/10 bg-white p-6 h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="m-0 font-page-title text-[15px] font-bold text-on-surface">
          Achievements
        </h3>
        <span className="font-mono-label text-[12px] font-bold text-secondary">
          {earned}/{total}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {items.map((item) => {
          const tone = TONE_CLASSES[item.tone];
          return (
            <div
              key={item.id}
              className={cn(
                "flex flex-col items-center justify-center rounded-[12px] border p-4 text-center transition-colors",
                item.earned ? tone.bg : "bg-ink/5 border-outline/5 opacity-60 grayscale",
              )}
              title={item.earned ? "Unlocked" : "Locked"}
            >
              <div className="mb-1.5 flex h-8 w-8 items-center justify-center text-[24px]">
                {EMOJI_MAP[item.icon] || "✨"}
              </div>
              <span className="font-mono-label text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/70">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
