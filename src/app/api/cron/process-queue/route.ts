import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/cron/process-queue`;
    const res = await fetch(apiUrl, {
      method: "POST"
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
