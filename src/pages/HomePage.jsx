import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarAngleAxis,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ─── Nutrition Ring using Recharts ───────────────────────────────────────────
function NutritionRing({ label, value, max, color, size = 80 }) {
  const percentage = (value / max) * 100;
  const data = [{ name: label, value: percentage, fill: color }];

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div style={{ width: size, height: size }}>
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="90%"
            barSize={8}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              background
              dataKey="value"
              cornerRadius={4}
              fill={color}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center relative z-10">
        <div className="text-[15px] font-bold text-[#0a1930]">{value}g</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wide">
          {label}
        </div>
      </div>
    </div>
  );
}

// ─── Wellness Score Gauge ────────────────────────────────────────────────────
function WellnessGauge({ score }) {
  const data = [{ name: "Score", value: score, fill: "url(#scoreGradient)" }];

  return (
    <div className="relative">
      <div style={{ width: 120, height: 120 }}>
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="90%"
            barSize={12}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <defs>
              <linearGradient
                id="scoreGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#0a2366" />
                <stop offset="100%" stopColor="#4d9fff" />
              </linearGradient>
            </defs>
            <RadialBar background dataKey="value" cornerRadius={6} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-extrabold text-white font-['Sora',sans-serif]">
          {score}
        </div>
        <div className="text-[9px] text-white/60 uppercase tracking-wide">
          Score
        </div>
      </div>
    </div>
  );
}

