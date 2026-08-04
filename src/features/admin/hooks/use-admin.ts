"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";
import {
  approveRepository,
  createSeason,
  getAdminOverview,
  rejectRepository,
  type CreateSeasonInput,
} from "../api/admin.api";

export function useAdminOverview() {
  return useQuery({ queryKey: ["admin-overview"], queryFn: getAdminOverview });
}

export function useRepoApprovalActions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin-overview"] });

  const approve = useMutation({
    mutationFn: (id: string) => approveRepository(id),
    onSuccess: () => {
      invalidate();
      toast({ variant: "success", title: "Repository approved" });
    },
    onError: (e: Error) => toast({ variant: "error", title: "Action failed", description: e.message }),
  });

  const reject = useMutation({
    mutationFn: (id: string) => rejectRepository(id),
    onSuccess: () => {
      invalidate();
      toast({ variant: "info", title: "Repository rejected" });
    },
    onError: (e: Error) => toast({ variant: "error", title: "Action failed", description: e.message }),
  });

  return { approve, reject };
}

export function useCreateSeason() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (input: CreateSeasonInput) => createSeason(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
      toast({
        variant: "success",
        title: "Season scheduled",
        description: "The new season has been created as a draft.",
      });
    },
    onError: (e: Error) =>
      toast({ variant: "error", title: "Could not create season", description: e.message }),
  });
}
