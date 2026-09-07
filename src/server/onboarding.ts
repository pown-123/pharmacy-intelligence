import "server-only";

import { Role } from "@prisma/client";

import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { slugifyOrganizationName, withRandomSuffix } from "@/lib/slug";
import {
  onboardingSchema,
  type OnboardingInput
} from "@/lib/validation/onboarding";

export async function createOrganizationWithOwner(input: OnboardingInput) {
  const data = onboardingSchema.parse(input);
  const passwordHash = await hashPassword(data.password);
  const slug = withRandomSuffix(slugifyOrganizationName(data.organizationName));

  return prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: {
        name: data.organizationName,
        slug
      }
    });

    const branch = await tx.branch.create({
      data: {
        name: data.branchName,
        organizationId: organization.id
      }
    });

    const user = await tx.user.create({
      data: {
        name: data.ownerName,
        email: data.ownerEmail.toLowerCase(),
        passwordHash,
        role: Role.OWNER,
        organizationId: organization.id,
        branchId: branch.id
      }
    });

    return { organization, branch, user };
  });
}
