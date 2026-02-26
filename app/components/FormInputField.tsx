type FormInputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
  placeholder: string;
  min?: number;
  className?: string;
};

export function FormInputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
  className,
}: FormInputFieldProps) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`.trim()}>
      <span className="text-sm font-medium text-[#2f3d2f]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        min={min}
        placeholder={placeholder}
        className="h-11 rounded-lg border border-[#c8ccb7] bg-white px-3 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[#cfe7db]"
      />
    </label>
  );
}
