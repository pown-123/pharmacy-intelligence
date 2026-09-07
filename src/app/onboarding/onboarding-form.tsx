"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

import {
  onboardOrganization,
  type OnboardingState
} from "@/app/onboarding/actions";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { StatusMessage } from "@/components/ui/status-message";

const initialState: OnboardingState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Create workspace
    </Button>
  );
}

export function OnboardingForm() {
  const [state, formAction] = useFormState(onboardOrganization, initialState);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.formError ? (
        <StatusMessage
          title="Workspace not created"
          description={state.formError}
          tone="error"
        />
      ) : null}
      <FormField
        name="organizationName"
        label="Pharmacy organization"
        autoComplete="organization"
        error={state.fieldErrors?.organizationName?.[0]}
      />
      <FormField
        name="branchName"
        label="First branch"
        autoComplete="off"
        error={state.fieldErrors?.branchName?.[0]}
      />
      <FormField
        name="ownerName"
        label="Owner name"
        autoComplete="name"
        error={state.fieldErrors?.ownerName?.[0]}
      />
      <FormField
        name="ownerEmail"
        label="Owner email"
        type="email"
        autoComplete="email"
        error={state.fieldErrors?.ownerEmail?.[0]}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          error={state.fieldErrors?.password?.[0]}
        />
        <FormField
          name="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          error={state.fieldErrors?.confirmPassword?.[0]}
        />
      </div>
      <SubmitButton />
    </form>
  );
}
