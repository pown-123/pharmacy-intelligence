import { FileUp } from "lucide-react";

import { ComingNextPage } from "@/components/app/coming-next-page";

export default function UploadPage() {
  return (
    <ComingNextPage
      title="Upload Data"
      description="Route placeholder for future MARG Excel and CSV upload handling."
      icon={FileUp}
    />
  );
}
