// Simple in-memory rate limiter - works on single instance / serverless with caveat
// For production at scale, replace with Redis (Upstash) - interface stays same
type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

// Cleanup every 10 min
if (typeof global !== "undefined" && !(global as any).__rateLimitCleanup) {
  (global as any).__rateLimitCleanup = setInterval(() => {
    const now = Date.now();
    for (const [k, v] of store.entries()) {
      if (v.resetAt < now) store.delete(k);
    }
  }, 10 * 60 * 1000);
  // prevent Node from keeping process alive just for this
  if ((global as any).__rateLimitCleanup.unref) (global as any).__rateLimitCleanup.unref();
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
  retryAfterMs?: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  store.set(key, entry);
  return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  // NextRequest ip fallback
  const anyReq = req as any;
  if (anyReq.ip) return anyReq.ip;
  return "unknown";
}

export function honeypotCheck(body: any): boolean {
  // If any honeypot field is filled, it's a bot
  // We check common honeypot names
  const traps = ["website", "company", "phone2", "url"];
  for (const t of traps) {
    if (body[t] && String(body[t]).trim() !== "") return true;
  }
  return false;
}
