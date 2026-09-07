import { Users } from "lucide-react";

import { ComingNextPage } from "@/components/app/coming-next-page";

export default function CustomersPage() {
  return (
    <ComingNextPage
      title="Customers"
      description="Route placeholder for customer records and service context."
      icon={Users}
    />
  );
}
