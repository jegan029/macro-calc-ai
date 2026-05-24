import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }
  return Redis.fromEnv()
}

const redis = getRedis()

export const calculatorRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 m'),
      analytics: true,
      prefix: 'macro:calc',
    })
  : null

export const mealPlanRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'),
      analytics: true,
      prefix: 'macro:meal',
    })
  : null

export const emailCaptureRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1 h'),
      analytics: true,
      prefix: 'macro:email',
    })
  : null

export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ success: boolean; remaining: number }> {
  if (!limiter) return { success: true, remaining: 99 }
  const result = await limiter.limit(identifier)
  return { success: result.success, remaining: result.remaining }
}
