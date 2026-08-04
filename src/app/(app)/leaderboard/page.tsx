import type { Metadata } from "next";
import { LeaderboardView } from "@/features/leaderboard/components/leaderboard-view";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "Season contributor rankings by points and merged pull requests across the BuidlOn ecosystem.",
};

export default function LeaderboardPage() {
  return <LeaderboardView />;
}
