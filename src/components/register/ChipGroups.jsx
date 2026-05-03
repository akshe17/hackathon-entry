import { Chip, Group, Text, Stack } from "@mantine/core";
import { FieldError } from "./FieldError";

export function ChipGroup({ label, options, selected, onToggle, single = false, error }) {
  const handleChange = (val) => {
    if (single) {
      onToggle(val);
    } else {
      onToggle(val);
    }
  };

  return (
    <Stack gap={6}>
      {label && (
        <Text size="sm" fw={600} style={{ color: "#111827" }}>
          {label}
        </Text>
      )}
      {single ? (
        <Chip.Group
          value={selected || null}
          onChange={(val) => onToggle(val)}
        >
          <Group gap="xs" wrap="wrap">
            {options.map((opt) => (
              <Chip
                key={opt.value}
                value={opt.value}
                size="sm"
                radius="xl"
                variant="filled"
                color="#0a2366"
              >
                {opt.label}
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      ) : (
        <Chip.Group
          multiple
          value={selected || []}
          onChange={(vals) => {
            const prev = selected || [];
            const added = vals.find((v) => !prev.includes(v));
            const removed = prev.find((v) => !vals.includes(v));
            if (added) onToggle(added);
            else if (removed) onToggle(removed);
          }}
        >
          <Group gap="xs" wrap="wrap">
            {options.map((opt) => (
              <Chip
                key={opt.value}
                value={opt.value}
                size="sm"
                radius="xl"
                variant="filled"
                color="#0a2366"
              >
                {opt.label}
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      )}
      <FieldError message={error} />
    </Stack>
  );
}
