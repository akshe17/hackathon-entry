import {
  Icon,
  Ruler,
  HeartPulse,
  Target,
  ScanBarcode,
  BookHeart,
  CalendarDays,
  LayoutDashboard,
} from "lucide-react";
const GOALS = [
  { value: "eat_healthier", label: "Eat Healthier" },
  { value: "lose_weight", label: "Lose Weight" },
  { value: "gain_weight", label: "Gain Weight" },
  { value: "maintain", label: "Maintain Weight" },
  { value: "build_muscle", label: "Build Muscle" },
  { value: "reduce_sugar", label: "Reduce Sugar" },
  { value: "reduce_sodium", label: "Reduce Sodium" },
  { value: "improve_energy", label: "Improve Energy" },
  { value: "improve_digestion", label: "Better Digestion" },
];

const HEALTH_STATUSES = [
  { value: "general", label: "General Wellness" },
  { value: "period", label: "On Period" },
  { value: "pregnant", label: "Pregnant" },
  { value: "breastfeeding", label: "Breastfeeding" },
  { value: "post_surgery", label: "Post-Surgery Recovery" },
  { value: "low_sodium", label: "Low Sodium" },
  { value: "low_sugar", label: "Low Sugar" },
  { value: "low_fat", label: "Low Fat" },
  { value: "soft_food", label: "Soft Food Only" },
  { value: "allergy", label: "Allergy Restriction" },
];

export function Step5({ data }) {
  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full text-4xl bg-[#0a2366]"></div>
      <div>
        <h3 className="text-xl font-bold text-[#0a1930]">
          Welcome, {data.name || "there"}!
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Your personalized wellness journey starts now.
        </p>
      </div>
      <div className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left text-sm text-gray-800 space-y-2">
        {data.goals?.length > 0 && (
          <div className="flex gap-2">
            <Target size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <p>
              <strong>Goals:</strong>{" "}
              {data.goals
                .map((g) => GOALS.find((x) => x.value === g)?.label)
                .join(", ")}
            </p>
          </div>
        )}
        {data.status && (
          <div className="flex gap-2">
            <HeartPulse size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <p>
              <strong>Status:</strong>{" "}
              {HEALTH_STATUSES.find((x) => x.value === data.status)?.label}
            </p>
          </div>
        )}
        {data.height && data.weight && (
          <div className="flex gap-2">
            <Ruler size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <p>
              <strong>BMI:</strong>{" "}
              {(Number(data.weight) / (Number(data.height) / 100) ** 2).toFixed(
                1,
              )}{" "}
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
          <div
            key={label}
            className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2.5"
          >
            <Icon size={14} className="text-[#0a2366] shrink-0" />
            <span className="text-xs font-medium text-gray-700">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
        Scan your first food barcode, write a diary entry, or explore your
        wellness dashboard to get started.
      </p>
    </div>
  );
}
