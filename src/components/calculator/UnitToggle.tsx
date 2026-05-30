'use client'

import { cn } from '@/lib/utils'
import type { Unit } from '@/types'

interface UnitToggleProps {
  value: Unit
  onChange: (unit: Unit) => void
}

export function UnitToggle({ value, onChange }: UnitToggleProps) {
  return (
    <div className="flex rounded-lg border border-border p-1 bg-muted/40 w-fit">
      {(['KG', 'LBS'] as Unit[]).map((unit) => (
        <button
          key={unit}
          type="button"
          onClick={() => onChange(unit)}
          className={cn(
            'px-4 py-1.5 text-sm font-semibold rounded-md transition-all duration-200',
            value === unit
              ? 'bg-neon text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {unit}
        </button>
      ))}
    </div>
  )
}
