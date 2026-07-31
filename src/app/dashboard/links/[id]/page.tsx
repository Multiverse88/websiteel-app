import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import EditLinkForm from "./form";
import DashboardHeader from "@/components/dashboard/ui/DashboardHeader";

export const dynamic = "force-dynamic";

export default async function EditLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.twoFactorEnabled) redirect("/login/setup-2fa");

  const { id } = await params;
  const link = await prisma.redirect.findUnique({
    where: { id },
    select: { id: true, slug: true, destination: true },
  });

  if (!link) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <DashboardHeader
        title="Edit Redirect Link"
        description="Edit link redirect yang sudah ada"
        backHref="/dashboard/links"
      />

      {/* FORM */}
      <section className="py-10 flex-grow">
        <div className="max-w-[640px] mx-auto px-6 sm:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <EditLinkForm id={link.id} slug={link.slug} destination={link.destination} />
          </div>
        </div>
      </section>
    </div>
  );
}
