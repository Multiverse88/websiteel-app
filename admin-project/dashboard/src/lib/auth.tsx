import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
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
  const [isAuthenticated, setIsAuthenticated] = useState(!!user)

  const login = async (username: string, password: string) => {
    try {
      const res = await api.login(username, password)
      
      const token = res.token
      localStorage.setItem('admin_token', token)
      
      const userData: User = { username, token }
      localStorage.setItem('admin_user', JSON.stringify(userData))
      setUser(userData)
      setIsAuthenticated(true)
      window.location.hash = '#/dashboard'
    } catch (err: any) {
      throw new Error(err.message || 'Login failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_user')
    localStorage.removeItem('admin_token')
    setUser(null)
    window.location.hash = '#/login'
  }

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (user && !token) {
      localStorage.setItem('admin_token', user.token)
    }
  }, [user])

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
