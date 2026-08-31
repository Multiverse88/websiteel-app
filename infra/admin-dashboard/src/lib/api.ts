import { expireSession, getValidAuthToken } from './session'

const POSTGREST_URL = 'https://admin.easylegal.my.id/db'
// Regenerated 2026-08-12 after PGRST_JWT_SECRET was rotated (see
// notes/easylegal-checklist-2026-08-12.md). If PGRST_JWT_SECRET changes
// again, regenerate with:
//   PGRST_JWT_SECRET=<new secret> ./postgrest/generate-token.sh writer
const POSTGREST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicG9zdGdyZXN0X3dyaXRlciJ9.nlNheyavwShMcqjiT5ZcGwvhcjfn9m3lPStVxgMZ4dU'
// Express admin-api (media/email-blast/newsletter-broadcast — things PostgREST
// can't do). Was `import.meta.env.VITE_API_URL || '/api/v1'`, but VITE_API_URL
// is never set at build time, so it always fell back to the relative path
// '/api/v1' — which resolves against admin.easylegal.my.id (this dashboard's
// own origin), not api.easylegal.my.id where the Express API actually lives.
const API_BASE_URL = 'https://api.easylegal.my.id/api/v1'
const AUTH_BASE_URL = 'https://api.easylegal.my.id/api/auth'

// JWT issued by admin-api's real /login (bcrypt-checked). Separate from
// POSTGREST_TOKEN above, which is a static token for a different backend
// (PostgREST) and unrelated to whether the logged-in user's credentials
// were actually valid.
async function authenticatedFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = getValidAuthToken()
  if (!token) {
    expireSession()
    throw new Error('Sesi Anda telah berakhir. Silakan login kembali.')
  }

  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${token}`)
  const response = await fetch(input, { ...init, headers })

  if (response.status === 401) {
    expireSession()
    throw new Error('Sesi Anda tidak valid atau telah berakhir. Silakan login kembali.')
  }

  return response
}

async function request(path: string, options: RequestInit = {}) {
  // PostgREST uses its own role token, but dashboard access must still obey
  // the admin session lifetime. Without this guard, an expired UI session
  // could continue reading/writing PostgREST-backed resources indefinitely.
  if (!getValidAuthToken()) {
    expireSession()
    throw new Error('Sesi Anda telah berakhir. Silakan login kembali.')
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${POSTGREST_TOKEN}`,
    ...(options.headers as Record<string, string> || {}),
  }

  if (options.method === 'POST' || options.method === 'PATCH' || options.method === 'PUT') {
    headers['Prefer'] = 'return=representation';
    if (options.method === 'PUT') options.method = 'PATCH'; // PostgREST uses PATCH for updates
  }

  const res = await fetch(`${POSTGREST_URL}${path}`, { ...options, headers })
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(err.message || err.details || 'Request failed')
  }
  
  if (res.status === 204) return null;

  return await res.json()
}

