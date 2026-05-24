'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/shared/GlassCard'
import { NeonButton } from '@/components/shared/NeonButton'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface PricingCardProps {
  name: string
  price: number
  period: string
  features: string[]
  priceId?: string
  highlighted?: boolean
  badge?: string
  isYearly: boolean
}

export function PricingCard({
  name, price, period, features, priceId, highlighted = false, badge, isYearly
}: PricingCardProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    if (!priceId) {
      router.push('/calculator')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error ?? 'Checkout failed')
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      if (msg.includes('Unauthorized')) {
        router.push('/sign-in')
        return
      }
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassCard
      neonBorder={highlighted}
      className={cn(
        'relative flex flex-col h-full',
        highlighted && 'shadow-[0_0_40px_rgba(0,255,135,0.1)]'
      )}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-neon text-black text-xs font-bold px-3 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-muted-foreground text-sm">/{period}</span>
        </div>
        {isYearly && price > 0 && (
          <p className="text-xs text-neon mt-1">Save 33% vs monthly</p>
        )}
      </div>

      <ul className="space-y-3 flex-1 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check className="size-4 text-neon flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <NeonButton
        size="lg"
        className="w-full"
        variant={highlighted ? 'solid' : 'outline'}
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? 'Loading...' : priceId ? 'Start Premium' : 'Get Started Free'}
      </NeonButton>
    </GlassCard>
  )
}
