'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/shared/GlassCard'
import { NeonButton } from '@/components/shared/NeonButton'
import { Gift, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

interface ReferralWidgetProps {
  referralCode: string
  referralCount: number
}

export function ReferralWidget({ referralCode, referralCount }: ReferralWidgetProps) {
  const [copied, setCopied] = useState(false)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://macrocalc.ai'
  const referralUrl = `${appUrl}/calculator?ref=${referralCode}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    toast.success('Referral link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-4">
        <Gift className="size-4 text-neon" />
        <h3 className="font-semibold">Refer & Earn</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Invite friends and earn free Premium days for each signup.
        You've referred <strong className="text-neon">{referralCount}</strong> friend{referralCount !== 1 ? 's' : ''}.
      </p>
      <div className="flex gap-2">
        <div className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-sm font-mono text-muted-foreground truncate border border-white/10">
          {referralUrl}
        </div>
        <NeonButton variant="outline" size="sm" onClick={handleCopy} className="flex-shrink-0">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </NeonButton>
      </div>
    </GlassCard>
  )
}
