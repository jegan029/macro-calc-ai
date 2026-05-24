import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? '/'

  if (!code) return NextResponse.redirect(`${appUrl}/calculator`)

  const referrer = await prisma.user.findUnique({
    where: { referralCode: code },
    select: { id: true },
  })

  const response = NextResponse.redirect(`${appUrl}/calculator`)

  if (referrer) {
    response.cookies.set('ref', code, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
    })
  }

  return response
}
