"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Layers, Link2, Mail, UserCog, HelpCircle, LogOut } from "lucide-react";
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
    { name: "Edit Profil", href: "/dashboard/profile", icon: UserCog },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[80px] hover:w-[280px] transition-[width] duration-300 bg-white border-r border-gray-200 shadow-sm flex flex-col py-6 z-30 group overflow-hidden">
      {/* Header Logo */}
      <div className="px-5 mb-8 flex items-center gap-3 overflow-hidden shrink-0">
        <div className="w-10 h-10 rounded-lg bg-[#d62828] flex items-center justify-center text-white font-bold text-[16px] shrink-0">
          EL
        </div>
        <div className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
          <h1 className="text-2xl font-bold text-[#b20112] leading-tight">EasyLegal</h1>
          <p className="text-[16px] text-gray-500">Legal Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" role="navigation">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href) && (item.href === "/dashboard" ? pathname === "/dashboard" : true);

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-5 py-3 border-l-4 transition-colors ${
                    isActive
                      ? "text-[#b20112] font-bold border-[#b20112] bg-red-50"
                      : "text-gray-600 hover:bg-gray-100 border-transparent"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200 font-medium">
                    {item.name}
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200 ml-auto px-1.5 py-0.5 rounded-md text-[16px] font-bold bg-[#b20112] text-white">
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
      <div className="px-5 mt-auto space-y-4 overflow-hidden shrink-0">
        <button
          className="w-[40px] group-hover:w-full py-2 bg-[#d62828] text-white rounded-lg text-[16px] font-semibold hover:bg-[#b20112] transition-all flex items-center justify-center gap-2"
          title="Bantuan Support"
        >
          <HelpCircle className="w-5 h-5 shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200 hidden group-hover:block">
            Bantuan Support
          </span>
        </button>
        <form action={logoutAction} className="w-[40px] group-hover:w-full">
          <button
            type="submit"
            className="w-full flex items-center gap-3 py-3 px-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-lg justify-center group-hover:justify-start"
            title="Logout"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200 font-medium hidden group-hover:block">
              Logout
            </span>
          </button>
        </form>
      </div>
    </aside>
  );
}
