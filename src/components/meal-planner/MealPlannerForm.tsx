'use client'

import { useCalculatorStore } from '@/store/useCalculatorStore'
import { useMealPlanStore } from '@/store/useMealPlanStore'
import { NeonButton } from '@/components/shared/NeonButton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GlassCard } from '@/components/shared/GlassCard'
import { Label } from '@/components/ui/label'
import { CUISINE_LABELS, type Cuisine } from '@/types/meal-plan'
import { Brain, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export function MealPlannerForm() {
  const { result } = useCalculatorStore()
  const { cuisine, setCuisine, setPlan, setGrocery, isGenerating, setIsGenerating } = useMealPlanStore()

  const handleGenerate = async () => {
    if (!result) {
      toast.error('Please calculate your macros first.')
      return
    }

    setIsGenerating(true)
    try {
      const res = await fetch('/api/meal-plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ macros: result, cuisine, restrictions: [], generateGrocery: true }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? 'Failed to generate')
      }

      const data = await res.json()
      setPlan(data.plan)
      if (data.grocery) setGrocery(data.grocery)
      toast.success('7-day meal plan generated!')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to generate meal plan')
    } finally {
      setIsGenerating(false)
    }
  }

  if (!result) {
    return (
      <GlassCard className="text-center p-8">
        <Brain className="size-10 text-neon mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Calculate Your Macros First</h2>
        <p className="text-muted-foreground text-sm mb-6">
          The AI meal planner needs your macro targets to create a personalized plan.
        </p>
        <NeonButton asChild size="lg">
          <Link href="/calculator">Calculate Macros</Link>
        </NeonButton>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="space-y-5">
      <div className="flex items-center gap-2">
        <Brain className="size-5 text-neon" />
        <h2 className="font-semibold text-lg">AI Meal Planner</h2>
      </div>

      <div className="bg-neon/5 border border-neon/20 rounded-xl p-4 text-sm">
        <p className="text-muted-foreground mb-1">Generating plan for:</p>
        <p className="font-semibold text-neon">
          {result.calories} cal · {result.protein}g protein · {result.carbs}g carbs · {result.fat}g fat
        </p>
      </div>

      <div className="space-y-2">
        <Label>Cuisine Style</Label>
        <Select value={cuisine} onValueChange={(v) => setCuisine(v as Cuisine)}>
          <SelectTrigger className="bg-white/5 border-white/10 focus:border-neon/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-white/10">
            {(Object.entries(CUISINE_LABELS) as [Cuisine, string][]).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <NeonButton
        size="lg"
        className="w-full gap-2"
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Generating 7-Day Plan...
          </>
        ) : (
          <>
            <Brain className="size-4" />
            Generate 7-Day Meal Plan
          </>
        )}
      </NeonButton>
    </GlassCard>
  )
}
