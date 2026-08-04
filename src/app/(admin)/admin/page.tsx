import type { Metadata } from "next";
import { AdminView } from "@/features/admin/components/admin-view";

export const metadata: Metadata = {
  title: "Admin Console",
};

export default function AdminPage() {
  return <AdminView />;
}
