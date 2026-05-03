import { Target, HeartPulse, Ruler, ScanBarcode, BookHeart, CalendarDays, LayoutDashboard } from "lucide-react";

const HEALTH_GOALS = [
  { value: "eat_healthier", label: "Eat Healthier" },
  { value: "lose_weight", label: "Lose Weight" },
  { value: "gain_weight", label: "Gain Weight" },
  { value: "maintain_weight", label: "Maintain Weight" },
  { value: "build_muscle", label: "Build Muscle" },
  { value: "reduce_sugar", label: "Reduce Sugar" },
  { value: "reduce_sodium", label: "Reduce Sodium" },
  { value: "improve_energy", label: "Improve Energy" },
  { value: "improve_digestion", label: "Better Digestion" },
];

export function Step4({ data }) {
  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0a2366] text-3xl">
        🎉
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#0a1930]">
          Welcome, {data.firstName || "there"}!
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Your personalized wellness journey starts now.
        </p>
      </div>
      <div className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left text-sm text-gray-800 flex flex-col gap-2">
        {data.healthGoal && (
          <div className="flex gap-2">
            <Target size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <p>
              <strong>Goal:</strong>{" "}
              {HEALTH_GOALS.find((x) => x.value === data.healthGoal)?.label}
            </p>
          </div>
        )}
        {data.heightCm && data.weightKg && (
          <div className="flex gap-2">
            <Ruler size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <p>
              <strong>BMI:</strong>{" "}
              {(Number(data.weightKg) / (Number(data.heightCm) / 100) ** 2).toFixed(1)}{" "}
              <span className="text-gray-400 text-xs">(estimate)</span>
            </p>
          </div>
        )}
      </div>
      <div className="w-full grid grid-cols-2 gap-2">
        {[
          { icon: ScanBarcode, label: "Scan Food" },
          { icon: BookHeart, label: "Write Diary" },
          { icon: CalendarDays, label: "Health Calendar" },
          { icon: LayoutDashboard, label: "Dashboard" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2.5">
            <Icon size={14} className="text-[#0a2366] shrink-0" />
            <span className="text-xs font-medium text-gray-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
