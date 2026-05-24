'use client'

import { GlassCard } from '@/components/shared/GlassCard'
import type { GroceryCategory } from '@/types/meal-plan'
import { ShoppingCart } from 'lucide-react'

export function GroceryList({ grocery }: { grocery: GroceryCategory[] }) {
  if (!grocery?.length) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ShoppingCart className="size-5 text-neon" />
        <h3 className="font-semibold text-lg">Weekly Grocery List</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {grocery.map((cat) => (
          <GlassCard key={cat.category} className="p-4">
            <h4 className="font-semibold text-sm text-neon mb-3 uppercase tracking-wide">
              {cat.category}
            </h4>
            <ul className="space-y-1.5">
              {cat.items?.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-neon/60 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