export const api = {
  login: async (email?: string, password?: string) => {
    const res = await fetch(`${AUTH_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Login gagal' }))
      throw new Error(err.error || 'Login gagal')
    }
    const json = await res.json()
    localStorage.setItem('admin_jwt', json.token)
    localStorage.setItem('admin_userId', json.userId)
    // Still needed for PostgREST-backed reads/writes (Article, LandingPage,
    // etc.) — a separate backend from admin-api, not migrated yet.
    localStorage.setItem('admin_token', POSTGREST_TOKEN)
    return { token: json.token }
  },
  
  // Articles
  getArticles: () => request('/Article?select=*'),
  getArticle: (id: string) => request(`/Article?id=eq.${id}&limit=1`).then(res => (Array.isArray(res) ? res[0] : res)),
  createArticle: (data: any) => {
    const withId = { ...data, id: data.id || crypto.randomUUID().replace(/-/g, '').slice(0, 25) };
    return request('/Article', { method: 'POST', body: JSON.stringify(withId) });
  },
  updateArticle: (id: string, data: any) => request(`/Article?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteArticle: (id: string) => request(`/Article?id=eq.${id}`, { method: 'DELETE' }),

  // Contacts
  getContacts: () => request('/ContactSubmission?select=*'),
  deleteContact: (id: string) => request(`/ContactSubmission?id=eq.${id}`, { method: 'DELETE' }),

  // Newsletter
  getNewsletter: () => request('/NewsletterSubscriber?select=*'),
  deleteSubscriber: (id: string) => request(`/NewsletterSubscriber?id=eq.${id}`, { method: 'DELETE' }),

  // Domains (which public site a landing page is locked to)
  getDomains: () => request('/Domain?select=*&order=name.asc'),
  createDomain: (data: { name: string; hostname: string; description?: string }) =>
    request('/Domain', {
      method: 'POST',
      body: JSON.stringify({ id: 'dom_' + Math.random().toString(36).slice(2, 11), updatedAt: new Date().toISOString(), ...data }),
    }),

  // Landing Pages
  getLandingPages: () => request('/LandingPage?select=*,Domain(*)'),
  createLandingPage: (data: any) => {
    let userId = localStorage.getItem('admin_userId');
    if (!userId || userId === 'undefined') {
      const token = localStorage.getItem('admin_jwt');
      if (token) {
        try { 
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const pad = base64.length % 4;
          const paddedBase64 = pad ? base64 + new Array(5 - pad).join('=') : base64;
          const jsonPayload = decodeURIComponent(window.atob(paddedBase64).split('').map(c => 
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          ).join(''));
          userId = JSON.parse(jsonPayload).userId; 
        } catch (e) {
          console.error('Failed to parse JWT for userId:', e);
        }
      }
    }
    if (!userId || userId === 'undefined' || userId === 'system') {
      alert("⚠️ SESI LAMA TERDETEKSI! Anda WAJIB klik tombol LOGOUT lalu LOGIN kembali agar pembuatan Landing Page bisa berhasil.");
      window.location.href = '/dashboard/login';
      return Promise.reject(new Error("Sesi tidak valid, wajib relogin."));
    }
    
    const cleanData = { ...data };
    if (cleanData.domainId === '') cleanData.domainId = null;

    return request('/LandingPage', {
      method: 'POST',
      body: JSON.stringify({
        createdBy: userId,
        id: 'c' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9),
        updatedAt: new Date().toISOString(),
        sections: '[]',
        ...cleanData
      })
    }).catch(err => {
      if (err.message && err.message.includes('createdBy_fkey')) {
        localStorage.removeItem('admin_userId');
        localStorage.removeItem('admin_jwt');
        localStorage.removeItem('admin_token');
        alert("🚨 DATABASE TIDAK SINKRON: ID Anda sudah kadaluarsa (Ghost ID). Anda dikeluarkan secara otomatis. SILAKAN LOGIN KEMBALI!");
        window.location.href = '/dashboard/login';
      }
      throw err;
    });
  },
  updateLandingPage: (id: string, data: any) => {
    const cleanData = { ...data };
    if (cleanData.domainId === '') cleanData.domainId = null;
    return request(`/LandingPage?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify({ ...cleanData, updatedAt: new Date().toISOString() }) });
  },
  deleteLandingPage: (id: string) => request(`/LandingPage?id=eq.${id}`, { method: 'DELETE' }),

  // Redirects
  getRedirects: () => request('/Redirect?select=*'),
  createRedirect: (data: any) => request('/Redirect', { method: 'POST', body: JSON.stringify(data) }),
  updateRedirect: (id: string, data: any) => request(`/Redirect?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteRedirect: (id: string) => request(`/Redirect?id=eq.${id}`, { method: 'DELETE' }),

  // Email Blast Contacts
  getBlastContacts: () => request('/BlastContact?select=*'),
  createBlastContact: (data: any) => request('/BlastContact', { method: 'POST', body: JSON.stringify(data) }),
  updateBlastContact: (id: string, data: any) => request(`/BlastContact?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteBlastContact: (id: string) => request(`/BlastContact?id=eq.${id}`, { method: 'DELETE' }),
  importBlastContacts: (contacts: any[]) => request('/BlastContact', { method: 'POST', body: JSON.stringify(contacts) }), // Bulk insert

  // Newsletter Broadcast & Logs
  getNewsletterBroadcasts: () => request('/NewsletterBroadcast?select=*&order=sentAt.desc&limit=10'),
  getEmailLogs: () => request('/EmailLog?select=*&order=sentAt.desc&limit=15'),

  // Campaigns
  getCampaigns: () => request('/EmailCampaign?select=*'),
  createCampaign: (data: any) => request('/EmailCampaign', { method: 'POST', body: JSON.stringify(data) }),
  updateCampaign: (id: string, data: any) => request(`/EmailCampaign?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteCampaign: (id: string) => request(`/EmailCampaign?id=eq.${id}`, { method: 'DELETE' }),
  getCampaignRecipients: (id: string) => request(`/EmailLog?campaignId=eq.${id}`),


  // Tracking Projects
  getTrackingProjects: () => request('/TrackingProject?order=createdAt.desc'),
  createTrackingProject: (data: any) => request('/TrackingProject', { method: 'POST', body: JSON.stringify(data) }),
  updateTrackingProject: (id: string, data: any) => request(`/TrackingProject?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteTrackingProject: (id: string) => request(`/TrackingProject?id=eq.${id}`, { method: 'DELETE' }),

  // WhatsApp CTA rotator (in-house, replaces mauorder.online — see
  // apps/api/src/routes/whatsapp.ts). Traffic/fairness numbers live here.
  getWaNumbers: async () => {
    const res = await authenticatedFetch(`${API_BASE_URL}/wa/numbers`);
    if (!res.ok) throw new Error('Gagal memuat daftar nomor WA');
    return await res.json();
  },
  createWaNumber: async (data: { number: string; label?: string }) => {
    const res = await authenticatedFetch(`${API_BASE_URL}/wa/numbers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Gagal menambah nomor' }));
      throw new Error(err.error || 'Gagal menambah nomor');
    }
    return await res.json();
  },
  updateWaNumber: async (id: string, data: { number?: string; label?: string; isActive?: boolean }) => {
    const res = await authenticatedFetch(`${API_BASE_URL}/wa/numbers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Gagal memperbarui nomor');
    return await res.json();
  },
  // Per-page WA rotator override — custom autotext and/or a restricted
  // number pool for one page, keyed by page path (see whatsapp.ts /pages).
  getWaPages: async () => {
    const res = await authenticatedFetch(`${API_BASE_URL}/wa/pages`)
    if (!res.ok) throw new Error('Gagal memuat konfigurasi halaman')
    return await res.json()
  },
  getWaKnownPaths: async () => {
    const res = await authenticatedFetch(`${API_BASE_URL}/wa/pages/known-paths`)
    if (!res.ok) throw new Error('Gagal memuat daftar halaman')
    return await res.json()
  },
  getWaKnownButtons: async (path: string) => {
    const res = await authenticatedFetch(`${API_BASE_URL}/wa/pages/known-buttons?path=${encodeURIComponent(path)}`)
    if (!res.ok) throw new Error('Gagal memuat daftar tombol')
    return await res.json()
  },
  getWaPagePreview: async (path: string, ctaId?: string) => {
    const qs = ctaId ? `&cta_id=${encodeURIComponent(ctaId)}` : ''
    const res = await authenticatedFetch(`${API_BASE_URL}/wa/pages/preview?path=${encodeURIComponent(path)}${qs}`)
    if (!res.ok) throw new Error('Gagal memuat preview autotext')
    return await res.json()
  },
  saveWaPage: async (data: { path: string; ctaId?: string; message?: string; numberIds?: string[] }) => {
    const res = await authenticatedFetch(`${API_BASE_URL}/wa/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Gagal menyimpan konfigurasi halaman' }))
      throw new Error(err.error || 'Gagal menyimpan konfigurasi halaman')
    }
    return await res.json()
  },
  deleteWaPage: async (id: string) => {
    const res = await authenticatedFetch(`${API_BASE_URL}/wa/pages/${id}`, { method: 'DELETE' })
    if (!res.ok && res.status !== 204) throw new Error('Gagal menghapus konfigurasi halaman')
  },
  getWaLeads: async (filters: { status?: string; numberId?: string; domain?: string; source?: string; product?: string } = {}) => {
    const qs = new URLSearchParams(Object.entries(filters).filter(([, v]) => v) as [string, string][]).toString()
    const res = await authenticatedFetch(`${API_BASE_URL}/wa/leads${qs ? `?${qs}` : ''}`)
    if (!res.ok) throw new Error('Gagal memuat leads')
    return await res.json()
  },
  updateWaLead: async (id: string, data: { status?: string; notes?: string; lostReason?: string; orderValue?: number }) => {
    const res = await authenticatedFetch(`${API_BASE_URL}/wa/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Gagal memperbarui lead' }))
      throw new Error(error.error || 'Gagal memperbarui lead')
    }
    return await res.json()
  },

  // Settings / Templates (Mapping to SystemSetting for now or placeholders)
  getSmtpSettings: async () => {
    const backendUrl = API_BASE_URL;
    const res = await authenticatedFetch(`${backendUrl}/email-blast/smtp-settings`);
    if (!res.ok) throw new Error('Gagal memuat pengaturan SMTP');
    const json = await res.json();
    return json.data;
  },
  saveSmtpSettings: async (data: any) => {
    const backendUrl = API_BASE_URL;
    const res = await authenticatedFetch(`${backendUrl}/email-blast/smtp-settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Gagal menyimpan pengaturan SMTP');
    return await res.json();
  },
  testSendEmail: async (data: any) => {
    const backendUrl = API_BASE_URL;
    const res = await authenticatedFetch(`${backendUrl}/email-blast/campaigns/test-send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Gagal mengirim email' }));
      throw new Error(err.error || 'Gagal mengirim email');
    }
    return await res.json();
  },
  sendNewsletterBroadcast: async (data: any) => {
    const backendUrl = API_BASE_URL;
    const res = await authenticatedFetch(`${backendUrl}/newsletter/broadcast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Gagal mengirim broadcast' }));
      throw new Error(err.error || 'Gagal mengirim broadcast');
    }
    return await res.json();
  },
  getEmailTemplate: (type: string) => request(`/SystemSetting?key=eq.template_${type}`),
  saveEmailTemplate: (type: string, content: string) => request(`/SystemSetting?key=eq.template_${type}`, { method: 'PATCH', body: JSON.stringify({ value: content }) }),

  // Generic SystemSetting key/value (no "template_" prefix) — used for the
  // article header/footer, read on the public site via
  // GET /api/v1/settings/:key (apps/api/src/routes/settings.ts). PATCH only
  // updates an existing row, so on first save (key doesn't exist yet) fall
  // back to POST to create it.
  getSetting: (key: string) => request(`/SystemSetting?key=eq.${key}`),
  saveSetting: async (key: string, value: string) => {
    const updated = await request(`/SystemSetting?key=eq.${key}`, { method: 'PATCH', body: JSON.stringify({ value }) })
    if (Array.isArray(updated) && updated.length > 0) return updated
    return request(`/SystemSetting`, { method: 'POST', body: JSON.stringify({ key, value }) })
  },

  getApiSetting: async (key: string) => {
    const res = await fetch(`${API_BASE_URL}/settings/${encodeURIComponent(key)}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error('Gagal memuat pengaturan')
    return await res.json()
  },
  saveApiSetting: async (key: string, value: unknown) => {
    const res = await authenticatedFetch(`${API_BASE_URL}/settings/${encodeURIComponent(key)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Gagal menyimpan pengaturan' }))
      throw new Error(err.error || 'Gagal menyimpan pengaturan')
    }
    return await res.json()
  },

  // Triggers ISR revalidation on the public site via admin-api, which holds
  // REVALIDATION_SECRET server-side — this dashboard never sees it.
  revalidateArticle: (slug: string) =>
    authenticatedFetch(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => {}),

  // Media / MinIO CDN
  getMedia: async () => {
    try {
      const backendUrl = API_BASE_URL;
      const res = await authenticatedFetch(`${backendUrl}/media`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('API backend unreachable, fallback to presets:', e);
    }
    return null;
  },
  uploadMedia: async (file: File) => {
    const backendUrl = API_BASE_URL;
    const formData = new FormData();
    formData.append('file', file);
    const res = await authenticatedFetch(`${backendUrl}/media/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(err.error || 'Upload failed');
    }
    return await res.json();
  },
  deleteMedia: async (fullKey: string) => {
    const backendUrl = API_BASE_URL;
    const res = await authenticatedFetch(`${backendUrl}/media/${encodeURIComponent(fullKey)}`, {
      method: 'DELETE',
    });
    return await res.json();
  }
}
