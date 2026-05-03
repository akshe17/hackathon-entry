import { TextInput as MantineTextInput } from "@mantine/core";

const inputStyles = {
  wrapper: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  label: { fontWeight: 600, fontSize: "0.875rem", color: "#111827", marginBottom: 0 },
  input: { backgroundColor: "#f3f4f6", border: "none" },
};

export function TextInput({ label, placeholder, value, onChange, type = "text", error }) {
  return (
    <MantineTextInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      type={type}
      size="md"
      radius="md"
      error={error}
      styles={inputStyles}
    />
  );
}
