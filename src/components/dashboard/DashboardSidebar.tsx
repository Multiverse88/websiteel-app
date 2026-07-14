"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LogOut, Mail, User, Link2, Layers, BarChart3 } from "lucide-react";
import { logoutAction } from "@/app/dashboard/actions";

interface DashboardSidebarProps {
  subscriberCount: number;
  linksCount: number;
}

export default function DashboardSidebar({ subscriberCount, linksCount }: DashboardSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Ringkasan",
      href: "/dashboard",
      icon: BarChart3,
      exact: true,
    },
    {
      name: "Kelola Artikel",
      href: "/dashboard/artikel",
      icon: FileText,
    },
    {
      name: "Landing Pages",
      href: "/dashboard/landing-pages",
      icon: Layers,
    },
    {
      name: "Redirect Links",
      href: "/dashboard/links",
      icon: Link2,
      badge: linksCount,
    },
    {
      name: "Newsletter",
      href: "/dashboard/newsletter",
      icon: Mail,
      badge: subscriberCount,
    },
    {
      name: "Edit Profil",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col justify-between shrink-0 overflow-y-auto hidden md:flex">
      <div className="flex flex-col">
        <div className="px-6 py-6 border-b border-gray-100 flex items-center">
          <Link href="/dashboard" className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#990202] text-white flex items-center justify-center font-extrabold text-sm">EL</span>
            <span>EasyLegal</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href) && (item.href === "/dashboard" ? pathname === "/dashboard" : true);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-red-50 text-[#990202]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#990202]" : "text-gray-400"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                    isActive ? "bg-[#990202] text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-red-50 hover:text-[#990202] transition-all text-left"
          >
            <LogOut className="w-4 h-4 text-gray-400" />
            <span>Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
