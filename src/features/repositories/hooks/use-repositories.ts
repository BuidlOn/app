"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";
import {
  getRepositories,
  registerRepository,
  type RepositoryFilters,
} from "../api/repositories.api";

export function useRepositories(filters: RepositoryFilters) {
  return useQuery({
    queryKey: ["repositories", filters],
    queryFn: () => getRepositories(filters),
    placeholderData: keepPreviousData,
  });
}

export function useRegisterRepository() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (url: string) => registerRepository(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repositories"] });
      toast({
        variant: "success",
        title: "Repository submitted",
        description: "It will appear once ownership is verified.",
      });
    },
    onError: (e: Error) =>
      toast({ variant: "error", title: "Could not register repository", description: e.message }),
  });
}
