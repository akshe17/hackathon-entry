import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Lock,
  ChevronRight,
  TrendingUp,
  Heart,
  Battery,
  Brain,
  Coffee,
  Moon,
  Smile,
  Frown,
  Meh,
  Zap,
  Activity,
  Calendar,
  AlertCircle,
  CheckCircle,
  Sparkles,
  PenTool,
  Shield,
  Key,
  Plus,
  Eye,
  EyeOff,
} from "lucide-react";

const NAVY = "#0a2366";
const BLUE = "#164bd4";
const LIGHT = "#f8faff";

// Mood options
const moodOptions = [
  {
    emoji: "😊",
    label: "Happy",
    value: "happy",
    icon: Smile,
    color: "#10b981",
  },
  { emoji: "😔", label: "Sad", value: "sad", icon: Frown, color: "#6b7280" },
  {
    emoji: "😫",
    label: "Stressed",
    value: "stressed",
    icon: Zap,
    color: "#f59e0b",
  },
  { emoji: "😴", label: "Tired", value: "tired", icon: Moon, color: "#8b5cf6" },
  {
    emoji: "😰",
    label: "Anxious",
    value: "anxious",
    icon: AlertCircle,
    color: "#ef4444",
  },
  { emoji: "😌", label: "Calm", value: "calm", icon: Heart, color: "#06b6d4" },
  {
    emoji: "🎯",
    label: "Focused",
    value: "focused",
    icon: Brain,
    color: "#6366f1",
  },
  {
    emoji: "😤",
    label: "Angry",
    value: "angry",
    icon: AlertCircle,
    color: "#dc2626",
  },
];

// Sample diary entries for demo
const sampleEntries = [
  {
    id: 1,
    date: "2024-01-15",
    mood: "tired",
    energy: 3,
    stress: 4,
    content:
      "Skipped breakfast today, had coffee and instant noodles for lunch. Felt exhausted by afternoon.",
    aiResponse:
      "It sounds like today was tiring. Your food log shows low protein and high caffeine, which may have affected your energy. Tomorrow, try eating breakfast, drinking more water, and adding protein like egg, tuna, tofu, or chicken.",
    wellnessScore: 45,
  },
  {
    id: 2,
    date: "2024-01-16",
    mood: "happy",
    energy: 8,
    stress: 2,
    content:
      "Had a balanced breakfast with eggs and rice. Drank 2L of water throughout the day. Felt energized!",
    aiResponse:
      "Great job today! Your balanced meals and proper hydration contributed to high energy levels. The protein from eggs helped sustain your energy. Keep up this momentum!",
    wellnessScore: 85,
  },
];

