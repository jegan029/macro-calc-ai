'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Mediterranean Bowl',
    tag: 'High Protein',
    tagColor: 'bg-green-100 text-green-700',
    calories: '520 cal',
    protein: '42g protein',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&auto=format',
    alt: 'Mediterranean chicken bowl with vegetables',
  },
  {
    id: 2,
    title: 'Grilled Salmon & Greens',
    tag: 'Omega-3 Rich',
    tagColor: 'bg-blue-100 text-blue-700',
    calories: '480 cal',
    protein: '38g protein',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop&auto=format',
    alt: 'Grilled salmon with fresh herbs and lemon',
  },
  {
    id: 3,
    title: 'Power Veggie Plate',
    tag: 'Plant-Based',
    tagColor: 'bg-purple-100 text-purple-700',
    calories: '390 cal',
    protein: '22g protein',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format',
    alt: 'Colorful healthy salad with vegetables',
  },
]

export function MealGallery() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-3">Meal Inspiration</p>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Eat Healthy,{' '}
            <span className="gradient-text">Feel Amazing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Our AI generates personalized meal plans from hundreds of healthy recipes tailored to your macros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-neon font-medium">{item.calories}</span>
                  <span>·</span>
                  <span className="text-blue-500 font-medium">{item.protein}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 text-neon font-semibold hover:gap-3 transition-all"
          >
            Get your personalized meal plan
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
