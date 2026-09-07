import { CalendarDays } from "lucide-react";

import { ComingNextPage } from "@/components/app/coming-next-page";

export default function TodayPage() {
  return (
    <ComingNextPage
      title="Today"
      description="A protected owner and staff workspace entry point for daily pharmacy operations."
      icon={CalendarDays}
    />
  );
}
