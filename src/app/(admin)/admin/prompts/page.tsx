'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/shared/GlassCard'
import { NeonButton } from '@/components/shared/NeonButton'
import { toast } from 'sonner'

const DEFAULT_MEAL_PLAN_PROMPT = `You are a professional nutritionist. Generate a 7-day meal plan for a person with the following macros:
- Daily calories: {calories} kcal
- Protein: {protein}g
- Carbohydrates: {carbs}g
- Fat: {fat}g
- Fiber: {fiber}g
- Goal: {goal}
- Cuisine preference: {cuisine}
- Dietary restrictions: {restrictions}

Return valid JSON matching the MealPlanData schema with days array, each containing meals array.`

export default function AdminPromptsPage() {
  const [prompt, setPrompt] = useState(DEFAULT_MEAL_PLAN_PROMPT)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 500))
    setSaving(false)
    toast.success('Prompt saved (stored in memory for this session)')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">AI Prompt Templates</h1>

      <GlassCard>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Meal Plan Generation Prompt</label>
          <p className="text-xs text-muted-foreground mb-3">
            Available variables: {'{calories}'}, {'{protein}'}, {'{carbs}'}, {'{fat}'}, {'{fiber}'}, {'{goal}'}, {'{cuisine}'}, {'{restrictions}'}
          </p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={12}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm font-mono resize-none focus:outline-none focus:border-neon/50 transition-colors"
          />
        </div>
        <NeonButton onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Prompt'}
        </NeonButton>
      </GlassCard>
    </div>
  )
}
