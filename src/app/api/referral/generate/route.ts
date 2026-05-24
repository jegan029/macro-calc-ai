import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/clerk'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const clerkId = await requireAuth()

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { referralCode: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://macrocalc.ai'
    const referralUrl = `${appUrl}/api/referral/track?code=${user.referralCode}`

    return NextResponse.json({ code: user.referralCode, url: referralUrl })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
