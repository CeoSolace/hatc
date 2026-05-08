// A simple in‑memory rate limiter keyed by user id or IP address.
// This implementation is not distributed; for production, use a shared store like Redis.

interface Bucket {
  count: number
  expires: number
}

const buckets = new Map<string, Bucket>()

/**
 * Attempt to consume one request from the given bucket.
 * @param key Unique identifier for the client (e.g. user id or IP).
 * @param limit Maximum number of requests allowed within the window.
 * @param windowMs Window duration in milliseconds.
 * @returns True if the request is allowed, false if rate‑limited.
 */
export function consume(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || bucket.expires <= now) {
    buckets.set(key, { count: 1, expires: now + windowMs })
    return true
  }
  if (bucket.count < limit) {
    bucket.count += 1
    return true
  }
  return false
}