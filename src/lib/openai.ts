import OpenAI from 'openai'
import type { MacroResult } from '@/types'
import type { Cuisine, DietaryRestriction } from '@/types/meal-plan'

let _openai: OpenAI | null = null

export function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  return _openai
}

export const openai = new Proxy({} as OpenAI, {
  get(_target, prop) {
    return getOpenAI()[prop as keyof OpenAI]
  },
})

export function buildMealPlanPrompt(
  macros: MacroResult,
  cuisine: Cuisine,
  restrictions: DietaryRestriction[],
  days = 7
): string {
  const restrictionText = restrictions.length
    ? `Dietary restrictions: ${restrictions.join(', ')}.`
    : ''

  return `Generate a ${days}-day ${cuisine} meal plan for someone with these daily macro targets:
- Calories: ${macros.calories} kcal
- Protein: ${macros.protein}g
- Carbs: ${macros.carbs}g
- Fat: ${macros.fat}g
- Fiber: ${macros.fiber}g

${restrictionText}

Return a JSON object with this exact structure:
{
  "days": [
    {
      "day": "Monday",
      "breakfast": { "name": "", "description": "", "calories": 0, "protein": 0, "carbs": 0, "fat": 0, "prepTime": "10 min", "ingredients": [] },
      "lunch": { "name": "", "description": "", "calories": 0, "protein": 0, "carbs": 0, "fat": 0, "prepTime": "15 min", "ingredients": [] },
      "dinner": { "name": "", "description": "", "calories": 0, "protein": 0, "carbs": 0, "fat": 0, "prepTime": "25 min", "ingredients": [] },
      "snacks": [{ "name": "", "description": "", "calories": 0, "protein": 0, "carbs": 0, "fat": 0 }],
      "totalCalories": 0,
      "totalProtein": 0,
      "totalCarbs": 0,
      "totalFat": 0
    }
  ],
  "summary": "Brief overview of the meal plan",
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}

Make all meals realistic, practical, and hit close to the macro targets. Use real food names.`
}

export function buildGroceryPrompt(macros: MacroResult, cuisine: Cuisine): string {
  return `Based on a ${cuisine} meal plan with these daily macros (${macros.calories} cal, ${macros.protein}g protein, ${macros.carbs}g carbs, ${macros.fat}g fat), create a weekly grocery list.

Return a JSON array of categories:
[
  {
    "category": "Proteins",
    "items": ["Chicken breast 2 lbs", "Greek yogurt 32 oz", ...]
  },
  {
    "category": "Vegetables",
    "items": [...]
  },
  {
    "category": "Fruits",
    "items": [...]
  },
  {
    "category": "Grains & Carbs",
    "items": [...]
  },
  {
    "category": "Dairy & Eggs",
    "items": [...]
  },
  {
    "category": "Healthy Fats",
    "items": [...]
  },
  {
    "category": "Pantry Staples",
    "items": [...]
  }
]

Include quantities. Keep total estimated cost under $100/week.`
}
