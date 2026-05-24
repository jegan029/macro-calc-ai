import type { Metadata } from 'next'
import Link from 'next/link'
import { NeonButton } from '@/components/shared/NeonButton'
import { GlassCard } from '@/components/shared/GlassCard'
import { Gift, Users, Crown, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Refer & Earn — MacroCalc AI',
  description: 'Refer friends to MacroCalc AI and earn free Premium days, AI credits, and exclusive rewards.',
}

const REWARDS = [
  { icon: <Gift className="size-5 text-neon" />, count: '1 friend', reward: '7 days Premium free' },
  { icon: <Users className="size-5 text-blue-400" />, count: '5 friends', reward: '1 month Premium free' },
  { icon: <Crown className="size-5 text-yellow-400" />, count: '10 friends', reward: '3 months Premium + VIP badge' },
]

export default function ReferralPage() {
  return (
    <div className="min-h-screen bg-background bg-grid bg-spotlight py-24 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 rounded-full px-4 py-2 mb-6">
          <Gift className="size-4 text-neon" />
          <span className="text-sm font-medium text-neon">Refer & Earn</span>
        </div>

        <h1 className="text-5xl font-bold mb-4">
          Share MacroCalc AI,{' '}
          <span className="text-neon">Earn Rewards</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
          Invite your friends and earn free Premium access for every person who joins through your link.
        </p>

        {/* Rewards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {REWARDS.map((reward) => (
            <GlassCard key={reward.count} className="text-center">
              <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center mb-3 mx-auto">
                {reward.icon}
              </div>
              <p className="font-bold text-neon mb-1">{reward.count}</p>
              <p className="text-sm text-muted-foreground">{reward.reward}</p>
            </GlassCard>
          ))}
        </div>

        <NeonButton asChild size="xl" className="gap-3 mb-4">
          <Link href="/sign-up">
            <Zap className="size-5" />
            Sign Up to Get Your Referral Link
          </Link>
        </NeonButton>
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/dashboard" className="text-neon hover:underline">
            Go to Dashboard
          </Link>
        </p>
      </div>
    </div>
  )
}
