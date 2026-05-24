'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useCalculatorStore } from '@/store/useCalculatorStore'
import { EmailGate } from '@/components/results/EmailGate'
import { MacroBreakdown } from '@/components/results/MacroBreakdown'
import type { Goal } from '@/types'

export default function ResultsPage() {
  const router = useRouter()
  const { result, input, emailCaptured, firstName } = useCalculatorStore()

  useEffect(() => {
    if (!result || !input) {
      router.replace('/calculator')
    }
  }, [result, input, router])

  if (!result || !input) return null

  return (
    <div className="min-h-screen bg-background bg-grid bg-spotlight">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <AnimatePresence mode="wait">
          {!emailCaptured ? (
            <motion.div
              key="gate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              {/* Blurred preview */}
              <div className="w-full mb-8 blur-sm pointer-events-none select-none opacity-50">
                <div className="glass rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {['Calories', 'Protein', 'Carbs', 'Fat'].map((label) => (
                      <div key={label} className="glass rounded-xl p-4">
                        <div className="text-xs text-muted-foreground mb-1">{label}</div>
                        <div className="text-3xl font-bold text-neon">•••</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <EmailGate />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MacroBreakdown
                result={result}
                goal={input.goal as Goal}
                firstName={firstName || undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
