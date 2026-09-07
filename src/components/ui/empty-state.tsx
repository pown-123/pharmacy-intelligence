import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-md border border-dashed border-border bg-surface px-6 py-12 text-center">
      <div className="max-w-sm space-y-3">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-muted text-primary">
          <Icon aria-hidden className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
