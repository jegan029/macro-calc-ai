import { GlassCard } from '@/components/shared/GlassCard'
import { Flame } from 'lucide-react'

interface StreakCardProps {
  streak: number
  totalPoints: number
}

export function StreakCard({ streak, totalPoints }: StreakCardProps) {
  return (
    <GlassCard className="flex items-center gap-4" neonBorder={streak > 0}>
      <div className="size-14 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
        <Flame className="size-7 text-orange-400" />
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-orange-400">{streak}</span>
          <span className="text-sm text-muted-foreground">day streak</span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {totalPoints} total points earned
        </p>
      </div>
    </GlassCard>
  )
}