// ─── Weekly Trends Chart ─────────────────────────────────────────────────────
function WeeklyTrendsChart() {
  const data = [
    { day: "Mon", calories: 1850, wellness: 82 },
    { day: "Tue", calories: 1920, wellness: 85 },
    { day: "Wed", calories: 1780, wellness: 78 },
    { day: "Thu", calories: 2010, wellness: 88 },
    { day: "Fri", calories: 1950, wellness: 84 },
    { day: "Sat", calories: 1680, wellness: 72 },
    { day: "Sun", calories: 1740, wellness: 75 },
  ];

  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#9ca3af" />
          <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#9ca3af" />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11 }}
            stroke="#9ca3af"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: 12,
              border: "1px solid #e8ecf5",
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar
            yAxisId="left"
            dataKey="calories"
            fill="#0a2366"
            name="Calories"
            barSize={30}
            radius={[4, 4, 0, 0]}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="wellness"
            stroke="#16a34a"
            name="Wellness Score"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Macro Distribution Pie ──────────────────────────────────────────────────
function MacroDistributionChart() {
  const data = [
    { name: "Carbs", value: 220, color: "#0a2366" },
    { name: "Protein", value: 68, color: "#16a34a" },
    { name: "Fat", value: 52, color: "#f59e0b" },
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-[180px] h-[180px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}g`}
                contentStyle={{
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[13px] text-gray-600 min-w-[50px]">
                {item.name}
              </span>
              <span className="text-[13px] font-semibold text-[#0a1930]">
                {item.value}g
              </span>
              <span className="text-[11px] text-gray-400">
                ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ num, label }) {
  return (
    <div className="border-r border-white/10 py-7 px-8 flex-1 min-w-[120px]">
      <div className="text-[32px] font-extrabold text-white font-['Sora',sans-serif] leading-none">
        {num}
      </div>
      <div className="text-[11px] text-white/45 mt-1.5 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

// ─── Step ─────────────────────────────────────────────────────────────────────
function Step({ n, title, desc }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1a40a0] to-[#0a2366] text-white text-base font-bold flex items-center justify-center shrink-0 font-['Sora',sans-serif] shadow-[0_4px_12px_rgba(10,35,102,0.3)]">
        {n}
      </div>
      <div className="pt-1.5">
        <div className="text-[15px] font-bold text-[#0a1930] mb-1 font-['Sora',sans-serif]">
          {title}
        </div>
        <div className="text-[13px] text-gray-500 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
function Testimonial({ initials, name, role, quote, color }) {
  return (
    <div className="bg-white border border-gray-50 rounded-2xl p-6 relative overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,35,102,0.1)]">
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg,${color},transparent)` }}
      />
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="13"
            height="13"
            viewBox="0 0 12 12"
            fill="#f59e0b"
          >
            <polygon points="6,0.5 7.5,4.2 11.5,4.5 8.7,7 9.7,11 6,8.8 2.3,11 3.3,7 0.5,4.5 4.5,4.2" />
          </svg>
        ))}
      </div>
      <p className="text-[13px] text-gray-600 leading-relaxed mb-4 italic">
        "{quote}"
      </p>
      <div className="flex items-center gap-2.5">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: color }}
        >
          {initials}
        </div>
        <div>
          <div className="text-[13px] font-bold text-[#0a1930]">{name}</div>
          <div className="text-[11px] text-gray-400">{role}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Homepage ────────────────────────────────────────────────────────────
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-['DM_Sans',sans-serif] bg-white text-[#0a1930] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        html { scroll-behavior: smooth; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(1deg); }
        }
        @keyframes float-slow-alt {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee-ltr {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-100%); }
          to { opacity: 1; transform: translateX(0); }
        }

        .reveal { animation: reveal-up 0.75s cubic-bezier(0.22,1,0.36,1) both; }
        .reveal-d1 { animation-delay: 0.08s; }
        .reveal-d2 { animation-delay: 0.18s; }
        .reveal-d3 { animation-delay: 0.28s; }
        .reveal-d4 { animation-delay: 0.42s; }
        .float-el { animation: float-slow 5s ease-in-out infinite; }
        .float-alt { animation: float-slow-alt 6s ease-in-out infinite; }
        .marquee-track { display: inline-flex; animation: marquee-ltr 24s linear infinite; }
        .mobile-menu-open { animation: slide-in 0.3s ease-out both; }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav
        className={`sticky top-0 z-50 px-4 md:px-10 flex items-center justify-between h-[68px] transition-all duration-350 border-b border-gray-100 ${
          scrolled
            ? "bg-white/97 backdrop-blur-md shadow-[0_2px_16px_rgba(10,35,102,0.07)]"
            : "bg-white shadow-none"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-[#4d9fff] to-[#1a40a0] rounded-lg flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            >
              <path d="M6 2H3v3M6 22H3v-3M18 2h3v3M18 22h3v-3" />
              <rect x="7" y="9" width="10" height="6" rx="1" />
            </svg>
          </div>
          <span className="text-lg font-extrabold text-[#0a1930] font-['Sora',sans-serif] tracking-tight">
            KainWise
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-9">
          <a
            href="#features"
            className="text-sm text-gray-700 cursor-pointer py-1.5 transition-colors duration-200 hover:text-[#0a2366] font-medium no-underline"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-gray-700 cursor-pointer py-1.5 transition-colors duration-200 hover:text-[#0a2366] font-medium no-underline"
          >
            How it works
          </a>
          <a
            href="#testimonials"
            className="text-sm text-gray-700 cursor-pointer py-1.5 transition-colors duration-200 hover:text-[#0a2366] font-medium no-underline"
          >
            Reviews
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden md:flex gap-2.5 items-center">
          <Link to="/login">
            <button className="bg-transparent border border-gray-300 text-gray-700 px-[18px] py-[7px] rounded-xl text-[13px] font-semibold transition-all duration-200 hover:border-[#0a2366] hover:text-[#0a2366]">
              Log in
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-[#0a2366] text-white px-[18px] py-2 rounded-xl text-[13px] font-bold shadow-[0_4px_16px_rgba(10,35,102,0.25)] transition-all duration-200 hover:bg-[#0d2f8a] hover:-translate-y-px">
              Get started
            </button>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[68px] z-40 bg-white border-b border-gray-100 shadow-lg md:hidden mobile-menu-open">
          <div className="flex flex-col p-4 gap-4">
            <a
              href="#features"
              className="text-gray-700 py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it works
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reviews
            </a>
            <div className="flex gap-3 pt-2">
              <Link
                to="/login"
                className="flex-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <button className="w-full bg-transparent border border-gray-300 text-gray-700 py-2 rounded-xl text-[13px] font-semibold">
                  Log in
                </button>
              </Link>
              <Link
                to="/register"
                className="flex-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <button className="w-full bg-[#0a2366] text-white py-2 rounded-xl text-[13px] font-bold">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="bg-white px-4 md:px-10 overflow-hidden relative">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle,#e2e8f7_1px,transparent_1px)] bg-[length:28px_28px] pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[80%] rounded-full bg-[radial-gradient(ellipse,rgba(77,159,255,0.07)_0%,transparent_70%)] pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-10 items-center max-w-[1100px] mx-auto pt-12 md:pt-[88px] relative w-full">
          {/* Left: text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="reveal reveal-d1 text-[clamp(32px,8vw,62px)] font-extrabold text-[#0a1930] leading-[1.1] font-['Sora',sans-serif] tracking-tighter mb-[22px]">
              Scan wise.
              <br />
              Eat well.
              <br />
              <span className="bg-gradient-to-r from-[#0a2366] to-[#4d9fff] bg-clip-text text-transparent">
                Feel better.
              </span>
            </h1>

            <p className="reveal reveal-d2 text-base text-gray-500 leading-relaxed max-w-[430px] mx-auto lg:mx-0 mb-9">
              Scan any food barcode, track your macros, and get AI-personalized
              recommendations built around your health goals.
            </p>

            <div className="reveal reveal-d3 flex gap-3 flex-wrap justify-center lg:justify-start mb-12">
              <Link to="/register">
                <button className="bg-[#0a2366] text-white px-6 md:px-7 py-3 rounded-xl text-[15px] font-bold shadow-[0_4px_16px_rgba(10,35,102,0.25)] transition-all duration-200 hover:bg-[#0d2f8a] hover:-translate-y-px">
                  Create free account
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-transparent border border-gray-300 text-gray-700 px-6 md:px-7 py-3 rounded-xl text-[15px] font-semibold transition-all duration-200 hover:border-[#0a2366] hover:text-[#0a2366]">
                  Log in
                </button>
              </Link>
            </div>

            <div className="reveal reveal-d4 flex flex-wrap justify-center lg:justify-start gap-6 md:gap-10 pt-2 border-t border-gray-100">
              {[
                ["50K+", "Foods tracked"],
                ["10K+", "Active users"],
                ["4.8★", "User rating"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-[22px] font-extrabold text-[#0a1930] font-['Sora',sans-serif]">
                    {n}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5 tracking-wide uppercase">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: illustration - Now visible on mobile */}
          <div className="flex-1 relative flex items-center justify-center min-h-[400px] md:min-h-[480px] w-full">
            <img
              src="/public/images/person.svg"
              alt="Person using KainWise"
              className="float-alt w-full max-w-[280px] md:max-w-[460px] h-auto object-contain drop-shadow-[0_24px_48px_rgba(10,35,102,0.12)]"
            />

            {/* Floating nutrition badge - Responsive positioning */}
            <div className="absolute top-0 right-0 md:top-[10%] md:right-[2%] bg-white border border-[#e8ecf5] rounded-2xl p-3 md:p-[14px_18px] shadow-[0_12px_32px_rgba(10,35,102,0.1)] min-w-[130px] md:min-w-[148px] animate-[float-slow-alt_4s_ease-in-out_infinite]">
              <div className="text-[9px] md:text-[10px] text-gray-400 mb-1 font-bold tracking-wide uppercase">
                Daily goal
              </div>
              <div className="text-lg md:text-xl font-extrabold text-[#0a1930] font-['Sora',sans-serif]">
                87
                <span className="text-[11px] md:text-[13px] font-medium text-gray-400">
                  /100
                </span>
              </div>
              <div className="h-1.5 bg-[#eef2ff] rounded-full mt-2 overflow-hidden">
                <div className="w-[87%] h-full bg-gradient-to-r from-[#0a2366] to-[#4d9fff] rounded-full" />
              </div>
              <div className="text-[9px] md:text-[10px] text-green-600 mt-1.5 font-bold">
                ✓ On track
              </div>
            </div>

            {/* Floating macro badge - Responsive positioning */}
            <div className="absolute bottom-0 left-0 md:bottom-[18%] md:left-0 bg-white border border-[#e8ecf5] rounded-xl p-2 md:p-[10px_14px] shadow-[0_8px_24px_rgba(10,35,102,0.08)] animate-[float-slow-alt_5s_ease-in-out_infinite]">
              <div className="text-[8px] md:text-[10px] text-gray-400 mb-1 font-bold tracking-wide uppercase">
                Last scan
              </div>
              <div className="text-[10px] md:text-xs font-bold text-[#0a1930] mb-1">
                Pancit Canton
              </div>
              <div className="flex gap-1">
                {[
                  ["330", "kcal", "#eff4ff", "#0a2366"],
                  ["12g", "fat", "#fff7ed", "#c2410c"],
                  ["9g", "protein", "#f0fdf4", "#16a34a"],
                ].map(([v, l, bg, c]) => (
                  <div
                    key={l}
                    className="rounded-md px-[5px] md:px-[7px] py-0.5 text-center"
                    style={{ background: bg }}
                  >
                    <div
                      className="text-[9px] md:text-[11px] font-bold"
                      style={{ color: c }}
                    >
                      {v}
                    </div>
                    <div className="text-[7px] md:text-[9px] text-gray-400">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ───────────────────────────────────────────────────── */}
      <div className="bg-[#05143b] py-3.5 overflow-hidden">
        <div className="marquee-track">
          {[...Array(2)].map((_, ri) =>
            [
              "Barcode Scanner",
              "AI Wellness Diary",
              "Macro Tracking",
              "Allergy Alerts",
              "Health Calendar",
              "BMI Monitor",
              "Personalized Goals",
              "Wellness Score",
              "Daily Reports",
              "Filipino Foods DB",
            ].map((t, i) => (
              <span
                key={`${ri}-${i}`}
                className="text-[10px] md:text-[11px] text-white/38 px-3 md:px-[22px] font-['DM_Mono',monospace] tracking-wide whitespace-nowrap"
              >
                {t} <span className="text-[#2a5bd7] mx-1 md:mx-2">·</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* ── STATS BAR ───────────────────────────────────────────────────────── */}
      <div className="bg-[#f8faff] py-0 px-4 md:px-10 border-y border-[#e8ecf5]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 md:flex">
            {[
              ["50K+", "Foods in database"],
              ["10K+", "Active users"],
              ["98%", "Scan accuracy"],
              ["4.8★", "Average rating"],
            ].map(([n, l]) => (
              <div
                key={l}
                className="border-r border-[#e8ecf5] py-4 md:py-6 px-4 md:px-8 flex-1 text-center md:text-left"
              >
                <div className="text-[22px] md:text-[28px] font-extrabold text-[#0a1930] font-['Sora',sans-serif] leading-none">
                  {n}
                </div>
                <div className="text-[9px] md:text-[11px] text-gray-400 mt-1 uppercase tracking-wide">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section
        id="features"
        className="py-16 md:py-24 px-4 md:px-10 bg-[#fafbff] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,#d1d8f0_1px,transparent_1px)] bg-[length:28px_28px] pointer-events-none" />
        <div className="max-w-[1100px] mx-auto relative">
          <div className="text-center mb-10 md:mb-15">
            <span className="inline-block text-[11px] font-bold tracking-[0.12em] uppercase text-[#0a2366] bg-[#eff4ff] py-1 px-[14px] rounded-full mb-4">
              Features
            </span>
            <h2 className="text-[clamp(24px,6vw,40px)] font-extrabold text-[#0a1930] font-['Sora',sans-serif] tracking-tighter mb-3.5">
              Everything to eat smarter
            </h2>
            <p className="text-[14px] md:text-[15px] text-gray-500 max-w-[480px] mx-auto leading-relaxed px-4">
              From barcode to nutrition report — KainWise covers every step of
              your wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hero feature card */}
            <div className="md:row-span-2 bg-gradient-to-br from-[#0a2366] to-[#081648] rounded-2xl md:rounded-3xl p-6 md:p-9 flex flex-col justify-between min-h-[320px] md:min-h-[340px] relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(77,159,255,0.15)_0%,transparent_70%)] pointer-events-none" />
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-4 md:mb-[22px]">
                  <svg
                    width="18"
                    height="18"
                    md
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M6 2H3v3M6 22H3v-3M18 2h3v3M18 22h3v-3" />
                    <rect x="7" y="9" width="10" height="6" rx="1" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white font-['Sora',sans-serif] mb-2 md:mb-3.5 leading-tight">
                  Instant barcode scanner
                </h3>
                <p className="text-[13px] md:text-[14px] text-white/55 leading-relaxed">
                  Point your camera at any product barcode and get full
                  nutritional data in under a second. Covers 50,000+ Filipino
                  and international foods.
                </p>
              </div>
              <div className="mt-5 md:mt-7 flex gap-2 flex-wrap relative">
                {["Calories", "Macros", "Sodium", "Sugar"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#4d9fff]/25 border border-[#4d9fff]/40 rounded-full py-1 px-2.5 md:px-3 text-[10px] md:text-[11px] text-[#7ec8ff] font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Small feature cards */}
            {[
              {
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4z" />
                  </svg>
                ),
                title: "AI Wellness Diary",
                desc: "Write daily entries and receive personalized AI feedback.",
                bg: "#eff4ff",
                iconBg: "linear-gradient(135deg,#1a40a0,#0a2366)",
              },
              {
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                ),
                title: "Wellness Score",
                desc: "A daily score based on nutrition, activity, and meals.",
                bg: "#f0fdf4",
                iconBg: "linear-gradient(135deg,#16a34a,#0d8a3d)",
              },
              {
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                ),
                title: "Health Calendar",
                desc: "Visualize your eating patterns and wellness trends.",
                bg: "#fff7ed",
                iconBg: "linear-gradient(135deg,#e05c1a,#c2410c)",
              },
              {
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                ),
                title: "Allergy Tracking",
                desc: "Flag dietary restrictions and get instant alerts.",
                bg: "#fdf4ff",
                iconBg: "linear-gradient(135deg,#9333ea,#7e22ce)",
              },
            ].map(({ icon, title, desc, bg, iconBg }) => (
              <div
                key={title}
                className="rounded-xl p-5 md:p-6 border border-black/5 transition-transform duration-220 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,35,102,0.12)]"
                style={{ background: bg }}
              >
                <div
                  className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center mb-3 md:mb-3.5"
                  style={{ background: iconBg }}
                >
                  {icon}
                </div>
                <h3 className="text-[14px] md:text-[15px] font-bold text-[#0a1930] font-['Sora',sans-serif] mb-1.5">
                  {title}
                </h3>
                <p className="text-[12px] md:text-[13px] text-gray-500 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP PREVIEW + NUTRITION ──────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-10 relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-8 md:gap-18 items-center">
          {/* Nutrition dashboard mock with Recharts */}
          <div className="flex-1 w-full">
            <div className="bg-white rounded-2xl md:rounded-3xl border border-[#e8ecf5] p-5 md:p-7 shadow-[0_8px_40px_rgba(10,35,102,0.08)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-[22px] gap-3">
                <div className="text-center sm:text-left">
                  <div className="text-xs text-gray-400 mb-0.5">
                    Today's intake
                  </div>
                  <div className="text-[22px] md:text-[26px] font-extrabold text-[#0a1930] font-['Sora',sans-serif]">
                    1,840{" "}
                    <span className="text-[12px] md:text-[14px] font-normal text-gray-400">
                      / 2,100 kcal
                    </span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <WellnessGauge score={87} />
                </div>
              </div>

              <div className="bg-gray-100 rounded-full h-2 mb-6 overflow-hidden">
                <div className="w-[87%] h-full bg-gradient-to-r from-[#0a2366] to-[#4d9fff] rounded-full" />
              </div>

              {/* Macro Distribution Chart */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 mb-3">
                  Macro Distribution
                </h4>
                <MacroDistributionChart />
              </div>

              {/* Weekly Trends Chart */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 mb-3">
                  Weekly Trends
                </h4>
                <WeeklyTrendsChart />
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-3">
                  Today's meals
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {[
                    {
                      meal: "Breakfast",
                      food: "Tapsilog + Rice",
                      kcal: 490,
                      time: "7:30 AM",
                    },
                    {
                      meal: "Lunch",
                      food: "Sinigang na Baboy",
                      kcal: 310,
                      time: "12:15 PM",
                    },
                    {
                      meal: "Snack",
                      food: "Pandesal × 2",
                      kcal: 240,
                      time: "3:00 PM",
                    },
                    {
                      meal: "Dinner",
                      food: "Chicken Adobo",
                      kcal: 380,
                      time: "7:00 PM",
                    },
                  ].map(({ meal, food, kcal, time }) => (
                    <div
                      key={meal}
                      className="flex items-center justify-between py-2 border-b border-[#f9f9f9]"
                    >
                      <div className="flex gap-2.5 items-center flex-1 min-w-0">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#4d9fff] to-[#0a2366] shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-[12px] md:text-[13px] font-semibold text-[#0a1930] truncate">
                            {food}
                          </div>
                          <div className="text-[10px] md:text-[11px] text-gray-400">
                            {meal} · {time}
                          </div>
                        </div>
                      </div>
                      <div className="text-[12px] md:text-[13px] font-bold text-[#0a2366] font-['DM_Mono',monospace] ml-2 shrink-0">
                        {kcal} kcal
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: text + illustration */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 md:mb-8 flex justify-center lg:justify-start">
              <img
                src="/public/images/eating-healthy.svg"
                alt="Eating healthy illustration"
                className="w-full max-w-[280px] md:max-w-[340px] h-auto drop-shadow-[0_12px_24px_rgba(10,35,102,0.12)]"
              />
            </div>

            <span className="inline-block text-[11px] font-bold tracking-[0.12em] uppercase text-[#0a2366] bg-[#eff4ff] py-1 px-[14px] rounded-full mb-4">
              Dashboard
            </span>
            <h2 className="text-[clamp(24px,6vw,36px)] font-extrabold text-[#0a1930] font-['Sora',sans-serif] tracking-tighter leading-tight mb-4">
              Your health,
              <br />
              at a glance
            </h2>
            <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed mb-7">
              Every meal you log builds your personal nutrition picture. See
              your macros, meals, and wellness score update in real time — all
              in one clean dashboard.
            </p>

            <div className="flex flex-col gap-0 mb-8">
              {[
                "Automatic macro calculations per meal",
                "Daily wellness score based on your goals",
                "Filipino food database built-in",
                "Weekly trend charts and insights",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2.5 border-b border-gray-50"
                >
                  <div className="w-[22px] h-[22px] rounded-full bg-gradient-to-br from-[#1a40a0] to-[#0a2366] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(10,35,102,0.2)]">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                    >
                      <polyline points="1.5,5 3.8,7.5 8.5,2" />
                    </svg>
                  </div>
                  <span className="text-[13px] md:text-[14px] text-gray-700 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <Link to="/register">
              <button className="bg-[#0a2366] text-white px-6 md:px-7 py-3 rounded-xl text-[14px] md:text-[15px] font-bold shadow-[0_4px_16px_rgba(10,35,102,0.25)] transition-all duration-200 hover:bg-[#0d2f8a] hover:-translate-y-px w-full sm:w-auto">
                Start tracking free
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-16 md:py-24 px-4 md:px-10 bg-[#fafbff] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle,#d1d8f0_1px,transparent_1px)] bg-[length:28px_28px] pointer-events-none" />
        <div className="max-w-[1100px] mx-auto relative">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-start">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block text-[11px] font-bold tracking-[0.12em] uppercase text-[#0a2366] bg-[#eff4ff] py-1 px-[14px] rounded-full mb-4">
                How it works
              </span>
              <h2 className="text-[clamp(24px,6vw,36px)] font-extrabold text-[#0a1930] font-['Sora',sans-serif] tracking-tighter leading-tight mb-4">
                Up and running in minutes
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-7">
                No complicated setup. Create your profile once and start
                scanning right away.
              </p>
              <Link to="/register">
                <button className="bg-[#0a2366] text-white px-6 md:px-7 py-3 rounded-xl text-[14px] md:text-[15px] font-bold shadow-[0_4px_16px_rgba(10,35,102,0.25)] transition-all duration-200 hover:bg-[#0d2f8a] hover:-translate-y-px">
                  Get started free
                </button>
              </Link>
            </div>
            <div className="flex-1 flex flex-col gap-6 md:gap-8 min-w-[260px]">
              {[
                {
                  n: "1",
                  title: "Create your account",
                  desc: "Sign up in under 2 minutes with your email and basic health information.",
                },
                {
                  n: "2",
                  title: "Build your health profile",
                  desc: "Input your age, body metrics, goals, allergies, and current health status.",
                },
                {
                  n: "3",
                  title: "Scan your food",
                  desc: "Use your phone camera to scan barcodes and log meals throughout the day.",
                },
                {
                  n: "4",
                  title: "Track your progress",
                  desc: "Review your wellness score, nutrition breakdown, and trends on your dashboard.",
                },
              ].map((s) => (
                <Step key={s.n} {...s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section
        id="testimonials"
        className="bg-white py-16 md:py-24 px-4 md:px-10"
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10 md:mb-13">
            <span className="inline-block text-[11px] font-bold tracking-[0.12em] uppercase text-[#0a2366] bg-[#eff4ff] py-1 px-[14px] rounded-full mb-4">
              Reviews
            </span>
            <h2 className="text-[clamp(24px,6vw,38px)] font-extrabold text-[#0a1930] font-['Sora',sans-serif] tracking-tighter">
              What users are saying
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <Testimonial
              initials="MR"
              name="Maria R."
              role="Fitness enthusiast"
              quote="I finally understand what I'm eating. The barcode scanner is incredibly fast and the Filipino food database is so complete!"
              color="#0a2366"
            />
            <Testimonial
              initials="JP"
              name="Juan P."
              role="Post-surgery recovery"
              quote="My doctor recommended tracking sodium. KainWise makes it effortless — one scan and I know exactly what's in my food."
              color="#166534"
            />
            <Testimonial
              initials="AS"
              name="Ana S."
              role="Student, Davao City"
              quote="The AI diary is like having a nutritionist in my pocket. It actually reads my entries and gives helpful advice, not just generic tips."
              color="#c2410c"
            />
            <Testimonial
              initials="KL"
              name="Kat L."
              role="New mom"
              quote="Being able to track my nutrition while breastfeeding gives me peace of mind. The health profile setup for new moms is thoughtful."
              color="#7e22ce"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#081648] via-[#0a2366] to-[#0d2d7a] py-16 md:py-25 px-4 md:px-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-30%] left-[-10%] w-[50%] h-[80%] rounded-full bg-[radial-gradient(ellipse,rgba(77,159,255,0.1)_0%,transparent_70%)]" />
          <div className="absolute bottom-[-20%] right-[-5%] w-[40%] h-[70%] rounded-full bg-[radial-gradient(ellipse,rgba(26,64,160,0.2)_0%,transparent_70%)]" />
          <div className="absolute inset-0 opacity-4 bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[length:28px_28px]" />
        </div>
        <div className="relative">
          <h2 className="text-[clamp(24px,6vw,48px)] font-extrabold text-white font-['Sora',sans-serif] tracking-tighter mb-4">
            Start eating smarter today
          </h2>
          <p className="text-sm md:text-base text-white/50 mb-8 md:mb-10 max-w-[440px] mx-auto leading-relaxed px-4">
            Join thousands of Filipinos already using KainWise to understand
            their food and reach their health goals.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/register">
              <button className="bg-white text-[#0a2366] px-5 md:px-7 py-2.5 md:py-3 rounded-xl text-[14px] md:text-[15px] font-bold shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-[#e8edf7] hover:-translate-y-px">
                Create free account
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-transparent border border-white/30 text-white px-6 md:px-7 py-2 md:py-2.5 rounded-xl text-[13px] md:text-[14px] font-semibold transition-all duration-200 hover:bg-white/10 hover:border-white/50">
                Log in
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="py-6 md:py-8 px-4 md:px-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#fafbff]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#4d9fff] to-[#1a40a0] rounded-md flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            >
              <path d="M6 2H3v3M6 22H3v-3M18 2h3v3M18 22h3v-3" />
              <rect x="7" y="9" width="10" height="6" rx="1" />
            </svg>
          </div>
          <span className="text-[15px] font-extrabold text-[#0a1930] font-['Sora',sans-serif]">
            KainWise
          </span>
        </div>
        <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
          {["Privacy", "Terms", "Contact", "About"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-[12px] md:text-[13px] text-gray-400 no-underline transition-colors duration-200 hover:text-[#0a2366]"
            >
              {l}
            </a>
          ))}
        </div>
        <span className="text-[11px] md:text-xs text-gray-300">
          © {new Date().getFullYear()} KainWise. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
