'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'How accurate are these macro calculations?',
    a: 'Our formulas are based on proven bodyweight-based approaches used by fitness professionals and popularized by thousands of online coaches. The simple ratios (weight × 9 for calories, weight × 0.8g for protein) have been validated through real-world results from hundreds of thousands of people.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No! You can calculate your macros instantly without an account. Creating a free account lets you save your calculations, track progress, and access the AI meal planner.',
  },
  {
    q: "What's included in the free plan?",
    a: 'The free plan includes unlimited macro calculations, a basic meal plan template, PDF download, and shareable results card. Premium adds AI-powered meal plans, grocery optimization, progress tracking, and weekly coaching insights.',
  },
  {
    q: 'How does the AI meal planner work?',
    a: 'Our AI uses GPT-4 to generate a personalized 7-day meal plan tailored to your exact macro targets, cuisine preference (Mediterranean, Indian, Asian, Mexican, etc.), and dietary restrictions. It also creates a complete grocery list.',
  },
  {
    q: "Can I use this if I'm vegetarian or vegan?",
    a: 'Absolutely! Select vegetarian or vegan in the AI meal planner, and all generated meals, recipes, and grocery lists will be 100% plant-based while still hitting your protein targets.',
  },
  {
    q: 'How often should I recalculate my macros?',
    a: 'We recommend recalculating every 4–6 weeks, or whenever your weight changes by 5+ lbs/2+ kg. Your calorie needs change as your body changes.',
  },
]

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked{' '}
            <span className="text-neon">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass rounded-xl px-6 border border-white/10">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left py-5"
              >
                <span className={cn('font-medium transition-colors', open === i ? 'text-neon' : 'text-foreground')}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn('size-4 flex-shrink-0 text-muted-foreground transition-transform', open === i && 'rotate-180')}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed pb-5">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
