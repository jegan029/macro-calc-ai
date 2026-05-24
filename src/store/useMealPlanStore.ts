'use client'

import { create } from 'zustand'
import type { MealPlanData, GroceryCategory, Cuisine, DietaryRestriction } from '@/types/meal-plan'

interface MealPlanState {
  plan: MealPlanData | null
  grocery: GroceryCategory[] | null
  cuisine: Cuisine
  restrictions: DietaryRestriction[]
  isGenerating: boolean
  streamedText: string
  savedPlanId: string | null
}

interface MealPlanActions {
  setPlan: (plan: MealPlanData) => void
  setGrocery: (grocery: GroceryCategory[]) => void
  setCuisine: (cuisine: Cuisine) => void
  setRestrictions: (restrictions: DietaryRestriction[]) => void
  setIsGenerating: (v: boolean) => void
  appendStreamedText: (text: string) => void
  resetStream: () => void
  setSavedPlanId: (id: string | null) => void
  reset: () => void
}

export const useMealPlanStore = create<MealPlanState & MealPlanActions>()((set) => ({
  plan: null,
  grocery: null,
  cuisine: 'standard',
  restrictions: [],
  isGenerating: false,
  streamedText: '',
  savedPlanId: null,

  setPlan: (plan) => set({ plan }),
  setGrocery: (grocery) => set({ grocery }),
  setCuisine: (cuisine) => set({ cuisine }),
  setRestrictions: (restrictions) => set({ restrictions }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  appendStreamedText: (text) => set((s) => ({ streamedText: s.streamedText + text })),
  resetStream: () => set({ streamedText: '' }),
  setSavedPlanId: (savedPlanId) => set({ savedPlanId }),
  reset: () =>
    set({
      plan: null,
      grocery: null,
      isGenerating: false,
      streamedText: '',
      savedPlanId: null,
    }),
}))
