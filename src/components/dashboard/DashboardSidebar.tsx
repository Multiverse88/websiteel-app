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
    <aside className="w-64 bg-[#121212] border-r border-[#2C2C2E] h-screen flex flex-col justify-between shrink-0 overflow-y-auto hidden md:flex">
      <div className="flex flex-col">
        <div className="px-6 py-6 border-b border-[#2C2C2E] flex items-center">
          <Link href="/dashboard" className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#00E5FF] text-black flex items-center justify-center font-extrabold text-sm">EL</span>
            <span>EasyLegal</span>
          </Link>
        </div>

        <div className="p-4 space-y-1.5" role="navigation">
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
                    ? "bg-[#1E1E1E] text-[#00E5FF]"
                    : "text-[#98989D] hover:bg-[#1E1E1E] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#00E5FF]" : "text-[#98989D]"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                    isActive ? "bg-[#FF453A] text-white" : "bg-[#1E1E1E] text-[#98989D] border border-[#2C2C2E]"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-[#2C2C2E]">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#98989D] hover:bg-[#3A1C1C] hover:text-[#FF453A] hover:border-l-4 hover:border-[#FF453A] transition-all text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
