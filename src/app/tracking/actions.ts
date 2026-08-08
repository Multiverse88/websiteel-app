"use server"

const POSTGREST_URL = 'https://admin.easylegal.my.id/db'
const POSTGREST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicG9zdGdyZXN0X3dyaXRlciJ9.qZEdA1A7--18iPXC4z0xp_RKE0373AiyxrNt0J0kKZM'

export async function getTrackingByCode(code: string) {
  try {
    const res = await fetch(`${POSTGREST_URL}/TrackingProject?trackingCode=eq.${encodeURIComponent(code.toUpperCase())}`, {
      headers: {
        'Authorization': `Bearer ${POSTGREST_TOKEN}`,
        'Accept': 'application/json'
      },
      next: { revalidate: 0 } // No cache for tracking
    });

    if (!res.ok) throw new Error("API Error");

    const data = await res.json();
    if (!data || data.length === 0) return null;

    return {
      success: true,
      data: data[0]
    };
  } catch (error) {
    console.error("Error fetching tracking data:", error);
    return { success: false, error: "Gagal mengambil data tracking" };
  }
}
