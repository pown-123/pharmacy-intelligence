import "server-only";

import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/auth";

export type TenantContext = {
  userId: string;
  organizationId: string;
  organizationName: string;
  branchId: string | null;
  branchName: string | null;
  role: "OWNER" | "MANAGER" | "STAFF";
};

export async function requireTenantContext(): Promise<TenantContext> {
  const session = await getCurrentSession();

  if (!session?.user?.organizationId) {
    redirect("/sign-in");
  }

  return {
    userId: session.user.id,
    organizationId: session.user.organizationId,
    organizationName: session.user.organizationName,
    branchId: session.user.branchId,
    branchName: session.user.branchName,
    role: session.user.role
  };
}
