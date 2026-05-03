import React from "react";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-12 rounded-3xl shadow-sm max-w-md w-full border border-blue-50">
        <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <Search size={48} className="text-[#1d4ed8]" />
        </div>

        <h1 className="text-6xl font-bold text-[#0a2366] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! Page not found.
        </h2>
        <p className="text-gray-500 mb-8">
          It looks like this wellness path doesn't exist. Let's get you back to
          your health goals.
        </p>

        <a
          href="/dashboard"
          className="flex items-center justify-center gap-2 w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium py-3 rounded-xl transition-all"
        >
          <Home size={18} />
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
