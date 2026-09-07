type StatusMessageProps = {
  title: string;
  description: string;
  tone?: "neutral" | "error";
};

export function StatusMessage({
  title,
  description,
  tone = "neutral"
}: StatusMessageProps) {
  return (
    <div
      className={
        tone === "error"
          ? "rounded-md border border-red-200 bg-red-50 p-4 text-red-900"
          : "rounded-md border border-border bg-surface p-4 text-foreground"
      }
    >
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm opacity-80">{description}</p>
    </div>
  );
}
