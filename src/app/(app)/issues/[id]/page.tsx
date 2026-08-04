import type { Metadata } from "next";
import { IssueDetailView } from "@/features/issues/components/issue-detail-view";

export const metadata: Metadata = {
  title: "Issue Detail",
};

export default async function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <IssueDetailView issueId={id} />;
}
