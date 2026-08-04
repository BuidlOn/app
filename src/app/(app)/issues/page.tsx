import type { Metadata } from "next";
import { MarketplaceView } from "@/features/issues/components/marketplace-view";

export const metadata: Metadata = {
  title: "Issue Marketplace",
  description:
    "Browse and claim verified open source issues. Earn points and on-chain rewards for merged contributions.",
};

export default function IssuesPage() {
  return <MarketplaceView />;
}
