// In-memory rate limiter and account lockout
// For production, consider using Redis for distributed rate limiting

interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();
const twoFactorAttempts = new Map<string, RateLimitEntry>();

const MAX_ENTRIES = 10000;

function setWithLimit<K, V>(map: Map<K, V>, key: K, value: V) {
  if (!map.has(key) && map.size >= MAX_ENTRIES) {
    const firstKey = map.keys().next().value;
    if (firstKey !== undefined) {
      map.delete(firstKey);
    }
  }
  map.set(key, value);
}

function cleanMap(map: Map<string, RateLimitEntry>, maxAgeMs: number) {
  const now = Date.now();
  for (const [key, entry] of map.entries()) {
    if (!entry.lockedUntil && now - entry.lastAttempt > maxAgeMs) {
      map.delete(key);
    }
    if (entry.lockedUntil && now > entry.lockedUntil) {
      map.delete(key);
    }
  }
}

// Clean up old entries every 15 minutes
setInterval(() => {
  cleanMap(loginAttempts, 60 * 60 * 1000);
  cleanMap(twoFactorAttempts, 60 * 60 * 1000);
}, 15 * 60 * 1000);

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000;
const ATTEMPT_WINDOW = 15 * 60 * 1000;

const TWO_FACTOR_MAX_ATTEMPTS = 5;
const TWO_FACTOR_LOCKOUT_DURATION = 5 * 60 * 1000;
const TWO_FACTOR_ATTEMPT_WINDOW = 5 * 60 * 1000;

function checkLimit(map: Map<string, RateLimitEntry>, identifier: string, windowMs: number): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = map.get(identifier);

  if (!entry) return { allowed: true };

  if (entry.lockedUntil) {
    if (now < entry.lockedUntil) {
      return { allowed: false, retryAfter: Math.ceil((entry.lockedUntil - now) / 1000) };
    }
    map.delete(identifier);
    return { allowed: true };
  }

  if (now - entry.lastAttempt > windowMs) {
    map.delete(identifier);
    return { allowed: true };
  }

  return { allowed: true };
}

function recordAttempt(map: Map<string, RateLimitEntry>, identifier: string, maxAttempts: number, lockoutMs: number, windowMs: number): { locked: boolean; retryAfter?: number } {
  const now = Date.now();
  let entry = map.get(identifier);

  if (!entry) {
    entry = { attempts: 0, lastAttempt: now };
    setWithLimit(map, identifier, entry);
  }

  if (now - entry.lastAttempt > windowMs) {
    entry.attempts = 0;
  }

  entry.attempts++;
  entry.lastAttempt = now;

  if (entry.attempts >= maxAttempts) {
    entry.lockedUntil = now + lockoutMs;
    return { locked: true, retryAfter: Math.ceil(lockoutMs / 1000) };
  }

  return { locked: false };
}

// Login rate limit
export function checkRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
  return checkLimit(loginAttempts, identifier, ATTEMPT_WINDOW);
}

export function recordFailedAttempt(identifier: string): { locked: boolean; retryAfter?: number } {
  return recordAttempt(loginAttempts, identifier, MAX_ATTEMPTS, LOCKOUT_DURATION, ATTEMPT_WINDOW);
}

export function resetAttempts(identifier: string) {
  loginAttempts.delete(identifier);
}

export function getRemainingAttempts(identifier: string): number {
  const entry = loginAttempts.get(identifier);
  if (!entry) return MAX_ATTEMPTS;
  return Math.max(0, MAX_ATTEMPTS - entry.attempts);
}

// 2FA rate limit
export function checkTwoFactorRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
  return checkLimit(twoFactorAttempts, identifier, TWO_FACTOR_ATTEMPT_WINDOW);
}

export function recordTwoFactorFailedAttempt(identifier: string): { locked: boolean; retryAfter?: number } {
  return recordAttempt(twoFactorAttempts, identifier, TWO_FACTOR_MAX_ATTEMPTS, TWO_FACTOR_LOCKOUT_DURATION, TWO_FACTOR_ATTEMPT_WINDOW);
}

export function resetTwoFactorAttempts(identifier: string) {
  twoFactorAttempts.delete(identifier);
}
