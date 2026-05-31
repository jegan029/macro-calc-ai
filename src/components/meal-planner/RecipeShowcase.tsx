'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Flame } from 'lucide-react'

interface Recipe {
  name: string
  cuisine: string
  cuisineColor: string
  calories: number
  protein: number
  carbs: number
  fat: number
  prepTime: string
  description: string
  image: string
  alt: string
}

const FEATURED_RECIPES: Recipe[] = [
  {
    name: 'Grilled Chicken & Quinoa Bowl',
    cuisine: 'High-Protein',
    cuisineColor: 'bg-green-100 text-green-700',
    calories: 540,
    protein: 48,
    carbs: 42,
    fat: 14,
    prepTime: '25 min',
    description: 'Lean grilled chicken over fluffy quinoa with roasted vegetables and a lemon-herb dressing.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&auto=format',
    alt: 'Grilled chicken quinoa bowl with colorful vegetables',
  },
  {
    name: 'Baked Salmon with Asparagus',
    cuisine: 'Mediterranean',
    cuisineColor: 'bg-blue-100 text-blue-700',
    calories: 480,
    protein: 42,
    carbs: 12,
    fat: 28,
    prepTime: '30 min',
    description: 'Omega-3 rich salmon fillet baked with fresh asparagus, garlic, and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop&auto=format',
    alt: 'Baked salmon fillet with herbs and lemon',
  },
  {
    name: 'Rainbow Veggie Power Salad',
    cuisine: 'Vegan',
    cuisineColor: 'bg-purple-100 text-purple-700',
    calories: 380,
    protein: 18,
    carbs: 44,
    fat: 16,
    prepTime: '15 min',
    description: 'A vibrant mix of leafy greens, chickpeas, cherry tomatoes, avocado, and sunflower seeds.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format',
    alt: 'Colorful rainbow salad with fresh vegetables',
  },
  {
    name: 'Overnight Protein Oats',
    cuisine: 'Breakfast',
    cuisineColor: 'bg-orange-100 text-orange-700',
    calories: 420,
    protein: 32,
    carbs: 52,
    fat: 10,
    prepTime: '5 min',
    description: 'Rolled oats soaked overnight with Greek yogurt, chia seeds, protein powder, and fresh berries.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&auto=format',
    alt: 'Overnight oats with berries and toppings',
  },
  {
    name: 'Turkey & Veggie Stir-Fry',
    cuisine: 'Asian',
    cuisineColor: 'bg-red-100 text-red-700',
    calories: 460,
    protein: 38,
    carbs: 36,
    fat: 18,
    prepTime: '20 min',
    description: 'Lean turkey mince stir-fried with broccoli, snap peas, bell peppers, and a light ginger soy glaze.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format',
    alt: 'Colorful stir-fry with vegetables and protein',
  },
  {
    name: 'Avocado Egg White Toast',
    cuisine: 'Keto-Friendly',
    cuisineColor: 'bg-yellow-100 text-yellow-700',
    calories: 350,
    protein: 24,
    carbs: 22,
    fat: 20,
    prepTime: '10 min',
    description: 'Whole-grain toast topped with smashed avocado, fluffy egg whites, chilli flakes, and microgreens.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop&auto=format',
    alt: 'Avocado toast with egg and microgreens',
  },
]

export function RecipeShowcase() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold mb-1">Featured Healthy Recipes</h2>
        <p className="text-sm text-muted-foreground">
          Browse these macro-balanced meals — your AI meal plan will be built around recipes like these.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURED_RECIPES.map((recipe, i) => (
          <motion.div
            key={recipe.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:shadow-lg transition-all duration-200"
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${recipe.cuisineColor}`}>
                {recipe.cuisine}
              </span>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                <Clock className="size-3" />
                {recipe.prepTime}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-sm leading-snug">{recipe.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{recipe.description}</p>

              {/* Macros */}
              <div className="pt-2 border-t border-white/10 flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1 text-xs">
                  <Flame className="size-3 text-orange-400" />
                  <span className="text-orange-400 font-semibold">{recipe.calories}</span>
                  <span className="text-muted-foreground">cal</span>
                </div>
                <span className="text-xs text-blue-400 font-medium">{recipe.protein}g P</span>
                <span className="text-xs text-purple-400 font-medium">{recipe.carbs}g C</span>
                <span className="text-xs text-yellow-400 font-medium">{recipe.fat}g F</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
