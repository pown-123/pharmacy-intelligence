"use client";

import { signOut } from "next-auth/react";
import { LogOut, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

type UserMenuProps = {
  name: string;
  email?: string | null;
  role: string;
};

export function UserMenu({ name, email, role }: UserMenuProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground">
          {role}
          {email ? ` · ${email}` : ""}
        </p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface">
        <UserRound className="h-5 w-5 text-muted-foreground" aria-hidden />
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        title="Sign out"
        aria-label="Sign out"
        onClick={() => signOut({ callbackUrl: "/sign-in" })}
      >
        <LogOut className="h-4 w-4" aria-hidden />
      </Button>
    </div>
  );
}
