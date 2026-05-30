'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { NeonButton } from '@/components/shared/NeonButton'
import { Zap, ArrowRight, TrendingUp } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white bg-hero-blob">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left: copy ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 mb-8"
            >
              <Zap className="size-3.5 text-neon" />
              <span className="text-sm font-medium text-neon">As seen on Instagram &amp; TikTok</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl font-bold leading-tight mb-6 text-foreground"
            >
              Calculate Your{' '}
              <span className="gradient-text">Perfect Macros</span>{' '}
              in 10 Seconds
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              Get calories, protein, carbs, fats, and a custom AI meal plan instantly.
              The #1 macro calculator used by 100,000+ fitness enthusiasts.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-12"
            >
              <NeonButton asChild size="lg" className="w-full sm:w-auto gap-3 shadow-[0_4px_24px_var(--neon-glow)]">
                <Link href="/calculator">
                  <Zap className="size-5" />
                  Calculate My Macros — Free
                </Link>
              </NeonButton>
              <Link
                href="#how-it-works"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors text-sm"
              >
                See How It Works
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>

          </div>

          {/* ── Right: app mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative hidden lg:flex justify-center"
          >
            {/* Main results card */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 w-full max-w-sm">
              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Daily targets</p>
                  <h3 className="font-bold text-foreground">Your Macro Results</h3>
                </div>
                <span className="text-xs bg-green-50 text-neon border border-green-200 px-3 py-1 rounded-full font-semibold">
                  Fat Loss
                </span>
              </div>

              {/* Calories */}
              <div className="text-center mb-6 pb-6 border-b border-gray-100">
                <div className="text-5xl font-bold text-foreground">1,890</div>
                <div className="text-sm text-muted-foreground mt-1">calories / day</div>
              </div>

              {/* Macro bars */}
              <div className="space-y-4">
                {[
                  { label: 'Protein', value: '189g', pct: 74, color: 'bg-green-500' },
                  { label: 'Carbs',   value: '189g', pct: 52, color: 'bg-blue-400' },
                  { label: 'Fat',     value: '63g',  pct: 37, color: 'bg-orange-400' },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-foreground">{m.label}</span>
                      <span className="text-muted-foreground">{m.value}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${m.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${m.pct}%` }}
                        transition={{ duration: 0.8, delay: 0.6 + m.pct * 0.002 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between text-xs text-muted-foreground">
                <span>Fiber: 26g</span>
                <span>Water: 3L/day</span>
              </div>
            </div>

            {/* Floating badge — speed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.05 }}
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg p-3 border border-gray-100"
            >
              <div className="flex items-center gap-2.5">
                <div className="size-9 bg-green-50 rounded-full flex items-center justify-center">
                  <TrendingUp className="size-4 text-neon" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">10 seconds</div>
                  <div className="text-xs text-muted-foreground">to your results</div>
                </div>
              </div>
            </motion.div>


          </motion.div>

        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:hidden bg-white/95 backdrop-blur-md border-t border-border shadow-lg">
        <NeonButton asChild size="lg" className="w-full gap-2">
          <Link href="/calculator">
            <Zap className="size-4" />
            Calculate My Macros — Free
          </Link>
        </NeonButton>
      </div>
    </section>
  )
}
