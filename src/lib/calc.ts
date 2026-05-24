import type { MacroInput, MacroResult, Goal, ActivityLevel } from '@/types'
import { lbsToKg } from './utils'

const GOAL_MODIFIERS: Record<Goal, number> = {
  FAT_LOSS: 0.9,
  MAINTENANCE: 1.0,
  MUSCLE_GAIN: 1.1,
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  SEDENTARY: 1.0,
  LIGHT: 1.1,
  MODERATE: 1.2,
  HIGH: 1.35,
  ATHLETE: 1.5,
}

export function calculateMacros(input: MacroInput): MacroResult {
  const weightKg = input.unit === 'LBS' ? lbsToKg(input.weight) : input.weight

  const goalMod = GOAL_MODIFIERS[input.goal]
  const activityMult = ACTIVITY_MULTIPLIERS[input.activityLevel]

  const baseCalories = weightKg * 9
  const calories = Math.round(baseCalories * goalMod * activityMult)
  const protein = Math.round(weightKg * 0.8)
  const fat = Math.round(weightKg * 0.3)
  const fiber = Math.round((calories / 1000) * 14)
  const carbs = Math.round(((calories - weightKg) * 6) / 4)

  return { calories, protein, fat, carbs, fiber, weightKg }
}

export function getMacroCalories(result: MacroResult) {
  return {
    proteinCal: result.protein * 4,
    carbsCal: result.carbs * 4,
    fatCal: result.fat * 9,
  }
}

export function getMacroPercentages(result: MacroResult) {
  const { proteinCal, carbsCal, fatCal } = getMacroCalories(result)
  const total = proteinCal + carbsCal + fatCal
  return {
    protein: Math.round((proteinCal / total) * 100),
    carbs: Math.round((carbsCal / total) * 100),
    fat: Math.round((fatCal / total) * 100),
  }
}

export function getHydrationEstimate(calories: number): number {
  return Math.round((calories / 1000) * 0.5 * 10) / 10
}

export function getMealSplit(calories: number) {
  return {
    breakfast: Math.round(calories * 0.25),
    lunch: Math.round(calories * 0.35),
    dinner: Math.round(calories * 0.30),
    snacks: Math.round(calories * 0.10),
  }
}
