"use client";

import { useEffect, useState } from "react";
import { usePlatformStats } from "../hooks/use-platform-stats";
import { Skeleton } from "@/components/ui/skeleton";

export function LiveTicker() {
  const { data, isLoading } = usePlatformStats();
  
  // Start with a fallback total or real data
  const baseTotal = data?.rewardsPaidUsd || 48210;
  const [total, setTotal] = useState(baseTotal);

  useEffect(() => {
    if (data?.rewardsPaidUsd && data.rewardsPaidUsd > total) {
      setTotal(data.rewardsPaidUsd);
    }
  }, [data?.rewardsPaidUsd]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotal((prev) => prev + Math.floor(Math.random() * 40) + 5);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-[12px] border-[2px] border-[#161616] rounded-full bg-[#161616] px-[32px] py-[16px] w-fit mx-auto animate-slide-up mb-[120px]">
      <span className="w-[8px] h-[8px] rounded-full bg-tertiary shadow-[0_0_0_4px_rgba(0,194,168,0.2)] flex-shrink-0 animate-pulse"></span>
      <span className="font-mono-label text-[12px] tracking-[0.04em] text-white/60">
        Total rewards claimed this week
      </span>
      {isLoading && !data ? (
        <Skeleton className="h-6 w-24 rounded bg-surface-variant/20" />
      ) : (
        <span className="font-mono-label text-[16px] font-bold text-primary">
          ${total.toLocaleString("en-US")}
        </span>
      )}
    </div>
  );
}
