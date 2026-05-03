import { ChevronDown } from "lucide-react";
import { FieldError } from "./FieldError";

export function SelectInput({
  label,
  value,
  onChange,
  options,
  icon: Icon,
  error,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-semibold text-gray-900">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon size={15} />
          </span>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-lg bg-[#f3f4f6] px-4 py-3 text-sm text-gray-900 outline-none transition border-none focus:ring-2 focus:ring-[#1d4ed8]
            ${Icon ? "pl-10" : ""}
            ${error ? "ring-2 ring-red-300 focus:ring-red-400" : ""}`}
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          <ChevronDown size={14} />
        </span>
      </div>
      <FieldError message={error} />
    </div>
  );
}
