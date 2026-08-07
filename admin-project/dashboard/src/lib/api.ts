const POSTGREST_URL = 'https://admin.easylegal.my.id/db'
const POSTGREST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicG9zdGdyZXN0X3dyaXRlciJ9.qZEdA1A7--18iPXC4z0xp_RKE0373AiyxrNt0J0kKZM'

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
  login: async (_email?: string, _password?: string) => {
    localStorage.setItem('admin_token', POSTGREST_TOKEN)
    return { token: POSTGREST_TOKEN }
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

  // Landing Pages
  getLandingPages: () => request('/LandingPage?select=*'),
  createLandingPage: (data: any) => request('/LandingPage', { 
    method: 'POST', 
    body: JSON.stringify({
      createdBy: 'cmppip4tf0000o47yzniv6ft8',
      sections: '[]',
      ...data
    }) 
  }),
  updateLandingPage: (id: string, data: any) => request(`/LandingPage?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
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
  toggleAllContactsStatus: (isActive: boolean) => request('/BlastContact', { method: 'PATCH', body: JSON.stringify({ isActive }) }),

  // Newsletter Broadcast & Logs
  getNewsletterBroadcasts: () => request('/NewsletterBroadcast?select=*&order=sentAt.desc&limit=10'),
  getEmailLogs: () => request('/EmailLog?select=*&order=sentAt.desc&limit=15'),

  // Campaigns
  getCampaigns: () => request('/EmailCampaign?select=*'),
  createCampaign: (data: any) => request('/EmailCampaign', { method: 'POST', body: JSON.stringify(data) }),
  updateCampaign: (id: string, data: any) => request(`/EmailCampaign?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteCampaign: (id: string) => request(`/EmailCampaign?id=eq.${id}`, { method: 'DELETE' }),
  getCampaignRecipients: (id: string) => request(`/EmailLog?campaignId=eq.${id}`),

  // Settings / Templates (Mapping to SystemSetting for now or placeholders)
  getSmtpSettings: async () => {
    const backendUrl = import.meta.env.VITE_API_URL || '/api/v1';
    const res = await fetch(`${backendUrl}/email-blast/smtp-settings`);
    if (!res.ok) throw new Error('Gagal memuat pengaturan SMTP');
    const json = await res.json();
    return json.data;
  },
  saveSmtpSettings: async (data: any) => {
    const backendUrl = import.meta.env.VITE_API_URL || '/api/v1';
    const res = await fetch(`${backendUrl}/email-blast/smtp-settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Gagal menyimpan pengaturan SMTP');
    return await res.json();
  },
  testSendEmail: async (data: any) => {
    const backendUrl = import.meta.env.VITE_API_URL || '/api/v1';
    const res = await fetch(`${backendUrl}/email-blast/campaigns/test-send`, {
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
    const backendUrl = import.meta.env.VITE_API_URL || '/api/v1';
    const res = await fetch(`${backendUrl}/newsletter/broadcast`, {
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

  // Media / MinIO CDN
  getMedia: async () => {
    try {
      const backendUrl = import.meta.env.VITE_API_URL || '/api/v1';
      const res = await fetch(`${backendUrl}/media`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('API backend unreachable, fallback to presets:', e);
    }
    return null;
  },
  uploadMedia: async (file: File) => {
    const backendUrl = import.meta.env.VITE_API_URL || '/api/v1';
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${backendUrl}/media/upload`, {
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
    const backendUrl = import.meta.env.VITE_API_URL || '/api/v1';
    const res = await fetch(`${backendUrl}/media/${encodeURIComponent(fullKey)}`, {
      method: 'DELETE',
    });
    return await res.json();
  }
}

