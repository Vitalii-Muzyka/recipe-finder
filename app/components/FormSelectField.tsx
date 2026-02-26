import { CustomSelect } from "./CustomSelect";

type FormSelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
};

export function FormSelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: FormSelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-[#2f3d2f]">{label}</span>
      <CustomSelect
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        ariaLabel={label}
      />
    </div>
  );
}
