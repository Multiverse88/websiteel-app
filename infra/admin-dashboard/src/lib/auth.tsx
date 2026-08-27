import { createContext, useContext, useState, type ReactNode } from 'react'
import { api } from './api'

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
    const saved = localStorage.getItem('admin_user')
    return saved ? JSON.parse(saved) : null
  })
  // Derived, not separate state — logout() used to set user to null without
  // also flipping a standalone isAuthenticated flag, so the Router (which
  // checks isAuthenticated) never noticed the logout: hash briefly became
  // #/login but its own effect immediately bounced back to #/dashboard
  // because isAuthenticated was still stuck at true. Deriving it removes
  // the second source of truth so it can't go out of sync again.
  const isAuthenticated = !!user

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
    localStorage.removeItem('admin_user')
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_jwt')
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
