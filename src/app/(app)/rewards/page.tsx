import type { Metadata } from "next";
import { RewardsView } from "@/features/rewards/components/rewards-view";

export const metadata: Metadata = {
  title: "Rewards",
  description:
    "Claim your USDC reward allocations from BuidlOn contribution seasons.",
};

export default function RewardsPage() {
  return <RewardsView />;
}
