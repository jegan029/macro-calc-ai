'use client'

import { motion } from 'framer-motion'

const PLATFORMS = [
  { name: 'Instagram', count: '50K+ shares' },
  { name: 'TikTok',    count: '200K+ views' },
  { name: 'YouTube',   count: '30K+ mentions' },
  { name: 'Reddit',    count: '10K+ upvotes' },
  { name: 'Twitter',   count: '25K+ posts' },
  { name: 'Facebook',  count: '15K+ shares' },
]

export function SocialProof() {
  return (
    <section className="py-12 px-4 border-y border-border bg-muted/40">
      <div className="container mx-auto max-w-5xl">
        <p className="text-center text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-widest">
          As featured on
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="font-bold text-base text-foreground">{p.name}</span>
              <span className="text-xs text-muted-foreground">{p.count}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
