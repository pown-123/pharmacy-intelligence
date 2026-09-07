import { Building2 } from "lucide-react";

type BranchContextProps = {
  organizationName: string;
  branchName: string | null;
  branches: Array<{ id: string; name: string }>;
};

export function BranchContext({
  organizationName,
  branchName,
  branches
}: BranchContextProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="hidden h-10 w-10 items-center justify-center rounded-md border border-border bg-surface sm:flex">
        <Building2 className="h-5 w-5 text-primary" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{organizationName}</p>
        <p className="truncate text-xs text-muted-foreground">
          {branchName ?? branches[0]?.name ?? "No branch selected"}
        </p>
      </div>
    </div>
  );
}
