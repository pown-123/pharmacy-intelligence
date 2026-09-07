"use client";

import { StatusMessage } from "@/components/ui/status-message";

export default function AppError() {
  return (
    <StatusMessage
      title="Something went wrong"
      description="Refresh the page or try again shortly."
      tone="error"
    />
  );
}
