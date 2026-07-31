import React from "react";

export function DashboardTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      <table className="w-full">{children}</table>
    </div>
  );
}

export function DashboardTableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-gray-50">
      <tr>{children}</tr>
    </thead>
  );
}

export function DashboardTableHeaderCell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 ${className}`}
    >
      {children}
    </th>
  );
}

export function DashboardTableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-gray-100">{children}</tbody>;
}

export function DashboardTableRow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr className={`hover:bg-gray-50 transition-colors ${className}`}>
      {children}
    </tr>
  );
}

export function DashboardTableCell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 text-[14px] text-gray-900 ${className}`}>
      {children}
    </td>
  );
}
