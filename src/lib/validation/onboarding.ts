import { z } from "zod";

export const onboardingSchema = z
  .object({
    organizationName: z.string().trim().min(2, "Enter the pharmacy name"),
    branchName: z.string().trim().min(2, "Enter the first branch name"),
    ownerName: z.string().trim().min(2, "Enter the owner's name"),
    ownerEmail: z.string().trim().email("Enter a valid email address"),
    password: z.string().min(10, "Use at least 10 characters"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match"
  });

export type OnboardingInput = z.infer<typeof onboardingSchema>;
