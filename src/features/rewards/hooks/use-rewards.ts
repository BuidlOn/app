"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";
import {
  claimAllRewards,
  claimReward,
  getRewards,
  getRewardsSummary,
} from "../api/rewards.api";

export function useRewards() {
  return useQuery({ queryKey: ["rewards"], queryFn: getRewards });
}

export function useRewardsSummary() {
  return useQuery({ queryKey: ["rewards-summary"], queryFn: getRewardsSummary });
}

function useInvalidateRewards() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["rewards"] });
    queryClient.invalidateQueries({ queryKey: ["rewards-summary"] });
  };
}

export function useClaimReward() {
  const invalidate = useInvalidateRewards();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (id: string) => claimReward(id),
    onSuccess: (reward) => {
      invalidate();
      toast({
        variant: "success",
        title: "Reward claimed",
        description: `${reward.amountUsd.toLocaleString()} USDC sent to your wallet.`,
      });
    },
    onError: (error: Error) =>
      toast({ variant: "error", title: "Claim failed", description: error.message }),
  });
}

export function useClaimAllRewards() {
  const invalidate = useInvalidateRewards();
  const { toast } = useToast();
  return useMutation({
    mutationFn: () => claimAllRewards(),
    onSuccess: () => {
      invalidate();
      toast({
        variant: "success",
        title: "All rewards claimed",
        description: "Your claimable allocations have been sent.",
      });
    },
    onError: (error: Error) =>
      toast({ variant: "error", title: "Claim failed", description: error.message }),
  });
}
