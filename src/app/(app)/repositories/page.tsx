import type { Metadata } from "next";
import { RepositoriesView } from "@/features/repositories/components/repositories-view";

export const metadata: Metadata = {
  title: "Repositories",
  description:
    "Explore open source projects connected to BuidlOn and the issues they publish.",
};

export default function RepositoriesPage() {
  return <RepositoriesView />;
}
