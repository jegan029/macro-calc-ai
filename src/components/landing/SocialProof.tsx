'use client'

import { motion } from 'framer-motion'

const PLATFORMS = [
  { name: 'Instagram', count: '50K+ shares' },
  { name: 'TikTok', count: '200K+ views' },
  { name: 'YouTube', count: '30K+ mentions' },
  { name: 'Reddit', count: '10K+ upvotes' },
]

export function SocialProof() {
  return (
    <section className="py-12 px-4 border-y border-white/5">
      <div className="container mx-auto max-w-4xl">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest">
          As seen on
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-bold text-lg text-foreground">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.count}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
