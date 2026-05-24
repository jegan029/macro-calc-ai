export interface Meal {
  name: string
  description: string
  calories: number
  protein: number
  carbs: number
  fat: number
  prepTime?: string
  ingredients?: string[]
}

export interface DayPlan {
  day: string
  breakfast: Meal
  lunch: Meal
  dinner: Meal
  snacks?: Meal[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
}

export interface GroceryCategory {
  category: string
  items: string[]
}

export interface MealPlanData {
  days: DayPlan[]
  summary: string
  tips: string[]
}

export type Cuisine =
  | 'standard'
  | 'mediterranean'
  | 'asian'
  | 'indian'
  | 'mexican'
  | 'vegetarian'
  | 'vegan'
  | 'keto'

export type DietaryRestriction =
  | 'gluten-free'
  | 'dairy-free'
  | 'nut-free'
  | 'low-carb'
  | 'high-protein'
  | 'budget-friendly'

export const CUISINE_LABELS: Record<Cuisine, string> = {
  standard: 'Standard',
  mediterranean: 'Mediterranean',
  asian: 'Asian',
  indian: 'Indian',
  mexican: 'Mexican',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  keto: 'Keto',
}
