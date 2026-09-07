import type { LucideIcon } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/app/page-heading";

type ComingNextPageProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ComingNextPage({
  title,
  description,
  icon
}: ComingNextPageProps) {
  return (
    <div>
      <PageHeading title={title} description={description} />
      <EmptyState
        icon={icon}
        title="Coming next"
        description="This foundation reserves the route and navigation surface without implementing the workflow yet."
      />
    </div>
  );
}
