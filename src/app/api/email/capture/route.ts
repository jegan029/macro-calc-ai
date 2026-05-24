import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { addToAudience, sendMacroReportEmail } from '@/lib/resend'
import { checkRateLimit, emailCaptureRateLimit } from '@/lib/ratelimit'
import { captureEvent } from '@/lib/posthog'

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  macros: z.object({
    calories: z.number(),
    protein: z.number(),
    fat: z.number(),
    carbs: z.number(),
    fiber: z.number(),
    weightKg: z.number(),
  }).optional(),
  goal: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success } = await checkRateLimit(emailCaptureRateLimit, ip)
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { email, firstName, macros, goal } = parsed.data

  // Fire and forget — don't block the response
  Promise.all([
    addToAudience(email, firstName),
    macros && sendMacroReportEmail(email, firstName, macros, goal ?? 'Maintenance'),
  ]).catch(() => {})

  captureEvent(email, 'email_captured', { source: 'results_gate' })

  return NextResponse.json({ success: true })
}
