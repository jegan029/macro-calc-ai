'use client'

import { motion } from 'framer-motion'
import { Zap, Brain, TrendingUp, Share2, FileDown, Target } from 'lucide-react'

const FEATURES = [
  {
    icon: <Zap className="size-6 text-neon" />,
    iconBg: 'bg-green-50',
    title: '10-Second Calculation',
    description: 'Enter your weight and goal. Get calories, protein, carbs, and fat instantly — no complex formulas needed.',
  },
  {
    icon: <Brain className="size-6 text-blue-500" />,
    iconBg: 'bg-blue-50',
    title: 'AI Meal Planner',
    description: 'Generate a personalized 7-day meal plan with grocery lists powered by GPT-4. Mediterranean, Indian, Keto, and more.',
  },
  {
    icon: <TrendingUp className="size-6 text-purple-500" />,
    iconBg: 'bg-purple-50',
    title: 'Progress Tracking',
    description: 'Log your weight over time, track macro adherence, and see your transformation with beautiful charts.',
  },
  {
    icon: <Share2 className="size-6 text-orange-500" />,
    iconBg: 'bg-orange-50',
    title: 'Viral Sharing',
    description: 'Share your results as a beautiful social card. Challenge friends with your macros and earn rewards.',
  },
  {
    icon: <FileDown className="size-6 text-cyan-500" />,
    iconBg: 'bg-cyan-50',
    title: 'PDF Reports',
    description: 'Download a professional PDF macro report to keep on your phone or send to your coach.',
  },
  {
    icon: <Target className="size-6 text-red-500" />,
    iconBg: 'bg-red-50',
    title: 'Goal-Based Macros',
    description: 'Whether fat loss, maintenance, or muscle gain — macros are adjusted for your specific goal automatically.',
  },
]

export function FeatureGrid() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-muted/40">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Everything You Need to{' '}
            <span className="gradient-text">Transform Your Body</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From calculation to AI meal planning — MacroCalc AI is the last fitness tool you'll ever need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200"
            >
              <div className={`size-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
