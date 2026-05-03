import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Container, SimpleGrid, Paper, Stack, Group, Text, Title,
  Badge, Button, Box, Divider, ThemeIcon, Progress,
} from "@mantine/core";
import {
  ScanBarcode, BookOpen, Activity, Droplets, Flame,
  Dumbbell, Target, CheckCircle2, Circle, Clock,
  Utensils, Plus, AlertCircle, ChevronRight, ShieldCheck,
} from "lucide-react";

const NAVY  = "#0a2366";
const BLUE  = "#164bd4";
const LIGHT = "#f8faff";

// ── Mock data ─────────────────────────────────────────────────────────────────

const profile = {
  firstName: "Juan", lastName: "Dela Cruz",
  healthGoal: "Lose Weight", activityLevel: "Moderately Active",
  weightKg: 72, heightCm: 170,
};

const mealLogs = [
  { id: 1, rawText: "Tapsilog + Rice",   calories: 490, fatGrams: 18, proteinGrams: 24, carbGrams: 58, sodiumMg: 620, score: 64, supportLevel: "Medium", source: "manual",  createdAt: "7:30 AM"  },
  { id: 2, rawText: "Sinigang na Baboy", calories: 310, fatGrams: 9,  proteinGrams: 22, carbGrams: 28, sodiumMg: 890, score: 58, supportLevel: "Low",    source: "scan",    createdAt: "12:15 PM" },
  { id: 3, rawText: "Pandesal × 2",      calories: 240, fatGrams: 4,  proteinGrams: 7,  carbGrams: 44, sodiumMg: 310, score: 72, supportLevel: "Medium", source: "manual",  createdAt: "3:00 PM"  },
  { id: 4, rawText: "Chicken Adobo",     calories: 380, fatGrams: 14, proteinGrams: 31, carbGrams: 12, sodiumMg: 740, score: 70, supportLevel: "Medium", source: "manual",  createdAt: "7:00 PM"  },
];

const recentScans = [
  { id: 1, productName: "Pancit Canton Original", calories: 330, sodiumMg: 480, fatGrams: 12, proteinGrams: 9,  score: 52, supportLevel: "Low",    createdAt: "11:42 AM"  },
  { id: 2, productName: "Nova Country Cheddar",   calories: 140, sodiumMg: 200, fatGrams: 7,  proteinGrams: 2,  score: 45, supportLevel: "Low",    createdAt: "3:12 PM"   },
  { id: 3, productName: "Oishi Prawn Crackers",   calories: 120, sodiumMg: 180, fatGrams: 6,  proteinGrams: 1,  score: 48, supportLevel: "Low",    createdAt: "Yesterday" },
];

const waterLogs = [
  { id: 1, amountMl: 250, createdAt: "7:00 AM"  },
  { id: 2, amountMl: 500, createdAt: "10:30 AM" },
  { id: 3, amountMl: 250, createdAt: "1:00 PM"  },
  { id: 4, amountMl: 300, createdAt: "4:00 PM"  },
];
const totalWaterMl = waterLogs.reduce((s, w) => s + w.amountMl, 0);
const waterGoalMl  = 2500;

const workoutLogs = [
  { id: 1, title: "Morning Jog",     workoutType: "Cardio",   durationMinutes: 30, caloriesBurned: 210, intensity: "Moderate", createdAt: "Today, 6:00 AM"      },
  { id: 2, title: "Upper Body Lift", workoutType: "Strength", durationMinutes: 45, caloriesBurned: 180, intensity: "High",     createdAt: "Yesterday, 6:30 AM"  },
  { id: 3, title: "Evening Walk",    workoutType: "Cardio",   durationMinutes: 20, caloriesBurned: 90,  intensity: "Low",      createdAt: "2 days ago, 7:00 PM" },
];

