import React from "react";

export default function DashboardEmpty({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Icon className="w-12 h-12 text-gray-300 mb-4" />
      <h3 className="text-[16px] font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-[14px] text-gray-500 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
