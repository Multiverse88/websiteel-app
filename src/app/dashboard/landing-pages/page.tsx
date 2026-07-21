import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Plus, Settings, Trash2, ExternalLink } from "lucide-react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { deleteLandingPage } from "./actions";
import { DeleteButton } from "./client-components";

export const dynamic = "force-dynamic";


export default async function LandingPagesList() {
  const session = await getSession();
  if (!session) redirect("/login");

  const pages = await prisma.landingPage.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Landing Pages</h1>
          <p className="text-gray-500 mt-1">Kelola dan bangun landing page khusus untuk campaign iklan.</p>
        </div>
        <Link 
          href="/dashboard/landing-pages/new" 
          className="inline-flex items-center space-x-2 bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Buat Landing Page</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-4 px-6 font-semibold text-[16px] text-gray-600">Judul & Slug</th>
              <th className="py-4 px-6 font-semibold text-[16px] text-gray-600">Status</th>
              <th className="py-4 px-6 font-semibold text-[16px] text-gray-600">Dibuat Oleh</th>
              <th className="py-4 px-6 font-semibold text-[16px] text-gray-600">Leads</th>
              <th className="py-4 px-6 font-semibold text-[16px] text-gray-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  Belum ada landing page yang dibuat.
                </td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900">{page.title}</div>
                    <div className="text-[16px] text-gray-500 mt-1 flex items-center gap-1">
                      <span>/lp/{page.slug}</span>
                      <a href={`/lp/${page.slug}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[16px] font-medium ${
                      page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {page.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[16px] text-gray-600">
                    {page.author?.name || 'Unknown'}
                  </td>
                  <td className="py-4 px-6 text-[16px] font-medium text-gray-900">
                    0 {/* TODO: Count leads */}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <Link
                      href={`/dashboard/landing-pages/${page.id}`}
                      className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit di Builder"
                    >
                      <Settings className="w-4 h-4" />
                    </Link>
                    <DeleteButton action={deleteLandingPage.bind(null, page.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
