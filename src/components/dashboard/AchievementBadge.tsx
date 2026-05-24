import { cn } from '@/lib/utils'
import { Trophy } from 'lucide-react'
import type { Achievement } from '@/types'

interface AchievementBadgeProps {
  achievement: Achievement
  earned?: boolean
}

export function AchievementBadge({ achievement, earned = false }: AchievementBadgeProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all',
        earned
          ? 'border-neon/30 bg-neon/5'
          : 'border-white/5 bg-white/2 opacity-40 grayscale'
      )}
    >
      <div
        className={cn(
          'size-10 rounded-full flex items-center justify-center',
          earned ? 'bg-neon/20' : 'bg-white/5'
        )}
      >
        <Trophy className={cn('size-5', earned ? 'text-neon' : 'text-muted-foreground')} />
      </div>
      <div>
        <p className="text-xs font-semibold leading-tight">{achievement.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{achievement.points} pts</p>
      </div>
    </div>
  )
}
