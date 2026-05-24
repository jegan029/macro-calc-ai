'use client'

import { motion } from 'framer-motion'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'
import { cn } from '@/lib/utils'

interface MacroCardProps {
  label: string
  value: number
  unit?: string
  color: string
  percentage?: number
  description?: string
  index: number
}

export function MacroCard({ label, value, unit = 'g', color, percentage, description, index }: MacroCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass rounded-xl p-5 flex flex-col gap-3"
      style={{ borderColor: `${color}20` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        {percentage !== undefined && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${color}20`, color }}
          >
            {percentage}%
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <AnimatedNumber
          value={value}
          className="text-4xl font-bold tabular-nums"
          style={{ color } as React.CSSProperties}
        />
        <span className="text-lg text-muted-foreground font-medium">{unit}</span>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      )}
      {/* Progress bar */}
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: percentage ? `${Math.min(percentage, 100)}%` : '60%' }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
