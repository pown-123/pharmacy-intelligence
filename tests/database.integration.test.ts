import { PrismaClient, Role } from "@prisma/client";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { hashPassword } from "@/lib/password";
import {
  assertBranchBelongsToTenant,
  listBranchesForTenant,
  listUsersForTenant
} from "@/server/tenant-data";

const runDatabaseTests = process.env.RUN_DATABASE_TESTS === "true";
const describeDatabase = runDatabaseTests ? describe : describe.skip;

const prisma = new PrismaClient();

describeDatabase("real database tenant isolation", () => {
  const suffix = crypto.randomUUID().slice(0, 8);
  let orgOneId = "";
  let orgTwoId = "";
  let orgOneBranchId = "";
  let orgTwoBranchId = "";

  beforeAll(async () => {
    const passwordHash = await hashPassword("integration-password");

    const orgOne = await prisma.organization.create({
      data: {
        name: `Integration Pharmacy ${suffix} A`,
        slug: `integration-${suffix}-a`,
        branches: {
          create: {
            name: "Main Branch"
          }
        },
        users: {
          create: {
            name: "Owner A",
            email: `owner-a-${suffix}@example.test`,
            passwordHash,
            role: Role.OWNER
          }
        }
      },
      include: {
        branches: true
      }
    });

    const orgTwo = await prisma.organization.create({
      data: {
        name: `Integration Pharmacy ${suffix} B`,
        slug: `integration-${suffix}-b`,
        branches: {
          create: {
            name: "Other Branch"
          }
        },
        users: {
          create: {
            name: "Owner B",
            email: `owner-b-${suffix}@example.test`,
            passwordHash,
            role: Role.OWNER
          }
        }
      },
      include: {
        branches: true
      }
    });

    orgOneId = orgOne.id;
    orgTwoId = orgTwo.id;
    orgOneBranchId = orgOne.branches[0].id;
    orgTwoBranchId = orgTwo.branches[0].id;
  });

  afterAll(async () => {
    await prisma.organization.deleteMany({
      where: {
        slug: {
          in: [`integration-${suffix}-a`, `integration-${suffix}-b`]
        }
      }
    });
    await prisma.$disconnect();
  });

  it("lists only branches in the authenticated organization", async () => {
    const branches = await listBranchesForTenant({ organizationId: orgOneId });

    expect(branches).toHaveLength(1);
    expect(branches[0]).toMatchObject({
      id: orgOneBranchId,
      organizationId: orgOneId,
      name: "Main Branch"
    });
  });

  it("lists only users in the authenticated organization", async () => {
    const users = await listUsersForTenant({ organizationId: orgOneId });

    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject({
      name: "Owner A",
      email: `owner-a-${suffix}@example.test`,
      role: Role.OWNER
    });
  });

  it("rejects cross-organization branch access", async () => {
    await expect(
      assertBranchBelongsToTenant(
        { organizationId: orgOneId },
        orgTwoBranchId
      )
    ).rejects.toThrow("Branch is not available for this organization");
  });

  it("created independent tenant records in the same database", async () => {
    const count = await prisma.organization.count({
      where: {
        id: {
          in: [orgOneId, orgTwoId]
        }
      }
    });

    expect(count).toBe(2);
  });
});
