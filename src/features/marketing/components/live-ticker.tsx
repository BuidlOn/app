"use client";

import { useEffect, useRef, useState } from "react";
import { usePlatformStats } from "../hooks/use-platform-stats";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Counts up to `target` once, purely as presentation. It never invents a
 * value: the number it lands on is exactly what the API reported.
 */
function useCountUp(target: number, durationMs = 900): number {
  const [value, setValue] = useState(target);
  const frame = useRef<number>(undefined);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || target <= 0) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      // Ease-out so it decelerates into the real figure.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    };
  }, [target, durationMs]);

  return value;
}

/**
 * Cumulative rewards paid across the protocol, straight from
 * `/analytics/platform`. Hidden until there is a figure worth showing, rather
 * than announcing "$0" or, as it previously did, a fabricated running total.
 */
export function LiveTicker() {
  const { data, isLoading, isError } = usePlatformStats();
  const paid = data?.rewardsPaidUsd ?? 0;
  const display = useCountUp(paid);

  // Nothing paid out yet (or the stat failed): show no social proof at all.
  if (isError || (!isLoading && paid <= 0)) return null;

  return (
    <div className="mx-auto mb-[120px] flex w-fit animate-slide-up flex-col items-center justify-center gap-[12px] rounded-full border-[2px] border-[#161616] bg-[#161616] px-[32px] py-[16px] sm:flex-row">
      <span className="h-[8px] w-[8px] flex-shrink-0 animate-pulse rounded-full bg-tertiary shadow-[0_0_0_4px_rgba(0,194,168,0.2)]" />
      <span className="font-mono-label text-[12px] tracking-[0.04em] text-white/60">
        Total rewards paid
      </span>
      {isLoading ? (
        <Skeleton className="h-6 w-24 rounded bg-surface-variant/20" />
      ) : (
        <span className="font-mono-label text-[16px] font-bold text-[#FFC53D]">
          ${display.toLocaleString("en-US")}
        </span>
      )}
    </div>
  );
}
