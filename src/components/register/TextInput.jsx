import { FieldError } from "./FieldError";
export function TextInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
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
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg bg-[#f3f4f6] px-4 py-3 text-sm text-gray-900 placeholder-gray-500 outline-none transition border-none focus:ring-2 focus:ring-[#1d4ed8]
            ${Icon ? "pl-10" : ""}
            ${error ? "ring-2 ring-red-300 focus:ring-red-400" : ""}`}
        />
      </div>
      <FieldError message={error} />
    </div>
  );
}
