import { AlertCircle } from "lucide-react";
import { ChipGroup } from "./ChipGroups";
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

export function Step4({ data, set, errors }) {
  return (
    <div className="flex flex-col gap-5">
      <ChipGroup
        label="Current Health Status"
        options={HEALTH_STATUSES}
        selected={data.status}
        onToggle={(val) => set("status", val)}
        single
        error={errors.status}
      />
      <div className="flex gap-2 rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
        <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>Disclaimer:</strong> KainWise provides general wellness
          guidance only. Always follow medical advice from your doctor,
          especially during pregnancy, surgery recovery, or prescribed diets.
        </p>
      </div>
    </div>
  );
}
