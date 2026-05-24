import type { Metadata } from 'next'
import { UserProfile } from '@clerk/nextjs'
import { getDbUser } from '@/lib/clerk'
import { GlassCard } from '@/components/shared/GlassCard'
import { NeonButton } from '@/components/shared/NeonButton'
import Link from 'next/link'
import { Crown } from 'lucide-react'

export const metadata: Metadata = { title: 'Settings — MacroCalc AI' }

export default async function SettingsPage() {
  const user = await getDbUser()
  const isPremium = user?.role === 'PREMIUM' || user?.role === 'ADMIN' ||
    user?.subscription?.status === 'ACTIVE' || user?.subscription?.status === 'TRIALING'

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {!isPremium && (
        <GlassCard className="mb-6 flex items-center gap-4">
          <div className="size-10 rounded-xl bg-neon/10 flex items-center justify-center flex-shrink-0">
            <Crown className="size-5 text-neon" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold">Upgrade to Premium</p>
            <p className="text-sm text-muted-foreground">Unlock unlimited AI meal plans, progress tracking, and more.</p>
          </div>
          <NeonButton size="sm" asChild>
            <Link href="/pricing">Upgrade</Link>
          </NeonButton>
        </GlassCard>
      )}

      {isPremium && (
        <GlassCard className="mb-6 flex items-center gap-4">
          <div className="size-10 rounded-xl bg-neon/10 flex items-center justify-center flex-shrink-0">
            <Crown className="size-5 text-neon" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-neon">Premium Member</p>
            <p className="text-sm text-muted-foreground">You have access to all premium features.</p>
          </div>
          <NeonButton size="sm" variant="outline" asChild>
            <Link href="/api/stripe/portal">Manage Billing</Link>
          </NeonButton>
        </GlassCard>
      )}

      <div className="rounded-xl overflow-hidden border border-white/10">
        <UserProfile
          appearance={{
            variables: {
              colorBackground: '#0a0a0a',
              colorText: '#ffffff',
              colorTextSecondary: '#888888',
              colorInputBackground: 'rgba(255,255,255,0.05)',
              colorInputText: '#ffffff',
              borderRadius: '0.75rem',
            },
          }}
        />
      </div>
    </div>
  )
}
