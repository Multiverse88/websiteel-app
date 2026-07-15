import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import EditLinkForm from "./form";

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
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <section className="bg-white pt-8 lg:pt-12 pb-10 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard/links"
              className="inline-flex items-center gap-1.5 text-[14px] font-bold text-gray-500 hover:text-[#990202] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Redirect Links
            </Link>
          </div>
          <h1 className="font-heading text-[30px] sm:text-[36px] font-extrabold text-gray-950 leading-tight tracking-tight">
            Edit Redirect Link
          </h1>
        </div>
      </section>

      {/* FORM */}
      <section className="py-10 flex-grow">
        <div className="max-w-[640px] mx-auto px-6 sm:px-8">
          <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] p-6 sm:p-8">
            <EditLinkForm id={link.id} slug={link.slug} destination={link.destination} />
          </div>
        </div>
      </section>
    </div>
  );
}
