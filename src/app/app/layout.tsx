import { redirect } from "next/navigation";

import { AppShell } from "@/components/app/app-shell";
import { getCurrentSession } from "@/lib/auth";
import { listBranchesForTenant } from "@/server/tenant-data";

export default async function ProtectedAppLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getCurrentSession();

  if (!session?.user?.organizationId) {
    redirect("/sign-in");
  }

  const branches = await listBranchesForTenant({
    organizationId: session.user.organizationId
  });

  return (
    <AppShell
      session={session}
      branches={branches.map((branch) => ({
        id: branch.id,
        name: branch.name
      }))}
    >
      {children}
    </AppShell>
  );
}
