import React from "react";

type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
  error: "bg-red-50 text-red-700",
  info: "bg-blue-50 text-blue-700",
  neutral: "bg-gray-100 text-gray-600",
};

export default function DashboardBadge({
  variant = "neutral",
  children,
}: {
  variant?: BadgeVariant;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
