import React from "react";
import Link from "next/link";
import { ArrowLeft, UserCircle } from "lucide-react";
import { getCurrentUser } from "./actions";
import { ProfileForm } from "./client-components";
import { redirect } from "next/navigation";

export default async function ProfileDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-150 sticky top-0 z-40">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title="Kembali ke Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-[#990202]">
                <UserCircle className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-black text-gray-900 tracking-tight leading-none">
                  Edit Profil Penulis
                </h1>
                <p className="text-[14px] text-gray-500 font-medium mt-1">
                  Kelola nama, foto, bio, dan peran Anda yang dipajang di artikel
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="text-[14px] font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-lg transition-all"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1240px] mx-auto px-6 sm:px-8 py-8 flex-grow w-full">
        <ProfileForm user={user} />
      </main>
    </div>
  );
}
