import { Label } from "@/components/ui/label";

/** Shared field wrapper, mirroring the one in components/forms/contact-form.tsx. */
export function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <Label htmlFor={id} className="text-sm font-medium text-carbon-100">
          {label}
        </Label>
        {optional && <span className="text-xs text-carbon-400">Optional</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
