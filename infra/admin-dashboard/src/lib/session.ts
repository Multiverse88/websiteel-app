export const SESSION_EXPIRED_EVENT = 'easylegal:session-expired'

const SESSION_KEYS = [
  'admin_user',
  'admin_jwt',
  'admin_userId',
  'admin_token',
] as const

interface JwtPayload {
  exp?: number
  userId?: string
}

interface StoredAdminUser {
  username: string
  token: string
}

type SessionStorage = Pick<Storage, 'getItem' | 'removeItem'>

function decodeBase64Url(value: string): string {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  return atob(padded)
}

export function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    return JSON.parse(decodeBase64Url(payload)) as JwtPayload
  } catch {
    return null
  }
}

export function isJwtValid(token: string | null, nowMs = Date.now()): token is string {
  if (!token) return false
  const payload = parseJwtPayload(token)
  if (!payload?.userId || typeof payload.exp !== 'number') return false
  return payload.exp * 1000 > nowMs
}

export function getJwtExpirationMs(token: string): number | null {
  const payload = parseJwtPayload(token)
  return typeof payload?.exp === 'number' ? payload.exp * 1000 : null
}

export function clearSession(storage: SessionStorage = localStorage): void {
  for (const key of SESSION_KEYS) storage.removeItem(key)
}

export function getValidAuthToken(
  storage: SessionStorage = localStorage,
  nowMs = Date.now(),
): string | null {
  const token = storage.getItem('admin_jwt')
  if (isJwtValid(token, nowMs)) return token
  clearSession(storage)
  return null
}

export function readStoredUser(
  storage: SessionStorage = localStorage,
  nowMs = Date.now(),
): StoredAdminUser | null {
  const serializedUser = storage.getItem('admin_user')
  const token = getValidAuthToken(storage, nowMs)
  if (!serializedUser || !token) return null

  try {
    const user = JSON.parse(serializedUser) as Partial<StoredAdminUser>
    if (typeof user.username !== 'string' || !user.username) {
      clearSession(storage)
      return null
    }
    return { username: user.username, token }
  } catch {
    clearSession(storage)
    return null
  }
}

export function expireSession(): void {
  clearSession()
  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT))
}
