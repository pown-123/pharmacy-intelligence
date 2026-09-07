import type { Session } from "next-auth";

import { BranchContext } from "@/components/app/branch-context";
import { MobileNav } from "@/components/app/mobile-nav";
import { Sidebar } from "@/components/app/sidebar";
import { UserMenu } from "@/components/app/user-menu";

type AppShellProps = {
  session: Session;
  branches: Array<{ id: string; name: string }>;
  children: React.ReactNode;
};

export function AppShell({ session, branches, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-surface px-4 sm:px-6">
          <BranchContext
            organizationName={session.user.organizationName}
            branchName={session.user.branchName}
            branches={branches}
          />
          <UserMenu
            name={session.user.name ?? "User"}
            email={session.user.email}
            role={session.user.role}
          />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
        <MobileNav />
      </div>
    </div>
  );
}
