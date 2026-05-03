import { PasswordInput as MantinePasswordInput } from "@mantine/core";

const inputStyles = {
  wrapper: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  label: { fontWeight: 600, fontSize: "0.875rem", color: "#111827", marginBottom: 0 },
  input: { backgroundColor: "#f3f4f6", border: "none" },
  innerInput: { backgroundColor: "#f3f4f6" },
};

export function PasswordInput({ label, placeholder, value, onChange, error }) {
  return (
    <MantinePasswordInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      size="md"
      radius="md"
      error={error}
      styles={inputStyles}
    />
  );
}
