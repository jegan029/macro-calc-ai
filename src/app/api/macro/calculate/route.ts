import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { calculateMacros } from '@/lib/calc'
import { checkRateLimit, calculatorRateLimit } from '@/lib/ratelimit'
import { captureEvent } from '@/lib/posthog'

const schema = z.object({
  weight: z.number().min(20).max(500),
  unit: z.enum(['KG', 'LBS']),
  goal: z.enum(['FAT_LOSS', 'MAINTENANCE', 'MUSCLE_GAIN']),
  activityLevel: z.enum(['SEDENTARY', 'LIGHT', 'MODERATE', 'HIGH', 'ATHLETE']),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  age: z.number().min(13).max(100).optional(),
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success } = await checkRateLimit(calculatorRateLimit, ip)
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const result = calculateMacros(parsed.data)

  captureEvent('server', 'calc_submitted', {
    goal: parsed.data.goal,
    unit: parsed.data.unit,
    activity_level: parsed.data.activityLevel,
  })

  return NextResponse.json({ result })
}
