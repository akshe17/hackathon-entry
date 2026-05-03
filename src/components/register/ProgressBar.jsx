export function ProgressBar({ current, total }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
            i < current
              ? "bg-[#0a2366]"
              : i === current
                ? "bg-[#1d4ed8]"
                : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
