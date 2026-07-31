import React from "react";

export default function DashboardInput({
  label,
  error,
  icon: Icon,
  className = "",
  children,
  ...props
}: {
  label?: string;
  error?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  children?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        )}
        {children ? (
          children
        ) : (
          <input
            className={`w-full px-3 py-2.5 rounded-lg border text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#990202]/20 focus:border-[#990202] ${
              error
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white"
            } ${Icon ? "pl-10" : ""}`}
            {...props}
          />
        )}
      </div>
      {error && <p className="text-[12px] text-red-600 mt-1">{error}</p>}
    </div>
  );
}
