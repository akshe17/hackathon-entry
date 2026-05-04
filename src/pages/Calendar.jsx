import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Heart,
  Activity,
  Droplet,
  Apple,
  Moon,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Flame,
  Wind,
  Zap,
  Coffee,
  Utensils,
  Smile,
  Battery,
  Brain,
  ArrowRight,
  Info,
  Sun,
  Cloud,
  CloudRain,
  Leaf,
  Scale,
  FileText,
  Lock,
  Eye,
  EyeOff,
  Target,
  Award,
  Sparkles,
  X,
  Plus,
  Edit,
  Trash2,
  Star,
  RefreshCw,
  Clock,
  Calendar as CalendarIcon2,
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
  Share2,
  Bell,
  Settings,
  Menu,
} from "lucide-react";

const NAVY = "#0a2366";
const BLUE = "#164bd4";
const LIGHT = "#f8faff";

// Mock data for calendar entries
const generateMockEntries = () => {
  const entries = {};
  const today = new Date();

  for (let i = -30; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    const randomScore = Math.floor(Math.random() * 100);
    let wellnessLevel = "medium";
    if (randomScore >= 70) wellnessLevel = "high";
    else if (randomScore <= 40) wellnessLevel = "low";

    entries[dateStr] = {
      score: randomScore,
      level: wellnessLevel,
      foods: [
        "Grilled Chicken Bowl",
        "Vegetable Stir-fry",
        "Quinoa Salad",
        "Oatmeal with Berries",
        "Salmon with Rice",
        "Tofu Curry",
      ][Math.floor(Math.random() * 6)],
      mood: ["happy", "stressed", "tired", "calm", "focused"][
        Math.floor(Math.random() * 5)
      ],
      waterIntake: [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)],
      protein: [15, 25, 35, 45, 55, 65][Math.floor(Math.random() * 6)],
      sodium: [800, 1200, 1500, 1800, 2200, 2500][
        Math.floor(Math.random() * 6)
      ],
      sugar: [10, 20, 35, 50, 65, 80][Math.floor(Math.random() * 6)],
      sleep: [5, 6, 6.5, 7, 7.5, 8, 8.5][Math.floor(Math.random() * 7)],
      fiber: [5, 10, 15, 20, 25, 30][Math.floor(Math.random() * 6)],
      meals: ["Breakfast", "Lunch", "Dinner", "Snacks"].filter(
        () => Math.random() > 0.5,
      ),
    };
  }

  const todayStr = today.toISOString().split("T")[0];
  entries[todayStr] = {
    score: 78,
    level: "high",
    foods: "Grilled Chicken Bowl with Brown Rice",
    mood: "calm",
    waterIntake: 6,
    protein: 45,
    sodium: 1200,
    sugar: 15,
    sleep: 7.5,
    fiber: 18,
    meals: ["Breakfast", "Lunch", "Dinner"],
  };

  return entries;
};

