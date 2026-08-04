"use client";

import { useQuery } from "@tanstack/react-query";
import { getIssueDetail } from "../api/issues.api";

export function useIssueDetail(id: string) {
  return useQuery({
    queryKey: ["issue", id],
    queryFn: () => getIssueDetail(id),
    enabled: Boolean(id),
  });
}
