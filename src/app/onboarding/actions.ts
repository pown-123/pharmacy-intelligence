"use server";

import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

import { createOrganizationWithOwner } from "@/server/onboarding";
import { onboardingSchema } from "@/lib/validation/onboarding";

export type OnboardingState = {
  fieldErrors?: Record<string, string[] | undefined>;
  formError?: string;
};

export async function onboardOrganization(
  _previousState: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const raw = {
    organizationName: formData.get("organizationName"),
    branchName: formData.get("branchName"),
    ownerName: formData.get("ownerName"),
    ownerEmail: formData.get("ownerEmail"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  };

  const parsed = onboardingSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  try {
    await createOrganizationWithOwner(parsed.data);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        formError:
          "That organization slug or owner email is already in use. Try a different email or pharmacy name."
      };
    }

    return {
      formError: "The workspace could not be created. Please try again."
    };
  }

  redirect(
    `/sign-in?created=1&email=${encodeURIComponent(parsed.data.ownerEmail)}`
  );
}
