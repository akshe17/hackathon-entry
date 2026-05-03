import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-[#0a2366] text-white p-12 relative overflow-hidden">
        {/* Abstract background gradient to mimic the wavy texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2366] via-[#0d2f8a] to-[#05143b] opacity-80"></div>

        <div className="relative z-10">
          <span className="text-xl font-medium tracking-tight">KainWise</span>
        </div>

        <div className="relative z-10 mb-12">
          <h1 className="text-[3.5rem] leading-[1.1] font-semibold tracking-tight">
            Scan wise. <br /> Eat well. <br /> Feel better.
          </h1>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-[#0a2366] lg:bg-transparent">
        <div className="w-full max-w-[480px] bg-white rounded-2xl  p-10 lg:p-14">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#0a1930] mb-2 leading-tight">
              Welcome back to KainWise!
            </h2>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Email
              </label>
              <input
                type="email"
                placeholder="harper@ningle.com"
                className="w-full px-4 py-3 bg-[#f3f4f6] text-gray-900 text-sm rounded-lg border-none focus:ring-2 focus:ring-[#1d4ed8] outline-none placeholder:text-gray-500"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2 relative">
              <label className="block text-sm font-semibold text-gray-900">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••••"
                  className="w-full px-4 py-3 bg-[#f3f4f6] text-gray-900 text-sm rounded-lg border-none focus:ring-2 focus:ring-[#1d4ed8] outline-none placeholder:text-gray-400 tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#1d4ed8] focus:ring-[#1d4ed8]"
                />
                <span className="text-sm text-gray-700">
                  Remember for 30 days
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-[#1d4ed8] hover:underline font-medium decoration-[#1d4ed8] underline-offset-4"
              >
                Forgot password?
              </a>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-4">
              <button
                type="submit"
                className="w-full bg-[#164bd4] hover:bg-[#123eb0] text-white font-medium py-3 rounded-lg transition-colors"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#0a1930] font-bold hover:underline underline-offset-4"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
