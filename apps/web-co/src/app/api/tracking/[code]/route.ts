import { NextResponse } from 'next/server';

const POSTGREST_URL = process.env.POSTGREST_URL || 'https://admin.easylegal.my.id/db';
const POSTGREST_TOKEN = process.env.POSTGREST_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicG9zdGdyZXN0X3dyaXRlciJ9.qZEdA1A7--18iPXC4z0xp_RKE0373AiyxrNt0J0kKZM';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const resolvedParams = await params;
    const code = resolvedParams.code?.trim().toUpperCase();
    if (!code) {
      return NextResponse.json({ success: false, error: 'Tracking code is required' }, { status: 400 });
    }

    const res = await fetch(`${POSTGREST_URL}/TrackingProject?trackingCode=eq.${encodeURIComponent(code)}`, {
      headers: {
        'Authorization': `Bearer ${POSTGREST_TOKEN}`,
        'Accept': 'application/json'
      },
      next: { revalidate: 0 } 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch from database");
    }

    const data = await res.json();
    
    if (!data || data.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Data tracking tidak ditemukan' 
      }, { status: 404 });
    }

    const projectData = data[0];
    const safeData = {
      trackingCode: projectData.trackingCode,
      clientName: projectData.clientName,
      serviceType: projectData.serviceType,
      timelineData: projectData.timelineData,
      isCompleted: projectData.isCompleted,
      createdAt: projectData.createdAt,
      updatedAt: projectData.updatedAt
    };

    return NextResponse.json({ 
      success: true, 
      data: safeData 
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });

  } catch (error: any) {
    console.error("Tracking API Error:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: 'Terjadi kesalahan pada server' 
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
  });
}
