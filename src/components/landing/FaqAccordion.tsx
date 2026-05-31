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
    a: 'No! You can calculate your macros instantly without an account. Creating a free account lets you save your calculations, track progress, and access curated meal plans.',
  },
  {
    q: "Is everything really free?",
    a: 'Yes — 100% free, forever. Unlimited macro calculations, 7-day curated meal plans for every goal, PDF download, shareable results card, and progress tracking. No credit card, no premium tier.',
  },
  {
    q: 'How do the meal plans work?',
    a: 'We offer expert-curated 7-day meal plans for three goals: Weight Loss (1,600 cal), Maintenance (2,000 cal), and Weight Gain (2,600 cal). Each plan includes breakfast, lunch, dinner, and a snack for every day of the week.',
  },
  {
    q: "Can I use this if I'm vegetarian or vegan?",
    a: 'The meal plans are designed with a variety of whole foods. While they are not exclusively plant-based, most meals can be adapted by swapping animal protein for tofu, legumes, or tempeh without significantly changing the macro totals.',
  },
  {
    q: 'How often should I recalculate my macros?',
    a: 'We recommend recalculating every 4–6 weeks, or whenever your weight changes by 5+ lbs/2+ kg. Your calorie needs change as your body changes.',
  },
]

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about MacroCalc AI.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={cn(
                'rounded-xl border transition-all duration-200',
                open === i
                  ? 'border-green-200 bg-green-50/50 shadow-sm'
                  : 'border-border bg-white hover:border-green-200'
              )}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
              >
                <span className={cn('font-medium transition-colors', open === i ? 'text-neon' : 'text-foreground')}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn('size-4 flex-shrink-0 text-muted-foreground transition-transform duration-200', open === i && 'rotate-180')}
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
                    <p className="text-muted-foreground text-sm leading-relaxed px-6 pb-5">
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
