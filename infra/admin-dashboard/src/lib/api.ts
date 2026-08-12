const POSTGREST_URL = 'https://admin.easylegal.my.id/db'
const POSTGREST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicG9zdGdyZXN0X3dyaXRlciJ9.qZEdA1A7--18iPXC4z0xp_RKE0373AiyxrNt0J0kKZM'
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
function getAuthToken(): string | null {
  return localStorage.getItem('admin_jwt')
}

function authHeaders(): Record<string, string> {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path: string, options: RequestInit = {}) {
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
  createLandingPage: (data: any) => request('/LandingPage', { 
    method: 'POST', 
    body: JSON.stringify({
      createdBy: 'cmppip4tf0000o47yzniv6ft8',
      id: 'c' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9),
      updatedAt: new Date().toISOString(),
      sections: '[]',
      ...data
    }) 
  }),
  updateLandingPage: (id: string, data: any) => request(`/LandingPage?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify({ ...data, updatedAt: new Date().toISOString() }) }),
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

  // Settings / Templates (Mapping to SystemSetting for now or placeholders)
  getSmtpSettings: async () => {
    const backendUrl = API_BASE_URL;
    const res = await fetch(`${backendUrl}/email-blast/smtp-settings`, { headers: authHeaders() });
    if (!res.ok) throw new Error('Gagal memuat pengaturan SMTP');
    const json = await res.json();
    return json.data;
  },
  saveSmtpSettings: async (data: any) => {
    const backendUrl = API_BASE_URL;
    const res = await fetch(`${backendUrl}/email-blast/smtp-settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Gagal menyimpan pengaturan SMTP');
    return await res.json();
  },
  testSendEmail: async (data: any) => {
    const backendUrl = API_BASE_URL;
    const res = await fetch(`${backendUrl}/email-blast/campaigns/test-send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
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
    const res = await fetch(`${backendUrl}/newsletter/broadcast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
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

  // Triggers ISR revalidation on the public site via admin-api, which holds
  // REVALIDATION_SECRET server-side — this dashboard never sees it.
  revalidateArticle: (slug: string) =>
    fetch(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    }).catch(() => {}),

  // Media / MinIO CDN
  getMedia: async () => {
    try {
      const backendUrl = API_BASE_URL;
      const res = await fetch(`${backendUrl}/media`, { headers: authHeaders() });
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
    const res = await fetch(`${backendUrl}/media/upload`, {
      method: 'POST',
      headers: authHeaders(),
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
    const res = await fetch(`${backendUrl}/media/${encodeURIComponent(fullKey)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return await res.json();
  }
}

