import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId }, select: { id: true } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const logs = await prisma.progressLog.findMany({
    where: { userId: user.id },
    orderBy: { loggedAt: 'asc' },
    take: 90,
  })

  return NextResponse.json({ logs })
}

const logSchema = z.object({
  weightKg: z.number().min(20).max(500),
  notes: z.string().max(500).optional(),
})

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId }, select: { id: true } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const body = await req.json()
  const parsed = logSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const log = await prisma.progressLog.create({
    data: { userId: user.id, ...parsed.data },
  })

  return NextResponse.json({ log }, { status: 201 })
}
