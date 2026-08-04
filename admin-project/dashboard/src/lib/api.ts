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
  return res.json()
}

export const api = {
  login: (username: string, password: string) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  getArticles: () => request('/articles'),
  createArticle: (data: any) => request('/articles', { method: 'POST', body: JSON.stringify(data) }),
  updateArticle: (id: string, data: any) => request(`/articles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteArticle: (id: string) => request(`/articles/${id}`, { method: 'DELETE' }),
  getContacts: () => request('/contacts'),
  deleteContact: (id: string) => request(`/contacts/${id}`, { method: 'DELETE' }),
  getNewsletter: () => request('/newsletter'),
  deleteSubscriber: (id: string) => request(`/newsletter/${id}`, { method: 'DELETE' }),
  getLandingPages: () => request('/landing-pages'),
  createLandingPage: (data: any) => request('/landing-pages', { method: 'POST', body: JSON.stringify(data) }),
  updateLandingPage: (id: string, data: any) => request(`/landing-pages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteLandingPage: (id: string) => request(`/landing-pages/${id}`, { method: 'DELETE' }),
  getRedirects: () => request('/redirects'),
  createRedirect: (data: any) => request('/redirects', { method: 'POST', body: JSON.stringify(data) }),
  deleteRedirect: (id: string) => request(`/redirects/${id}`, { method: 'DELETE' }),
}
