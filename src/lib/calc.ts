import type { MacroInput, MacroResult, ActivityLevel } from '@/types'
import { lbsToKg, kgToLbs } from './utils'

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  SEDENTARY: 1.2,
  LIGHT: 1.375,
  MODERATE: 1.55,
  HIGH: 1.725,
  ATHLETE: 1.9,
}

export function calculateMacros(input: MacroInput): MacroResult {
  // Normalise to metric
  const weightKg = input.unit === 'LBS' ? lbsToKg(input.weight) : input.weight
  const heightCm = input.unit === 'LBS' ? input.height * 2.54 : input.height
  const age = input.age ?? 30

  // Mifflin-St Jeor BMR
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  let bmr: number
  if (input.gender === 'MALE') {
    bmr = base + 5
  } else if (input.gender === 'FEMALE') {
    bmr = base - 161
  } else {
    // OTHER / not provided: average of male and female constants
    bmr = base - 78
  }

  // TDEE
  const tdee = bmr * ACTIVITY_MULTIPLIERS[input.activityLevel]

  // Goal-adjusted calories
  let calories: number
  if (input.goal === 'FAT_LOSS') {
    calories = tdee - 500
  } else if (input.goal === 'MUSCLE_GAIN') {
    calories = tdee + 300
  } else {
    calories = tdee
  }
  calories = Math.round(calories)

  // Protein (WHO sports nutrition ranges, by goal)
  let protein: number
  if (input.goal === 'FAT_LOSS') {
    protein = 2.2 * weightKg
  } else if (input.goal === 'MUSCLE_GAIN') {
    protein = 2.0 * weightKg
  } else {
    protein = 1.8 * weightKg
  }
  protein = Math.round(protein)

  // Fat — 25 % of total calories
  const fat = Math.round((calories * 0.25) / 9)

  // Carbs — remaining calories after protein and fat
  const carbCalories = calories - (protein * 4 + fat * 9)
  const carbs = Math.round(carbCalories / 4)

  // Fiber — WHO: 14 g per 1000 kcal
  const fiber = Math.round((calories / 1000) * 14)

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
