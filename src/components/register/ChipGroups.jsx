import { FieldError } from "./FieldError";
export function ChipGroup({
  label,
  options,
  selected,
  onToggle,
  single = false,
  error,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-gray-900">{label}</label>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = single
            ? selected === opt.value
            : selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onToggle(opt.value)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all
                ${
                  isSelected
                    ? "border-[#0a2366] bg-[#0a2366] text-white"
                    : "border-gray-200 bg-gray-100 text-gray-700 hover:border-gray-400 hover:bg-gray-200"
                }`}
            >
              {opt.emoji && <span className="mr-1">{opt.emoji}</span>}
              {opt.label}
            </button>
          );
        })}
      </div>
      <FieldError message={error} />
    </div>
  );
}
