import { Select } from "@mantine/core";

const inputStyles = {
  wrapper: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  label: { fontWeight: 600, fontSize: "0.875rem", color: "#111827", marginBottom: 0 },
  input: { backgroundColor: "#f3f4f6", border: "none" },
};

export function SelectInput({ label, value, onChange, options, error }) {
  const data = options.map((o) => ({ value: o.value, label: o.label }));
  return (
    <Select
      label={label}
      placeholder="Select…"
      value={value || null}
      onChange={(val) => onChange(val ?? "")}
      data={data}
      size="md"
      radius="md"
      error={error}
      styles={inputStyles}
    />
  );
}
