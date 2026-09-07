import { Settings } from "lucide-react";

import { ComingNextPage } from "@/components/app/coming-next-page";

export default function SettingsPage() {
  return (
    <ComingNextPage
      title="Settings"
      description="Route placeholder for organization, branch, and user administration."
      icon={Settings}
    />
  );
}
