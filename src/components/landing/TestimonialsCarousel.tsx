'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    handle: '@sarahfitlife',
    avatar: 'SM',
    avatarColor: 'from-green-300 to-emerald-500',
    result: 'Lost 18 lbs in 12 weeks',
    review: "I've tried every macro calculator out there. This one actually works. Simple, fast, and the AI meal plan helped me hit my targets every day.",
    goal: 'Fat Loss',
  },
  {
    name: 'Marcus T.',
    handle: '@marcusgains',
    avatar: 'MT',
    avatarColor: 'from-blue-300 to-blue-500',
    result: 'Gained 12 lbs of muscle',
    review: "The muscle gain macros were spot on. I finally understand why I wasn't growing before — I was eating way too little protein.",
    goal: 'Muscle Gain',
  },
  {
    name: 'Jessica L.',
    handle: '@jessfitness',
    avatar: 'JL',
    avatarColor: 'from-purple-300 to-purple-500',
    result: 'Maintained for 6 months',
    review: 'Been using this every day. The PDF report made it so easy to share with my nutritionist. 10/10 would recommend.',
    goal: 'Maintenance',
  },
  {
    name: 'Derek K.',
    handle: '@derekcoach',
    avatar: 'DK',
    avatarColor: 'from-orange-300 to-orange-500',
    result: '47 lbs down in 6 months',
    review: 'As a personal trainer, I now recommend MacroCalc AI to ALL my clients. The accuracy is incredible and the AI meal plans save me hours.',
    goal: 'Fat Loss',
  },
  {
    name: 'Priya R.',
    handle: '@priyahealth',
    avatar: 'PR',
    avatarColor: 'from-pink-300 to-pink-500',
    result: 'Built lean muscle in 90 days',
    review: "The Indian cuisine meal plan option was a game changer. Finally a tool that doesn't assume I eat chicken and broccoli every day!",
    goal: 'Muscle Gain',
  },
  {
    name: 'Alex C.',
    handle: '@alexwellness',
    avatar: 'AC',
    avatarColor: 'from-cyan-300 to-cyan-500',
    result: 'Finally consistent with macros',
    review: 'So simple my 60-year-old mom uses it. We both got our macros done in under a minute and now eat according to our goals.',
    goal: 'Maintenance',
  },
]

export function TestimonialsCarousel() {
  return (
    <section className="py-24 px-4 bg-muted/40">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Real Results from{' '}
            <span className="gradient-text">Real People</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join 100,000+ people who've transformed their bodies with MacroCalc AI
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className={`size-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.handle}</p>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="size-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 mb-3 inline-block">
                <span className="text-xs font-semibold text-neon">🏆 {t.result}</span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">"{t.review}"</p>

              <div className="mt-4 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Goal: {t.goal}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
