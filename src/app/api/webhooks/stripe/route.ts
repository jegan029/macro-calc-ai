import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import type Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const subscriptionId = session.subscription as string
      const customerId = session.customer as string

      if (!subscriptionId || !customerId) break

      const subscription = await stripe.subscriptions.retrieve(subscriptionId)

      await prisma.subscription.update({
        where: { stripeCustomerId: customerId },
        data: {
          stripeSubscriptionId: subscriptionId,
          stripePriceId: subscription.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: subscription.items.data[0]?.current_period_end
            ? new Date(subscription.items.data[0].current_period_end * 1000)
            : null,
          status: 'ACTIVE',
        },
      })

      const sub = await prisma.subscription.findUnique({
        where: { stripeCustomerId: customerId },
        select: { userId: true },
      })
      if (sub) {
        await prisma.user.update({
          where: { id: sub.userId },
          data: { role: 'PREMIUM' },
        })
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const status = subscription.status === 'active' ? 'ACTIVE'
        : subscription.status === 'past_due' ? 'PAST_DUE'
        : subscription.status === 'canceled' ? 'CANCELED'
        : subscription.status === 'trialing' ? 'TRIALING'
        : 'FREE'

      await prisma.subscription.update({
        where: { stripeCustomerId: subscription.customer as string },
        data: {
          status: status as never,
          stripeCurrentPeriodEnd: subscription.items.data[0]?.current_period_end
            ? new Date(subscription.items.data[0].current_period_end * 1000)
            : null,
          stripePriceId: subscription.items.data[0]?.price.id,
        },
      }).catch(() => {})
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const sub = await prisma.subscription.findUnique({
        where: { stripeCustomerId: customerId },
        select: { userId: true },
      })

      await prisma.subscription.update({
        where: { stripeCustomerId: customerId },
        data: { status: 'CANCELED', stripeSubscriptionId: null },
      }).catch(() => {})

      if (sub) {
        await prisma.user.update({
          where: { id: sub.userId },
          data: { role: 'USER' },
        }).catch(() => {})
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
