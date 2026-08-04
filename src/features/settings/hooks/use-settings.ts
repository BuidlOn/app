"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";
import { updateProfile, updateWallet, type ProfileUpdate } from "../api/settings.api";
import type { User } from "@/types/domain";

function useSyncUser() {
  const queryClient = useQueryClient();
  return (user: User) => {
    queryClient.setQueryData(["current-user"], user);
    queryClient.invalidateQueries({ queryKey: ["profile", user.githubUsername] });
  };
}

export function useUpdateProfile() {
  const sync = useSyncUser();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (input: ProfileUpdate) => updateProfile(input),
    onSuccess: (user) => {
      sync(user);
      toast({ variant: "success", title: "Profile updated" });
    },
    onError: (e: Error) =>
      toast({ variant: "error", title: "Update failed", description: e.message }),
  });
}

export function useUpdateWallet() {
  const sync = useSyncUser();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (walletAddress: string) => updateWallet(walletAddress),
    onSuccess: (user) => {
      sync(user);
      toast({ variant: "success", title: "Wallet updated" });
    },
    onError: (e: Error) =>
      toast({ variant: "error", title: "Update failed", description: e.message }),
  });
}
