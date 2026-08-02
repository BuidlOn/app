"use client";

import { useQuery } from "@tanstack/react-query";
import { getContributorProfile } from "../api/profile.api";

export function useContributorProfile(username: string) {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => getContributorProfile(username),
    enabled: Boolean(username),
  });
}