const wellnessTasks = [
  { id: 1, title: "Log dinner",                  status: "pending",   action: "Log meal"  },
  { id: 2, title: "Drink 1 more glass of water", status: "pending",   action: "Log water" },
  { id: 3, title: "Write today's diary entry",   status: "pending",   action: "Open diary"},
  { id: 4, title: "Morning jog completed",       status: "completed", action: null        },
  { id: 5, title: "Track breakfast",             status: "completed", action: null        },
];

const weeklyData = {
  days:     ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  score:    [82, 85, 74, 79, 78, 0, 0],
  calories: [1850, 1920, 2150, 1980, 1420, 0, 0],
  water:    [2100, 2400, 1800, 2200, 1300, 0, 0],
};

const calorieGoal  = 2100;
const dailyScore   = 78;
const totalCalories = mealLogs.reduce((s, m) => s + m.calories, 0);
const totalProtein  = mealLogs.reduce((s, m) => s + m.proteinGrams, 0);
const totalFat      = mealLogs.reduce((s, m) => s + m.fatGrams, 0);
const totalCarbs    = mealLogs.reduce((s, m) => s + m.carbGrams, 0);

// ── Chart configs ─────────────────────────────────────────────────────────────

function useWeeklyChart() {
  return useMemo(() => ({
    options: {
      chart: { type: "area", toolbar: { show: false }, sparkline: { enabled: false }, background: "transparent", fontFamily: "Inter, sans-serif" },
      colors: [NAVY, BLUE],
      stroke: { curve: "smooth", width: [2, 2] },
      fill: { type: "solid", opacity: [0.06, 0.06] },
      dataLabels: { enabled: false },
      xaxis: { categories: weeklyData.days, labels: { style: { colors: "#9ca3af", fontSize: "11px" } }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: [
        { title: { text: undefined }, labels: { style: { colors: "#9ca3af", fontSize: "11px" } }, min: 0, max: 100 },
        { opposite: true, title: { text: undefined }, labels: { style: { colors: "#9ca3af", fontSize: "11px" } } },
      ],
      grid: { borderColor: "#f0f3fa", strokeDashArray: 4 },
      legend: { position: "top", horizontalAlign: "right", fontSize: "12px", fontFamily: "Inter, sans-serif", labels: { colors: "#374151" } },
      tooltip: { theme: "light", style: { fontFamily: "Inter, sans-serif" } },
    },
    series: [
      { name: "Wellness Score", data: weeklyData.score },
      { name: "Calories (÷10)", data: weeklyData.calories.map((c) => Math.round(c / 10)) },
    ],
  }), []);
}

function useMacroDonut() {
  return useMemo(() => ({
    options: {
      chart: { type: "donut", background: "transparent", fontFamily: "Inter, sans-serif" },
      colors: [NAVY, BLUE, "#93b4f0"],
      labels: ["Carbs", "Protein", "Fat"],
      dataLabels: { enabled: false },
      legend: { position: "bottom", fontSize: "12px", fontFamily: "Inter, sans-serif", labels: { colors: "#374151" } },
      plotOptions: { pie: { donut: { size: "70%", labels: { show: true, total: { show: true, label: "Total", fontSize: "12px", color: "#9ca3af", formatter: () => `${totalCalories} kcal` } } } } },
      stroke: { width: 0 },
      tooltip: { theme: "light", style: { fontFamily: "Inter, sans-serif" } },
    },
    series: [totalCarbs, totalProtein, totalFat],
  }), []);
}

function useRadialScore() {
  return useMemo(() => ({
    options: {
      chart: { type: "radialBar", background: "transparent", fontFamily: "Inter, sans-serif" },
      colors: [NAVY, BLUE],
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: -135, endAngle: 135,
          hollow: { size: "55%" },
          track: { background: "#f0f3fa", strokeWidth: "100%" },
          dataLabels: {
            name: { fontSize: "12px", color: "#9ca3af", offsetY: -8, fontFamily: "Inter, sans-serif" },
            value: { fontSize: "22px", fontWeight: 800, color: NAVY, offsetY: 4, fontFamily: "Inter, sans-serif" },
            total: { show: true, label: "Avg Score", fontSize: "11px", color: "#9ca3af", fontFamily: "Inter, sans-serif",
              formatter: () => Math.round((dailyScore + (calorieGoal > 0 ? (totalCalories / calorieGoal) * 100 : 0)) / 2) + "" },
          },
        },
      },
      labels: ["Wellness", "Calories"],
      legend: { show: false },
      stroke: { lineCap: "round" },
      tooltip: { theme: "light", style: { fontFamily: "Inter, sans-serif" } },
    },
    series: [dailyScore, Math.round((totalCalories / calorieGoal) * 100)],
  }), []);
}

