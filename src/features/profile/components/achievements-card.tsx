import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import type { Achievement } from "../types";

const TONE_CLASSES: Record<Achievement["tone"], { bg: string; text: string }> = {
  primary: { bg: "bg-[#FFF3D6] border-[#FFC53D]/20", text: "text-[#7a5c05]" }, // Yellow/Gold
  secondary: { bg: "bg-[#E0F9F5] border-[#00C2A8]/20", text: "text-[#00806e]" }, // Cyan/Mint
  tertiary: { bg: "bg-[#EDE0FF] border-[#7C5CFC]/20", text: "text-[#3f008e]" }, // Purple
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
    <div className="rounded-[16px] border border-[#161616]/10 bg-white p-6 h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="m-0 font-page-title text-[15px] font-bold text-[#161616]">
          Achievements
        </h3>
        <span className="font-mono-label text-[12px] font-bold text-[#7C5CFC]">
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
                item.earned ? tone.bg : "bg-[#161616]/5 border-[#161616]/5 opacity-60 grayscale",
              )}
              title={item.earned ? "Unlocked" : "Locked"}
            >
              <div className="mb-1.5 flex h-8 w-8 items-center justify-center text-[24px]">
                {EMOJI_MAP[item.icon] || "✨"}
              </div>
              <span className="font-mono-label text-[9px] font-bold uppercase tracking-widest text-[#46433d]/70">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