export default function AIDiary() {
  const [selectedMood, setSelectedMood] = useState("");
  const [energyLevel, setEnergyLevel] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  const [journalEntry, setJournalEntry] = useState("");
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [entries, setEntries] = useState(sampleEntries);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedPin, setSavedPin] = useState(null);
  const [showPatterns, setShowPatterns] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [pinError, setPinError] = useState("");

  // Check for existing PIN on mount
  useEffect(() => {
    const existingPin = localStorage.getItem("kainwise_diary_pin");
    if (existingPin) {
      setSavedPin(existingPin);
      setIsLocked(true);
      setShowPinModal(true);
    } else {
      setIsLocked(false);
      setShowSetupModal(true);
    }
  }, []);

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("kainwise_diary_entries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem("kainwise_diary_entries", JSON.stringify(entries));
  }, [entries]);

  const handleCreatePin = () => {
    setPinError("");

    if (pin.length !== 4) {
      setPinError("PIN must be 4 digits");
      return;
    }

    if (pin !== confirmPin) {
      setPinError("PINs do not match");
      return;
    }

    localStorage.setItem("kainwise_diary_pin", pin);
    setSavedPin(pin);
    setShowSetupModal(false);
    setIsLocked(false);
    setPin("");
    setConfirmPin("");
  };

  const handleVerifyPin = () => {
    setPinError("");

    if (pin === savedPin) {
      setIsLocked(false);
      setShowPinModal(false);
      setPin("");
    } else {
      setPinError("Incorrect PIN. Please try again.");
    }
  };

  const handleSaveEntry = async () => {
    if (!journalEntry.trim() && !selectedMood) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const analysis = generateAIAnalysis(
        journalEntry,
        selectedMood,
        energyLevel,
        stressLevel,
      );
      setAiAnalysis(analysis);

      const newEntry = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        mood: selectedMood,
        energy: energyLevel,
        stress: stressLevel,
        content: journalEntry,
        aiResponse: analysis.response,
        wellnessScore: analysis.score,
      };

      setEntries([newEntry, ...entries]);
      setJournalEntry("");
      setSelectedMood("");
      setEnergyLevel(5);
      setStressLevel(5);
      setIsAnalyzing(false);
      setAiAnalysis(analysis);
    }, 1500);
  };

  const generateAIAnalysis = (content, mood, energy, stress) => {
    // Simple AI simulation - in production, this would call an AI API
    const hasBreakfast = content.toLowerCase().includes("breakfast");
    const hasProtein = /egg|chicken|fish|tofu|meat|beans|protein/.test(
      content.toLowerCase(),
    );
    const hasWater = /water|hydrated/.test(content.toLowerCase());
    const hasCaffeine = /coffee|energy drink|soda/.test(content.toLowerCase());
    const hasSugary = /sugar|sweet|candy|cake|cookie/.test(
      content.toLowerCase(),
    );

    let score = 60;
    let response = "";

    if (hasBreakfast) score += 10;
    if (hasProtein) score += 15;
    if (hasWater) score += 10;
    if (hasCaffeine) score -= 10;
    if (hasSugary) score -= 10;
    if (energy >= 7) score += 10;
    if (stress <= 3) score += 10;

    score = Math.min(100, Math.max(0, score));

    if (score >= 75) {
      response =
        "🌟 Great job today! Your food choices and habits are supporting your wellness well. ";
      if (!hasProtein)
        response +=
          "Consider adding more protein to maintain this energy level. ";
      if (!hasWater)
        response += "Keep up with your water intake to stay hydrated. ";
      response += "You're on the right track!";
    } else if (score >= 50) {
      response = "📝 You're doing okay, but there's room for improvement. ";
      if (!hasBreakfast)
        response +=
          "Try not skipping breakfast - it fuels your morning energy. ";
      if (!hasProtein)
        response +=
          "Adding protein like eggs, chicken, or beans can help with sustained energy. ";
      if (hasCaffeine)
        response +=
          "Consider reducing caffeine intake, especially later in the day. ";
      response += "Small changes can make a big difference!";
    } else {
      response = "💙 Today seems tough. ";
      if (!hasBreakfast)
        response += "Starting your day with breakfast can help boost energy. ";
      if (!hasProtein)
        response +=
          "Your meals seem low in protein - try adding eggs, fish, or tofu. ";
      if (hasSugary)
        response += "High sugar intake may be affecting your energy levels. ";
      response +=
        "Remember to drink water, rest when needed, and be kind to yourself. Tomorrow is a new day!";
    }

    return { response, score };
  };

  const getMoodIcon = (moodValue) => {
    const mood = moodOptions.find((m) => m.value === moodValue);
    if (mood) {
      const Icon = mood.icon;
      return <Icon size={20} color={mood.color} />;
    }
    return <Meh size={20} />;
  };

  const getWellnessBadge = (score) => {
    if (score >= 70)
      return {
        label: "High Support",
        color: "bg-green-100 text-green-700 border-green-200",
        icon: "🌟",
      };
    if (score >= 50)
      return {
        label: "Medium Support",
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: "📝",
      };
    return {
      label: "Low Support",
      color: "bg-red-100 text-red-700 border-red-200",
      icon: "💙",
    };
  };

  // PIN Setup Modal - Side by Side Layout
  if (showSetupModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-white flex items-center justify-center p-6">
        <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2">
            {/* Left Side - SVG Illustration */}
            <div className="bg-gradient-to-br from-[#164bd4] to-[#1e40af] p-8 flex flex-col items-center justify-center text-center">
              <img
                src="/public/images/diary.svg"
                alt="Wellness Diary"
                className="w-64 h-64 object-contain mb-6"
                onError={(e) => {
                  e.target.style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.className =
                    "w-64 h-64 bg-white/20 rounded-2xl flex items-center justify-center";
                  fallback.innerHTML =
                    '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M4 4h16v16H4z M8 8h8M8 12h6M8 16h4"/></svg>';
                  e.target.parentNode.appendChild(fallback);
                }}
              />
              <h2 className="text-2xl font-bold text-white mb-2">
                Your Private Space
              </h2>
              <p className="text-blue-100 text-sm">
                Keep your wellness journey secure and personal
              </p>
            </div>

            {/* Right Side - PIN Setup Form */}
            <div className="p-8 md:p-10">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0a2366] mb-2">
                  Create Your PIN
                </h1>
                <p className="text-gray-500 text-sm">
                  Set a 4-digit PIN to keep your diary private and secure
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter PIN
                  </label>
                  <div className="relative">
                    <input
                      type={showPin ? "text" : "password"}
                      maxLength="4"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      value={pin}
                      onChange={(e) =>
                        setPin(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="w-full text-center text-2xl py-3 border-2 border-gray-200 rounded-xl focus:border-[#164bd4] focus:outline-none transition-all"
                      placeholder="****"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm PIN
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPin ? "text" : "password"}
                      maxLength="4"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      value={confirmPin}
                      onChange={(e) =>
                        setConfirmPin(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="w-full text-center text-2xl py-3 border-2 border-gray-200 rounded-xl focus:border-[#164bd4] focus:outline-none transition-all"
                      placeholder="****"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPin(!showConfirmPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPin ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {pinError && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} />
                    {pinError}
                  </p>
                )}

                <button
                  onClick={handleCreatePin}
                  className="w-full py-3 bg-gradient-to-r from-[#164bd4] to-[#1e40af] text-white rounded-xl font-semibold mt-2 hover:shadow-lg transition-all"
                >
                  Create PIN & Start Journaling
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PIN Verification Modal - Side by Side Layout
  if (showPinModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-white flex items-center justify-center p-6">
        <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2">
            {/* Left Side - SVG Illustration */}
            <div className="bg-gradient-to-br from-[#164bd4] to-[#1e40af] p-8 flex flex-col items-center justify-center text-center">
              <img
                src="/public/images/diary.svg"
                alt="Wellness Diary Locked"
                className="w-64 h-64 object-contain mb-6"
                onError={(e) => {
                  e.target.style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.className =
                    "w-64 h-64 bg-white/20 rounded-2xl flex items-center justify-center";
                  fallback.innerHTML =
                    '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><rect x="5" y="11" width="14" height="11" rx="2"/><path d="M7 11V8a5 5 0 0 1 10 0v3"/></svg>';
                  e.target.parentNode.appendChild(fallback);
                }}
              />
              <h2 className="text-2xl font-bold text-white mb-2">
                Locked & Secure
              </h2>
              <p className="text-blue-100 text-sm">
                Enter your PIN to access your private entries
              </p>
            </div>

            {/* Right Side - PIN Verification Form */}
            <div className="p-8 md:p-10">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0a2366] mb-2">
                  Unlock Your Diary
                </h1>
                <p className="text-gray-500 text-sm">
                  Enter your 4-digit PIN to continue
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter PIN
                  </label>
                  <div className="relative">
                    <input
                      type={showPin ? "text" : "password"}
                      maxLength="4"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      value={pin}
                      onChange={(e) =>
                        setPin(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="w-full text-center text-2xl py-3 border-2 border-gray-200 rounded-xl focus:border-[#164bd4] focus:outline-none transition-all"
                      placeholder="****"
                      autoFocus
                      onKeyPress={(e) => e.key === "Enter" && handleVerifyPin()}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {pinError && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} />
                    {pinError}
                  </p>
                )}

                <button
                  onClick={handleVerifyPin}
                  className="w-full py-3 bg-gradient-to-r from-[#164bd4] to-[#1e40af] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Unlock Diary
                </button>

                <button
                  onClick={() => {
                    setShowPinModal(false);
                    setShowSetupModal(true);
                    setPin("");
                  }}
                  className="w-full py-2 text-[#164bd4] text-sm font-medium hover:underline text-center"
                >
                  Forgot PIN? Create new one
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Diary UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-white">
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#164bd4] opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0a2366] opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto p-6">
        {/* Header with SVG Integration */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#164bd4] to-[#1e40af] rounded-xl flex items-center justify-center">
              <BookOpen size={24} color="white" />
            </div>
            <div>
              <h1 className="text-[28px] font-extrabold text-[#0a2366]">
                AI Wellness Diary
              </h1>
              <p className="text-gray-500 text-sm">
                Track your mood, energy, and food connections
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowPatterns(!showPatterns)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-[#164bd4] flex items-center gap-2 hover:bg-[#f8faff] hover:border-[#164bd4] transition-all shadow-sm"
            >
              <TrendingUp size={16} />
              View Patterns
            </button>
            <button
              onClick={() => {
                setIsLocked(true);
                setShowPinModal(true);
              }}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-[#f8faff] transition-all shadow-sm"
            >
              <Lock size={16} />
              Lock
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className="mb-6 p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-2 shadow-sm">
          <Shield size={16} color="#164bd4" />
          <p className="text-xs text-[#164bd4]">
            Your entries are private and stored only on your device
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - New Entry Form */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-[#0a2366] mb-4 flex items-center gap-2">
                <PenTool size={18} color="#164bd4" />
                How are you feeling today?
              </h2>

              {/* Mood Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mood
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {moodOptions.map((mood) => {
                    const Icon = mood.icon;
                    return (
                      <button
                        key={mood.value}
                        onClick={() => setSelectedMood(mood.value)}
                        className={`p-3 rounded-xl text-center transition-all ${
                          selectedMood === mood.value
                            ? "bg-gradient-to-br from-[#164bd4] to-[#1e40af] text-white shadow-lg scale-105"
                            : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
                        }`}
                      >
                        <span className="text-2xl mb-1 block">
                          {mood.emoji}
                        </span>
                        <span
                          className={`text-xs font-medium ${selectedMood === mood.value ? "text-white" : "text-gray-600"}`}
                        >
                          {mood.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Energy Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Battery size={16} className="text-[#164bd4]" />
                  Energy Level
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">Low</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                    className="flex-1 h-2 rounded-full appearance-none bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#164bd4] [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-xs text-gray-400">High</span>
                  <span className="w-10 text-center font-bold text-[#164bd4]">
                    {energyLevel}/10
                  </span>
                </div>
              </div>

              {/* Stress Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Activity size={16} className="text-[#f59e0b]" />
                  Stress Level
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">Low</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stressLevel}
                    onChange={(e) => setStressLevel(parseInt(e.target.value))}
                    className="flex-1 h-2 rounded-full appearance-none bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#f59e0b] [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-xs text-gray-400">High</span>
                  <span className="w-10 text-center font-bold text-[#f59e0b]">
                    {stressLevel}/10
                  </span>
                </div>
              </div>

              {/* Journal Entry */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Journal Entry
                </label>
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="What did you eat today? How do you feel? What's on your mind?..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-[#164bd4] focus:outline-none transition-all min-h-[120px]"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveEntry}
                disabled={
                  isAnalyzing || (!journalEntry.trim() && !selectedMood)
                }
                className="w-full py-3 bg-gradient-to-r from-[#164bd4] to-[#1e40af] text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    AI is analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Save & Get AI Insights
                  </>
                )}
              </button>
            </div>

            {/* AI Analysis Result */}
            {aiAnalysis && !isAnalyzing && (
              <div className="mt-6 p-5 bg-gradient-to-r from-[#164bd408] to-[#164bd402] rounded-xl border border-[#164bd420] animate-fadeIn">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#164bd4] rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain size={20} color="white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-bold text-[#0a2366]">
                        AI Wellness Insight
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getWellnessBadge(aiAnalysis.score).color}`}
                      >
                        {getWellnessBadge(aiAnalysis.score).icon}{" "}
                        {getWellnessBadge(aiAnalysis.score).label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {aiAnalysis.response}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - SVG Illustration & Entries */}
          <div>
            {/* SVG Illustration Banner */}
            <div className="mb-6 bg-gradient-to-r from-[#164bd408] to-[#0a236608] rounded-2xl p-4 border border-[#164bd420] flex items-center gap-4">
              <img
                src="/public/images/diary.svg"
                alt="Wellness Journey"
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div>
                <p className="text-sm font-semibold text-[#0a2366]">
                  Your Wellness Journey
                </p>
                <p className="text-xs text-gray-500">
                  Track patterns between food, mood, and energy
                </p>
              </div>
            </div>

            {/* Pattern Insights */}
            {showPatterns && (
              <div className="mb-6 p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 animate-slideDown">
                <h3 className="font-bold text-[#0a2366] flex items-center gap-2 mb-3">
                  <TrendingUp size={18} color="#8b5cf6" />
                  Weekly Pattern Insights
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle
                      size={14}
                      className="text-green-500 flex-shrink-0"
                    />
                    <span>
                      Your energy is highest on days you eat breakfast (+25% on
                      average)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle
                      size={14}
                      className="text-green-500 flex-shrink-0"
                    />
                    <span>
                      Stress tends to be lower when you drink 2L+ of water
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle
                      size={14}
                      className="text-yellow-500 flex-shrink-0"
                    />
                    <span>
                      Low protein days correlate with afternoon fatigue
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle
                      size={14}
                      className="text-yellow-500 flex-shrink-0"
                    />
                    <span>High caffeine intake affects your sleep quality</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Past Entries */}
            <div>
              <h3 className="font-bold text-[#0a2366] mb-4 flex items-center gap-2">
                <Calendar size={18} color="#164bd4" />
                Recent Entries
                <span className="text-xs text-gray-400 font-normal ml-2">
                  ({entries.length} entries)
                </span>
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {entries.map((entry) => {
                  const wellness = getWellnessBadge(entry.wellnessScore);
                  return (
                    <div
                      key={entry.id}
                      className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all cursor-pointer group hover:border-[#164bd4]"
                      onClick={() => setSelectedEntry(entry)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {getMoodIcon(entry.mood)}
                          <span className="font-medium text-[#0a2366]">
                            {entry.date}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${wellness.color}`}
                        >
                          {wellness.icon} {wellness.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {entry.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Battery size={12} /> Energy: {entry.energy}/10
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity size={12} /> Stress: {entry.stress}/10
                        </span>
                      </div>
                    </div>
                  );
                })}

                {entries.length === 0 && (
                  <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-100">
                    <BookOpen size={48} className="mx-auto mb-3 opacity-50" />
                    <p>No entries yet. Start your wellness journey today!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {getMoodIcon(selectedEntry.mood)}
                <h3 className="font-bold text-[#0a2366]">
                  {selectedEntry.date}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 p-3 bg-gray-50 rounded-xl text-center">
                  <Battery size={16} className="mx-auto mb-1 text-gray-400" />
                  <p className="text-xs text-gray-500">Energy</p>
                  <p className="text-xl font-bold text-[#164bd4]">
                    {selectedEntry.energy}/10
                  </p>
                </div>
                <div className="flex-1 p-3 bg-gray-50 rounded-xl text-center">
                  <Activity size={16} className="mx-auto mb-1 text-gray-400" />
                  <p className="text-xs text-gray-500">Stress</p>
                  <p className="text-xl font-bold text-[#f59e0b]">
                    {selectedEntry.stress}/10
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Journal Entry
                </p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                  {selectedEntry.content}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Brain size={14} /> AI Insight
                </p>
                <p className="text-sm text-gray-700 bg-[#164bd408] p-3 rounded-xl border border-[#164bd420]">
                  {selectedEntry.aiResponse}
                </p>
              </div>

              <button
                onClick={() => setSelectedEntry(null)}
                className="w-full py-2 bg-gray-100 rounded-xl font-medium text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
