import { useState, useEffect, type ReactNode } from 'react'
import { AuthProvider, useAuth } from './lib/auth'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Articles from './pages/Articles'
import Contacts from './pages/Contacts'
import Newsletter from './pages/Newsletter'
import LandingPages from './pages/LandingPages'
import Redirects from './pages/Redirects'
import EmailBlast from './pages/EmailBlast'
import ArticleEditor from './pages/ArticleEditor'
import NewsletterEditor from './pages/NewsletterEditor'
import NewsletterSettings from './pages/NewsletterSettings'
import Tracking from './pages/Tracking'


function normalizePathToHash() {
  const { pathname, hash } = window.location
  const base = '/dashboard/'
  if (pathname.startsWith(base)) {
    const sub = pathname.slice(base.length).replace(/\/$/, '')
    if (sub && !hash) {
      window.location.replace(base + '#/' + sub)
      return
    }
  }
  const baseNoSlash = '/dashboard'
  if (pathname === baseNoSlash && !hash) {
    window.location.replace(baseNoSlash + '#/dashboard')
  }
}

function ensureCorrectDomain() {
  const host = window.location.hostname
  const correctHosts = ['admin.easylegal.my.id', 'localhost', '127.0.0.1']
  if (!correctHosts.includes(host) && !host.endsWith('.local')) {
    window.location.replace('https://admin.easylegal.my.id/dashboard/')
    return true
  }
  return false
}

function Router() {
  const { isAuthenticated } = useAuth()
  const [hash, setHash] = useState(window.location.hash || '#/dashboard')

  useEffect(() => {
    if (ensureCorrectDomain()) return
    normalizePathToHash()
  }, [])

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#/dashboard')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!isAuthenticated && hash !== '#/login') {
      window.location.hash = '#/login'
    } else if (isAuthenticated && (hash === '#/login' || hash === '')) {
      window.location.hash = '#/dashboard'
    }
  }, [isAuthenticated, hash])

  if (!isAuthenticated) return <Login />

  const routeWithQuery = hash.replace('#', '') || '/dashboard'
  const route = routeWithQuery.split('?')[0]

  const pages: Record<string, ReactNode> = {
    '/dashboard': <Dashboard />,
    '/articles': <Articles />,
    '/articles/tambah': <ArticleEditor />,
    '/contacts': <Contacts />,
    '/newsletter': <Newsletter />,
    '/landing-pages': <LandingPages />,
    '/redirects': <Redirects />,
    '/email-blast': <EmailBlast />,
    '/email-blast/tambah': <NewsletterEditor />,
    '/newsletter/settings': <NewsletterSettings />,
    '/tracking': <Tracking />,
  }

  return <Layout>{pages[route] || <Dashboard />}</Layout>
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
