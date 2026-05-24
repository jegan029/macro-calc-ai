'use client'

import { Slider } from '@/components/ui/slider'
import type { ActivityLevel } from '@/types'
import { ACTIVITY_LABELS, ACTIVITY_DESCRIPTIONS } from '@/types'

const ACTIVITY_LEVELS: ActivityLevel[] = ['SEDENTARY', 'LIGHT', 'MODERATE', 'HIGH', 'ATHLETE']

interface ActivitySliderProps {
  value: ActivityLevel
  onChange: (level: ActivityLevel) => void
}

export function ActivitySlider({ value, onChange }: ActivitySliderProps) {
  const index = ACTIVITY_LEVELS.indexOf(value)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-foreground">{ACTIVITY_LABELS[value]}</p>
          <p className="text-sm text-muted-foreground">{ACTIVITY_DESCRIPTIONS[value]}</p>
        </div>
        <span className="text-xs font-mono bg-neon/10 text-neon px-2 py-1 rounded-md border border-neon/20">
          {index + 1}/5
        </span>
      </div>
      <Slider
        min={0}
        max={4}
        step={1}
        value={[index]}
        onValueChange={(vals) => { const i = Array.isArray(vals) ? vals[0] : vals as number; onChange(ACTIVITY_LEVELS[i]) }}
        className="[&_[data-slot=slider-thumb]]:bg-neon [&_[data-slot=slider-track]]:bg-neon/30 [&_[data-slot=slider-range]]:bg-neon"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Sedentary</span>
        <span>Athlete</span>
      </div>
    </div>
  )
}
