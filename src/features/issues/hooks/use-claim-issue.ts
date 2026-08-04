"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { claimIssue, releaseClaim } from "../api/issues.api";
import { useToast } from "@/providers/toast-provider";

export function useClaimIssue(issueId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => claimIssue(issueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issue", issueId] });
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["contributor-dashboard"] });
      toast({
        variant: "success",
        title: "Issue claimed",
        description: "You have 3 days to open a pull request.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "error",
        title: "Could not claim issue",
        description: error.message,
      });
    },
  });
}

export function useReleaseClaim(issueId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => releaseClaim(issueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issue", issueId] });
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      toast({
        variant: "info",
        title: "Claim released",
        description: "The issue is available again.",
      });
    },
    onError: (error: Error) => {
      toast({ variant: "error", title: "Could not release claim", description: error.message });
    },
  });
}
