import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './lib/auth'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Articles from './pages/Articles'
import Contacts from './pages/Contacts'
import Newsletter from './pages/Newsletter'
import LandingPages from './pages/LandingPages'
import Redirects from './pages/Redirects'

function Router() {
  const { isAuthenticated } = useAuth()
  const [hash, setHash] = useState(window.location.hash || '#/dashboard')

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

  const route = hash.replace('#', '') || '/dashboard'

  const pages: Record<string, JSX.Element> = {
    '/dashboard': <Dashboard />,
    '/articles': <Articles />,
    '/contacts': <Contacts />,
    '/newsletter': <Newsletter />,
    '/landing-pages': <LandingPages />,
    '/redirects': <Redirects />,
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
