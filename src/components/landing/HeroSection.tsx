'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { NeonButton } from '@/components/shared/NeonButton'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'
import { Zap, ArrowRight, Star } from 'lucide-react'

const STATS = [
  { value: 127000, label: 'Macros Calculated', suffix: '+' },
  { value: 4.9, label: 'App Rating', suffix: '/5', decimals: 1 },
  { value: 10, label: 'Seconds to Results', suffix: 's' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-spotlight" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-neon/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 rounded-full px-4 py-2 mb-8"
        >
          <Zap className="size-3.5 text-neon" />
          <span className="text-sm font-medium text-neon">
            As seen on Instagram & TikTok
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
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
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Get calories, protein, carbs, fats, and a custom AI meal plan instantly.
          The #1 macro calculator used by 100,000+ fitness enthusiasts.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-12"
        >
          <NeonButton asChild size="xl" className="gap-3 shadow-[0_0_30px_rgba(0,255,135,0.3)] w-full sm:w-auto">
            <Link href="/calculator">
              <Zap className="size-5" />
              Calculate My Macros — Free
            </Link>
          </NeonButton>
          <NeonButton asChild size="xl" variant="ghost" className="gap-2 w-full sm:w-auto">
            <Link href="#how-it-works">
              See How It Works
              <ArrowRight className="size-4" />
            </Link>
          </NeonButton>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mb-16"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="size-8 rounded-full border-2 border-background bg-gradient-to-br from-neon/30 to-blue-500/30"
              />
            ))}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="size-3.5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            <strong className="text-foreground">4.9/5</strong> from 2,000+ reviews
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-neon">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:hidden bg-background/90 backdrop-blur-md border-t border-white/5">
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
