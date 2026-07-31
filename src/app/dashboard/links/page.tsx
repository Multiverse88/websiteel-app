import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Link2, ExternalLink, Plus, Calendar, MousePointerClick, Pencil } from "lucide-react";
import DeleteLinkButton from "./delete-button";
import DashboardHeader from "@/components/dashboard/ui/DashboardHeader";
import DashboardCard from "@/components/dashboard/ui/DashboardCard";
import DashboardButton from "@/components/dashboard/ui/DashboardButton";
import DashboardEmpty from "@/components/dashboard/ui/DashboardEmpty";
import DashboardBadge from "@/components/dashboard/ui/DashboardBadge";
import { DashboardTable, DashboardTableHeader, DashboardTableHeaderCell, DashboardTableBody, DashboardTableRow, DashboardTableCell } from "@/components/dashboard/ui/DashboardTable";

export const dynamic = "force-dynamic";

export default async function LinksPage() {
  const links = await prisma.redirect.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, slug: true, destination: true, clicks: true, createdAt: true },
  });

  return (
    <div>
      <DashboardHeader
        title="Redirect Links"
        description="Kelola link pendek untuk dialihkan ke URL eksternal."
        action={
          <Link href="/dashboard/links/tambah">
            <DashboardButton icon={Plus}>Buat Link Baru</DashboardButton>
          </Link>
        }
      />
      <div className="p-8 max-w-6xl mx-auto">
        {links.length === 0 ? (
          <DashboardCard className="p-12">
            <DashboardEmpty
              icon={Link2}
              title="Belum ada redirect link"
              description="Buat link pendek pertama untuk mulai mengarahkan pengunjung."
              action={
                <Link href="/dashboard/links/tambah">
                  <DashboardButton icon={Plus}>Buat Link Baru</DashboardButton>
                </Link>
              }
            />
          </DashboardCard>
        ) : (
          <DashboardCard className="overflow-hidden">
            <DashboardTable>
              <DashboardTableHeader>
                <DashboardTableHeaderCell className="w-[200px]">Slug</DashboardTableHeaderCell>
                <DashboardTableHeaderCell>Tujuan</DashboardTableHeaderCell>
                <DashboardTableHeaderCell className="text-center w-[100px]">Klik</DashboardTableHeaderCell>
                <DashboardTableHeaderCell className="w-[120px]">Dibuat</DashboardTableHeaderCell>
                <DashboardTableHeaderCell className="text-right w-[80px]">Aksi</DashboardTableHeaderCell>
              </DashboardTableHeader>
              <DashboardTableBody>
                {links.map((link: { id: string; slug: string; destination: string; clicks: number; createdAt: Date }) => (
                  <DashboardTableRow key={link.id}>
                    <DashboardTableCell>
                      <div className="font-medium text-gray-900">{link.slug}</div>
                      <div className="text-[12px] text-gray-500 font-mono mt-0.5">/{link.slug}</div>
                    </DashboardTableCell>
                    <DashboardTableCell>
                      <div className="flex items-center gap-1.5">
                        <ExternalLink className="w-4 h-4 text-[#990202] flex-shrink-0" />
                        <span className="text-[13px] text-gray-700 truncate block">
                          {link.destination}
                        </span>
                      </div>
                    </DashboardTableCell>
                    <DashboardTableCell className="text-center">
                      <DashboardBadge variant="info">
                        <MousePointerClick className="w-3 h-3 mr-1" />
                        {link.clicks.toLocaleString("id-ID")}
                      </DashboardBadge>
                    </DashboardTableCell>
                    <DashboardTableCell className="text-[13px] text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(link.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </DashboardTableCell>
                    <DashboardTableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/dashboard/links/${link.id}`}
                          className="p-2 text-gray-400 hover:text-[#990202] hover:bg-red-50 rounded-lg transition-colors"
                          title="Edit link"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteLinkButton id={link.id} slug={link.slug} />
                      </div>
                    </DashboardTableCell>
                  </DashboardTableRow>
                ))}
              </DashboardTableBody>
            </DashboardTable>
          </DashboardCard>
        )}
      </div>
    </div>
  );
}
