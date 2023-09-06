import { ChangeEvent } from "react";

export type SelectOption = {
  label: string;
  value: string;
  selected?: boolean;
};

export default function Select({
  className = "",
  options = [],
  onChange,
}: {
  className?: string;
  options: SelectOption[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select
      value={options.find((o) => o.selected)?.value || ""}
      className={`rounded border-2 border-neutral-700 bg-white px-2 py-1.5 text-black transition duration-300 focus:border-primary focus:outline-none ${className}`}
      onChange={onChange}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
