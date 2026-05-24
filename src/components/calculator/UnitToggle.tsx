'use client'

import { cn } from '@/lib/utils'
import type { Unit } from '@/types'

interface UnitToggleProps {
  value: Unit
  onChange: (unit: Unit) => void
}

export function UnitToggle({ value, onChange }: UnitToggleProps) {
  return (
    <div className="flex rounded-lg border border-white/10 p-1 bg-white/5 w-fit">
      {(['KG', 'LBS'] as Unit[]).map((unit) => (
        <button
          key={unit}
          type="button"
          onClick={() => onChange(unit)}
          className={cn(
            'px-4 py-1.5 text-sm font-semibold rounded-md transition-all duration-200',
            value === unit
              ? 'bg-neon text-black'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {unit}
        </button>
      ))}
    </div>
  )
}
