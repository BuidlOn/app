import type { Metadata } from "next";
import { PersonalProfileView } from "@/features/profile/components/personal-profile-view";

export const metadata: Metadata = {
  title: "My Profile",
};

export default function ProfilePage() {
  return <PersonalProfileView />;
}
