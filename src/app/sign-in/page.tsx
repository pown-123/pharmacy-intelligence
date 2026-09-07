import Link from "next/link";
import { Suspense } from "react";

import { SignInForm } from "@/app/sign-in/sign-in-form";
import { StatusMessage } from "@/components/ui/status-message";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <section className="w-full max-w-md rounded-md border border-border bg-surface p-6 shadow-soft">
        <div className="mb-6">
          <p className="text-sm font-semibold text-primary">
            Pharmacy Intelligence
          </p>
          <h1 className="mt-2 text-2xl font-bold">Sign in</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Access your pharmacy organization&apos;s protected workspace.
          </p>
        </div>
        <Suspense
          fallback={
            <StatusMessage
              title="Loading sign in"
              description="Preparing the secure sign-in form."
            />
          }
        >
          <SignInForm />
        </Suspense>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          New pharmacy?{" "}
          <Link className="font-semibold text-primary" href="/onboarding">
            Create the first workspace
          </Link>
        </p>
      </section>
    </main>
  );
}
