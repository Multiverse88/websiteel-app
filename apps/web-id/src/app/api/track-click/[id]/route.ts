import { NextResponse } from "next/server";

import { headers } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/tracking/click/${id}?url=${encodeURIComponent(targetUrl)}`;
    await fetch(apiUrl);
  } catch (error) {
    console.error("Error tracking click via API:", error);
  }

  // Redirect the user to the actual destination
  return NextResponse.redirect(targetUrl);
}
