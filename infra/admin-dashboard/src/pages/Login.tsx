import { useState, type FormEvent } from 'react'
import { useAuth } from '../lib/auth'

export default function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
    } catch (err: any) {
      setError(err.message || 'Login gagal, periksa kredensial Anda')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6f0000]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-[28px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] border border-[#6f0000]/10 flex items-center justify-center text-[#6f0000] mx-auto mb-4">
            <span className="material-symbols-outlined text-2xl font-bold">gavel</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-sans">EasyLegal Admin</h1>
          <p className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest mt-1">Sistem Manajemen Legalitas</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-gray-500 mb-1.5">Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">person</span>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] outline-none transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@easylegal.my.id"
                autoComplete="username"
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-gray-500 mb-1.5">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">lock</span>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#6f0000] hover:bg-[#7A0101] text-white rounded-xl font-semibold text-sm shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">EasyLegal Enterprise Portal &copy; 2026</p>
        </div>
      </div>
    </div>
  )
}
