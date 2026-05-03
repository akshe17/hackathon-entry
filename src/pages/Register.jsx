import { useState } from "react";
import { User, Ruler, Target, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Paper, Button, Group, Title, Text, Stack, Box } from "@mantine/core";

import { Step1 } from "../components/register/Step1";
import { Step2 } from "../components/register/Step2";
import { Step3 } from "../components/register/Step3";
import { Step4 } from "../components/register/Step4";
import { ProgressBar } from "../components/register/ProgressBar";

const STEPS = [
  { id: 1, title: "Create Account",   subtitle: "Let's get you started",         icon: User        },
  { id: 2, title: "Body Profile",     subtitle: "Help us personalize your plan", icon: Ruler       },
  { id: 3, title: "Health & Diet",    subtitle: "Goals and food preferences",    icon: Target      },
  { id: 4, title: "You're all set!",  subtitle: "Welcome to KainWise",           icon: CheckCircle2 },
];

function validateStep1(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  if (!form.email.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.password) errors.password = "Password is required.";
  else if (form.password.length < 8) errors.password = "Password must be at least 8 characters.";
  if (!form.confirm) errors.confirm = "Please confirm your password.";
  else if (form.confirm !== form.password) errors.confirm = "Passwords do not match.";
  return errors;
}

function validateStep2(form) {
  const errors = {};
  if (!form.age) errors.age = "Age is required.";
  else if (Number(form.age) < 1 || Number(form.age) > 120) errors.age = "Enter a valid age (1–120).";
  if (!form.sex) errors.sex = "Please select your sex.";
  if (!form.heightCm) errors.heightCm = "Height is required.";
  else if (Number(form.heightCm) < 50 || Number(form.heightCm) > 300) errors.heightCm = "Enter a valid height (50–300 cm).";
  if (!form.weightKg) errors.weightKg = "Weight is required.";
  else if (Number(form.weightKg) < 10 || Number(form.weightKg) > 500) errors.weightKg = "Enter a valid weight (10–500 kg).";
  if (!form.activityLevel) errors.activityLevel = "Please select your activity level.";
  return errors;
}

function validateStep3(form) {
  const errors = {};
  if (!form.healthGoal) errors.healthGoal = "Please select a primary health goal.";
  if (!form.allergies || form.allergies.length === 0) errors.allergies = "Select at least one option (choose 'None' if no allergies).";
  if (!form.foodPreferences || form.foodPreferences.length === 0) errors.foodPreferences = "Select at least one option (choose 'No Preference' if none).";
  if (!form.dietRestrictions || form.dietRestrictions.length === 0) errors.dietRestrictions = "Select at least one option (choose 'None' if none).";
  return errors;
}

const VALIDATORS = [validateStep1, validateStep2, validateStep3];

export default function Register() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    email: "", password: "", confirm: "",
    age: "", sex: "", heightCm: "", weightKg: "", activityLevel: "",
    healthGoal: "", allergies: [], foodPreferences: [], dietRestrictions: [],
  });

  const setField = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];
  const StepIcon = current.icon;

  const handleNext = () => {
    if (isLast) return;
    const validate = VALIDATORS[step];
    if (!validate) { setStep((s) => s + 1); return; }
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleBack = () => { setErrors({}); setStep((s) => s - 1); };

  const stepComponents = [
    <Step1 key={0} data={form} set={setField} errors={errors} />,
    <Step2 key={1} data={form} set={setField} errors={errors} />,
    <Step3 key={2} data={form} set={setField} errors={errors} />,
    <Step4 key={3} data={form} />,
  ];

  return (
    <Paper radius="xl" p={{ base: "xl", sm: 56 }} style={{ width: "100%", maxWidth: 560 }}>
      {/* Step indicator */}
      {!isLast && (
        <Box mb="md">
          <Group justify="space-between" mb={8}>
            <Text size="xs" fw={700} style={{ color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Step {step + 1} of {STEPS.length - 1}
            </Text>
            <Box
              style={{
                width: 28, height: 28,
                borderRadius: "50%",
                backgroundColor: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StepIcon size={14} color="#0a2366" />
            </Box>
          </Group>
          <ProgressBar current={step} total={STEPS.length - 1} />
        </Box>
      )}

      {/* Step header */}
      <Stack gap={2} mb="lg">
        <Title order={2} style={{ color: "#0a1930", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.01em" }}>
          {current.title}
        </Title>
        <Text size="sm" c="dimmed">{current.subtitle}</Text>
      </Stack>

      {/* Step content */}
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .step-anim { animation: fadeSlide .25s ease both; }
      `}</style>
      <div className="step-anim" key={step}>
        {stepComponents[step]}
      </div>

      {/* Navigation */}
      <Group mt="xl" gap="sm">
        {step > 0 && !isLast && (
          <Button
            variant="default"
            leftSection={<ArrowLeft size={15} />}
            onClick={handleBack}
            radius="md"
            size="md"
            style={{ flex: 1 }}
          >
            Back
          </Button>
        )}
        {!isLast && (
          <Button
            rightSection={<ArrowRight size={15} />}
            onClick={handleNext}
            radius="md"
            size="md"
            style={{ flex: 1, backgroundColor: "#164bd4" }}
          >
            {step === STEPS.length - 2 ? "Finish Setup" : "Continue"}
          </Button>
        )}
        {isLast && (
          <Button
            component={Link}
            to="/dashboard"
            rightSection={<ArrowRight size={15} />}
            fullWidth
            radius="md"
            size="md"
            style={{ backgroundColor: "#164bd4" }}
          >
            Go to Dashboard
          </Button>
        )}
      </Group>

      {step === 0 && (
        <Text ta="center" size="sm" c="dimmed" mt="lg">
          Already have an account?{" "}
          <Text component={Link} to="/login" fw={700} style={{ color: "#0a1930" }} inherit>
            Log In
          </Text>
        </Text>
      )}
    </Paper>
  );
}
