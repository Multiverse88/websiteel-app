import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const host = request.headers.get("host") || "easylegal.co.id";
  const domain = host.split(":")[0];
  const search = request.nextUrl.search || "";
  const queryGlue = search ? (search.includes("?") ? "&" : "?") : "?";
  const targetApiUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api.easylegal.my.id"}/api/v1/wa/s/${encodeURIComponent(slug)}${search}${queryGlue}domain=${encodeURIComponent(domain)}`;
  return NextResponse.redirect(new URL(targetApiUrl), 302);
}
