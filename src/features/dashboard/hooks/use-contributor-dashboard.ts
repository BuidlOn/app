"use client";

import { useQuery } from "@tanstack/react-query";
import { getContributorDashboard } from "../api/dashboard.api";

export function useContributorDashboard() {
  return useQuery({
    queryKey: ["contributor-dashboard"],
    queryFn: getContributorDashboard,
  });
}
