import type { Metadata } from 'next'
import { MacroForm } from '@/components/calculator/MacroForm'
import { GlassCard } from '@/components/shared/GlassCard'
import { Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Macro Calculator',
  description: 'Calculate your perfect daily macros — calories, protein, carbs, fats, and fiber — in 10 seconds.',
}

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-background bg-grid bg-spotlight">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 rounded-full px-4 py-2 mb-6">
            <Zap className="size-4 text-neon" />
            <span className="text-sm font-medium text-neon">Takes 10 seconds</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Calculate Your{' '}
            <span className="text-neon">Perfect Macros</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Enter your details and get your personalized daily macro targets instantly.
          </p>
        </div>

        {/* Form */}
        <GlassCard className="p-8">
          <MacroForm />
        </GlassCard>

        {/* Trust signals */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span>✓ Science-backed formulas</span>
          <span>✓ Instant results</span>
          <span>✓ Free forever</span>
        </div>
      </div>
    </div>
  )
}
