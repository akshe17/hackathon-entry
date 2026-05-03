import { ChipGroup } from "./ChipGroups";
import { TextInput } from "./TextInput";
import { Utensils } from "lucide-react";
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

const ALLERGIES = [
  { value: "gluten", label: "Gluten" },
  { value: "dairy", label: "Dairy" },
  { value: "nuts", label: "Nuts" },
  { value: "shellfish", label: "Shellfish" },
  { value: "eggs", label: "Eggs" },
  { value: "soy", label: "Soy" },
  { value: "none", label: "None" },
];

export function Step3({ data, set, errors }) {
  const toggleGoal = (val) => {
    const current = data.goals || [];
    set(
      "goals",
      current.includes(val)
        ? current.filter((g) => g !== val)
        : [...current, val],
    );
  };
  const toggleAllergy = (val) => {
    const current = data.allergies || [];
    set(
      "allergies",
      current.includes(val)
        ? current.filter((a) => a !== val)
        : [...current, val],
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <ChipGroup
        label="Health Goals (pick all that apply)"
        options={GOALS}
        selected={data.goals || []}
        onToggle={toggleGoal}
        error={errors.goals}
      />
      <ChipGroup
        label="Allergies & Restrictions"
        options={ALLERGIES}
        selected={data.allergies || []}
        onToggle={toggleAllergy}
        error={errors.allergies}
      />
      <TextInput
        label="Other dietary preference (optional)"
        placeholder="e.g. vegetarian, halal, kosher…"
        value={data.diet}
        onChange={(v) => set("diet", v)}
        icon={Utensils}
      />
    </div>
  );
}
