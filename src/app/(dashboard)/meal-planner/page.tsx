'use client'

import { MealPlannerForm } from '@/components/meal-planner/MealPlannerForm'
import { MealPlanDisplay } from '@/components/meal-planner/MealPlanDisplay'
import { GroceryList } from '@/components/meal-planner/GroceryList'
import { useMealPlanStore } from '@/store/useMealPlanStore'

export default function MealPlannerPage() {
  const { plan, grocery } = useMealPlanStore()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">AI Meal Planner</h1>
        <p className="text-muted-foreground">
          Generate a personalized 7-day meal plan powered by GPT-4.
        </p>
      </div>

      <MealPlannerForm />

      {plan && <MealPlanDisplay plan={plan} />}
      {grocery && <GroceryList grocery={grocery} />}
    </div>
  )
}
