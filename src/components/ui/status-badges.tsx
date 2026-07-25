import { Badge, type BadgeProps } from "./badge";
import type { ContributionStatus, IssueDifficulty } from "@/types/domain";

type Variant = NonNullable<BadgeProps["variant"]>;

const DIFFICULTY_VARIANT: Record<IssueDifficulty, Variant> = {
  "Good First Issue": "success",
  Documentation: "neutral",
  "Bug Fix": "warning",
  Feature: "primary",
  "Critical Bug": "danger",
  Security: "danger",
  Architecture: "primary",
};

const STATUS_VARIANT: Record<ContributionStatus, Variant> = {
  AVAILABLE: "success",
  CLAIMED: "warning",
  IN_PROGRESS: "warning",
  PR_OPEN: "primary",
  UNDER_REVIEW: "primary",
  MERGED: "success",
  VERIFIED: "success",
  SCORED: "neutral",
};

export function DifficultyBadge({ difficulty }: { difficulty: IssueDifficulty }) {
  return <Badge variant={DIFFICULTY_VARIANT[difficulty]}>{difficulty}</Badge>;
}

export function StatusBadge({ status }: { status: ContributionStatus }) {
  return <Badge variant={STATUS_VARIANT[status]}>{status.replace(/_/g, " ")}</Badge>;
}
