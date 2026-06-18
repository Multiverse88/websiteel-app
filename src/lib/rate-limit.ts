// In-memory rate limiter and account lockout
// For production, consider using Redis for distributed rate limiting

interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();

// Clean up old entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of loginAttempts.entries()) {
    // Remove entries older than 1 hour (unless locked)
    if (!entry.lockedUntil && now - entry.lastAttempt > 60 * 60 * 1000) {
      loginAttempts.delete(key);
    }
    // Remove expired lockouts
    if (entry.lockedUntil && now > entry.lockedUntil) {
      loginAttempts.delete(key);
    }
  }
}, 15 * 60 * 1000);

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW = 15 * 60 * 1000; // 15 minutes window for attempts

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = loginAttempts.get(identifier);

  if (!entry) {
    return { allowed: true };
  }

  // Check if account is locked
  if (entry.lockedUntil) {
    if (now < entry.lockedUntil) {
      const retryAfter = Math.ceil((entry.lockedUntil - now) / 1000);
      return { allowed: false, retryAfter };
    }
    // Lockout expired, reset
    loginAttempts.delete(identifier);
    return { allowed: true };
  }

  // Check if attempts window has expired
  if (now - entry.lastAttempt > ATTEMPT_WINDOW) {
    loginAttempts.delete(identifier);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedAttempt(identifier: string): { locked: boolean; retryAfter?: number } {
  const now = Date.now();
  let entry = loginAttempts.get(identifier);

  if (!entry) {
    entry = { attempts: 0, lastAttempt: now };
    loginAttempts.set(identifier, entry);
  }

  // Check if attempts window has expired
  if (now - entry.lastAttempt > ATTEMPT_WINDOW) {
    entry.attempts = 0;
  }

  entry.attempts++;
  entry.lastAttempt = now;

  // Lock account if max attempts reached
  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_DURATION;
    const retryAfter = Math.ceil(LOCKOUT_DURATION / 1000);
    return { locked: true, retryAfter };
  }

  return { locked: false };
}

export function resetAttempts(identifier: string) {
  loginAttempts.delete(identifier);
}

export function getRemainingAttempts(identifier: string): number {
  const entry = loginAttempts.get(identifier);
  if (!entry) return MAX_ATTEMPTS;
  return Math.max(0, MAX_ATTEMPTS - entry.attempts);
}
