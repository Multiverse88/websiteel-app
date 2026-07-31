import React from "react";
import { getCurrentUser } from "./actions";
import { ProfileForm } from "./client-components";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/dashboard/ui/DashboardHeader";

export default async function ProfileDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <DashboardHeader
        title="Edit Profil Penulis"
        description="Kelola nama, foto, bio, dan peran Anda yang dipajang di artikel."
        backHref="/dashboard"
      />

      {/* MAIN CONTAINER */}
      <section className="py-10 flex-grow">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <ProfileForm user={user} />
        </div>
      </section>
    </div>
  );
}
