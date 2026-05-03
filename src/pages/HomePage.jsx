import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container, Group, Stack, Title, Text, Button, Badge,
  SimpleGrid, Paper, Box, Divider, Avatar, ThemeIcon, Anchor,
} from "@mantine/core";
import {
  ScanBarcode, BookHeart, Activity, CalendarDays,
  ShieldCheck, ChevronRight, Star, Check, Menu, X,
} from "lucide-react";
import {
  ResponsiveContainer, RadialBarChart, RadialBar,
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, PieChart, Pie, Cell,
} from "recharts";
import { BrandName } from "../components/BrandName";

// ─── Brand colors ─────────────────────────────────────────────────────────────
const NAVY = "#0a2366";
const BLUE = "#164bd4";

// ─── Recharts components (unchanged) ─────────────────────────────────────────
function WellnessGauge({ score }) {
  const data = [{ name: "Score", value: score }];
  return (
    <Box style={{ position: "relative", width: 110, height: 110 }}>
      <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%"
          barSize={12} data={data} startAngle={90} endAngle={-270}>
          <RadialBar background dataKey="value" cornerRadius={6} fill={NAVY} />
        </RadialBarChart>
      </ResponsiveContainer>
      <Box style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Text fw={800} size="xl" style={{ color: NAVY, lineHeight: 1 }}>{score}</Text>
        <Text size="9px" c="dimmed" style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>Score</Text>
      </Box>
    </Box>
  );
}

