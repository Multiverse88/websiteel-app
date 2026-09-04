import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { tag, slug } = body;

  const profile = "default";
  if (slug) {
    revalidateTag(`article-${slug}`, profile);
  }
  if (tag) {
    revalidateTag(tag, profile);
  }
  revalidateTag("articles", profile);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
