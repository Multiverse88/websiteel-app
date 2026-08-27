import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { api } from './api'
import {
  clearSession,
  getJwtExpirationMs,
  readStoredUser,
  SESSION_EXPIRED_EVENT,
} from './session'

interface User {
  username: string
  token: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    return readStoredUser()
  })
  const isAuthenticated = user !== null

  useEffect(() => {
    const handleExpiredSession = () => {
      setUser(null)
      window.location.hash = '#/login'
    }
    window.addEventListener(SESSION_EXPIRED_EVENT, handleExpiredSession)
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleExpiredSession)
  }, [])

  useEffect(() => {
    if (!user) return

    const expiresAt = getJwtExpirationMs(user.token)
    const remainingMs = expiresAt === null ? 0 : expiresAt - Date.now()
    if (remainingMs <= 0) {
      clearSession()
      setUser(null)
      window.location.hash = '#/login'
      return
    }

    const expiryTimer = window.setTimeout(() => {
      clearSession()
      setUser(null)
      window.location.hash = '#/login'
    }, Math.min(remainingMs, 2_147_483_647))

    const syncSessionAcrossTabs = (event: StorageEvent) => {
      if (event.key === 'admin_jwt' || event.key === 'admin_user') {
        const storedUser = readStoredUser()
        setUser(storedUser)
        if (!storedUser) window.location.hash = '#/login'
      }
    }
    window.addEventListener('storage', syncSessionAcrossTabs)

    return () => {
      window.clearTimeout(expiryTimer)
      window.removeEventListener('storage', syncSessionAcrossTabs)
    }
  }, [user])

  const login = async (username: string, password: string) => {
    try {
      // api.login() already persists the admin-api JWT (admin_jwt) and the
      // PostgREST token (admin_token) — this just tracks the "who's logged
      // in" bit for the UI.
      const res = await api.login(username, password)
      const userData: User = { username, token: res.token }
      localStorage.setItem('admin_user', JSON.stringify(userData))
      setUser(userData)
      window.location.hash = '#/dashboard'
    } catch (err: any) {
      throw new Error(err.message || 'Login failed')
    }
  }

  const logout = () => {
    clearSession()
    setUser(null)
    window.location.hash = '#/login'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
