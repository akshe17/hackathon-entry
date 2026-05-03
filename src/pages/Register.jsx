import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Ruler,
  Weight,
  Activity,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Utensils,
  Target,
  HeartPulse,
  ArrowRight,
  ArrowLeft,
  ScanBarcode,
  BookHeart,
  CalendarDays,
  LayoutDashboard,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Step1 } from "../components/register/Step1";
import { Step2 } from "../components/register/Step2";
import { Step3 } from "../components/register/Step3";
import { Step4 } from "../components/register/Step4";
import { Step5 } from "../components/register/Step5";
import { ProgressBar } from "../components/register/ProgressBar";
// ─── Error Message ────────────────────────────────────────────────────────────

// ─── Reusable Input Components ────────────────────────────────────────────────

// ─── Constants ────────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: 1,
    title: "Create Account",
    subtitle: "Let's get you started",
    icon: User,
  },
  {
    id: 2,
    title: "Body Profile",
    subtitle: "Help us personalize your plan",
    icon: Ruler,
  },
  {
    id: 3,
    title: "Health Goals",
    subtitle: "What do you want to achieve?",
    icon: Target,
  },
  {
    id: 4,
    title: "Health Status",
    subtitle: "Current condition & diet needs",
    icon: HeartPulse,
  },
  {
    id: 5,
    title: "You're all set!",
    subtitle: "Welcome to KainWise",
    icon: CheckCircle2,
  },
];

// ─── Validators ───────────────────────────────────────────────────────────────

function validateStep1(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Full name is required.";
  if (!form.email.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address.";
  if (!form.password) errors.password = "Password is required.";
  else if (form.password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  if (!form.confirm) errors.confirm = "Please confirm your password.";
  else if (form.confirm !== form.password)
    errors.confirm = "Passwords do not match.";
  return errors;
}

function validateStep2(form) {
  const errors = {};
  if (!form.age) errors.age = "Age is required.";
  else if (Number(form.age) < 1 || Number(form.age) > 120)
    errors.age = "Enter a valid age (1–120).";
  if (!form.sex) errors.sex = "Please select your biological sex.";
  if (!form.height) errors.height = "Height is required.";
  else if (Number(form.height) < 50 || Number(form.height) > 300)
    errors.height = "Enter a valid height (50–300 cm).";
  if (!form.weight) errors.weight = "Weight is required.";
  else if (Number(form.weight) < 10 || Number(form.weight) > 500)
    errors.weight = "Enter a valid weight (10–500 kg).";
  if (!form.activity) errors.activity = "Please select your activity level.";
  return errors;
}

function validateStep3(form) {
  const errors = {};
  if (!form.goals || form.goals.length === 0)
    errors.goals = "Please select at least one health goal.";
  if (!form.allergies || form.allergies.length === 0)
    errors.allergies =
      "Select at least one option (choose 'None' if no allergies).";
  return errors;
}

function validateStep4(form) {
  const errors = {};
  if (!form.status) errors.status = "Please select your current health status.";
  return errors;
}

const VALIDATORS = [validateStep1, validateStep2, validateStep3, validateStep4];

// ─── Step Components ──────────────────────────────────────────────────────────

// ─── Progress Bar ─────────────────────────────────────────────────────────────

// ─── Main Signup Page ─────────────────────────────────────────────────────────

export default function Signup() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    age: "",
    sex: "",
    height: "",
    weight: "",
    activity: "",
    goals: [],
    allergies: [],
    diet: "",
    status: "",
  });

  const setField = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key])
      setErrors((e) => {
        const n = { ...e };
        delete n[key];
        return n;
      });
  };

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];
  const StepIcon = current.icon;

  const handleNext = () => {
    if (isLast) return;
    const validate = VALIDATORS[step];
    if (!validate) {
      setStep((s) => s + 1);
      return;
    }
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const stepComponents = [
    <Step1 key={0} data={form} set={setField} errors={errors} />,
    <Step2 key={1} data={form} set={setField} errors={errors} />,
    <Step3 key={2} data={form} set={setField} errors={errors} />,
    <Step4 key={3} data={form} set={setField} errors={errors} />,
    <Step5 key={4} data={form} />,
  ];

  return (
    <div className="min-h-screen w-full flex font-sans">
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .step-anim { animation: fadeSlide .3s ease both; }
      `}</style>

      {/* ── Left Panel — matches Login branding ── */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-[#0a2366] text-white p-12 relative overflow-hidden">
        {/* Same gradient overlay as Login */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2366] via-[#0d2f8a] to-[#05143b] opacity-80"></div>

        <div className="relative z-10">
          <span className="text-xl font-medium tracking-tight">KainWise</span>
        </div>

        <div className="relative z-10 mb-12">
          <h1 className="text-[3.5rem] leading-[1.1] font-semibold tracking-tight">
            Know What <br /> You Eat. <br /> Feel the <br /> Difference.
          </h1>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-[#0a2366] lg:bg-white">
        <div className="w-full max-w-[480px]">
          {/* Mobile brand */}
          <div className="mb-6 block lg:hidden text-center">
            <span className="text-xl font-semibold text-white tracking-tight">
              KainWise 🥗
            </span>
          </div>

          {/* Card */}
          <div className="rounded-2xl bg-white px-8 py-8 ">
            {/* Step indicator */}
            {!isLast && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Step {step + 1} of {STEPS.length - 1}
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                    <StepIcon size={14} className="text-[#0a2366]" />
                  </div>
                </div>
                <ProgressBar current={step} total={STEPS.length - 1} />
              </div>
            )}

            {/* Step header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#0a1930] tracking-tight">
                {current.title}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">{current.subtitle}</p>
            </div>

            {/* Step content */}
            <div className="step-anim" key={step}>
              {stepComponents[step]}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex gap-3">
              {step > 0 && !isLast && (
                <button
                  onClick={handleBack}
                  className="flex items-center justify-center gap-2 flex-1 rounded-lg border border-gray-200 bg-gray-100 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 active:scale-95"
                >
                  <ArrowLeft size={15} /> Back
                </button>
              )}
              {!isLast && (
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center gap-2 flex-1 rounded-lg py-3 text-sm font-semibold text-white bg-[#164bd4] hover:bg-[#123eb0] transition active:scale-95"
                >
                  {step === STEPS.length - 2 ? "Finish Setup" : "Continue"}
                  <ArrowRight size={15} />
                </button>
              )}
              {isLast && (
                <button className="flex items-center justify-center gap-2 flex-1 rounded-lg py-3 text-sm font-semibold text-white bg-[#164bd4] hover:bg-[#123eb0] transition">
                  Go to Dashboard <ArrowRight size={15} />
                </button>
              )}
            </div>

            {step === 0 && (
              <p className="mt-5 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-[#0a1930] hover:underline underline-offset-4"
                >
                  Log In
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
