import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  // Fail loud at startup rather than silently signing/verifying with a
  // guessable fallback (the old code used 'supersecretkey' as a default).
  throw new Error("JWT_SECRET env var is required");
}

export interface AuthedRequest extends Request {
  userId?: string;
}

function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length);
  }
  const cookieToken = (req as any).cookies?.admin_token;
  return cookieToken || null;
}

/**
 * Requires a valid JWT (from the admin_token cookie or an Authorization:
 * Bearer header). Attaches `userId` to the request on success; responds
 * 401 otherwise. Apply this to every route that isn't intentionally public
 * (public article/landing-page reads, newsletter subscribe/unsubscribe,
 * lead capture, tracking pixels).
 */
export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: missing token" });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET as string) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized: invalid or expired token" });
  }
}

/**
 * Shared-secret check for machine-to-machine calls (cron/queue processing)
 * that don't have a logged-in user. Expects `Authorization: Bearer <CRON_SECRET>`.
 */
export function requireCronSecret(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "CRON_SECRET not configured" });
  }
  const authHeader = req.headers.authorization;
  const provided = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;
  if (provided !== secret) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
