import { useState } from 'react'
import { useAuth } from '../lib/auth'

const navItems = [
  { label: 'Dashboard', icon: '📊', hash: '#/dashboard' },
  { label: 'Articles', icon: '📝', hash: '#/articles' },
  { label: 'Contacts', icon: '✉️', hash: '#/contacts' },
  { label: 'Newsletter', icon: '📰', hash: '#/newsletter' },
  { label: 'Landing Pages', icon: '🌐', hash: '#/landing-pages' },
  { label: 'Redirects', icon: '🔀', hash: '#/redirects' },
]

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { logout, user } = useAuth()
  const currentHash = window.location.hash || '#/dashboard'

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar-brand">
          <span className="sidebar-logo">E</span>
          <span className="sidebar-brand-text">EasyLegal</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <a
              key={item.hash}
              href={item.hash}
              className={`sidebar-link ${currentHash === item.hash ? 'sidebar-link--active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span className="sidebar-link-label">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">{user?.username}</div>
          <button className="sidebar-logout" onClick={logout}>
            ↪ Logout
          </button>
        </div>
      </aside>
    </>
  )
}