function useWaterBar() {
  return useMemo(() => ({
    options: {
      chart: { type: "bar", toolbar: { show: false }, background: "transparent", fontFamily: "Inter, sans-serif" },
      colors: ["#0ea5e9"],
      plotOptions: { bar: { borderRadius: 4, columnWidth: "50%" } },
      dataLabels: { enabled: false },
      xaxis: { categories: waterLogs.map((w) => w.createdAt), labels: { style: { colors: "#9ca3af", fontSize: "11px" } }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { labels: { style: { colors: "#9ca3af", fontSize: "11px" }, formatter: (v) => `${v}mL` } },
      grid: { borderColor: "#f0f3fa", strokeDashArray: 4 },
      tooltip: { theme: "light", style: { fontFamily: "Inter, sans-serif" }, y: { formatter: (v) => `${v} mL` } },
    },
    series: [{ name: "Water (mL)", data: waterLogs.map((w) => w.amountMl) }],
  }), []);
}

function useScoreSparkline(data, color) {
  return useMemo(() => ({
    options: {
      chart: { type: "area", sparkline: { enabled: true }, background: "transparent" },
      colors: [color],
      stroke: { curve: "smooth", width: 1.5 },
      fill: { type: "solid", opacity: 0.08 },
      tooltip: { enabled: false },
    },
    series: [{ data }],
  }), [data, color]);
}

// ── Small helpers ─────────────────────────────────────────────────────────────

const SUPPORT_COLOR = { High: "#16a34a", Medium: BLUE, Low: "#dc2626" };

function SupportBadge({ level }) {
  return (
    <Badge size="xs" style={{ backgroundColor: SUPPORT_COLOR[level] + "18", color: SUPPORT_COLOR[level], fontWeight: 700 }}>
      {level}
    </Badge>
  );
}

function ScoreDot({ score }) {
  const color = score >= 70 ? "#16a34a" : score >= 50 ? BLUE : "#dc2626";
  return (
    <Box style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: color + "14", border: `1.5px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Text size="10px" fw={800} style={{ color }}>{score}</Text>
    </Box>
  );
}

// ── KPI card with sparkline ───────────────────────────────────────────────────

function KpiCard({ icon, label, value, sub, color, sparkData }) {
  const spark = useScoreSparkline(sparkData, color);
  return (
    <Paper p="lg" radius="md" style={{ border: "1px solid #e8ecf5", backgroundColor: "#fff", overflow: "hidden", position: "relative" }}>
      <Box style={{ position: "absolute", bottom: 0, right: 0, width: 100, opacity: 0.7 }}>
        <ReactApexChart options={spark.options} series={spark.series} type="area" height={56} width={100} />
      </Box>
      <Group gap="xs" mb={12}>
        <Box style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: color + "14", display: "flex", alignItems: "center", justifyContent: "center", color }}>
          {icon}
        </Box>
        <Text size="xs" c="dimmed" fw={600} style={{ textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</Text>
      </Group>
      <Text fw={800} style={{ fontSize: "1.7rem", color: NAVY, lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</Text>
      <Text size="xs" c="dimmed" mt={4}>{sub}</Text>
    </Paper>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const weeklyChart = useWeeklyChart();
  const macroDonut  = useMacroDonut();
  const radialScore = useRadialScore();
  const waterBar    = useWaterBar();
  const pendingTasks = wellnessTasks.filter((t) => t.status === "pending").length;

  return (
    <Box style={{ backgroundColor: LIGHT, minHeight: "100vh" }}>

      {/* ── Header ── */}
      <Box style={{ backgroundColor: "#fff", borderBottom: "1px solid #f0f3fa", padding: "28px 32px 0" }}>
        <Group justify="space-between" align="flex-end">
          <Stack gap={6} pb={24}>
            <Text size="xs" c="dimmed" fw={600} style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" })}
            </Text>
            <Title order={2} style={{ color: NAVY, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
              Good evening, {profile.firstName}.
            </Title>
            <Group gap="sm" mt={4}>
              <Box style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "#eff4ff", border: "1px solid #dbeafe", borderRadius: 20, padding: "4px 12px" }}>
                <Box style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#16a34a" }} />
                <Text size="xs" style={{ color: BLUE, fontWeight: 600 }}>{profile.healthGoal}</Text>
              </Box>
              <Box style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "#f8faff", border: "1px solid #e8ecf5", borderRadius: 20, padding: "4px 12px" }}>
                <Text size="xs" c="dimmed" fw={500}>{profile.activityLevel}</Text>
              </Box>
            </Group>
          </Stack>

          {/* Wellness score — right */}
          <Box pb={24} style={{ textAlign: "right" }}>
            <Text size="xs" c="dimmed" fw={600} style={{ textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Today's score</Text>
            <Group gap={4} align="baseline" justify="flex-end">
              <Text style={{ fontSize: "3rem", fontWeight: 900, color: NAVY, lineHeight: 1, letterSpacing: "-0.04em" }}>{dailyScore}</Text>
              <Text c="dimmed" style={{ fontSize: "1rem" }}>/100</Text>
            </Group>
            <Text size="xs" style={{ color: "#16a34a", fontWeight: 600, marginTop: 4 }}>● High Support</Text>
          </Box>
        </Group>

        {/* Tab strip */}
        <Box style={{ marginLeft: -32, marginRight: -32, borderTop: "1px solid #f0f3fa" }}>
          <Group gap={0} style={{ overflowX: "auto" }}>
            {[
              { icon: <ScanBarcode size={15} />, label: "Scan Product"   },
              { icon: <Utensils size={15} />,    label: "Log Meal"       },
              { icon: <Droplets size={15} />,    label: "Log Water"      },
              { icon: <BookOpen size={15} />,    label: "Write in Diary" },
            ].map(({ icon, label }, i) => (
              <Box
                key={label}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "13px 24px",
                  color: i === 0 ? NAVY : "#9ca3af",
                  fontWeight: i === 0 ? 700 : 500,
                  fontSize: 13,
                  borderRight: "1px solid #f0f3fa",
                  borderBottom: i === 0 ? `2px solid ${NAVY}` : "2px solid transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "color 0.15s",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = NAVY; }}
                onMouseLeave={(e) => { if (i !== 0) e.currentTarget.style.color = "#9ca3af"; }}
              >
                {icon}
                {label}
              </Box>
            ))}
          </Group>
        </Box>
      </Box>

      <Container size="xl" py="xl" px="lg">

        {/* ── KPI row ── */}
        <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md" mb="md">
          <KpiCard icon={<Activity size={14} />} label="Wellness Score" value={dailyScore} sub="High Support today" color={NAVY}
            sparkData={weeklyData.score.filter(Boolean)} />
          <KpiCard icon={<Flame size={14} />} label="Calories" value={totalCalories} sub={`of ${calorieGoal} kcal goal`} color={BLUE}
            sparkData={weeklyData.calories.filter(Boolean)} />
          <KpiCard icon={<Droplets size={14} />} label="Hydration" value={`${(totalWaterMl/1000).toFixed(1)}L`} sub={`of ${waterGoalMl/1000}L goal`} color="#0ea5e9"
            sparkData={weeklyData.water.filter(Boolean)} />
          <KpiCard icon={<Dumbbell size={14} />} label="Workout" value={`${workoutLogs[0].durationMinutes}m`} sub={`${workoutLogs[0].caloriesBurned} kcal burned`} color="#8b5cf6"
            sparkData={[30, 0, 45, 20, 30, 0, 0].filter(Boolean)} />
        </SimpleGrid>

        {/* ── Primary charts ── */}
        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md" mb="md">

          {/* Weekly trend — spans 2 cols */}
          <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5", gridColumn: "span 2" }}>
            <Group justify="space-between" mb="md">
              <Box>
                <Text fw={700} size="sm" style={{ color: NAVY }}>Weekly Overview</Text>
                <Text size="xs" c="dimmed">Wellness score & calorie trend</Text>
              </Box>
              <Badge size="sm" style={{ backgroundColor: "#eff4ff", color: BLUE }}>This week</Badge>
            </Group>
            <ReactApexChart options={weeklyChart.options} series={weeklyChart.series} type="area" height={220} />
          </Paper>

          {/* Radial — score + calorie goal */}
          <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5", display: "flex", flexDirection: "column" }}>
            <Text fw={700} size="sm" style={{ color: NAVY }} mb={4}>Daily Goals</Text>
            <Text size="xs" c="dimmed" mb="md">Wellness & calorie progress</Text>
            <Box style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ReactApexChart options={radialScore.options} series={radialScore.series} type="radialBar" height={220} width="100%" />
            </Box>
            <SimpleGrid cols={2} spacing="xs" mt="sm">
              {[["Wellness", `${dailyScore}%`, NAVY], ["Calories", `${Math.round((totalCalories/calorieGoal)*100)}%`, BLUE]].map(([l, v, c]) => (
                <Box key={l} style={{ textAlign: "center", padding: "8px", borderRadius: 6, backgroundColor: LIGHT, border: "1px solid #f0f3fa" }}>
                  <Text fw={800} size="sm" style={{ color: c }}>{v}</Text>
                  <Text size="10px" c="dimmed">{l}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Paper>
        </SimpleGrid>

        {/* ── Secondary charts ── */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" mb="xl">

          {/* Macro donut */}
          <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5" }}>
            <Group justify="space-between" mb="md">
              <Box>
                <Text fw={700} size="sm" style={{ color: NAVY }}>Macro Distribution</Text>
                <Text size="xs" c="dimmed">Today's carbs · protein · fat</Text>
              </Box>
            </Group>
            <SimpleGrid cols={2} spacing={0}>
              <ReactApexChart options={macroDonut.options} series={macroDonut.series} type="donut" height={200} />
              <Stack gap="sm" justify="center" pl="md">
                {[["Carbs", totalCarbs, "g", NAVY], ["Protein", totalProtein, "g", BLUE], ["Fat", totalFat, "g", "#93b4f0"]].map(([l, v, u, c]) => (
                  <Group key={l} justify="space-between">
                    <Group gap="xs">
                      <Box style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: c }} />
                      <Text size="xs" c="dimmed">{l}</Text>
                    </Group>
                    <Text size="xs" fw={700} style={{ color: NAVY }}>{v}{u}</Text>
                  </Group>
                ))}
                <Divider color="#f0f3fa" />
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Total</Text>
                  <Text size="xs" fw={800} style={{ color: NAVY }}>{totalCalories} kcal</Text>
                </Group>
              </Stack>
            </SimpleGrid>
          </Paper>

          {/* Water intake bar */}
          <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5" }}>
            <Group justify="space-between" mb="md">
              <Box>
                <Text fw={700} size="sm" style={{ color: NAVY }}>Water Intake</Text>
                <Text size="xs" c="dimmed">{(totalWaterMl/1000).toFixed(1)}L of {waterGoalMl/1000}L goal</Text>
              </Box>
              <Button size="xs" variant="light" radius="md" style={{ backgroundColor: "#e0f2fe", color: "#0ea5e9" }} leftSection={<Plus size={12} />}>Add</Button>
            </Group>
            <Progress value={(totalWaterMl / waterGoalMl) * 100} size={6} radius="xl" color="#0ea5e9" mb="lg" />
            <ReactApexChart options={waterBar.options} series={waterBar.series} type="bar" height={148} />
          </Paper>
        </SimpleGrid>

        {/* ── Divider ── */}
        <Group gap="sm" mb="xl">
          <Divider style={{ flex: 1 }} color="#e8ecf5" />
          <Text size="xs" c="dimmed" fw={600} style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>Logs & Activity</Text>
          <Divider style={{ flex: 1 }} color="#e8ecf5" />
        </Group>

        {/* ── Tables / detail section ── */}
        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md" style={{ alignItems: "start" }}>

          {/* Meal log */}
          <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5", gridColumn: "span 2" }}>
            <Group justify="space-between" mb="lg">
              <Group gap="sm">
                <ThemeIcon size={30} radius="md" style={{ backgroundColor: "#eff4ff", color: BLUE }}><Utensils size={14} /></ThemeIcon>
                <Box>
                  <Text fw={700} size="sm" style={{ color: NAVY }}>Today's Meal Log</Text>
                  <Text size="xs" c="dimmed">{mealLogs.length} entries · {totalCalories} kcal</Text>
                </Box>
              </Group>
              <Button size="xs" variant="light" radius="md" style={{ backgroundColor: "#eff4ff", color: BLUE }} leftSection={<Plus size={12} />}>Log meal</Button>
            </Group>
            <Stack gap={0}>
              {mealLogs.map((m, i) => (
                <Group key={m.id} justify="space-between" py="sm"
                  style={{ borderBottom: i < mealLogs.length - 1 ? "1px solid #f4f6fc" : "none" }}>
                  <Group gap="sm">
                    <ScoreDot score={m.score} />
                    <Box>
                      <Text size="sm" fw={600} style={{ color: NAVY }}>{m.rawText}</Text>
                      <Group gap={6}>
                        <Text size="xs" c="dimmed">{m.createdAt}</Text>
                        <Text size="xs" c="dimmed">·</Text>
                        <Text size="xs" c="dimmed">{m.sodiumMg}mg sodium</Text>
                        {m.source === "scan" && <Badge size="xs" variant="outline" style={{ borderColor: "#e8ecf5", color: "#9ca3af" }}>scanned</Badge>}
                      </Group>
                    </Box>
                  </Group>
                  <Group gap="lg">
                    <Stack gap={0} align="flex-end">
                      <Text size="sm" fw={700} style={{ color: NAVY }}>{m.calories} kcal</Text>
                      <Text size="xs" c="dimmed">{m.proteinGrams}g prot · {m.fatGrams}g fat</Text>
                    </Stack>
                    <SupportBadge level={m.supportLevel} />
                  </Group>
                </Group>
              ))}
            </Stack>
            <Box mt="md" pt="md" style={{ borderTop: "1px solid #f4f6fc" }}>
              <Group justify="space-between">
                <Text size="xs" c="dimmed" fw={600}>Total</Text>
                <Group gap="xl">
                  <Text size="xs" c="dimmed">{totalProtein}g protein</Text>
                  <Text size="xs" c="dimmed">{totalFat}g fat</Text>
                  <Text size="xs" c="dimmed">{totalCarbs}g carbs</Text>
                  <Text size="sm" fw={800} style={{ color: NAVY }}>{totalCalories} kcal</Text>
                </Group>
              </Group>
            </Box>
          </Paper>

          {/* Right col */}
          <Stack gap="md">

            {/* Wellness tasks */}
            <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5" }}>
              <Group justify="space-between" mb="lg">
                <Group gap="sm">
                  <ThemeIcon size={30} radius="md" style={{ backgroundColor: "#eff4ff", color: BLUE }}><Target size={14} /></ThemeIcon>
                  <Box>
                    <Text fw={700} size="sm" style={{ color: NAVY }}>Tasks</Text>
                    <Text size="xs" c="dimmed">{pendingTasks} remaining</Text>
                  </Box>
                </Group>
              </Group>
              <Stack gap={0}>
                {wellnessTasks.map((t, i) => {
                  const done = t.status === "completed";
                  return (
                    <Group key={t.id} justify="space-between" py="sm"
                      style={{ borderBottom: i < wellnessTasks.length - 1 ? "1px solid #f4f6fc" : "none", opacity: done ? 0.45 : 1 }}>
                      <Group gap="sm">
                        {done ? <CheckCircle2 size={15} color="#16a34a" /> : <Circle size={15} color="#d1d5db" />}
                        <Text size="sm" fw={done ? 400 : 600}
                          style={{ color: done ? "#9ca3af" : NAVY, textDecoration: done ? "line-through" : "none" }}>
                          {t.title}
                        </Text>
                      </Group>
                      {!done && t.action && (
                        <Button size="xs" variant="subtle" radius="md" style={{ color: BLUE, padding: "2px 8px" }}>{t.action}</Button>
                      )}
                    </Group>
                  );
                })}
              </Stack>
            </Paper>

            {/* Recent scans */}
            <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5" }}>
              <Group justify="space-between" mb="lg">
                <Group gap="sm">
                  <ThemeIcon size={30} radius="md" style={{ backgroundColor: "#eff4ff", color: BLUE }}><ScanBarcode size={14} /></ThemeIcon>
                  <Text fw={700} size="sm" style={{ color: NAVY }}>Recent Scans</Text>
                </Group>
                <Button size="xs" variant="light" radius="md" style={{ backgroundColor: "#eff4ff", color: BLUE }}>Scan</Button>
              </Group>
              <Stack gap="sm">
                {recentScans.map((s) => (
                  <Box key={s.id} style={{ padding: "10px 12px", borderRadius: 6, backgroundColor: LIGHT, border: "1px solid #f0f3fa" }}>
                    <Group justify="space-between" mb={4}>
                      <Text size="xs" fw={700} style={{ color: NAVY }}>{s.productName}</Text>
                      <ScoreDot score={s.score} />
                    </Group>
                    <Group gap="md">
                      <Text size="xs" c="dimmed">{s.calories} kcal</Text>
                      <Text size="xs" c="dimmed">{s.sodiumMg}mg Na</Text>
                      <Text size="xs" c="dimmed">{s.createdAt}</Text>
                    </Group>
                  </Box>
                ))}
              </Stack>
              <Button fullWidth size="xs" variant="subtle" mt="md" rightSection={<ChevronRight size={12} />} style={{ color: "#9ca3af" }}>
                View all scans
              </Button>
            </Paper>

            {/* Workout log */}
            <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5" }}>
              <Group justify="space-between" mb="lg">
                <Group gap="sm">
                  <ThemeIcon size={30} radius="md" style={{ backgroundColor: "#f5f3ff", color: "#8b5cf6" }}><Dumbbell size={14} /></ThemeIcon>
                  <Box>
                    <Text fw={700} size="sm" style={{ color: NAVY }}>Workout Log</Text>
                    <Text size="xs" c="dimmed">Recent activity</Text>
                  </Box>
                </Group>
                <Button size="xs" variant="light" radius="md" style={{ backgroundColor: "#f5f3ff", color: "#8b5cf6" }} leftSection={<Plus size={12} />}>Log</Button>
              </Group>
              <Stack gap="sm">
                {workoutLogs.map((w) => (
                  <Box key={w.id} style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid #f0f3fa", backgroundColor: LIGHT }}>
                    <Group justify="space-between" mb={4}>
                      <Text size="xs" fw={700} style={{ color: NAVY }}>{w.title}</Text>
                      <Badge size="xs" style={{ backgroundColor: "#f5f3ff", color: "#8b5cf6" }}>{w.workoutType}</Badge>
                    </Group>
                    <Group gap="md">
                      <Group gap={4}><Clock size={11} color="#9ca3af" /><Text size="xs" c="dimmed">{w.durationMinutes} min</Text></Group>
                      <Group gap={4}><Flame size={11} color="#9ca3af" /><Text size="xs" c="dimmed">{w.caloriesBurned} kcal</Text></Group>
                    </Group>
                    <Text size="10px" c="dimmed" mt={4}>{w.createdAt}</Text>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Sodium alert */}
            <Paper radius="md" p="lg" style={{ border: "1px solid #fee2e2", backgroundColor: "#fff7f7" }}>
              <Group gap="sm" mb="xs">
                <AlertCircle size={15} color="#dc2626" />
                <Text fw={700} size="sm" style={{ color: "#dc2626" }}>Sodium Alert</Text>
              </Group>
              <Text size="xs" c="dimmed" lh={1.6}>
                You've consumed <strong>2,250mg sodium</strong> today — 98% of your daily limit. Consider a low-sodium dinner.
              </Text>
            </Paper>

            {/* AI Diary */}
            <Paper radius="md" p="xl" style={{ border: "1px solid #e8ecf5", flex: 1 }}>
              <Group justify="space-between" mb="lg">
                <Group gap="sm">
                  <ThemeIcon size={30} radius="md" style={{ backgroundColor: "#fdf4ff", color: "#a855f7" }}><BookOpen size={14} /></ThemeIcon>
                  <Box>
                    <Text fw={700} size="sm" style={{ color: NAVY }}>AI Diary</Text>
                    <Text size="xs" c="dimmed">Today, 8:00 PM</Text>
                  </Box>
                </Group>
                <Button size="xs" variant="light" radius="md" style={{ backgroundColor: "#fdf4ff", color: "#a855f7" }}>Open</Button>
              </Group>

              {/* Vitals */}
              <SimpleGrid cols={3} spacing="xs" mb="md">
                {[
                  { label: "Energy",  value: "7/10",  icon: "⚡" },
                  { label: "Sleep",   value: "7.5h",  icon: "🌙" },
                  { label: "Stress",  value: "4/10",  icon: "📈" },
                ].map(({ label, value, icon }) => (
                  <Box key={label} style={{ textAlign: "center", padding: "10px 8px", borderRadius: 6, backgroundColor: LIGHT, border: "1px solid #f0f3fa" }}>
                    <Text style={{ fontSize: 14, marginBottom: 4 }}>{icon}</Text>
                    <Text fw={700} size="xs" style={{ color: NAVY }}>{value}</Text>
                    <Text size="10px" c="dimmed">{label}</Text>
                  </Box>
                ))}
              </SimpleGrid>

              <Text size="xs" c="dimmed" lh={1.7} mb="md" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                "Felt great after the morning jog. Lunch was a bit salty — had sinigang. Will try to drink more water tonight."
              </Text>

              <Divider color="#f0f3fa" mb="md" />

              <Box style={{ backgroundColor: "#eff4ff", borderRadius: 6, padding: "12px" }}>
                <Group gap="xs" mb={6}>
                  <ShieldCheck size={13} color={BLUE} />
                  <Text size="xs" fw={700} style={{ color: BLUE }}>AI Reflection</Text>
                </Group>
                <Text size="xs" c="dimmed" lh={1.6} style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  Your energy is above average today — the workout is helping. Watch your sodium intake, you're at 2,250mg. Consider a low-sodium dinner tonight.
                </Text>
              </Box>
            </Paper>
          </Stack>

        </SimpleGrid>


      </Container>
    </Box>
  );
}
