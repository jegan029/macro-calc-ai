import { StaticMealPlan } from '@/components/meal-planner/StaticMealPlan'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Meal Plans — MacroCalc AI' }

export default function MealPlannerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Meal Plans</h1>
        <p className="text-muted-foreground">
          Expert-curated 7-day meal plans for weight loss, maintenance, and muscle gain — completely free.
        </p>
      </div>
      <StaticMealPlan />
    </div>
  )
}
