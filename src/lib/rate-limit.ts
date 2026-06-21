// In-memory rate limiter and account lockout
// For production, consider using Redis for distributed rate limiting

interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();
const twoFactorAttempts = new Map<string, RateLimitEntry>();

// Clean up old entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of loginAttempts.entries()) {
    if (!entry.lockedUntil && now - entry.lastAttempt > 60 * 60 * 1000) {
      loginAttempts.delete(key);
    }
    if (entry.lockedUntil && now > entry.lockedUntil) {
      loginAttempts.delete(key);
    }
  }
  for (const [key, entry] of twoFactorAttempts.entries()) {
    if (!entry.lockedUntil && now - entry.lastAttempt > 60 * 60 * 1000) {
      twoFactorAttempts.delete(key);
    }
    if (entry.lockedUntil && now > entry.lockedUntil) {
      twoFactorAttempts.delete(key);
    }
  }
}, 15 * 60 * 1000);

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000;
const ATTEMPT_WINDOW = 15 * 60 * 1000;

const TWO_FACTOR_MAX_ATTEMPTS = 5;
const TWO_FACTOR_LOCKOUT_DURATION = 5 * 60 * 1000;
const TWO_FACTOR_ATTEMPT_WINDOW = 5 * 60 * 1000;

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

export function checkTwoFactorRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = twoFactorAttempts.get(identifier);
  if (!entry) return { allowed: true };
  if (entry.lockedUntil) {
    if (now < entry.lockedUntil) {
      return { allowed: false, retryAfter: Math.ceil((entry.lockedUntil - now) / 1000) };
    }
    twoFactorAttempts.delete(identifier);
    return { allowed: true };
  }
  if (now - entry.lastAttempt > TWO_FACTOR_ATTEMPT_WINDOW) {
    twoFactorAttempts.delete(identifier);
    return { allowed: true };
  }
  return { allowed: true };
}

export function recordTwoFactorFailedAttempt(identifier: string): { locked: boolean; retryAfter?: number } {
  const now = Date.now();
  let entry = twoFactorAttempts.get(identifier);
  if (!entry) {
    entry = { attempts: 0, lastAttempt: now };
    twoFactorAttempts.set(identifier, entry);
  }
  if (now - entry.lastAttempt > TWO_FACTOR_ATTEMPT_WINDOW) {
    entry.attempts = 0;
  }
  entry.attempts++;
  entry.lastAttempt = now;
  if (entry.attempts >= TWO_FACTOR_MAX_ATTEMPTS) {
    entry.lockedUntil = now + TWO_FACTOR_LOCKOUT_DURATION;
    return { locked: true, retryAfter: Math.ceil(TWO_FACTOR_LOCKOUT_DURATION / 1000) };
  }
  return { locked: false };
}

export function resetTwoFactorAttempts(identifier: string) {
  twoFactorAttempts.delete(identifier);
}
