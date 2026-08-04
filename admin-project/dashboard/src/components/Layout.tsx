import { useState } from 'react'
import { useAuth } from '../lib/auth'
import Sidebar from './Sidebar'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/articles': 'Articles',
  '/contacts': 'Contacts',
  '/newsletter': 'Newsletter',
  '/landing-pages': 'Landing Pages',
  '/redirects': 'Redirects',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const hash = window.location.hash.replace('#', '') || '/dashboard'
  const title = pageTitles[hash] || 'Dashboard'

  return (
    <div className="layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <header className="header">
          <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <h1 className="header-title">{title}</h1>
          <div className="header-user">{user?.username}</div>
        </header>
        <div className="content-area">{children}</div>
      </main>
    </div>
  )
}
