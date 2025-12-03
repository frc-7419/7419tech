interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

class RateLimiter {
  private store: RateLimitStore = {}
  private maxRequests: number
  private windowMs: number

  constructor(maxRequests = 10, windowMs = 60000) { // 10 requests per minute by default
    this.maxRequests = maxRequests
    this.windowMs = windowMs
    
    // Clean up old entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000)
  }

  private cleanup() {
    const now = Date.now()
    Object.keys(this.store).forEach(key => {
      if (this.store[key].resetTime < now) {
        delete this.store[key]
      }
    })
  }

  check(identifier: string): { success: boolean; limit: number; remaining: number; resetTime: number } {
    const now = Date.now()
    const record = this.store[identifier]

    if (!record || record.resetTime < now) {
      // First request or window expired
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.windowMs
      }
      return {
        success: true,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        resetTime: this.store[identifier].resetTime
      }
    }

    if (record.count >= this.maxRequests) {
      // Rate limit exceeded
      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        resetTime: record.resetTime
      }
    }

    // Increment counter
    record.count += 1
    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - record.count,
      resetTime: record.resetTime
    }
  }
}

// Different rate limiters for different purposes
export const generalLimiter = new RateLimiter(60, 60000) // 60 requests per minute for general API
export const authLimiter = new RateLimiter(5, 60000) // 5 requests per minute for auth endpoints
export const adminLimiter = new RateLimiter(30, 60000) // 30 requests per minute for admin operations

export function getClientIP(request: Request): string {
  // Try to get real IP from various headers
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim()
  }
  
  if (realIp) {
    return realIp
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp
  }
  
  // Fallback to a generic identifier
  return 'unknown'
}

export function createRateLimitResponse(resetTime: number): Response {
  const resetTimeSeconds = Math.ceil((resetTime - Date.now()) / 1000)
  
  return new Response('Rate limit exceeded. Too many requests.', {
    status: 429,
    headers: {
      'Content-Type': 'text/plain',
      'Retry-After': resetTimeSeconds.toString(),
      'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString()
    }
  })
}

// Helper function for API routes
export async function rateLimit(
  request: Request, 
  limiter: RateLimiter = generalLimiter
): Promise<Response | null> {
  const identifier = getClientIP(request)
  const result = limiter.check(identifier)
  
  if (!result.success) {
    return createRateLimitResponse(result.resetTime)
  }
  
  return null // No rate limit hit
}
