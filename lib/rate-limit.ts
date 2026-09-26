import "server-only";

/**
 * A small fixed-window rate limiter, in memory.
 *
 * WHY IT EXISTS. /manage authenticates with a booking reference plus the email
 * that made the booking. That is the standard airline pattern and it is fine
 * for a human, but it is guessable to a script: references are short and an
 * attacker who knows a customer's email can hammer references until one hits.
 * Rate limiting is what turns "guessable" into "not worth trying".
 *
 * WHAT IT IS NOT. Be clear-eyed about the limits before trusting this:
 *
 *   - PER PROCESS. Two server instances mean two independent counters and
 *     double the real allowance. On serverless it resets on every cold start.
 *   - IN MEMORY. A restart forgets everything.
 *   - KEYED ON A CLIENT-CONTROLLED HEADER. `x-forwarded-for` can be spoofed
 *     unless a proxy you control overwrites it. Behind Vercel or a properly
 *     configured nginx it is trustworthy; served directly it is not.
 *
 * It therefore raises the cost of a casual attack and does not stop a
 * determined distributed one. When this needs to be real, move the counter to
 * Redis or the database and key it on something you can trust.
 */

interface Window {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Window>();

/** Stops the map growing without bound on a long-lived process. */
function sweep(now: number) {
  if (buckets.size < 5_000) return;
  for (const [key, w] of buckets) {
    if (w.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** Whole seconds until the window resets. Only meaningful when !ok. */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  return { ok: true, retryAfter: 0 };
}

/**
 * Best-effort client identifier.
 *
 * Falls back to a single shared bucket when no forwarding header is present,
 * which is deliberately strict: an unknown client should share the allowance
 * rather than get an unlimited one of its own.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
