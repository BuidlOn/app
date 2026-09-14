import type { IssueDifficulty } from "@/types/domain";

export const DIFFICULTIES = [
  "Good First Issue",
  "Documentation",
  "Bug Fix",
  "Feature",
  "Critical Bug",
  "Security",
  "Architecture",
] as const satisfies readonly IssueDifficulty[];

export const LANGUAGES = [
  "Rust",
  "Solidity",
  "TypeScript",
  "Go",
] as const;

export const ISSUE_STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "claimed", label: "Claimed" },
] as const;

export const DEFAULT_ISSUE_PAGE_SIZE = 6;
