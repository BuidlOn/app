import { Badge, type BadgeProps } from "./badge";
import type {
  ContributionStatus,
  IssueDifficulty,
  RewardStatus,
  SeasonStatus,
} from "@/types/domain";

type Variant = NonNullable<BadgeProps["variant"]>;

/**
 * The backend's seven-value difficulty taxonomy maps onto the design's three
 * effort tints: teal for approachable, amber for moderate, coral for hard.
 */
const DIFFICULTY_VARIANT: Record<IssueDifficulty, Variant> = {
  "Good First Issue": "tertiary",
  Documentation: "tertiary",
  "Bug Fix": "primary",
  Feature: "primary",
  Architecture: "accent",
  "Critical Bug": "accent",
  Security: "accent",
};

const STATUS_VARIANT: Record<ContributionStatus, Variant> = {
  AVAILABLE: "tertiary",
  CLAIMED: "neutral",
  IN_PROGRESS: "primary",
  PR_OPEN: "secondary",
  UNDER_REVIEW: "ink",
  MERGED: "tertiary",
  VERIFIED: "tertiary",
  SCORED: "neutral",
};

const REWARD_VARIANT: Record<RewardStatus, Variant> = {
  Pending: "neutral",
  Validated: "secondary",
  Ready: "primary",
  Sent: "ink",
  Confirmed: "tertiary",
  Failed: "danger",
  Cancelled: "neutral",
};

const SEASON_VARIANT: Record<SeasonStatus, Variant> = {
  Draft: "neutral",
  Scheduled: "secondary",
  Active: "tertiary",
  "Ending Soon": "primary",
  Locked: "ink",
  "Reward Calculation": "secondary",
  Completed: "neutral",
  Archived: "neutral",
};

export function DifficultyBadge({
  difficulty,
  size,
}: {
  difficulty: IssueDifficulty;
  size?: BadgeProps["size"];
}) {
  return (
    <Badge variant={DIFFICULTY_VARIANT[difficulty]} size={size} className="uppercase">
      {difficulty}
    </Badge>
  );
}

export function StatusBadge({
  status,
  size,
}: {
  status: ContributionStatus;
  size?: BadgeProps["size"];
}) {
  return (
    <Badge variant={STATUS_VARIANT[status]} size={size}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}

export function RewardStatusBadge({
  status,
  size,
}: {
  status: RewardStatus;
  size?: BadgeProps["size"];
}) {
  return (
    <Badge variant={REWARD_VARIANT[status]} size={size} className="uppercase">
      {status}
    </Badge>
  );
}

export function SeasonStatusBadge({
  status,
  size,
}: {
  status: SeasonStatus;
  size?: BadgeProps["size"];
}) {
  return (
    <Badge variant={SEASON_VARIANT[status]} size={size} className="uppercase">
      {status}
    </Badge>
  );
}
