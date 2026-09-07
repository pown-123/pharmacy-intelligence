import Link from "next/link";

import { OnboardingForm } from "@/app/onboarding/onboarding-form";

export default function OnboardingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <section className="w-full max-w-2xl rounded-md border border-border bg-surface p-6 shadow-soft">
        <div className="mb-6">
          <p className="text-sm font-semibold text-primary">
            Pharmacy Intelligence
          </p>
          <h1 className="mt-2 text-2xl font-bold">Create your workspace</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Set up the pharmacy organization, first branch, and owner account.
          </p>
        </div>
        <OnboardingForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already onboarded?{" "}
          <Link className="font-semibold text-primary" href="/sign-in">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
