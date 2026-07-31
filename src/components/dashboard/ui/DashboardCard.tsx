import React from "react";

export default function DashboardCard({
  children,
  className = "",
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-card ${
        hover ? "hover:shadow-card-hover transition-shadow" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
