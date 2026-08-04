import type { Metadata } from "next";
import { RegisterRepositoryForm } from "@/features/repositories/components/register-repository-form";

export const metadata: Metadata = {
  title: "Connect Repository",
};

export default function NewRepositoryPage() {
  return <RegisterRepositoryForm />;
}
