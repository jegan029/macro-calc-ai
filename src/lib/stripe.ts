import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-04-22.dahlia',
      typescript: true,
    })
  }
  return _stripe
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripe()[prop as keyof Stripe]
  },
})

export const PLANS = {
  FREE: null,
  MONTHLY: process.env.STRIPE_PRICE_ID_MONTHLY!,
  ANNUAL: process.env.STRIPE_PRICE_ID_ANNUAL!,
} as const

export const PLAN_PRICES = {
  MONTHLY: 9.99,
  ANNUAL: 79.99,
} as const
