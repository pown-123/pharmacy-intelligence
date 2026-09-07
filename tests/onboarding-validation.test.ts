import { describe, expect, it } from "vitest";

import { onboardingSchema } from "@/lib/validation/onboarding";

describe("onboarding validation", () => {
  it("requires matching owner passwords", () => {
    const result = onboardingSchema.safeParse({
      organizationName: "Medlyfe Pharmacy",
      branchName: "Main Branch",
      ownerName: "Owner User",
      ownerEmail: "owner@example.com",
      password: "long-password",
      confirmPassword: "different-password"
    });

    expect(result.success).toBe(false);
  });

  it("accepts valid organization, branch, and owner details", () => {
    const result = onboardingSchema.safeParse({
      organizationName: "Medlyfe Pharmacy",
      branchName: "Main Branch",
      ownerName: "Owner User",
      ownerEmail: "owner@example.com",
      password: "long-password",
      confirmPassword: "long-password"
    });

    expect(result.success).toBe(true);
  });
});
