'use client'

import { cn } from '@/lib/utils'
import type { Goal } from '@/types'
import { GOAL_LABELS, GOAL_DESCRIPTIONS } from '@/types'
import { TrendingDown, Minus, TrendingUp } from 'lucide-react'

const GOAL_ICONS: Record<Goal, React.ReactNode> = {
  FAT_LOSS: <TrendingDown className="size-5" />,
  MAINTENANCE: <Minus className="size-5" />,
  MUSCLE_GAIN: <TrendingUp className="size-5" />,
}

interface GoalSelectorProps {
  value: Goal
  onChange: (goal: Goal) => void
}

export function GoalSelector({ value, onChange }: GoalSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {(Object.keys(GOAL_LABELS) as Goal[]).map((goal) => (
        <button
          key={goal}
          type="button"
          onClick={() => onChange(goal)}
          className={cn(
            'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 text-center',
            value === goal
              ? 'border-neon bg-neon/10 text-neon shadow-[0_0_12px_var(--neon-glow)]'
              : 'border-border bg-white text-muted-foreground hover:border-neon/40 hover:text-foreground'
          )}
        >
          <span className={value === goal ? 'text-neon' : 'text-muted-foreground'}>
            {GOAL_ICONS[goal]}
          </span>
          <span className="text-sm font-semibold leading-tight">{GOAL_LABELS[goal]}</span>
          <span className="text-xs opacity-70 leading-tight hidden sm:block">
            {GOAL_DESCRIPTIONS[goal]}
          </span>
        </button>
      ))}
    </div>
  )
}
