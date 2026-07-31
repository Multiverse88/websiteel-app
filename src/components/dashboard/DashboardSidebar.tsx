"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Layers, Link2, Mail, Send, UserCog, HelpCircle, LogOut } from "lucide-react";
import { logoutAction } from "@/app/dashboard/actions";

interface DashboardSidebarProps {
  subscriberCount: number;
  linksCount: number;
}

export default function DashboardSidebar({ subscriberCount, linksCount }: DashboardSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Ringkasan", href: "/dashboard", icon: LayoutDashboard, exact: true },
    { name: "Kelola Artikel", href: "/dashboard/artikel", icon: FileText },
    { name: "Landing Pages", href: "/dashboard/landing-pages", icon: Layers },
    { name: "Redirect Links", href: "/dashboard/links", icon: Link2, badge: linksCount },
    { name: "Newsletter", href: "/dashboard/newsletter", icon: Mail, badge: subscriberCount },
    { name: "Email Blast", href: "/dashboard/email-blast", icon: Send },
    { name: "Edit Profil", href: "/dashboard/profile", icon: UserCog },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-200 shadow-sm flex flex-col z-30">
      {/* Logo */}
      <div className="px-5 py-6 flex items-center gap-3 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-[#990202] flex items-center justify-center text-white font-bold text-[16px] shrink-0">
          EL
        </div>
        <div>
          <h1 className="text-[18px] font-bold text-[#990202] leading-tight">EasyLegal</h1>
          <p className="text-[12px] text-gray-500">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4" role="navigation">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-red-50 text-[#990202] font-semibold border-l-3 border-[#990202]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="font-medium text-[14px]">{item.name}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-auto px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#990202] text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Actions */}
      <div className="px-3 py-4 border-t border-gray-100 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors text-[14px] font-medium">
          <HelpCircle className="w-5 h-5 shrink-0" />
          <span>Bantuan Support</span>
        </button>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors text-[14px] font-medium"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
