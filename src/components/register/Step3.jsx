import { ChipGroup } from "./ChipGroups";
import { SelectInput } from "./SelectInput";

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

const ALLERGIES = [
  { value: "gluten", label: "Gluten" },
  { value: "dairy", label: "Dairy" },
  { value: "nuts", label: "Nuts" },
  { value: "shellfish", label: "Shellfish" },
  { value: "eggs", label: "Eggs" },
  { value: "soy", label: "Soy" },
  { value: "none", label: "None" },
];

const FOOD_PREFERENCES = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
  { value: "none", label: "No Preference" },
];

const DIET_RESTRICTIONS = [
  { value: "low_sodium", label: "Low Sodium" },
  { value: "low_sugar", label: "Low Sugar" },
  { value: "low_fat", label: "Low Fat" },
  { value: "low_carb", label: "Low Carb" },
  { value: "high_protein", label: "High Protein" },
  { value: "none", label: "None" },
];

export function Step3({ data, set, errors }) {
  const toggle = (key) => (val) => {
    const current = data[key] || [];
    set(key, current.includes(val) ? current.filter((v) => v !== val) : [...current, val]);
  };

  return (
    <div className="flex flex-col gap-5">
      <SelectInput
        label="Primary Health Goal"
        value={data.healthGoal}
        onChange={(v) => set("healthGoal", v)}
        options={HEALTH_GOALS}
        error={errors.healthGoal}
      />
      <ChipGroup
        label="Allergies"
        options={ALLERGIES}
        selected={data.allergies || []}
        onToggle={toggle("allergies")}
        error={errors.allergies}
      />
      <ChipGroup
        label="Food Preferences"
        options={FOOD_PREFERENCES}
        selected={data.foodPreferences || []}
        onToggle={toggle("foodPreferences")}
        error={errors.foodPreferences}
      />
      <ChipGroup
        label="Dietary Restrictions"
        options={DIET_RESTRICTIONS}
        selected={data.dietRestrictions || []}
        onToggle={toggle("dietRestrictions")}
        error={errors.dietRestrictions}
      />
    </div>
  );
}
