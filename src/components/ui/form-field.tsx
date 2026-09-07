import { Input, type InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormFieldProps = InputProps & {
  label: string;
  error?: string;
};

export function FormField({ label, error, id, ...props }: FormFieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId}>{label}</Label>
      <Input id={fieldId} aria-invalid={Boolean(error)} {...props} />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
