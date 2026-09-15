// Rate limiter in-memory sederhana khusus endpoint publik rotator WhatsApp
// (single instance admin-api, lihat docker-compose.infra.dokploy.yml — bukan
// multi-replica, jadi in-memory aman, tidak perlu Redis).
//
// Ini pertahanan lapis kedua di belakang bot-detect.ts: bot yang UA-nya
// dipalsukan (menyamar sebagai browser normal) tidak akan ketangkap regex
// UA, tapi tetap akan menembak endpoint ini berkali-kali lebih cepat/lebih
// banyak dari manusia biasa dalam window singkat.
//
// Efek saat limit terlampaui: TIDAK memblokir redirect (supaya link tidak
// pernah dead-end), hanya melewati pencatatan clickCount/lead untuk request
// itu — sama seperti bot-detect.ts.
const WINDOW_MS = 5 * 60 * 1000; // 5 menit
const MAX_HITS_PER_WINDOW = 20; // ~1 klik WA nyata tiap 15 detik sudah generous

const hits = new Map<string, number[]>();

// Bersihkan entri kadaluarsa setiap beberapa menit supaya Map tidak
// bocor memory selama proses berjalan lama.
setInterval(() => {
  const cutoff = Date.now() - WINDOW_MS;
  for (const [key, timestamps] of hits) {
    const fresh = timestamps.filter((t) => t > cutoff);
    if (fresh.length === 0) hits.delete(key);
    else hits.set(key, fresh);
  }
}, WINDOW_MS).unref();

// Return true kalau `ip` sudah melebihi kuota dalam window berjalan.
// Setiap panggilan juga mencatat hit baru (dipanggil sekali per request).
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const timestamps = (hits.get(ip) || []).filter((t) => t > cutoff);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > MAX_HITS_PER_WINDOW;
}
