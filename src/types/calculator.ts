export type Unit = 'KG' | 'LBS'
export type Goal = 'FAT_LOSS' | 'MAINTENANCE' | 'MUSCLE_GAIN'
export type ActivityLevel = 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'HIGH' | 'ATHLETE'
export type Gender = 'MALE' | 'FEMALE' | 'OTHER'

export interface MacroInput {
  weight: number
  height: number
  unit: Unit
  goal: Goal
  activityLevel: ActivityLevel
  gender?: Gender
  age?: number
}

export interface MacroResult {
  calories: number
  protein: number
  fat: number
  carbs: number
  fiber: number
  weightKg: number
}

export const GOAL_LABELS: Record<Goal, string> = {
  FAT_LOSS: 'Fat Loss',
  MAINTENANCE: 'Maintenance',
  MUSCLE_GAIN: 'Muscle Gain',
}

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  SEDENTARY: 'Sedentary',
  LIGHT: 'Lightly Active',
  MODERATE: 'Moderately Active',
  HIGH: 'Very Active',
  ATHLETE: 'Athlete',
}

export const ACTIVITY_DESCRIPTIONS: Record<ActivityLevel, string> = {
  SEDENTARY: 'Little or no exercise',
  LIGHT: '1–3 days/week',
  MODERATE: '3–5 days/week',
  HIGH: '6–7 days/week',
  ATHLETE: 'Twice daily training',
}

export const GOAL_DESCRIPTIONS: Record<Goal, string> = {
  FAT_LOSS: 'Lose body fat (−500 cal deficit)',
  MAINTENANCE: 'Maintain current weight',
  MUSCLE_GAIN: 'Build muscle (+300 cal surplus)',
}
