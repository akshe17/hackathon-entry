import React from "react";
import {
  ScanBarcode,
  BookOpen,
  Calendar,
  Activity,
  Droplets,
  Heart,
} from "lucide-react";

export default function Dashboard() {
  // Mock data based on KainWise concept
  const wellnessScore = 72;

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a2366] text-white hidden md:flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10">KainWise.</h2>
        <nav className="flex flex-col gap-4 flex-1">
          <a
            href="#"
            className="flex items-center gap-3 bg-blue-700/50 p-3 rounded-lg"
          >
            <Activity size={20} /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-3 hover:bg-blue-800 rounded-lg"
          >
            <ScanBarcode size={20} /> Scan & Swap
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-3 hover:bg-blue-800 rounded-lg"
          >
            <BookOpen size={20} /> AI Diary
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-3 hover:bg-blue-800 rounded-lg"
          >
            <Calendar size={20} /> Health Calendar
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Hello, Wellness Seeker!
            </h1>
            <p className="text-gray-500">Here’s how your health looks today.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">
              General Wellness Mode
            </span>
          </div>
        </header>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Wellness Score Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50 relative overflow-hidden">
            <h3 className="text-gray-500 text-sm font-medium mb-4">
              Daily Wellness Score
            </h3>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold text-[#1d4ed8]">
                {wellnessScore}
              </span>
              <span className="text-gray-400 mb-1">/100</span>
            </div>
            <p className="mt-4 text-sm font-semibold text-blue-600">
              High Wellness Support[cite: 1]
            </p>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity size={80} className="text-[#1d4ed8]" />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="text-blue-400" />
              <h3 className="text-gray-700 font-medium">Hydration</h3>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full">
              <div className="bg-blue-500 h-2 rounded-full w-[65%]"></div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Medium Support[cite: 1]
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-red-400" />
              <h3 className="text-gray-700 font-medium">Heart Health</h3>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full">
              <div className="bg-red-400 h-2 rounded-full w-[40%]"></div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Low Support - High Sodium today[cite: 1]
            </p>
          </div>
        </div>

        {/* AI Insight Section */}
        <div className="bg-[#eef2ff] border border-blue-100 p-6 rounded-2xl mb-8">
          <h3 className="font-bold text-[#0a2366] mb-2 flex items-center gap-2">
            ✨ Weekly AI Insight[cite: 1]
          </h3>
          <p className="text-sm text-[#374151] leading-relaxed">
            "Your energy levels were highest on days you logged a high-protein
            breakfast. Consider swapping your morning crackers for eggs or
            yogurt tomorrow."[cite: 1]
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <button className="flex-1 bg-[#1d4ed8] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors">
            <ScanBarcode /> Scan New Product[cite: 1]
          </button>
          <button className="flex-1 bg-white border-2 border-[#1d4ed8] text-[#1d4ed8] p-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-50 transition-colors">
            <BookOpen /> Write in Diary[cite: 1]
          </button>
        </div>
      </main>
    </div>
  );
}
