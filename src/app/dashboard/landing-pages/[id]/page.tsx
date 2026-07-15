import React from "react";
import { PrismaClient } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import BuilderClient from "./BuilderClient";
import { SectionData } from "@/types/landing-page";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BuilderPage({ params }: Props) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;

  const page = await prisma.landingPage.findUnique({
    where: { id }
  });

  if (!page) notFound();

  let sections: SectionData[] = [];
  try {
    sections = typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections;
  } catch (e) {}

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <BuilderClient 
        pageId={page.id}
        initialSections={sections}
        pageSettings={{
          title: page.title,
          slug: page.slug,
          status: page.status,
          description: page.description || "",
          pixelId: page.pixelId || "",
          redirectSettings: page.redirectSettings,
        }}
      />
    </div>
  );
}
