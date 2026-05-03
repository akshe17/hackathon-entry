import { FieldError } from "./FieldError";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
export function PasswordInput({ label, placeholder, value, onChange, error }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-semibold text-gray-900">{label}</label>
      )}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Lock size={15} />
        </span>
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg bg-[#f3f4f6] pl-10 pr-11 py-3 text-sm text-gray-900 placeholder-gray-400 tracking-widest outline-none transition border-none focus:ring-2 focus:ring-[#1d4ed8]
            ${error ? "ring-2 ring-red-300 focus:ring-red-400" : ""}`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      <FieldError message={error} />
    </div>
  );
}
