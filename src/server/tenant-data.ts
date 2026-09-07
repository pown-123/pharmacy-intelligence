import "server-only";

import { prisma } from "@/lib/prisma";
import { scopedWhere } from "@/lib/tenant-scope";
import type { TenantContext } from "@/server/tenant-context";

export async function listBranchesForTenant(
  ctx: Pick<TenantContext, "organizationId">
) {
  return prisma.branch.findMany({
    where: scopedWhere(ctx),
    orderBy: { name: "asc" }
  });
}

export async function assertBranchBelongsToTenant(
  ctx: Pick<TenantContext, "organizationId">,
  branchId: string
) {
  const branch = await prisma.branch.findFirst({
    where: scopedWhere(ctx, { id: branchId }),
    select: { id: true, name: true }
  });

  if (!branch) {
    throw new Error("Branch is not available for this organization");
  }

  return branch;
}

export async function listUsersForTenant(
  ctx: Pick<TenantContext, "organizationId">
) {
  return prisma.user.findMany({
    where: scopedWhere(ctx),
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      branch: { select: { name: true } },
      createdAt: true
    },
    orderBy: { createdAt: "asc" }
  });
}
