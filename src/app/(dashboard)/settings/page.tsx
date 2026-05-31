import type { Metadata } from 'next'
import { UserProfile } from '@clerk/nextjs'
import { GlassCard } from '@/components/shared/GlassCard'
import { Zap } from 'lucide-react'

export const metadata: Metadata = { title: 'Settings — MacroCalc AI' }

export default async function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <GlassCard className="mb-6 flex items-center gap-4">
        <div className="size-10 rounded-xl bg-neon/10 flex items-center justify-center flex-shrink-0">
          <Zap className="size-5 text-neon" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-neon">All Features Free</p>
          <p className="text-sm text-muted-foreground">Unlimited macro calculations, curated meal plans, progress tracking, and more — completely free.</p>
        </div>
      </GlassCard>

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
