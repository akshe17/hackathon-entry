import { useState } from "react";
import { Link } from "react-router-dom";
import { ScanBarcode } from "lucide-react";
import { BrandName } from "../components/BrandName";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Anchor,
  Stack,
  Title,
  Text,
  Box,
  Paper,
  Modal,
} from "@mantine/core";

function ResetPasswordModal({ opened, onClose }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  const handleClose = () => {
    onClose();
    setSent(false);
    setEmail("");
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Text fw={700} size="lg" style={{ color: "#0a1930" }}>
          Reset your password
        </Text>
      }
      centered
      radius="lg"
      size="sm"
    >
      {sent ? (
        <Stack gap="md" pb="sm">
          <Text size="sm" c="dimmed" ta="center">
            If <strong>{email}</strong> is registered, you'll receive a reset link shortly. Check your inbox.
          </Text>
          <Button fullWidth radius="md" style={{ backgroundColor: "#164bd4" }} onClick={handleClose}>
            Done
          </Button>
        </Stack>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack gap="md" pb="sm">
            <Text size="sm" c="dimmed">
              Enter your account email and we'll send you a link to reset your password.
            </Text>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              size="md"
              radius="md"
              required
              styles={{
                wrapper: { display: "flex", flexDirection: "column", gap: "0.5rem" },
                label: { fontWeight: 600, fontSize: "0.875rem", color: "#111827", marginBottom: 0 },
                input: { backgroundColor: "#f3f4f6", border: "none" },
              }}
            />
            <Button type="submit" fullWidth radius="md" style={{ backgroundColor: "#164bd4" }}>
              Send reset link
            </Button>
          </Stack>
        </form>
      )}
    </Modal>
  );
}

export default function Login() {
  const [remember, setRemember] = useState(false);
  const [resetOpened, setResetOpened] = useState(false);

  return (
    <Paper radius="xl" p={{ base: "xl", sm: 64 }} style={{ width: "100%", maxWidth: 560 }}>
      <ResetPasswordModal opened={resetOpened} onClose={() => setResetOpened(false)} />

      <Stack gap="xl">
        {/* Icon + heading */}
        <Stack gap="md" align="center">
          <Box
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "#eef2ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ScanBarcode size={28} color="#164bd4" strokeWidth={1.75} />
          </Box>
          <Stack gap={4} align="center">
            <Text size="sm" c="dimmed" fw={500}>Welcome back to</Text>
            <Title
              order={2}
              ta="center"
              style={{ color: "#0a1930", fontWeight: 700, fontSize: "1.75rem", lineHeight: 1 }}
            >
              <BrandName />
            </Title>
          </Stack>
        </Stack>

        {/* Fields */}
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack gap="lg">
            <TextInput
              label="Email"
              placeholder="harper@ningle.com"
              type="email"
              size="md"
              radius="md"
              styles={{
                wrapper: { display: "flex", flexDirection: "column", gap: "0.5rem" },
                label: { fontWeight: 600, fontSize: "0.875rem", color: "#111827", marginBottom: 0 },
                input: { backgroundColor: "#f3f4f6", border: "none" },
              }}
            />

            <Stack gap="xs">
              <PasswordInput
                label="Password"
                placeholder="••••••••••••••••"
                size="md"
                radius="md"
                styles={{
                  wrapper: { display: "flex", flexDirection: "column", gap: "0.5rem" },
                  label: { fontWeight: 600, fontSize: "0.875rem", color: "#111827", marginBottom: 0 },
                  input: { backgroundColor: "#f3f4f6", border: "none" },
                  innerInput: { backgroundColor: "#f3f4f6" },
                }}
              />
              <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Checkbox
                  label="Remember for 30 days"
                  checked={remember}
                  onChange={(e) => setRemember(e.currentTarget.checked)}
                  size="sm"
                  color="#1d4ed8"
                  styles={{ label: { fontSize: "0.875rem", color: "#374151" } }}
                />
                <Anchor
                  component="button"
                  type="button"
                  size="sm"
                  fw={500}
                  style={{ color: "#1d4ed8" }}
                  onClick={() => setResetOpened(true)}
                >
                  Forgot password?
                </Anchor>
              </Box>
            </Stack>

            <Stack gap="md">
              <Button type="submit" fullWidth size="md" radius="md" style={{ backgroundColor: "#164bd4" }}>
                Log In
              </Button>
              <Text ta="center" size="sm" c="dimmed">
                Don&apos;t have an account?{" "}
                <Anchor component={Link} to="/register" fw={700} style={{ color: "#0a1930" }}>
                  Sign Up
                </Anchor>
              </Text>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}
