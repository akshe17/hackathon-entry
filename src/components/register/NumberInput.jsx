import { NumberInput as MantineNumberInput } from "@mantine/core";

const inputStyles = {
  wrapper: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  label: { fontWeight: 600, fontSize: "0.875rem", color: "#111827", marginBottom: 0 },
  input: { backgroundColor: "#f3f4f6", border: "none" },
};

export function NumberInput({ label, placeholder, value, onChange, min, max, unit, error }) {
  return (
    <MantineNumberInput
      label={label}
      placeholder={placeholder}
      value={value === "" ? "" : Number(value)}
      onChange={(val) => onChange(val === "" ? "" : String(val))}
      min={min}
      max={max}
      size="md"
      radius="md"
      error={error}
      hideControls
      rightSection={unit ? <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#9ca3af", paddingRight: 8 }}>{unit}</span> : null}
      styles={inputStyles}
    />
  );
}
