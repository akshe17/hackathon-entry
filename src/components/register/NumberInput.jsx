import { FieldError } from "./FieldError";
export function NumberInput({
  label,
  placeholder,
  value,
  onChange,
  min,
  max,
  unit,
  error,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-semibold text-gray-900">{label}</label>
      )}
      <div className="relative">
        <input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          className={`w-full rounded-lg bg-[#f3f4f6] px-4 py-3 pr-14 text-sm text-gray-900 placeholder-gray-500 outline-none transition border-none focus:ring-2 focus:ring-[#1d4ed8]
            ${error ? "ring-2 ring-red-300 focus:ring-red-400" : ""}`}
        />
        {unit && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
            {unit}
          </span>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
}