function WeeklyChart() {
  const data = [
    { day: "Mon", cal: 1850, score: 82 },
    { day: "Tue", cal: 1920, score: 85 },
    { day: "Wed", cal: 1780, score: 78 },
    { day: "Thu", cal: 2010, score: 88 },
    { day: "Fri", cal: 1950, score: 84 },
    { day: "Sat", cal: 1680, score: 72 },
    { day: "Sun", cal: 1740, score: 75 },
  ];
  return (
    <Box style={{ height: 240 }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#9ca3af" />
          <YAxis yAxisId="l" tick={{ fontSize: 11 }} stroke="#9ca3af" />
          <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11 }} stroke="#9ca3af" />
          <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e8ecf5", fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar yAxisId="l" dataKey="cal" name="Calories" fill={NAVY} barSize={24} radius={[4, 4, 0, 0]} />
          <Line yAxisId="r" type="monotone" dataKey="score" name="Wellness" stroke="#4d9fff" strokeWidth={2} dot={{ r: 3 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

function MacroPie() {
  const data = [
    { name: "Carbs", value: 220, color: NAVY },
    { name: "Protein", value: 68, color: "#4d9fff" },
    { name: "Fat", value: 52, color: "#a8c4f8" },
  ];
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <Group gap="lg" align="center">
      <Box style={{ width: 160, height: 160 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={42} outerRadius={65}
              paddingAngle={3} dataKey="value" strokeWidth={0}>
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Tooltip formatter={(v) => `${v}g`} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,.1)" }} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Stack gap={6}>
        {data.map((d) => (
          <Group key={d.name} gap="xs">
            <Box style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: d.color }} />
            <Text size="xs" c="dimmed" style={{ minWidth: 46 }}>{d.name}</Text>
            <Text size="xs" fw={700} style={{ color: NAVY }}>{d.value}g</Text>
            <Text size="11px" c="dimmed">({Math.round(d.value / total * 100)}%)</Text>
          </Group>
        ))}
      </Stack>
    </Group>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <Box
        component="nav"
        style={{
          position: "sticky", top: 0, zIndex: 100,
          borderBottom: "1px solid #f0f3fa",
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "#fff",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 2px 16px rgba(10,35,102,0.07)" : "none",
          transition: "all 0.25s",
        }}
      >
        <Container size="lg">
          <Group justify="space-between" h={64}>
            <Text component={Link} to="/" fw={600} size="lg"
              style={{ color: NAVY, textDecoration: "none", letterSpacing: "-0.02em" }}>
              <BrandName />
            </Text>

            <Group gap="xl" visibleFrom="md">
              {["#features", "#how-it-works", "#testimonials"].map((href, i) => (
                <Anchor key={href} href={href} size="sm" fw={500}
                  style={{ color: "#374151", textDecoration: "none" }}
                  onMouseEnter={(e) => e.target.style.color = NAVY}
                  onMouseLeave={(e) => e.target.style.color = "#374151"}>
                  {["Features", "How it works", "Reviews"][i]}
                </Anchor>
              ))}
            </Group>

            <Group gap="xs" visibleFrom="md">
              <Button component={Link} to="/login" variant="subtle" size="sm" radius="md" style={{ color: NAVY }}>Log in</Button>
              <Button component={Link} to="/register" size="sm" radius="md" style={{ backgroundColor: NAVY }}>Get started</Button>
            </Group>

            <Box hiddenFrom="md">
              <Button variant="subtle" color="dark" size="sm" p="xs" onClick={() => setOpen(!open)}>
                {open ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </Box>
          </Group>
        </Container>
      </Box>

      {open && (
        <Box hiddenFrom="md" style={{ position: "fixed", inset: "64px 0 0 0", backgroundColor: "#fff", zIndex: 99, padding: "1.5rem", borderTop: "1px solid #f0f3fa" }}>
          <Stack gap="xs">
            {[["#features", "Features"], ["#how-it-works", "How it works"], ["#testimonials", "Reviews"]].map(([href, label]) => (
              <Anchor key={href} href={href} size="sm" fw={500} p="sm"
                style={{ color: "#374151", textDecoration: "none", borderRadius: 8, display: "block" }}
                onClick={() => setOpen(false)}>
                {label}
              </Anchor>
            ))}
            <Divider my="xs" />
            <Button component={Link} to="/login" variant="default" radius="md" onClick={() => setOpen(false)}>Log in</Button>
            <Button component={Link} to="/register" radius="md" style={{ backgroundColor: NAVY }} onClick={() => setOpen(false)}>Get started</Button>
          </Stack>
        </Box>
      )}
    </>
  );
}

function FeatureCard({ icon, title, desc, bg, iconColor }) {
  return (
    <Paper p="lg" radius="lg" style={{ backgroundColor: bg, border: "1px solid rgba(0,0,0,0.05)", transition: "transform 0.2s" }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
      <ThemeIcon size={40} radius="md" mb="md" style={{ backgroundColor: iconColor, color: "#fff" }}>
        {icon}
      </ThemeIcon>
      <Text fw={700} size="sm" mb={6} style={{ color: NAVY }}>{title}</Text>
      <Text size="xs" c="dimmed" lh={1.6}>{desc}</Text>
    </Paper>
  );
}

function TestimonialCard({ initials, name, role, quote }) {
  return (
    <Paper p="xl" radius="lg"
      style={{ border: "1px solid #e8ecf5", backgroundColor: "#fff", transition: "box-shadow 0.2s", display: "flex", flexDirection: "column", height: "100%" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 12px 32px rgba(10,35,102,0.08)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}>
      <Group gap={2} mb="md">
        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={NAVY} color={NAVY} />)}
      </Group>
      <Text size="sm" c="dimmed" lh={1.7} style={{ flex: 1 }}>"{quote}"</Text>
      <Group gap="sm" mt="lg" pt="md" style={{ borderTop: "1px solid #f0f3fa" }}>
        <Avatar size={36} radius="xl" style={{ backgroundColor: NAVY, color: "#fff", fontSize: 12, fontWeight: 700 }}>{initials}</Avatar>
        <Box>
          <Text size="sm" fw={700} style={{ color: NAVY }}>{name}</Text>
          <Text size="xs" c="dimmed">{role}</Text>
        </Box>
      </Group>
    </Paper>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <Box style={{ backgroundColor: "#fff", color: NAVY, overflowX: "hidden" }}>
      <style>{`
        html { scroll-behavior: smooth; }
      `}</style>

      <NavBar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <Box style={{ backgroundColor: "#fafbff", borderBottom: "1px solid #f0f3fa", position: "relative", overflow: "hidden" }}>
        {/* PH map background */}
        <img src="/images/philippines.svg" alt="" style={{
          position: "absolute", right: "-4%", top: "50%", transform: "translateY(-50%)",
          width: "52%", opacity: 0.04, pointerEvents: "none", userSelect: "none",
        }} />

        {/* Dot grid */}
        <Box style={{ position: "absolute", inset: 0, opacity: 0.45, backgroundImage: "radial-gradient(circle, #d1d8f0 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

        <Container size="lg" py={80}>
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={64} style={{ alignItems: "center" }}>
            {/* Left */}
            <Stack gap="xl">
              <Badge size="sm" radius="xl" variant="light" color="blue"
                style={{ backgroundColor: "#eff4ff", color: BLUE, fontWeight: 700, letterSpacing: "0.08em", width: "fit-content" }}>
                Built for Filipinos 🇵🇭
              </Badge>

              <Stack gap="sm">
                <Title order={1} style={{ fontSize: "clamp(2.2rem, 6vw, 3.6rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: NAVY }}>
                  Scan wise.<br />Eat well.<br />
                  <span style={{ color: BLUE }}>
                    Feel better.
                  </span>
                </Title>
                <Text size="md" c="dimmed" lh={1.7} style={{ maxWidth: 420 }}>
                  Scan any food barcode, track your macros, and get personalized recommendations built around your health goals — with a Filipino food database built in.
                </Text>
              </Stack>

              <Group gap="sm">
                <Button component={Link} to="/register" size="md" radius="md"
                  style={{ backgroundColor: NAVY }} rightSection={<ChevronRight size={16} />}>
                  Create free account
                </Button>
                <Button component={Link} to="/login" size="md" radius="md" variant="default">
                  Log in
                </Button>
              </Group>

              <Group gap={32} pt="xs" style={{ borderTop: "1px solid #f0f3fa" }}>
                {[["50K+", "Foods tracked"], ["10K+", "Active users"], ["4.8★", "Rating"]].map(([n, l]) => (
                  <Stack key={l} gap={2}>
                    <Text fw={800} size="xl" style={{ color: NAVY, lineHeight: 1 }}>{n}</Text>
                    <Text size="xs" c="dimmed" style={{ textTransform: "uppercase", letterSpacing: "0.07em" }}>{l}</Text>
                  </Stack>
                ))}
              </Group>
            </Stack>

            {/* Right — person SVG + floating badges */}
            <Box style={{ position: "relative", display: "flex", justifyContent: "center", minHeight: 420 }}>
              <img src="/images/person.svg" alt="Person using KainWise"
                style={{ width: "100%", maxWidth: 400, objectFit: "contain", filter: "drop-shadow(0 24px 48px rgba(10,35,102,0.12))" }} />

              {/* Daily goal — speech bubble pointing bottom-left */}
              <Box style={{ position: "absolute", top: "5%", right: "0%" }}>
                <Box style={{
                  backgroundColor: "#fff", borderRadius: 20, padding: "16px 20px",
                  boxShadow: "0 12px 40px rgba(10,35,102,0.14)", border: "1px solid #e8ecf5",
                  minWidth: 180, position: "relative",
                }}>
                  <Text size="10px" fw={700} c="dimmed" style={{ textTransform: "uppercase", letterSpacing: "0.1em" }} mb={6}>Daily goal</Text>
                  <Text fw={900} style={{ color: NAVY, fontSize: "2rem", lineHeight: 1 }}>
                    87<Text component="span" size="sm" c="dimmed" fw={400}>/100</Text>
                  </Text>
                  <Box style={{ height: 8, backgroundColor: "#eef2ff", borderRadius: 99, marginTop: 12, overflow: "hidden" }}>
                    <Box style={{ width: "87%", height: "100%", backgroundColor: NAVY, borderRadius: 99 }} />
                  </Box>
                  <Text size="xs" fw={700} style={{ color: BLUE, marginTop: 8 }}>✓ On track</Text>
                  {/* tail */}
                  <Box style={{
                    position: "absolute", bottom: -10, left: 24,
                    width: 20, height: 20, backgroundColor: "#fff",
                    border: "1px solid #e8ecf5", borderTop: "none", borderRight: "none",
                    transform: "rotate(-45deg)", borderRadius: "0 0 0 4px",
                    boxShadow: "-3px 3px 6px rgba(10,35,102,0.06)",
                  }} />
                </Box>
              </Box>

              {/* Last scan — speech bubble pointing bottom-right */}
              <Box style={{ position: "absolute", bottom: "14%", left: "-2%" }}>
                <Box style={{
                  backgroundColor: "#fff", borderRadius: 20, padding: "16px 20px",
                  boxShadow: "0 12px 40px rgba(10,35,102,0.14)", border: "1px solid #e8ecf5",
                  minWidth: 200, position: "relative",
                }}>
                  <Text size="10px" fw={700} c="dimmed" style={{ textTransform: "uppercase", letterSpacing: "0.1em" }} mb={6}>Last scan</Text>
                  <Text size="md" fw={800} style={{ color: NAVY }} mb={10}>Pancit Canton</Text>
                  <Group gap={8}>
                    {[["330", "kcal", "#eff4ff", BLUE], ["12g", "fat", "#dbeafe", NAVY], ["9g", "prot", "#e0eeff", BLUE]].map(([v, l, bg, c]) => (
                      <Box key={l} style={{ backgroundColor: bg, borderRadius: 10, padding: "6px 12px", textAlign: "center" }}>
                        <Text fw={800} size="sm" style={{ color: c }}>{v}</Text>
                        <Text size="10px" c="dimmed">{l}</Text>
                      </Box>
                    ))}
                  </Group>
                  {/* tail */}
                  <Box style={{
                    position: "absolute", bottom: -10, right: 24,
                    width: 20, height: 20, backgroundColor: "#fff",
                    border: "1px solid #e8ecf5", borderTop: "none", borderLeft: "none",
                    transform: "rotate(45deg)", borderRadius: "0 0 4px 0",
                    boxShadow: "3px 3px 6px rgba(10,35,102,0.06)",
                  }} />
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>


      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <Box style={{ backgroundColor: "#f8faff", borderBottom: "1px solid #e8ecf5" }}>
        <Container size="lg">
          <SimpleGrid cols={{ base: 2, md: 4 }}>
            {[["50K+", "Foods in database"], ["10K+", "Active users"], ["98%", "Scan accuracy"], ["4.8★", "Average rating"]].map(([n, l]) => (
              <Box key={l} py="lg" px="md" style={{ borderRight: "1px solid #e8ecf5", textAlign: "center" }}>
                <Text fw={800} size="xl" style={{ color: NAVY, fontSize: "1.75rem", lineHeight: 1 }}>{n}</Text>
                <Text size="xs" c="dimmed" mt={4} style={{ textTransform: "uppercase", letterSpacing: "0.07em" }}>{l}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <Box id="features" py={80} style={{ backgroundColor: "#fff" }}>
        <style>{`
          @keyframes scanline {
            0%   { top: 8%; opacity: 1; }
            48%  { top: 88%; opacity: 1; }
            50%  { top: 88%; opacity: 0; }
            52%  { top: 8%;  opacity: 0; }
            54%  { top: 8%;  opacity: 1; }
            100% { top: 8%; opacity: 1; }
          }
          .scan-line { animation: scanline 2.6s ease-in-out infinite; }
        `}</style>
        <Container size="lg">
          {/* Section label */}
          <Group mb={56} justify="space-between" align="flex-end">
            <Stack gap={6}>
              <Badge size="sm" radius="xl" style={{ backgroundColor: "#eff4ff", color: BLUE, fontWeight: 700, letterSpacing: "0.08em", width: "fit-content" }}>Features</Badge>
              <Title order={2} style={{ fontSize: "clamp(1.5rem, 5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", color: NAVY, lineHeight: 1.1 }}>
                Everything to eat smarter
              </Title>
            </Stack>
            <Text size="sm" c="dimmed" style={{ maxWidth: 280, textAlign: "right" }} visibleFrom="sm">
              From barcode to nutrition report — KainWise covers every step.
            </Text>
          </Group>

          {/* ── Scanner showcase ── */}
          <Box mb={64} style={{
            backgroundColor: "#fff",
            border: "1px solid #e8ecf5",
            borderRadius: 24, overflow: "hidden", position: "relative",
          }}>
            <SimpleGrid cols={{ base: 1, md: 2 }} style={{ alignItems: "stretch" }}>
              {/* Left — text */}
              <Stack gap="xl" p={48} justify="center">
                <Group gap="sm">
                  <Box style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#eff4ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ScanBarcode size={20} color={NAVY} />
                  </Box>
                  <Text size="xs" fw={700} style={{ color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.12em" }}>Core feature</Text>
                </Group>
                <Stack gap="sm">
                  <Title order={2} style={{ color: NAVY, fontSize: "clamp(1.4rem,4vw,2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                    Instant barcode scanner
                  </Title>
                  <Text size="sm" c="dimmed" lh={1.8} style={{ maxWidth: 340 }}>
                    Point at any barcode and get full nutritional data in under a second. Covers 50,000+ Filipino and international foods.
                  </Text>
                </Stack>
                {/* Stat row */}
                <Group gap="xl" pt="xs" style={{ borderTop: "1px solid #f0f3fa" }}>
                  {[["50K+", "foods"], ["<1s", "scan time"], ["98%", "accuracy"]].map(([n, l]) => (
                    <Stack key={l} gap={2}>
                      <Text fw={900} size="xl" style={{ color: NAVY, lineHeight: 1 }}>{n}</Text>
                      <Text size="xs" c="dimmed" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</Text>
                    </Stack>
                  ))}
                </Group>
              </Stack>

              {/* Right — scan result mock */}
              <Box p={40} style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fafbff", borderLeft: "1px solid #e8ecf5" }}>
                <Box style={{ width: "100%", maxWidth: 320, backgroundColor: "#fff", border: "1px solid #e8ecf5", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 32px rgba(10,35,102,0.08)" }}>
                  {/* Product header */}
                  <Box style={{ padding: "16px 20px", borderBottom: "1px solid #f0f3fa", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Stack gap={2}>
                      <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}>Scanned</Text>
                      <Text fw={700} size="sm" style={{ color: NAVY }}>Pancit Canton</Text>
                    </Stack>
                    <Box style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: BLUE, boxShadow: `0 0 8px ${BLUE}` }} />
                  </Box>

                  {/* Barcode visual with scan line */}
                  <Box style={{ padding: "20px", backgroundColor: "#fafbff", position: "relative", display: "flex", justifyContent: "center" }}>
                    <Box style={{ position: "relative", width: 200, height: 60 }}>
                      <svg width="200" height="60" viewBox="0 0 200 60" style={{ display: "block" }}>
                        {[3,7,5,2,8,4,6,3,9,2,5,7,4,3,6,8,2,5,7,4,3,6,5,8,3,7,4,2,6,5,8,3,7,5,4,2,6,8,3,5].map((w, i) => {
                          const x = i * 5;
                          return i % 2 === 0
                            ? <rect key={i} x={x} y={0} width={Math.min(w/3+1, 4)} height={60} fill={NAVY} opacity={0.7} />
                            : null;
                        })}
                      </svg>
                      {/* Animated scan line */}
                      <Box className="scan-line" style={{
                        position: "absolute", left: 0, right: 0, height: 2,
                        backgroundColor: BLUE,
                        boxShadow: `0 0 8px ${BLUE}`,
                        top: "8%",
                      }} />
                    </Box>
                  </Box>

                  {/* Nutrition grid */}
                  <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, backgroundColor: "#e8ecf5" }}>
                    {[["Calories", "330", "kcal"], ["Macros", "12g / 9g", "fat · prot"], ["Sodium", "480", "mg"], ["Sugar", "2", "g"]].map(([label, val, unit]) => (
                      <Box key={label} style={{ backgroundColor: "#fff", padding: "14px 16px" }}>
                        <Text size="9px" fw={700} c="dimmed" style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</Text>
                        <Group gap={4} align="baseline" mt={4}>
                          <Text fw={900} size="lg" style={{ color: NAVY, lineHeight: 1 }}>{val}</Text>
                          <Text size="10px" c="dimmed">{unit}</Text>
                        </Group>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>

          {/* ── Other features — editorial numbered list ── */}
          <Stack gap={0}>
            {[
              { n: "01", icon: <BookHeart size={16} />, title: "AI Wellness Diary", desc: "Write daily entries and receive personalized AI feedback on your habits and nutrition patterns." },
              { n: "02", icon: <Activity size={16} />,  title: "Wellness Score",    desc: "A daily score built from your nutrition, activity, and logged meals — updated in real time." },
              { n: "03", icon: <CalendarDays size={16} />, title: "Health Calendar", desc: "Visualize your eating patterns and wellness trends week by week in a clean calendar view." },
              { n: "04", icon: <ShieldCheck size={16} />, title: "Allergy Tracking", desc: "Flag dietary restrictions once. Get instant alerts on every barcode scan, automatically." },
            ].map(({ n, icon, title, desc }, i) => (
              <Box key={n} style={{
                borderTop: "1px solid #f0f3fa",
                padding: "28px 0",
                display: "grid",
                gridTemplateColumns: "56px 1fr 1fr",
                gap: "24px",
                alignItems: "center",
              }}>
                <Text fw={900} style={{ fontSize: "2.2rem", color: "#e8eeff", lineHeight: 1, letterSpacing: "-0.04em" }}>{n}</Text>
                <Group gap="sm">
                  <Box style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#eff4ff", display: "flex", alignItems: "center", justifyContent: "center", color: BLUE, flexShrink: 0 }}>
                    {icon}
                  </Box>
                  <Text fw={700} size="md" style={{ color: NAVY }}>{title}</Text>
                </Group>
                <Text size="sm" c="dimmed" lh={1.7}>{desc}</Text>
              </Box>
            ))}
            <Box style={{ borderTop: "1px solid #f0f3fa" }} />
          </Stack>
        </Container>
      </Box>

      {/* ── DASHBOARD PREVIEW ─────────────────────────────────────────────── */}
      <Box py={80} style={{ backgroundColor: "#fafbff", borderTop: "1px solid #f0f3fa" }}>
        <Container size="lg">

          {/* Header row */}
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48} mb={48} style={{ alignItems: "flex-end" }}>
            <Stack gap="xs">
              <Badge size="sm" radius="xl" style={{ backgroundColor: "#eff4ff", color: BLUE, fontWeight: 700, letterSpacing: "0.08em", width: "fit-content" }}>Dashboard</Badge>
              <Title order={2} style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", color: NAVY, lineHeight: 1.15 }}>
                Your health,<br />at a glance
              </Title>
            </Stack>
            <Stack gap="lg">
              <Text size="md" c="dimmed" lh={1.7}>
                Every meal you log builds your personal nutrition picture. See your macros, meals, and wellness score update in real time.
              </Text>
              <Stack gap={0}>
                {["Automatic macro calculations per meal", "Daily wellness score based on your goals", "Filipino food database built-in", "Weekly trend charts and insights"].map((item) => (
                  <Group key={item} gap="sm" py="xs" style={{ borderBottom: "1px solid #eef2fb" }}>
                    <Box style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: NAVY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={11} color="#fff" />
                    </Box>
                    <Text size="sm" c="dimmed">{item}</Text>
                  </Group>
                ))}
              </Stack>
              <Group>
                <Button component={Link} to="/register" size="md" radius="md" style={{ backgroundColor: NAVY }}>
                  Start tracking free
                </Button>
              </Group>
            </Stack>
          </SimpleGrid>

          {/* Main content row */}
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md" style={{ alignItems: "start" }}>

            {/* Left column — intake + macros + chart */}
            <Stack gap="md">
              {/* Today's intake */}
              <Paper radius="xl" p="xl" style={{ border: "1px solid #e8ecf5", backgroundColor: "#fff" }}>
                <Group justify="space-between" align="flex-start" mb="lg">
                  <Stack gap={4}>
                    <Text size="xs" fw={600} c="dimmed" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Today's intake</Text>
                    <Group gap="xs" align="baseline">
                      <Text fw={900} style={{ fontSize: "2rem", color: NAVY, lineHeight: 1 }}>1,840</Text>
                      <Text size="sm" c="dimmed">/ 2,100 kcal</Text>
                    </Group>
                    <Box style={{ height: 6, backgroundColor: "#eef2fb", borderRadius: 99, marginTop: 8, width: 200, overflow: "hidden" }}>
                      <Box style={{ width: "87%", height: "100%", backgroundColor: NAVY, borderRadius: 99 }} />
                    </Box>
                  </Stack>
                  <WellnessGauge score={87} />
                </Group>

                <Divider mb="lg" />

                <Text size="xs" fw={600} c="dimmed" mb="md" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Macro distribution</Text>
                <MacroPie />
              </Paper>

              {/* Weekly trends */}
              <Paper radius="xl" p="xl" style={{ border: "1px solid #e8ecf5", backgroundColor: "#fff" }}>
                <Text size="xs" fw={600} c="dimmed" mb="md" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Weekly trends</Text>
                <WeeklyChart />
              </Paper>
            </Stack>

            {/* Right column — meals + SVG */}
            <Stack gap="md">
              {/* SVG illustration */}
              <Box style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
                <img src="/images/eating-healthy.svg" alt="Eating healthy"
                  style={{ width: "100%", maxWidth: 260, filter: "drop-shadow(0 12px 32px rgba(10,35,102,0.1))" }} />
              </Box>

              {/* Meals */}
              <Paper radius="xl" p="xl" style={{ border: "1px solid #e8ecf5", backgroundColor: "#fff" }}>
                <Text size="xs" fw={600} c="dimmed" mb="lg" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Today's meals</Text>
                <Stack gap={0}>
                  {[
                    { meal: "Breakfast", food: "Tapsilog + Rice",   kcal: 490, time: "7:30 AM"  },
                    { meal: "Lunch",     food: "Sinigang na Baboy", kcal: 310, time: "12:15 PM" },
                    { meal: "Snack",     food: "Pandesal × 2",      kcal: 240, time: "3:00 PM"  },
                    { meal: "Dinner",    food: "Chicken Adobo",     kcal: 380, time: "7:00 PM"  },
                  ].map(({ meal, food, kcal, time }, i, arr) => (
                    <Group key={meal} justify="space-between" py="md"
                      style={{ borderBottom: i < arr.length - 1 ? "1px solid #f4f6fc" : "none" }}>
                      <Group gap="sm">
                        <Box style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: NAVY, flexShrink: 0 }} />
                        <Stack gap={2}>
                          <Text size="sm" fw={600} style={{ color: NAVY }}>{food}</Text>
                          <Text size="xs" c="dimmed">{meal} · {time}</Text>
                        </Stack>
                      </Group>
                      <Text size="sm" fw={700} style={{ color: BLUE, fontFamily: "monospace" }}>{kcal} kcal</Text>
                    </Group>
                  ))}
                </Stack>
                <Box mt="lg" pt="md" style={{ borderTop: "1px solid #f4f6fc" }}>
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed" fw={600}>Total logged</Text>
                    <Text size="sm" fw={800} style={{ color: NAVY, fontFamily: "monospace" }}>1,420 kcal</Text>
                  </Group>
                </Box>
              </Paper>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <Box id="how-it-works" py={80} style={{ backgroundColor: "#fafbff", position: "relative", overflow: "hidden" }}>
        <Box style={{ position: "absolute", inset: 0, opacity: 0.3, backgroundImage: "radial-gradient(circle, #d1d8f0 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <Container size="lg" style={{ position: "relative" }}>
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={64} style={{ alignItems: "flex-start" }}>
            <Stack gap="lg">
              <Badge size="sm" radius="xl" style={{ backgroundColor: "#eff4ff", color: BLUE, fontWeight: 700, letterSpacing: "0.08em", width: "fit-content" }}>How it works</Badge>
              <Title order={2} style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", color: NAVY, lineHeight: 1.15 }}>Up and running in minutes</Title>
              <Text size="md" c="dimmed" lh={1.7}>No complicated setup. Create your profile once and start scanning right away.</Text>
              <Button component={Link} to="/register" size="md" radius="md" style={{ backgroundColor: NAVY, width: "fit-content" }}>
                Get started free
              </Button>
            </Stack>

            <Stack gap="xl">
              {[
                { n: 1, title: "Create your account", desc: "Sign up in under 2 minutes with your email and basic health information." },
                { n: 2, title: "Build your health profile", desc: "Input your age, body metrics, goals, allergies, and dietary preferences." },
                { n: 3, title: "Scan your food", desc: "Use your phone camera to scan barcodes and log meals throughout the day." },
                { n: 4, title: "Track your progress", desc: "Review your wellness score, nutrition breakdown, and trends on your dashboard." },
              ].map(({ n, title, desc }) => (
                <Group key={n} gap="lg" align="flex-start">
                  <ThemeIcon size={44} radius="xl" style={{ backgroundColor: NAVY, boxShadow: "0 4px 12px rgba(10,35,102,0.3)", flexShrink: 0 }}>
                    <Text fw={800} size="sm" style={{ color: "#fff" }}>{n}</Text>
                  </ThemeIcon>
                  <Stack gap={4} pt={4}>
                    <Text fw={700} size="sm" style={{ color: NAVY }}>{title}</Text>
                    <Text size="sm" c="dimmed" lh={1.6}>{desc}</Text>
                  </Stack>
                </Group>
              ))}
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <Box id="testimonials" py={80} style={{ backgroundColor: "#fafbff", borderTop: "1px solid #f0f3fa" }}>
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={64} mb={56} style={{ alignItems: "flex-end" }}>
            <Stack gap="xs">
              <Badge size="sm" radius="xl" style={{ backgroundColor: "#eff4ff", color: BLUE, fontWeight: 700, letterSpacing: "0.08em", width: "fit-content" }}>Reviews</Badge>
              <Title order={2} style={{ fontSize: "clamp(1.5rem, 5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", color: NAVY, lineHeight: 1.1 }}>
                What users<br />are saying
              </Title>
            </Stack>
            <Text size="md" c="dimmed" lh={1.7}>
              Real experiences from Filipinos using KainWise to understand their food, reach their goals, and feel better every day.
            </Text>
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" style={{ alignItems: "stretch" }}>
            <TestimonialCard initials="MR" name="Maria R." role="Fitness enthusiast"
              quote="I finally understand what I'm eating. The barcode scanner is incredibly fast and the Filipino food database is so complete!" />
            <TestimonialCard initials="JP" name="Juan P." role="Post-surgery recovery"
              quote="My doctor recommended tracking sodium. KainWise makes it effortless — one scan and I know exactly what's in my food." />
            <TestimonialCard initials="AS" name="Ana S." role="Student, Davao City"
              quote="The AI diary is like having a nutritionist in my pocket. It gives helpful advice, not just generic tips." />
            <TestimonialCard initials="KL" name="Kat L." role="New mom"
              quote="Being able to track my nutrition while breastfeeding gives me peace of mind. The health profile for new moms is so thoughtful." />
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <Box py={80} style={{ backgroundColor: NAVY, position: "relative", overflow: "hidden" }}>
        {/* Philippines map watermark */}
        <img src="/images/philippines.svg" alt="" style={{
          position: "absolute", right: "-8%", top: "50%", transform: "translateY(-50%)",
          height: "160%", width: "auto", opacity: 0.06, pointerEvents: "none", userSelect: "none",
        }} />
        <Container size="lg" style={{ position: "relative" }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={64} style={{ alignItems: "center" }}>
            {/* Left — illustration */}
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <img src="/images/eating-healthy.svg" alt="Eating healthy"
                style={{ width: "100%", maxWidth: 340, filter: "brightness(0) invert(1)", opacity: 0.85 }} />
            </Box>
            {/* Right — text + buttons */}
            <Stack gap="xl">
              <Stack gap="sm">
                <Title order={2} style={{ color: "#fff", fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Start eating smarter today
                </Title>
                <Text size="md" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                  Join thousands of Filipinos already using KainWise to understand their food and reach their health goals.
                </Text>
              </Stack>
              <Group gap="sm">
                <Button component={Link} to="/register" size="md" radius="md"
                  style={{ backgroundColor: "#fff", color: NAVY }} fw={700}>
                  Create free account
                </Button>
                <Button component={Link} to="/login" size="md" radius="md" variant="outline"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>
                  Log in
                </Button>
              </Group>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <Box py="lg" style={{ backgroundColor: "#fafbff", borderTop: "1px solid #f0f3fa" }}>
        <Container size="lg">
          <Group justify="space-between" align="center" style={{ flexWrap: "wrap", gap: 12 }}>
            <Text fw={600} size="md" style={{ color: NAVY, letterSpacing: "-0.02em" }}>
              <BrandName />
            </Text>
            <Group gap="lg">
              {["Privacy", "Terms", "Contact", "About"].map((l) => (
                <Anchor key={l} href="#" size="xs" style={{ color: "#9ca3af", textDecoration: "none" }}>{l}</Anchor>
              ))}
            </Group>
            <Text size="xs" c="dimmed">© {new Date().getFullYear()} KainWise. All rights reserved.</Text>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
