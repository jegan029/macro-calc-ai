import type { MacroInput, MacroResult } from '@/types'
import { lbsToKg, kgToLbs } from './utils'

export function calculateMacros(input: MacroInput): MacroResult {
  const weightLbs = input.unit === 'KG' ? kgToLbs(input.weight) : input.weight
  const weightKg = input.unit === 'LBS' ? lbsToKg(input.weight) : input.weight

  // Professional formula — all based on body weight in lbs
  const calories = Math.round(weightLbs * 9)
  const protein = Math.round(weightLbs * 0.8)
  const fat = Math.round(weightLbs * 0.3)
  const fiber = Math.round((calories / 1000) * 14)
  const carbs = Math.round((calories - weightLbs * 6) / 4)

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
