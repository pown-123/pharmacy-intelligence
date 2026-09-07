import { PackagePlus } from "lucide-react";

import { ComingNextPage } from "@/components/app/coming-next-page";

export default function PurchasePage() {
  return (
    <ComingNextPage
      title="Purchase"
      description="Route placeholder for purchase records and supplier-linked stock intake."
      icon={PackagePlus}
    />
  );
}
