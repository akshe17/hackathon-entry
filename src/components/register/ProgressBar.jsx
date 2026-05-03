import { Progress, Group } from "@mantine/core";

export function ProgressBar({ current, total }) {
  return (
    <Group gap={4} align="center" style={{ flexWrap: "nowrap" }}>
      {Array.from({ length: total }).map((_, i) => (
        <Progress
          key={i}
          value={100}
          size="xs"
          radius="xl"
          style={{ flex: 1 }}
          color={i < current ? "#0a2366" : i === current ? "#1d4ed8" : "#e5e7eb"}
        />
      ))}
    </Group>
  );
}
