import React from "react";
import { Users, UserPlus } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ContactActions, ImportCsvButton, ToggleAllContactsButton, ActivateLimitedContactsForm } from "../client-components";
import { addContactAction } from "../actions";
import DashboardHeader from "@/components/dashboard/ui/DashboardHeader";

export const dynamic = "force-dynamic";

export default async function EmailBlastKontakPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Fetch all contacts
  const contacts = await prisma.blastContact.findMany({
    orderBy: { createdAt: "desc" },
  });

  const activeCount = contacts.filter((c: any) => c.isActive).length;
  const inactiveCount = contacts.length - activeCount;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* HEADER */}
      <DashboardHeader
        title="Kelola Kontak Blast"
        description={`${activeCount} aktif · ${inactiveCount} nonaktif`}
        backHref="/dashboard/email-blast"
      />

      {/* CONTENT */}
      <section className="py-8 flex-grow">
        <div className="max-w-[1200px] mx-auto px-6 space-y-6">
          
          {/* Form Tambah Kontak dan Form Aktivasi Terbatas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-black/[0.04] p-5">
              <h3 className="text-[14px] font-bold text-gray-700 mb-3">Tambah Kontak Cepat</h3>
              <form action={async (formData) => {
                "use server";
                await addContactAction(formData);
              }} className="flex gap-3">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#d62828] focus:ring-1 focus:ring-[#d62828]"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Nama (Opsional)"
                  className="w-[150px] px-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#d62828] focus:ring-1 focus:ring-[#d62828]"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-1.5 text-[14px]"
                >
                  <UserPlus className="w-4 h-4" />
                  Tambah
                </button>
              </form>
            </div>

            <ActivateLimitedContactsForm />
          </div>

          {contacts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">
              <h3 className="text-[16px] font-extrabold text-gray-900 mb-2">Belum ada kontak</h3>
              <p className="text-[16px] text-gray-500">
                Silakan tambahkan kontak email untuk mulai mengirim blast.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100 text-[14px] font-extrabold text-gray-400 uppercase tracking-wider">
                <div className="col-span-4">Email</div>
                <div className="col-span-3">Nama</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-3 text-right">Aksi</div>
              </div>
              
              {contacts.map((contact: any) => (
                <div
                  key={contact.id}
                  className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center"
                >
                  <div className="col-span-4">
                    <span className="text-[14px] font-bold text-gray-900 truncate block">
                      {contact.email}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span className="text-[14px] text-gray-500 truncate block">
                      {contact.name || "-"}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-md text-[12px] font-bold ${
                        contact.isActive
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                          : "bg-gray-100 text-gray-500 border border-black/[0.04]"
                      }`}
                    >
                      {contact.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                  <div className="col-span-3 flex justify-end">
                    <ContactActions id={contact.id} isActive={contact.isActive} />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
