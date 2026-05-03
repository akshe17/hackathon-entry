import { SelectInput } from "./SelectInput";
import { NumberInput } from "./NumberInput";
import { HeartPulse } from "lucide-react";

const ACTIVITY_OPTIONS = [
  { value: "sedentary", label: "Sedentary (little/no exercise)" },
  { value: "light", label: "Lightly Active (1–3 days/week)" },
  { value: "moderate", label: "Moderately Active (3–5 days/week)" },
  { value: "very", label: "Very Active (6–7 days/week)" },
  { value: "extra", label: "Extra Active (athlete/physical job)" },
];

const SEX_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

export function Step2({ data, set, errors }) {
  const bmi =
    data.heightCm && data.weightKg
      ? (Number(data.weightKg) / (Number(data.heightCm) / 100) ** 2).toFixed(1)
      : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <NumberInput
          label="Age"
          placeholder="25"
          value={data.age}
          onChange={(v) => set("age", v)}
          min={1}
          max={120}
          unit="yrs"
          error={errors.age}
        />
        <SelectInput
          label="Sex"
          value={data.sex}
          onChange={(v) => set("sex", v)}
          options={SEX_OPTIONS}
          error={errors.sex}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <NumberInput
          label="Height"
          placeholder="160"
          value={data.heightCm}
          onChange={(v) => set("heightCm", v)}
          unit="cm"
          error={errors.heightCm}
        />
        <NumberInput
          label="Weight"
          placeholder="60"
          value={data.weightKg}
          onChange={(v) => set("weightKg", v)}
          unit="kg"
          error={errors.weightKg}
        />
      </div>
      <SelectInput
        label="Activity Level"
        value={data.activityLevel}
        onChange={(v) => set("activityLevel", v)}
        options={ACTIVITY_OPTIONS}
        error={errors.activityLevel}
      />
      {bmi && (
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <HeartPulse size={15} className="text-gray-500 shrink-0" />
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Estimated BMI: {bmi}</span>
            <span className="ml-2 text-xs text-gray-400">· General estimate only, not medical advice</span>
          </p>
        </div>
      )}
    </div>
  );
}
