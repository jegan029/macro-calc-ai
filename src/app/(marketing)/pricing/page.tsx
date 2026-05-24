'use client'

import { useState } from 'react'
import { PricingCard } from '@/components/pricing/PricingCard'
import { NeonButton } from '@/components/shared/NeonButton'
import { PLAN_PRICES } from '@/lib/stripe'

const FREE_FEATURES = [
  'Instant macro calculation',
  'Calories, protein, carbs, fat, fiber',
  'PDF report download',
  'Shareable results card',
  'Basic meal plan template',
  '3 AI meal plans/month',
]

const PREMIUM_FEATURES = [
  'Everything in Free',
  'Unlimited AI meal plans',
  'GPT-4 powered recommendations',
  'Grocery list generator',
  'Cuisine customization (8 styles)',
  'Progress tracking & trends',
  'Achievement system',
  'Priority support',
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-background bg-grid bg-spotlight py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Simple, <span className="text-neon">Transparent</span> Pricing
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Start free. Upgrade when you're ready to go all-in.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1.5">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                !isYearly ? 'bg-neon text-black' : 'text-muted-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isYearly ? 'bg-neon text-black' : 'text-muted-foreground'
              }`}
            >
              Annual
              <span className="ml-1.5 text-xs bg-neon/20 text-neon rounded-full px-1.5 py-0.5">
                -33%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <PricingCard
            name="Free"
            price={0}
            period="forever"
            features={FREE_FEATURES}
            isYearly={isYearly}
          />
          <PricingCard
            name="Premium"
            price={isYearly ? Math.round(PLAN_PRICES.ANNUAL / 12) : PLAN_PRICES.MONTHLY}
            period={isYearly ? 'mo, billed annually' : 'month'}
            features={PREMIUM_FEATURES}
            priceId={isYearly ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL : process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY}
            highlighted
            badge="Most Popular"
            isYearly={isYearly}
          />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          No contracts. Cancel anytime. 7-day money-back guarantee.
        </p>
      </div>
    </div>
  )
}
