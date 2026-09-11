interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimits = new Map<string, RateLimitEntry>();

export const rateLimit = (
  ip: string,
  maxRequests: number = 10,
  windowMs: number = 60 * 1000 // 1 minute default
): { success: boolean; remaining: number } => {
  const now = Date.now();
  
  // Cleanup expired entries periodically (simplistic approach for in-memory)
  if (Math.random() < 0.05) {
    for (const [key, entry] of rateLimits.entries()) {
      if (now > entry.resetTime) {
        rateLimits.delete(key);
      }
    }
  }

  let entry = rateLimits.get(ip);
  
  if (!entry || now > entry.resetTime) {
    entry = { count: 1, resetTime: now + windowMs };
    rateLimits.set(ip, entry);
    return { success: true, remaining: maxRequests - 1 };
  }
  
  if (entry.count >= maxRequests) {
    return { success: false, remaining: 0 };
  }
  
  entry.count++;
  return { success: true, remaining: maxRequests - entry.count };
};
