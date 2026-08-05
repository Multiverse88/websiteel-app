const API_BASE = '/api'

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('admin_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (res.status === 401) {
    localStorage.removeItem('admin_token')
    window.location.hash = '#/login'
    throw new Error('Unauthorized')
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || err.detail || 'Request failed')
  }
  const json = await res.json()
  return json.data !== undefined ? json.data : json
}

export const api = {
  login: (email: string, password: string) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getArticles: () => request('/v1/articles'),
  createArticle: (data: any) => request('/v1/articles', { method: 'POST', body: JSON.stringify(data) }),
  updateArticle: (id: string, data: any) => request(`/v1/articles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteArticle: (id: string) => request(`/v1/articles/${id}`, { method: 'DELETE' }),
  getContacts: () => request('/v1/contacts'),
  deleteContact: (id: string) => request(`/v1/contacts/${id}`, { method: 'DELETE' }),
  getNewsletter: () => request('/v1/newsletter'),
  deleteSubscriber: (id: string) => request(`/v1/newsletter/${id}`, { method: 'DELETE' }),
  getLandingPages: () => request('/v1/landing-pages'),
  createLandingPage: (data: any) => request('/v1/landing-pages', { method: 'POST', body: JSON.stringify(data) }),
  updateLandingPage: (id: string, data: any) => request(`/v1/landing-pages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteLandingPage: (id: string) => request(`/v1/landing-pages/${id}`, { method: 'DELETE' }),
  getRedirects: () => request('/v1/redirects'),
  createRedirect: (data: any) => request('/v1/redirects', { method: 'POST', body: JSON.stringify(data) }),
  updateRedirect: (id: string, data: any) => request(`/v1/redirects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteRedirect: (id: string) => request(`/v1/redirects/${id}`, { method: 'DELETE' }),
  getBlastContacts: () => request('/v1/email-blast/contacts'),
  createBlastContact: (data: any) => request('/v1/email-blast/contacts', { method: 'POST', body: JSON.stringify(data) }),
  updateBlastContact: (id: string, data: any) => request(`/v1/email-blast/contacts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlastContact: (id: string) => request(`/v1/email-blast/contacts/${id}`, { method: 'DELETE' }),
  importBlastContacts: (contacts: any[]) => request('/v1/email-blast/contacts/import', { method: 'POST', body: JSON.stringify({ contacts }) }),
  toggleAllContactsStatus: (isActive: boolean) => request('/v1/email-blast/contacts/toggle-status', { method: 'PUT', body: JSON.stringify({ isActive }) }),
  getCampaigns: () => request('/v1/email-blast/campaigns'),
  createCampaign: (data: any) => request('/v1/email-blast/campaigns', { method: 'POST', body: JSON.stringify(data) }),
  updateCampaign: (id: string, data: any) => request(`/v1/email-blast/campaigns/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCampaign: (id: string) => request(`/v1/email-blast/campaigns/${id}`, { method: 'DELETE' }),
  getCampaignRecipients: (id: string) => request(`/v1/email-blast/campaigns/${id}/recipients`),
  getSmtpSettings: () => request('/v1/email-blast/smtp-settings'),
  saveSmtpSettings: (data: any) => request('/v1/email-blast/smtp-settings', { method: 'POST', body: JSON.stringify(data) }),
  testSendEmail: (data: any) => request('/v1/email-blast/campaigns/test-send', { method: 'POST', body: JSON.stringify(data) }),
  getEmailTemplate: (type: string) => request(`/v1/email-blast/templates/${type}`),
  saveEmailTemplate: (type: string, content: string) => request('/v1/email-blast/templates', { method: 'POST', body: JSON.stringify({ type, content }) }),
}
