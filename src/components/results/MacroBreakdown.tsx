'use client'

import { motion } from 'framer-motion'
import { MacroCard } from './MacroCard'
import { RadialChart } from './RadialChart'
import { ShareButton } from './ShareButton'
import { PdfDownloadButton } from './PdfDownloadButton'
import { GlassCard } from '@/components/shared/GlassCard'
import { getMacroPercentages, getHydrationEstimate, getMealSplit } from '@/lib/calc'
import { GOAL_LABELS } from '@/types'
import type { MacroResult, Goal } from '@/types'
import { ConfettiEffect } from '@/components/shared/ConfettiEffect'
import { Droplets, Clock, ChefHat } from 'lucide-react'
import Link from 'next/link'
import { NeonButton } from '@/components/shared/NeonButton'

interface MacroBreakdownProps {
  result: MacroResult
  goal: Goal
  firstName?: string
}

export function MacroBreakdown({ result, goal, firstName }: MacroBreakdownProps) {
  const percentages = getMacroPercentages(result)
  const hydration = getHydrationEstimate(result.calories)
  const mealSplit = getMealSplit(result.calories)

  const macros = [
    {
      label: 'Calories',
      value: result.calories,
      unit: 'kcal',
      color: '#00FF87',
      description: 'Total daily energy target',
    },
    {
      label: 'Protein',
      value: result.protein,
      unit: 'g',
      color: '#3b82f6',
      percentage: percentages.protein,
      description: 'Builds and repairs muscle',
    },
    {
      label: 'Carbs',
      value: result.carbs,
      unit: 'g',
      color: '#8b5cf6',
      percentage: percentages.carbs,
      description: 'Primary energy source',
    },
    {
      label: 'Fat',
      value: result.fat,
      unit: 'g',
      color: '#f97316',
      percentage: percentages.fat,
      description: 'Hormones & nutrient absorption',
    },
    {
      label: 'Fiber',
      value: result.fiber,
      unit: 'g',
      color: '#22d3ee',
      description: 'Gut health & satiety',
    },
  ]

  return (
    <div className="space-y-6">
      <ConfettiEffect />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-muted-foreground text-sm mb-1">
          {firstName ? `Hey ${firstName}, here are` : 'Here are'} your macros for
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold">
          <span className="text-neon">{GOAL_LABELS[goal]}</span>
        </h1>
      </motion.div>

      {/* Radial chart */}
      <GlassCard className="p-4">
        <RadialChart
          protein={result.protein}
          carbs={result.carbs}
          fat={result.fat}
          calories={result.calories}
        />
      </GlassCard>

      {/* Macro cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {macros.map((macro, i) => (
          <MacroCard
            key={macro.label}
            {...macro}
            index={i}
          />
        ))}
      </div>

      {/* Meal split */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="size-4 text-neon" />
          <h3 className="font-semibold">Suggested Meal Split</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(mealSplit).map(([meal, cals]) => (
            <div key={meal} className="text-center p-3 rounded-lg bg-white/5">
              <div className="text-lg font-bold text-neon">{cals}</div>
              <div className="text-xs text-muted-foreground capitalize">{meal}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Hydration */}
      <GlassCard>
        <div className="flex items-center gap-3">
          <Droplets className="size-5 text-blue-400" />
          <div>
            <p className="font-semibold">Daily Hydration Goal</p>
            <p className="text-muted-foreground text-sm">
              Aim for <span className="text-blue-400 font-bold">{hydration}L</span> of water per day
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Actions */}
      <div className="space-y-3">
        <ShareButton result={result} goal={goal} />
        <PdfDownloadButton result={result} goal={goal} />
        <NeonButton asChild size="lg" className="w-full gap-2">
          <Link href="/meal-planner">
            <ChefHat className="size-4" />
            View Meal Plans
          </Link>
        </NeonButton>
      </div>
    </div>
  )
}
