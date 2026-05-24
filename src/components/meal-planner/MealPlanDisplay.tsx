'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/shared/GlassCard'
import type { MealPlanData, DayPlan } from '@/types/meal-plan'
import { Clock, ChefHat, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MealCardProps {
  label: string
  meal: DayPlan['breakfast']
}

function MealCard({ label, meal }: MealCardProps) {
  return (
    <div className="glass rounded-xl p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-neon">{label}</span>
        {meal.prepTime && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" />
            {meal.prepTime}
          </div>
        )}
      </div>
      <p className="font-semibold">{meal.name}</p>
      <p className="text-sm text-muted-foreground">{meal.description}</p>
      <div className="flex gap-3 text-xs">
        <span className="text-neon">{meal.calories} cal</span>
        <span className="text-blue-400">{meal.protein}g P</span>
        <span className="text-purple-400">{meal.carbs}g C</span>
        <span className="text-orange-400">{meal.fat}g F</span>
      </div>
    </div>
  )
}

export function MealPlanDisplay({ plan }: { plan: MealPlanData }) {
  const [openDay, setOpenDay] = useState<number>(0)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ChefHat className="size-5 text-neon" />
        <h3 className="font-semibold text-lg">Your 7-Day Plan</h3>
      </div>

      {plan.summary && (
        <GlassCard className="p-4 text-sm text-muted-foreground">
          {plan.summary}
        </GlassCard>
      )}

      <div className="space-y-3">
        {plan.days?.map((day, i) => (
          <div key={i} className="glass rounded-xl px-5 border border-white/10">
            <button
              onClick={() => setOpenDay(openDay === i ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 py-4"
            >
              <div className="flex items-center gap-3">
                <span className={cn('font-semibold transition-colors', openDay === i ? 'text-neon' : 'text-foreground')}>
                  {day.day}
                </span>
                <span className="text-xs text-muted-foreground">
                  {day.totalCalories} cal · {day.totalProtein}g protein
                </span>
              </div>
              <ChevronDown
                className={cn('size-4 flex-shrink-0 text-muted-foreground transition-transform', openDay === i && 'rotate-180')}
              />
            </button>
            <AnimatePresence>
              {openDay === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 space-y-3">
                    <MealCard label="Breakfast" meal={day.breakfast} />
                    <MealCard label="Lunch" meal={day.lunch} />
                    <MealCard label="Dinner" meal={day.dinner} />
                    {day.snacks?.map((snack, si) => (
                      <MealCard key={si} label={`Snack ${si + 1}`} meal={snack} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {plan.tips?.length > 0 && (
        <GlassCard>
          <h4 className="font-semibold mb-3">Tips</h4>
          <ul className="space-y-2">
            {plan.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-neon flex-shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </GlassCard>
      )}
    </div>
  )
}
