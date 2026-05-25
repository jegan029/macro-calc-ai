'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCalculatorStore } from '@/store/useCalculatorStore'
import { MacroBreakdown } from '@/components/results/MacroBreakdown'
import type { Goal } from '@/types'

export default function ResultsPage() {
  const router = useRouter()
  const { result, input, firstName } = useCalculatorStore()

  useEffect(() => {
    if (!result || !input) {
      router.replace('/calculator')
    }
  }, [result, input, router])

  if (!result || !input) return null

  return (
    <div className="min-h-screen bg-background bg-grid bg-spotlight">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
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
      </div>
    </div>
  )
}
