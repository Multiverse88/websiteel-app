import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { ArrowLeft, Link2, ExternalLink, Plus, Calendar, MousePointerClick, Pencil } from "lucide-react";
import DeleteLinkButton from "./delete-button";

export const dynamic = "force-dynamic";

export default async function LinksPage() {
  const links = await prisma.redirect.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, slug: true, destination: true, clicks: true, createdAt: true },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <section className="bg-white pt-8 lg:pt-12 pb-10 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-gray-500 hover:text-[#990202] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-heading text-[30px] sm:text-[36px] font-extrabold text-gray-950 leading-tight tracking-tight">
                Redirect Links
              </h1>
              <p className="text-[14px] text-gray-500 mt-1">
                Kelola link pendek untuk dialihkan ke URL eksternal.
              </p>
            </div>
            <Link
              href="/dashboard/links/tambah"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[13px] rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Link Baru</span>
            </Link>
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section className="py-10 flex-grow">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          {links.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Link2 className="w-8 h-8 text-[#990202]" />
              </div>
              <h3 className="text-[18px] font-extrabold text-gray-900 mb-2">
                Belum ada redirect link
              </h3>
              <p className="text-[14px] text-gray-500 mb-6">
                Buat link pendek pertama untuk mulai mengarahkan pengunjung.
              </p>
              <Link
                href="/dashboard/links/tambah"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[14px] rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Link Baru</span>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-[12px] font-extrabold text-gray-400 uppercase tracking-wider">
                <div className="col-span-3">Slug</div>
                <div className="col-span-4">Tujuan</div>
                <div className="col-span-2 text-center">Klik</div>
                <div className="col-span-2">Dibuat</div>
                <div className="col-span-1 text-right">Aksi</div>
              </div>

              {/* Table Rows */}
              {links.map((link: { id: string; slug: string; destination: string; clicks: number; createdAt: Date }) => (
                <div
                  key={link.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center"
                >
                  {/* Slug */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-gray-900">{link.slug}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                      /{link.slug}
                    </p>
                  </div>

                  {/* Destination */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-1.5">
                      <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <span className="text-[13px] text-gray-600 truncate block">
                        {link.destination}
                      </span>
                    </div>
                  </div>

                  {/* Clicks */}
                  <div className="col-span-2 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-50 text-[13px] font-bold text-gray-700">
                      <MousePointerClick className="w-3.5 h-3.5 text-gray-400" />
                      {link.clicks.toLocaleString("id-ID")}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span>
                        {new Date(link.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end gap-1">
                    <Link
                      href={`/dashboard/links/${link.id}`}
                      className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Edit link"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteLinkButton id={link.id} slug={link.slug} />
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
