import { HeartHandshake } from "lucide-react";

import { ComingNextPage } from "@/components/app/coming-next-page";

export default function WantedPage() {
  return (
    <ComingNextPage
      title="Wanted"
      description="Route placeholder for wanted items and missed demand capture."
      icon={HeartHandshake}
    />
  );
}