export default function HealthCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarEntries, setCalendarEntries] = useState({});
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [viewMode, setViewMode] = useState("month");
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    highOnly: false,
    mediumOnly: false,
    lowOnly: false,
    hasMood: false,
    hasMeals: false,
  });
  const [quickViewDate, setQuickViewDate] = useState(null);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [newEntryForm, setNewEntryForm] = useState({
    foods: "",
    mood: "calm",
    waterIntake: 5,
    protein: 30,
    sodium: 1500,
    sugar: 25,
    sleep: 7,
    fiber: 15,
    meals: [],
  });

  useEffect(() => {
    const savedEntries = localStorage.getItem("kainwise_calendar_entries");
    if (savedEntries) {
      setCalendarEntries(JSON.parse(savedEntries));
    } else {
      const mockEntries = generateMockEntries();
      setCalendarEntries(mockEntries);
      localStorage.setItem(
        "kainwise_calendar_entries",
        JSON.stringify(mockEntries),
      );
    }
  }, []);

  useEffect(() => {
    generateWeeklySummary(selectedDate);
  }, [selectedDate, calendarEntries]);

  const generateWeeklySummary = (date) => {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());

    const weekDays = [];
    let totalScore = 0;
    let daysWithData = 0;
    let totalWater = 0;
    let totalProtein = 0;
    let totalSleep = 0;
    let totalFiber = 0;
    let highDays = 0;
    let mediumDays = 0;
    let lowDays = 0;

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      const dateStr = day.toISOString().split("T")[0];
      const entry = calendarEntries[dateStr];

      if (entry) {
        totalScore += entry.score;
        totalWater += entry.waterIntake || 0;
        totalProtein += entry.protein || 0;
        totalSleep += entry.sleep || 0;
        totalFiber += entry.fiber || 0;
        daysWithData++;

        if (entry.level === "high") highDays++;
        else if (entry.level === "medium") mediumDays++;
        else if (entry.level === "low") lowDays++;
      }

      weekDays.push({
        date: day,
        entry: entry,
        dateStr: dateStr,
      });
    }

    setWeeklySummary({
      avgScore: daysWithData > 0 ? Math.round(totalScore / daysWithData) : 0,
      avgWater: daysWithData > 0 ? (totalWater / daysWithData).toFixed(1) : 0,
      avgProtein:
        daysWithData > 0 ? Math.round(totalProtein / daysWithData) : 0,
      avgSleep: daysWithData > 0 ? (totalSleep / daysWithData).toFixed(1) : 0,
      avgFiber: daysWithData > 0 ? Math.round(totalFiber / daysWithData) : 0,
      highDays,
      mediumDays,
      lowDays,
      totalDays: daysWithData,
      weekDays,
    });
  };

  const getWellnessStyle = (level) => {
    switch (level) {
      case "high":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-500",
          text: "text-emerald-700",
          badgeBg: "bg-emerald-100",
          icon: <CheckCircle size={14} className="text-emerald-600" />,
          label: "High Support",
          gradient: "from-emerald-50 to-teal-50",
          dot: "bg-emerald-500",
        };
      case "medium":
        return {
          bg: "bg-amber-50",
          border: "border-amber-500",
          text: "text-amber-700",
          badgeBg: "bg-amber-100",
          icon: <Activity size={14} className="text-amber-600" />,
          label: "Medium Support",
          gradient: "from-amber-50 to-yellow-50",
          dot: "bg-amber-500",
        };
      default:
        return {
          bg: "bg-rose-50",
          border: "border-rose-500",
          text: "text-rose-700",
          badgeBg: "bg-rose-100",
          icon: <Heart size={14} className="text-rose-600" />,
          label: "Low Support",
          gradient: "from-rose-50 to-orange-50",
          dot: "bg-rose-500",
        };
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "text-emerald-600";
    if (score >= 50) return "text-amber-600";
    return "text-rose-600";
  };

  const getMoodIcon = (mood) => {
    const moods = {
      happy: <Smile size={16} className="text-emerald-500" />,
      stressed: <AlertCircle size={16} className="text-rose-500" />,
      tired: <Moon size={16} className="text-indigo-500" />,
      calm: <Heart size={16} className="text-sky-500" />,
      focused: <Brain size={16} className="text-purple-500" />,
      sad: <CloudRain size={16} className="text-gray-500" />,
      anxious: <Zap size={16} className="text-amber-500" />,
      angry: <Flame size={16} className="text-orange-500" />,
    };
    return moods[mood] || <Smile size={16} className="text-gray-500" />;
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getWeekDays = () => {
    const weekStart = new Date(selectedDate);
    weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
    const dateStr = date.toISOString().split("T")[0];
    const entry = calendarEntries[dateStr];
    if (entry) {
      setSelectedEntry({ date, ...entry });
    } else {
      setSelectedEntry({
        date,
        score: null,
        level: "none",
        message:
          "No data recorded for this day. Scan some food or write a diary entry!",
      });
    }
  };

  const handleAddEntry = () => {
    if (!selectedDate) return;
    const dateStr = selectedDate.toISOString().split("T")[0];

    // Calculate wellness score based on form inputs
    let score = 60;
    if (newEntryForm.protein >= 40) score += 10;
    if (newEntryForm.waterIntake >= 6) score += 10;
    if (newEntryForm.sleep >= 7) score += 10;
    if (newEntryForm.fiber >= 20) score += 10;
    if (newEntryForm.sodium > 2000) score -= 10;
    if (newEntryForm.sugar > 50) score -= 10;
    score = Math.min(100, Math.max(0, score));

    let level = "medium";
    if (score >= 70) level = "high";
    else if (score <= 40) level = "low";

    const newEntry = {
      score,
      level,
      foods: newEntryForm.foods || "Custom Meal",
      mood: newEntryForm.mood,
      waterIntake: newEntryForm.waterIntake,
      protein: newEntryForm.protein,
      sodium: newEntryForm.sodium,
      sugar: newEntryForm.sugar,
      sleep: newEntryForm.sleep,
      fiber: newEntryForm.fiber,
      meals: newEntryForm.meals,
    };

    const updatedEntries = { ...calendarEntries, [dateStr]: newEntry };
    setCalendarEntries(updatedEntries);
    localStorage.setItem(
      "kainwise_calendar_entries",
      JSON.stringify(updatedEntries),
    );
    setSelectedEntry({ date: selectedDate, ...newEntry });
    setShowAddEntry(false);
    setNewEntryForm({
      foods: "",
      mood: "calm",
      waterIntake: 5,
      protein: 30,
      sodium: 1500,
      sugar: 25,
      sleep: 7,
      fiber: 15,
      meals: [],
    });
  };

  const handleDeleteEntry = () => {
    if (!selectedEntry || !selectedEntry.date) return;
    const dateStr = selectedEntry.date.toISOString().split("T")[0];
    const updatedEntries = { ...calendarEntries };
    delete updatedEntries[dateStr];
    setCalendarEntries(updatedEntries);
    localStorage.setItem(
      "kainwise_calendar_entries",
      JSON.stringify(updatedEntries),
    );
    setSelectedEntry(null);
  };

  const navigateToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    handleDateClick(today);
  };

  const goToDate = (year, month) => {
    setCurrentDate(new Date(year, month, 1));
    setShowYearPicker(false);
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const getStreak = () => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      if (calendarEntries[dateStr]) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const monthDays = getMonthDays();
  const weekDaysList = getWeekDays();
  const weekDaysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const streak = getStreak();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-white">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#164bd4] opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0a2366] opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto p-6">
        {/* Header with Streak and Quick Actions */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#164bd4] to-[#1e40af] rounded-xl flex items-center justify-center shadow-md">
              <CalendarIcon size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#0a2366]">
                Health Impact Calendar
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-gray-500 text-sm">
                  Visualize your wellness journey
                </p>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100 rounded-full">
                  <Flame size={12} className="text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700">
                    {streak} day streak
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
            >
              <Filter size={16} />
              Filter
              {(filterOptions.highOnly ||
                filterOptions.mediumOnly ||
                filterOptions.lowOnly ||
                filterOptions.hasMood ||
                filterOptions.hasMeals) && (
                <div className="w-2 h-2 bg-[#164bd4] rounded-full" />
              )}
            </button>
            <button
              onClick={navigateToToday}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-[#164bd4] flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
            >
              <RefreshCw size={14} />
              Today
            </button>
            <button
              onClick={() => setShowAddEntry(true)}
              className="px-4 py-2 bg-gradient-to-r from-[#164bd4] to-[#1e40af] text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Plus size={16} />
              Add Entry
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[#0a2366] flex items-center gap-2">
                <Filter size={16} />
                Filter Calendar
              </h3>
              <button
                onClick={() => setShowFilter(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={filterOptions.highOnly}
                  onChange={(e) =>
                    setFilterOptions({
                      ...filterOptions,
                      highOnly: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-[#164bd4] focus:ring-[#164bd4]"
                />
                <CheckCircle size={12} className="text-emerald-500" />
                High Support Only
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={filterOptions.mediumOnly}
                  onChange={(e) =>
                    setFilterOptions({
                      ...filterOptions,
                      mediumOnly: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-[#164bd4] focus:ring-[#164bd4]"
                />
                <Activity size={12} className="text-amber-500" />
                Medium Support Only
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={filterOptions.lowOnly}
                  onChange={(e) =>
                    setFilterOptions({
                      ...filterOptions,
                      lowOnly: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-[#164bd4] focus:ring-[#164bd4]"
                />
                <Heart size={12} className="text-rose-500" />
                Low Support Only
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={filterOptions.hasMood}
                  onChange={(e) =>
                    setFilterOptions({
                      ...filterOptions,
                      hasMood: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-[#164bd4] focus:ring-[#164bd4]"
                />
                <Smile size={12} />
                Has Mood Entry
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={filterOptions.hasMeals}
                  onChange={(e) =>
                    setFilterOptions({
                      ...filterOptions,
                      hasMeals: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-[#164bd4] focus:ring-[#164bd4]"
                />
                <Utensils size={12} />
                Has Meals Logged
              </label>
            </div>
          </div>
        )}

        {/* Hero Banner with Calendar SVG */}
        <div className="mb-8 bg-gradient-to-r from-[#164bd4] to-[#1e40af] rounded-2xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between p-6 flex-wrap gap-6">
            <div className="flex items-center gap-5">
              <div className="bg-white/20 rounded-2xl p-3 backdrop-blur-sm">
                <img
                  src="/public/images/calendar.svg"
                  alt="Calendar Illustration"
                  className="w-20 h-20 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <div className="text-white">
                <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                  <Sparkles size={18} />
                  Your Wellness Visualized
                </h2>
                <p className="text-blue-100 text-sm max-w-md">
                  Track your daily nutrition, mood, and activity patterns. Each
                  day is color-coded based on your wellness score.
                </p>
              </div>
            </div>
            <div className="flex gap-5 bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-white/90">High Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                <span className="text-xs text-white/90">Medium Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                <span className="text-xs text-white/90">Low Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add Entry Modal */}
        {showAddEntry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl">
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
                <h3 className="font-bold text-[#0a2366] flex items-center gap-2">
                  <Plus size={18} className="text-[#164bd4]" />
                  Add Wellness Entry for{" "}
                  {selectedDate.toLocaleDateString("default", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
                <button
                  onClick={() => setShowAddEntry(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Meal / Food
                  </label>
                  <input
                    type="text"
                    value={newEntryForm.foods}
                    onChange={(e) =>
                      setNewEntryForm({
                        ...newEntryForm,
                        foods: e.target.value,
                      })
                    }
                    placeholder="e.g., Grilled Chicken Bowl"
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-[#164bd4] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mood
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {["happy", "calm", "focused", "tired", "stressed"].map(
                      (mood) => (
                        <button
                          key={mood}
                          onClick={() =>
                            setNewEntryForm({ ...newEntryForm, mood })
                          }
                          className={`p-2 rounded-xl text-center transition-all ${
                            newEntryForm.mood === mood
                              ? "bg-[#164bd4] text-white"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex justify-center">
                            {getMoodIcon(mood)}
                          </div>
                          <span className="text-xs capitalize mt-1 block">
                            {mood}
                          </span>
                        </button>
                      ),
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Droplet size={14} /> Water (glasses)
                    </label>
                    <input
                      type="number"
                      value={newEntryForm.waterIntake}
                      onChange={(e) =>
                        setNewEntryForm({
                          ...newEntryForm,
                          waterIntake: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-[#164bd4] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Moon size={14} /> Sleep (hours)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={newEntryForm.sleep}
                      onChange={(e) =>
                        setNewEntryForm({
                          ...newEntryForm,
                          sleep: parseFloat(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-[#164bd4] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Zap size={14} /> Protein (g)
                    </label>
                    <input
                      type="number"
                      value={newEntryForm.protein}
                      onChange={(e) =>
                        setNewEntryForm({
                          ...newEntryForm,
                          protein: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-[#164bd4] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Leaf size={14} /> Fiber (g)
                    </label>
                    <input
                      type="number"
                      value={newEntryForm.fiber}
                      onChange={(e) =>
                        setNewEntryForm({
                          ...newEntryForm,
                          fiber: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-[#164bd4] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Flame size={14} /> Sodium (mg)
                    </label>
                    <input
                      type="number"
                      value={newEntryForm.sodium}
                      onChange={(e) =>
                        setNewEntryForm({
                          ...newEntryForm,
                          sodium: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-[#164bd4] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Coffee size={14} /> Sugar (g)
                    </label>
                    <input
                      type="number"
                      value={newEntryForm.sugar}
                      onChange={(e) =>
                        setNewEntryForm({
                          ...newEntryForm,
                          sugar: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-[#164bd4] focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddEntry}
                  className="w-full py-3 bg-gradient-to-r from-[#164bd4] to-[#1e40af] text-white rounded-xl font-semibold mt-2 hover:shadow-lg transition-all"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Section - Left/Main */}
          <div className="lg:col-span-2">
            {/* Enhanced Navigation */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (viewMode === "month") {
                      setCurrentDate(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth() - 1,
                        ),
                      );
                    } else {
                      const newDate = new Date(selectedDate);
                      newDate.setDate(selectedDate.getDate() - 7);
                      setSelectedDate(newDate);
                    }
                  }}
                  className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm group"
                >
                  <ChevronLeft
                    size={18}
                    className="text-gray-600 group-hover:text-[#164bd4]"
                  />
                </button>
                <button
                  onClick={() => {
                    if (viewMode === "month") {
                      setCurrentDate(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth() + 1,
                        ),
                      );
                    } else {
                      const newDate = new Date(selectedDate);
                      newDate.setDate(selectedDate.getDate() + 7);
                      setSelectedDate(newDate);
                    }
                  }}
                  className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm group"
                >
                  <ChevronRight
                    size={18}
                    className="text-gray-600 group-hover:text-[#164bd4]"
                  />
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowYearPicker(!showYearPicker)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#0a2366] flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
                >
                  {viewMode === "month"
                    ? formatMonthYear(currentDate)
                    : `Week of ${selectedDate.toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" })}`}
                  <ChevronDown size={14} />
                </button>

                {showYearPicker && (
                  <div className="absolute top-full mt-2 right-0 bg-white rounded-xl border border-gray-200 shadow-xl z-20 p-4 w-64 animate-fadeIn">
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[2023, 2024, 2025, 2026].map((year) => (
                        <button
                          key={year}
                          onClick={() => setSelectedYear(year)}
                          className={`py-1.5 px-2 rounded-lg text-sm ${selectedYear === year ? "bg-[#164bd4] text-white" : "hover:bg-gray-100"}`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ].map((month, idx) => (
                        <button
                          key={month}
                          onClick={() => goToDate(selectedYear, idx)}
                          className={`py-1.5 px-1 rounded-lg text-xs ${selectedMonth === idx && currentDate.getMonth() === idx ? "bg-[#164bd4] text-white" : "hover:bg-gray-100"}`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() =>
                  setViewMode(viewMode === "month" ? "week" : "month")
                }
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-[#164bd4] flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
              >
                <CalendarIcon2 size={14} />
                {viewMode === "month" ? "Week View" : "Month View"}
              </button>
            </div>

            {/* Calendar Grid - Month View */}
            {viewMode === "month" && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xl">
                <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
                  {weekDaysNames.map((day, idx) => (
                    <div key={day} className="py-3 text-center">
                      <p className="text-sm font-semibold text-gray-500">
                        {day}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 auto-rows-[110px]">
                  {monthDays.map((date, index) => {
                    if (!date) {
                      return (
                        <div
                          key={`empty-${index}`}
                          className="bg-gray-50/30 border-b border-r border-gray-100"
                        />
                      );
                    }

                    const dateStr = date.toISOString().split("T")[0];
                    let entry = calendarEntries[dateStr];

                    // Apply filters
                    if (filterOptions.highOnly && entry?.level !== "high")
                      entry = null;
                    if (filterOptions.mediumOnly && entry?.level !== "medium")
                      entry = null;
                    if (filterOptions.lowOnly && entry?.level !== "low")
                      entry = null;
                    if (filterOptions.hasMood && !entry?.mood) entry = null;
                    if (
                      filterOptions.hasMeals &&
                      (!entry?.meals || entry.meals.length === 0)
                    )
                      entry = null;

                    const wellness = entry
                      ? getWellnessStyle(entry.level)
                      : null;
                    const isCurrent = isToday(date);
                    const isSelected = isSameDate(date, selectedDate);

                    return (
                      <div
                        key={dateStr}
                        onClick={() => handleDateClick(date)}
                        className={`border-b border-r border-gray-100 p-2 cursor-pointer transition-all duration-200 hover:bg-[#f8faff] relative group ${
                          isCurrent
                            ? "ring-2 ring-[#164bd4] ring-inset rounded-lg z-10"
                            : ""
                        } ${isSelected ? "bg-blue-50" : ""}`}
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex justify-between items-start mb-1">
                            <span
                              className={`text-sm font-semibold ${isCurrent ? "text-[#164bd4]" : "text-gray-700"}`}
                            >
                              {date.getDate()}
                            </span>
                            {entry && (
                              <div
                                className={`${wellness.badgeBg} rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity`}
                              >
                                {wellness.icon}
                              </div>
                            )}
                          </div>
                          {entry && (
                            <div className="mt-auto">
                              <div
                                className={`${wellness.bg} rounded-lg py-1.5 px-1 text-center transition-all group-hover:scale-105`}
                              >
                                <p className="text-xs font-bold">
                                  {entry.score}
                                </p>
                              </div>
                              {entry.foods && (
                                <p className="text-[9px] text-gray-500 truncate mt-1 group-hover:text-gray-700">
                                  {entry.foods.split(" ").slice(0, 2).join(" ")}
                                </p>
                              )}
                            </div>
                          )}
                          {!entry && (
                            <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                              <Plus
                                size={14}
                                className="text-gray-300 mx-auto"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Calendar Grid - Week View */}
            {viewMode === "week" && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xl">
                <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
                  {weekDaysNames.map((day, idx) => (
                    <div key={day} className="py-3 text-center">
                      <p className="text-sm font-semibold text-gray-500">
                        {day}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {weekDaysList.map((date, idx) => {
                    if (!date)
                      return (
                        <div
                          key={`empty-${idx}`}
                          className="bg-gray-50/30 border-r border-gray-100 min-h-[180px]"
                        />
                      );

                    const dateStr = date.toISOString().split("T")[0];
                    let entry = calendarEntries[dateStr];

                    // Apply filters
                    if (filterOptions.highOnly && entry?.level !== "high")
                      entry = null;
                    if (filterOptions.mediumOnly && entry?.level !== "medium")
                      entry = null;
                    if (filterOptions.lowOnly && entry?.level !== "low")
                      entry = null;
                    if (filterOptions.hasMood && !entry?.mood) entry = null;
                    if (
                      filterOptions.hasMeals &&
                      (!entry?.meals || entry.meals.length === 0)
                    )
                      entry = null;

                    const wellness = entry
                      ? getWellnessStyle(entry.level)
                      : null;
                    const isCurrent = isToday(date);
                    const isSelected = isSameDate(date, selectedDate);

                    return (
                      <div
                        key={dateStr}
                        onClick={() => handleDateClick(date)}
                        className={`border-r border-gray-100 p-3 cursor-pointer transition-all hover:bg-[#f8faff] min-h-[180px] ${
                          isCurrent ? "ring-2 ring-[#164bd4] ring-inset" : ""
                        } ${isSelected ? "bg-blue-50" : ""}`}
                      >
                        <div className="space-y-3">
                          <div className="text-center pb-2 border-b border-gray-100">
                            <span
                              className={`text-base font-bold ${isCurrent ? "text-[#164bd4]" : "text-gray-700"}`}
                            >
                              {date.getDate()}
                            </span>
                          </div>
                          {entry ? (
                            <>
                              <div
                                className={`${wellness.bg} rounded-xl p-2 text-center transition-all hover:scale-105`}
                              >
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  {wellness.icon}
                                  <span className="text-xs font-bold">
                                    {entry.score}
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-center gap-3 text-xs">
                                <div className="flex items-center gap-1">
                                  {getMoodIcon(entry.mood)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Droplet size={12} className="text-sky-500" />
                                  <span className="text-gray-600">
                                    {entry.waterIntake}
                                  </span>
                                </div>
                              </div>
                              <p className="text-[10px] text-gray-500 text-center truncate hover:text-gray-700">
                                {entry.foods.split(" ").slice(0, 2).join(" ")}
                              </p>
                              {entry.meals && (
                                <div className="flex justify-center gap-1">
                                  {entry.meals.slice(0, 2).map((meal, i) => (
                                    <span
                                      key={i}
                                      className="text-[8px] px-1 py-0.5 bg-gray-100 rounded"
                                    >
                                      {meal[0]}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-center text-gray-300 text-xs py-4">
                              No data
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Weekly Trend Chart with Interactive Tooltip */}
            {viewMode === "week" &&
              weeklySummary &&
              weeklySummary.totalDays > 0 && (
                <div className="mt-6 p-5 bg-white rounded-2xl border border-gray-100 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#0a2366] flex items-center gap-2">
                      <TrendingUp size={18} color="#164bd4" />
                      Weekly Score Trend
                    </h3>
                    <div className="text-xs text-gray-500">
                      {weeklySummary.highDays} High · {weeklySummary.mediumDays}{" "}
                      Medium · {weeklySummary.lowDays} Low
                    </div>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {weeklySummary.weekDays.map((day, idx) => {
                      const score = day.entry?.score || 0;
                      const height = (score / 100) * 100;
                      const color = getScoreColor(score);
                      return (
                        <div key={idx} className="flex-1 text-center group">
                          <div className="relative h-24 mb-2">
                            <div
                              className={`absolute bottom-0 w-full bg-gradient-to-t from-[#164bd4] to-[#1e40af] rounded-t-lg transition-all duration-300 group-hover:opacity-100`}
                              style={{
                                height: `${height}%`,
                                opacity: score > 0 ? 0.8 : 0.1,
                              }}
                            />
                            {score > 0 && (
                              <div
                                className={`absolute bottom-0 w-full text-center text-[10px] font-bold ${color} mb-1 opacity-0 group-hover:opacity-100 transition-opacity`}
                              >
                                {score}
                              </div>
                            )}
                          </div>
                          <p className="text-[10px] font-medium text-gray-500">
                            {weekDaysNames[day.date.getDay()]}
                          </p>
                          <p className="text-[9px] text-gray-400">
                            {day.date.getDate()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>

          {/* Right Column - Selected Date Details with Enhanced UX */}
          <div>
            {selectedEntry && selectedEntry.score ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden sticky top-6 animate-slideIn">
                <div
                  className={`p-5 ${
                    selectedEntry.level === "high"
                      ? "bg-gradient-to-br from-emerald-50 to-white"
                      : selectedEntry.level === "medium"
                        ? "bg-gradient-to-br from-amber-50 to-white"
                        : "bg-gradient-to-br from-rose-50 to-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500 font-medium">
                          Selected Date
                        </p>
                        {isToday(selectedEntry.date) && (
                          <span className="text-[10px] bg-[#164bd4] text-white px-2 py-0.5 rounded-full">
                            Today
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-base text-[#0a2366] mt-0.5">
                        {selectedEntry.date.toLocaleDateString("default", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowAddEntry(true)}
                      className="p-2 hover:bg-white/50 rounded-xl transition-colors"
                    >
                      <Edit size={16} className="text-gray-400" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      {selectedEntry.level === "high" ? (
                        <Award size={24} className="text-emerald-500" />
                      ) : selectedEntry.level === "medium" ? (
                        <Target size={24} className="text-amber-500" />
                      ) : (
                        <Heart size={24} className="text-rose-500" />
                      )}
                      <div>
                        <p className="text-xs text-gray-500">Wellness Score</p>
                        <span
                          className={`font-bold text-xl ${getScoreColor(selectedEntry.score)}`}
                        >
                          {selectedEntry.score}/100
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 ${getWellnessStyle(selectedEntry.level).dot} rounded-full`}
                      />
                      <span
                        className={`text-xs font-semibold ${getWellnessStyle(selectedEntry.level).text}`}
                      >
                        {getWellnessStyle(selectedEntry.level).label}
                      </span>
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-2.5 mb-5">
                    <div className="p-2.5 bg-gray-50 rounded-xl group hover:bg-gray-100 transition-all cursor-pointer">
                      <Utensils
                        size={14}
                        className="text-gray-400 mb-1 group-hover:text-[#164bd4]"
                      />
                      <p className="text-[10px] text-gray-500 font-medium">
                        Main Meal
                      </p>
                      <p className="text-xs font-semibold text-gray-800 truncate">
                        {selectedEntry.foods}
                      </p>
                    </div>
                    <div className="p-2.5 bg-gray-50 rounded-xl group hover:bg-gray-100 transition-all cursor-pointer">
                      <div className="mb-1">
                        {getMoodIcon(selectedEntry.mood)}
                      </div>
                      <p className="text-[10px] text-gray-500 font-medium">
                        Mood
                      </p>
                      <p className="text-xs font-semibold text-gray-800 capitalize">
                        {selectedEntry.mood}
                      </p>
                    </div>
                    <div className="p-2.5 bg-gray-50 rounded-xl group hover:bg-gray-100 transition-all cursor-pointer">
                      <Droplet size={14} className="text-sky-500 mb-1" />
                      <p className="text-[10px] text-gray-500 font-medium">
                        Water
                      </p>
                      <p className="text-xs font-semibold text-gray-800">
                        {selectedEntry.waterIntake || 0} glasses
                      </p>
                    </div>
                    <div className="p-2.5 bg-gray-50 rounded-xl group hover:bg-gray-100 transition-all cursor-pointer">
                      <Moon size={14} className="text-indigo-500 mb-1" />
                      <p className="text-[10px] text-gray-500 font-medium">
                        Sleep
                      </p>
                      <p className="text-xs font-semibold text-gray-800">
                        {selectedEntry.sleep || 0} hrs
                      </p>
                    </div>
                  </div>

                  {/* Nutrition Breakdown with Progress Bars */}
                  <div className="mb-5 p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs font-bold text-gray-600 mb-3 flex items-center gap-1.5">
                      <Scale size={12} />
                      Nutrition Breakdown
                    </p>
                    <div className="space-y-2.5">
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center gap-1.5 text-gray-600">
                            <Zap size={12} className="text-amber-500" />
                            Protein
                          </span>
                          <span className="font-semibold text-gray-800">
                            {selectedEntry.protein || 0}g
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{
                              width: `${Math.min(100, ((selectedEntry.protein || 0) / 65) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center gap-1.5 text-gray-600">
                            <Flame size={12} className="text-rose-500" />
                            Sodium
                          </span>
                          <span
                            className={`font-semibold ${selectedEntry.sodium > 2000 ? "text-rose-500" : "text-gray-800"}`}
                          >
                            {selectedEntry.sodium || 0}mg
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-rose-500 rounded-full"
                            style={{
                              width: `${Math.min(100, ((selectedEntry.sodium || 0) / 2500) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center gap-1.5 text-gray-600">
                            <Coffee size={12} className="text-amber-600" />
                            Sugar
                          </span>
                          <span
                            className={`font-semibold ${selectedEntry.sugar > 50 ? "text-rose-500" : "text-gray-800"}`}
                          >
                            {selectedEntry.sugar || 0}g
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-600 rounded-full"
                            style={{
                              width: `${Math.min(100, ((selectedEntry.sugar || 0) / 80) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center gap-1.5 text-gray-600">
                            <Leaf size={12} className="text-emerald-500" />
                            Fiber
                          </span>
                          <span className="font-semibold text-gray-800">
                            {selectedEntry.fiber || 0}g
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{
                              width: `${Math.min(100, ((selectedEntry.fiber || 0) / 30) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Insight with Refresh */}
                  <div className="p-3 bg-gradient-to-r from-[#164bd408] to-[#164bd402] rounded-xl border border-[#164bd420] group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-[#164bd4] rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain size={12} color="white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#164bd4] mb-0.5">
                            AI Wellness Insight
                          </p>
                          <p className="text-[11px] text-gray-700 leading-relaxed">
                            {selectedEntry.score >= 70
                              ? "Excellent day! Your nutrition choices are supporting your wellness goals. Keep up the balanced meals and hydration!"
                              : selectedEntry.score >= 50
                                ? "Good progress today. Focus on increasing water intake and adding more vegetables to boost your score."
                                : "Today was challenging. Try incorporating more protein-rich foods and reducing processed items for better energy."}
                          </p>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/50 rounded">
                        <RefreshCw size={12} className="text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        navigator.share?.({
                          title: "My Wellness Score",
                          text: `Wellness score: ${selectedEntry.score}/100. Mood: ${selectedEntry.mood}`,
                        });
                      }}
                      className="flex-1 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <Share2 size={12} />
                      Share
                    </button>
                    <button
                      onClick={handleDeleteEntry}
                      className="flex-1 py-2 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : selectedEntry ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 text-center sticky top-6">
                <CalendarIcon
                  size={48}
                  className="mx-auto mb-3 text-gray-300"
                />
                <p className="text-gray-500 font-medium">No Data Available</p>
                <p className="text-xs text-gray-400 mt-1">
                  {selectedEntry?.message}
                </p>
                <button
                  onClick={() => setShowAddEntry(true)}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-[#164bd4] to-[#1e40af] text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Scan Food Today
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 text-center sticky top-6">
                <CalendarIcon
                  size={48}
                  className="mx-auto mb-3 text-gray-300"
                />
                <p className="text-gray-500 font-medium">Select a Date</p>
                <p className="text-xs text-gray-400 mt-1">
                  Click on any day in the calendar to view details
                </p>
              </div>
            )}

            {/* Weekly Summary Cards */}
            {weeklySummary && weeklySummary.totalDays > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-br from-[#164bd408] to-[#0a236608] rounded-xl border border-[#164bd420]">
                <h4 className="font-bold text-sm text-[#0a2366] mb-3 flex items-center gap-2">
                  <Activity size={14} className="text-[#164bd4]" />
                  Weekly Averages
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-white/50 rounded-lg">
                    <p className="text-[10px] text-gray-500">Avg Score</p>
                    <p
                      className={`font-bold text-lg ${getScoreColor(weeklySummary.avgScore)}`}
                    >
                      {weeklySummary.avgScore}/100
                    </p>
                  </div>
                  <div className="text-center p-2 bg-white/50 rounded-lg">
                    <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                      <Droplet size={10} /> Water
                    </p>
                    <p className="font-semibold text-sm text-gray-800">
                      {weeklySummary.avgWater} glasses
                    </p>
                  </div>
                  <div className="text-center p-2 bg-white/50 rounded-lg">
                    <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                      <Zap size={10} /> Protein
                    </p>
                    <p className="font-semibold text-sm text-gray-800">
                      {weeklySummary.avgProtein}g
                    </p>
                  </div>
                  <div className="text-center p-2 bg-white/50 rounded-lg">
                    <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                      <Moon size={10} /> Sleep
                    </p>
                    <p className="font-semibold text-sm text-gray-800">
                      {weeklySummary.avgSleep}h
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Health Tips Footer with Interactive Cards */}
        <div className="mt-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center group hover:shadow-md transition-all cursor-pointer">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Droplet size={16} className="text-sky-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">
                8 glasses of water
              </p>
              <p className="text-[10px] text-gray-400">Daily goal</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center group hover:shadow-md transition-all cursor-pointer">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Zap size={16} className="text-amber-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">50g+ protein</p>
              <p className="text-[10px] text-gray-400">Per day</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center group hover:shadow-md transition-all cursor-pointer">
              <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Flame size={16} className="text-rose-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">
                Sodium &lt;2000mg
              </p>
              <p className="text-[10px] text-gray-400">Heart health</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center group hover:shadow-md transition-all cursor-pointer">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Moon size={16} className="text-indigo-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">
                7-8 hours sleep
              </p>
              <p className="text-[10px] text-gray-400">Recovery</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center group hover:shadow-md transition-all cursor-pointer">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Leaf size={16} className="text-emerald-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">25g+ fiber</p>
              <p className="text-[10px] text-gray-400">Digestion</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
