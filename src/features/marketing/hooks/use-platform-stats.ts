"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformStats } from "@/services/platform.api";

export function usePlatformStats() {
  return useQuery({
    queryKey: ["platform-stats"],
    queryFn: getPlatformStats,
  });
}
