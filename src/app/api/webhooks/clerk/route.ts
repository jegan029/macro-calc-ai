import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'
import type { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const svixId = req.headers.get('svix-id')
  const svixTimestamp = req.headers.get('svix-timestamp')
  const svixSignature = req.headers.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  const payload = await req.text()

  const wh = new Webhook(webhookSecret)
  let evt: WebhookEvent
  try {
    evt = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }

  if (evt.type === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data
    const email = email_addresses[0]?.email_address
    if (!email) return NextResponse.json({ ok: true })

    const referralCode = nanoid(8)

    await prisma.user.upsert({
      where: { clerkId: id },
      update: {},
      create: {
        clerkId: id,
        email,
        name: [first_name, last_name].filter(Boolean).join(' ') || null,
        avatarUrl: image_url || null,
        referralCode,
      },
    })
  }

  if (evt.type === 'user.deleted') {
    const { id } = evt.data
    if (id) {
      await prisma.user.deleteMany({ where: { clerkId: id } })
    }
  }

  return NextResponse.json({ ok: true })
}
