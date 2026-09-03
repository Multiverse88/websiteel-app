import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Only the scheduler (or another trusted caller) should be able to trigger
  // this — it was previously wide open to anyone on the internet.
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/cron/process-queue`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${cronSecret}` },
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: errText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Cron Queue Fetch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
