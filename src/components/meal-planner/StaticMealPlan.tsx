'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Flame, ChevronDown, Beef, Wheat, Droplets } from 'lucide-react'
import { GlassCard } from '@/components/shared/GlassCard'
import { cn } from '@/lib/utils'

type Goal = 'loss' | 'maintenance' | 'gain'

interface FeaturedMeal {
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
  name: string
  description: string
  calories: number
  protein: number
  carbs: number
  fat: number
  prepTime: string
  image: string
  alt: string
}

interface DaySchedule {
  day: string
  breakfast: string
  lunch: string
  dinner: string
  snack: string
  calories: number
}

interface GoalPlan {
  label: string
  emoji: string
  accentClass: string
  badgeClass: string
  targetCalories: number
  targetProtein: number
  targetCarbs: number
  targetFat: number
  description: string
  featured: FeaturedMeal[]
  schedule: DaySchedule[]
}

const PLANS: Record<Goal, GoalPlan> = {
  loss: {
    label: 'Weight Loss',
    emoji: '🔥',
    accentClass: 'text-blue-400',
    badgeClass: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    targetCalories: 1600,
    targetProtein: 150,
    targetCarbs: 120,
    targetFat: 45,
    description: 'High-protein, calorie-controlled meals that preserve muscle while you shed fat.',
    featured: [
      {
        type: 'Breakfast',
        name: 'Egg White & Veggie Scramble',
        description: 'Fluffy egg whites with spinach, bell peppers, mushrooms, and a sprinkle of feta cheese.',
        calories: 320,
        protein: 36,
        carbs: 22,
        fat: 8,
        prepTime: '12 min',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&auto=format',
        alt: 'Egg white scramble with colorful vegetables',
      },
      {
        type: 'Lunch',
        name: 'Grilled Chicken Caesar Salad',
        description: 'Tender grilled chicken breast over crisp romaine, shaved parmesan, and light Caesar dressing.',
        calories: 460,
        protein: 52,
        carbs: 18,
        fat: 16,
        prepTime: '20 min',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format',
        alt: 'Grilled chicken Caesar salad',
      },
      {
        type: 'Dinner',
        name: 'Baked Salmon with Asparagus',
        description: 'Herb-crusted salmon fillet baked with tender asparagus spears and a squeeze of lemon.',
        calories: 480,
        protein: 42,
        carbs: 14,
        fat: 26,
        prepTime: '28 min',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop&auto=format',
        alt: 'Baked salmon with herbs and asparagus',
      },
      {
        type: 'Snack',
        name: 'Greek Yogurt & Berry Bowl',
        description: 'Low-fat Greek yogurt topped with mixed berries, a drizzle of honey, and crushed walnuts.',
        calories: 220,
        protein: 18,
        carbs: 28,
        fat: 4,
        prepTime: '3 min',
        image: 'https://images.unsplash.com/photo-1510629954389-c1e0da47d414?w=600&h=400&fit=crop&auto=format',
        alt: 'Greek yogurt bowl with fresh berries',
      },
    ],
    schedule: [
      { day: 'Monday',    breakfast: 'Egg White & Veggie Scramble',    lunch: 'Grilled Chicken Caesar Salad',  dinner: 'Baked Salmon & Asparagus',        snack: 'Greek Yogurt & Berries',     calories: 1580 },
      { day: 'Tuesday',   breakfast: 'Protein Overnight Oats',         lunch: 'Turkey Lettuce Wraps',          dinner: 'Grilled Chicken & Steamed Broccoli', snack: 'Apple + Almond Butter',   calories: 1600 },
      { day: 'Wednesday', breakfast: 'Veggie Omelette (2 eggs)',        lunch: 'Tuna Niçoise Salad',            dinner: 'White Fish with Roasted Veg',     snack: 'Cottage Cheese & Cucumber', calories: 1590 },
      { day: 'Thursday',  breakfast: 'Greek Yogurt Parfait',            lunch: 'Chicken & Quinoa Bowl',         dinner: 'Turkey Meatballs & Zucchini',     snack: 'Hard-boiled Eggs (2)',      calories: 1610 },
      { day: 'Friday',    breakfast: 'Protein Smoothie',                lunch: 'Shrimp & Avocado Salad',        dinner: 'Baked Cod with Stir-fry Veg',     snack: 'Celery + Hummus',           calories: 1570 },
      { day: 'Saturday',  breakfast: 'Spinach & Mushroom Scramble',     lunch: 'Quinoa & Black Bean Bowl',      dinner: 'Grilled Salmon & Brown Rice',     snack: 'Low-fat String Cheese',     calories: 1620 },
      { day: 'Sunday',    breakfast: 'Oat Bran Porridge + Berries',     lunch: 'Turkey & Vegetable Soup',       dinner: 'Chicken Breast & Roasted Broccoli', snack: 'Protein Bar (low sugar)', calories: 1600 },
    ],
  },

  maintenance: {
    label: 'Maintenance',
    emoji: '⚖️',
    accentClass: 'text-neon',
    badgeClass: 'bg-neon/10 border-neon/20 text-neon',
    targetCalories: 2000,
    targetProtein: 160,
    targetCarbs: 200,
    targetFat: 60,
    description: 'Balanced, satisfying meals to sustain your current weight and support an active lifestyle.',
    featured: [
      {
        type: 'Breakfast',
        name: 'Avocado Toast with Poached Eggs',
        description: 'Whole-grain toast with smashed avocado, two poached eggs, chilli flakes, and microgreens.',
        calories: 450,
        protein: 22,
        carbs: 40,
        fat: 22,
        prepTime: '12 min',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop&auto=format',
        alt: 'Avocado toast with poached eggs',
      },
      {
        type: 'Lunch',
        name: 'Quinoa Chicken Power Bowl',
        description: 'Fluffy quinoa, grilled chicken, roasted sweet potato, chickpeas, and tahini dressing.',
        calories: 560,
        protein: 48,
        carbs: 58,
        fat: 14,
        prepTime: '25 min',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&auto=format',
        alt: 'Quinoa chicken power bowl with roasted vegetables',
      },
      {
        type: 'Dinner',
        name: 'Turkey Bolognese Pasta',
        description: 'Whole-wheat pasta with a rich lean turkey and tomato sauce, topped with fresh basil.',
        calories: 580,
        protein: 46,
        carbs: 68,
        fat: 12,
        prepTime: '30 min',
        image: 'https://images.unsplash.com/photo-1636044992119-be0892f9de94?w=600&h=400&fit=crop&auto=format',
        alt: 'Turkey bolognese pasta with fresh herbs',
      },
      {
        type: 'Snack',
        name: 'Peanut Butter Rice Cakes',
        description: 'Crispy rice cakes topped with natural peanut butter and sliced banana.',
        calories: 320,
        protein: 10,
        carbs: 40,
        fat: 14,
        prepTime: '3 min',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format',
        alt: 'Healthy snack with rice cakes and peanut butter',
      },
    ],
    schedule: [
      { day: 'Monday',    breakfast: 'Avocado Toast + Poached Eggs',    lunch: 'Quinoa Chicken Power Bowl',     dinner: 'Turkey Bolognese Pasta',          snack: 'PB Rice Cakes + Banana',    calories: 1990 },
      { day: 'Tuesday',   breakfast: 'Overnight Oats + Mixed Berries',  lunch: 'Turkey Club Sandwich',          dinner: 'Chicken Stir-fry & Brown Rice',   snack: 'Trail Mix (30g)',           calories: 2010 },
      { day: 'Wednesday', breakfast: 'Smoothie Bowl + Granola',         lunch: 'Grilled Chicken Wrap',          dinner: 'Beef Tacos (corn tortillas)',     snack: 'Banana + Greek Yogurt',     calories: 2020 },
      { day: 'Thursday',  breakfast: 'Avocado Toast + Poached Eggs',    lunch: 'Lentil & Vegetable Soup',       dinner: 'Baked Salmon & Quinoa',           snack: 'Apple + Almond Butter',     calories: 1980 },
      { day: 'Friday',    breakfast: 'Banana Oat Pancakes',             lunch: 'Buddha Bowl',                   dinner: 'Turkey Burger + Sweet Potato',    snack: 'Granola Bar',               calories: 2030 },
      { day: 'Saturday',  breakfast: 'Veggie Frittata (3 eggs)',        lunch: 'Sushi Rice Bowl',               dinner: 'Grilled Chicken Curry & Rice',    snack: 'Mixed Nuts (30g)',          calories: 2000 },
      { day: 'Sunday',    breakfast: 'Whole-grain Waffles + Berries',   lunch: 'Mediterranean Wrap',            dinner: 'Grilled Steak & Roasted Veg',     snack: 'Hummus + Pita Chips',       calories: 2010 },
    ],
  },

  gain: {
    label: 'Weight Gain',
    emoji: '💪',
    accentClass: 'text-orange-400',
    badgeClass: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    targetCalories: 2600,
    targetProtein: 180,
    targetCarbs: 290,
    targetFat: 75,
    description: 'Calorie-dense, protein-rich meals to fuel muscle growth and support a calorie surplus.',
    featured: [
      {
        type: 'Breakfast',
        name: 'Banana Protein Pancakes',
        description: 'Fluffy oat-banana pancakes with whey protein, topped with honey, berries, and Greek yogurt.',
        calories: 680,
        protein: 42,
        carbs: 88,
        fat: 16,
        prepTime: '20 min',
        image: 'https://images.unsplash.com/photo-1623691752472-a6d33855e5de?w=600&h=400&fit=crop&auto=format',
        alt: 'Protein pancakes with banana and berries',
      },
      {
        type: 'Lunch',
        name: 'Beef & Rice Power Bowl',
        description: 'Seasoned lean ground beef over jasmine rice with avocado, roasted corn, and salsa.',
        calories: 780,
        protein: 52,
        carbs: 86,
        fat: 22,
        prepTime: '25 min',
        image: 'https://images.unsplash.com/photo-1708987379841-2badb0d3a95a?w=600&h=400&fit=crop&auto=format',
        alt: 'Beef rice power bowl with avocado',
      },
      {
        type: 'Dinner',
        name: 'Chicken Alfredo Pasta',
        description: 'Creamy low-fat Alfredo sauce with grilled chicken, whole-wheat pasta, and parmesan.',
        calories: 720,
        protein: 54,
        carbs: 82,
        fat: 20,
        prepTime: '30 min',
        image: 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?w=600&h=400&fit=crop&auto=format',
        alt: 'Creamy chicken alfredo pasta',
      },
      {
        type: 'Snack',
        name: 'Mass Gainer Smoothie',
        description: 'Full-fat milk, banana, peanut butter, oats, honey, and a scoop of protein powder.',
        calories: 520,
        protein: 34,
        carbs: 68,
        fat: 14,
        prepTime: '5 min',
        image: 'https://images.unsplash.com/photo-1602340245382-693d3be7eab5?w=600&h=400&fit=crop&auto=format',
        alt: 'Mass gainer protein smoothie',
      },
    ],
    schedule: [
      { day: 'Monday',    breakfast: 'Banana Protein Pancakes',          lunch: 'Beef & Rice Power Bowl',        dinner: 'Chicken Alfredo Pasta',           snack: 'Mass Gainer Smoothie',      calories: 2600 },
      { day: 'Tuesday',   breakfast: 'Oats + Banana + Peanut Butter',    lunch: 'Chicken & Sweet Potato Bowl',   dinner: 'Salmon & Pasta',                  snack: 'PB & Banana Shake',         calories: 2580 },
      { day: 'Wednesday', breakfast: 'Smoothie Bowl + 2 Toast',          lunch: 'Beef Burrito Bowl',             dinner: 'Pasta Primavera + Chicken',       snack: 'Granola + Full-fat Yogurt', calories: 2620 },
      { day: 'Thursday',  breakfast: 'Banana Protein Pancakes',          lunch: 'Rice + Chicken + Avocado',      dinner: 'Mac & Cheese + Turkey',           snack: 'Mass Gainer Smoothie',      calories: 2600 },
      { day: 'Friday',    breakfast: '3 Eggs + Toast + Avocado',         lunch: 'Tuna & Brown Rice Bowl',        dinner: 'Homemade Beef Pizza',             snack: 'Nuts + Dried Mango',        calories: 2610 },
      { day: 'Saturday',  breakfast: 'Porridge + Berries + Honey',       lunch: 'Beef & Quinoa Bowl',            dinner: 'Chicken Alfredo Pasta',           snack: 'PB Toast + Milk',           calories: 2590 },
      { day: 'Sunday',    breakfast: 'Big Breakfast Bowl (eggs + meat)',  lunch: 'Lamb & Veggie Wrap',            dinner: 'Beef Lasagna',                    snack: 'Protein Bar + Banana',      calories: 2600 },
    ],
  },
}

const TABS: { key: Goal; label: string; emoji: string }[] = [
  { key: 'loss',        label: 'Weight Loss',  emoji: '🔥' },
  { key: 'maintenance', label: 'Maintenance',  emoji: '⚖️' },
  { key: 'gain',        label: 'Weight Gain',  emoji: '💪' },
]

const MEAL_TYPE_COLORS: Record<FeaturedMeal['type'], string> = {
  Breakfast: 'bg-yellow-100 text-yellow-700',
  Lunch:     'bg-green-100 text-green-700',
  Dinner:    'bg-blue-100 text-blue-700',
  Snack:     'bg-purple-100 text-purple-700',
}

export function StaticMealPlan() {
  const [activeGoal, setActiveGoal] = useState<Goal>('loss')
  const [openDay, setOpenDay] = useState<number>(0)
  const plan = PLANS[activeGoal]

  return (
    <div className="space-y-8">
      {/* Tab bar */}
      <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveGoal(tab.key); setOpenDay(0) }}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
              activeGoal === tab.key
                ? 'bg-neon text-black shadow-[0_2px_12px_var(--neon-glow)]'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeGoal}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="space-y-8"
        >
          {/* Goal header */}
          <GlassCard className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className={cn('inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border mb-2', plan.badgeClass)}>
                  {plan.emoji} {plan.label}
                </div>
                <p className="text-sm text-muted-foreground max-w-md">{plan.description}</p>
              </div>
              <div className="flex gap-4 flex-shrink-0">
                {[
                  { icon: <Flame className="size-4 text-orange-400" />, value: plan.targetCalories, label: 'cal/day' },
                  { icon: <Beef className="size-4 text-blue-400" />,    value: `${plan.targetProtein}g`, label: 'protein' },
                  { icon: <Wheat className="size-4 text-yellow-400" />, value: `${plan.targetCarbs}g`,  label: 'carbs' },
                  { icon: <Droplets className="size-4 text-purple-400" />, value: `${plan.targetFat}g`, label: 'fat' },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">{m.icon}</div>
                    <div className="text-sm font-bold">{m.value}</div>
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Featured meals with images */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Signature Meals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {plan.featured.map((meal, i) => (
                <motion.div
                  key={meal.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={meal.image}
                      alt={meal.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className={cn('absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full', MEAL_TYPE_COLORS[meal.type])}>
                      {meal.type}
                    </span>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-full">
                      <Clock className="size-3" />
                      {meal.prepTime}
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <h4 className="font-semibold text-sm leading-tight">{meal.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{meal.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-white/10 text-xs">
                      <span className="text-orange-400 font-semibold">{meal.calories} cal</span>
                      <span className="text-blue-400">{meal.protein}g P</span>
                      <span className="text-yellow-400">{meal.carbs}g C</span>
                      <span className="text-purple-400">{meal.fat}g F</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 7-day schedule */}
          <div>
            <h3 className="font-semibold text-lg mb-4">7-Day Schedule</h3>
            <div className="space-y-2">
              {plan.schedule.map((day, i) => (
                <div key={day.day} className="glass rounded-xl border border-white/10 px-5">
                  <button
                    onClick={() => setOpenDay(openDay === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn('font-semibold text-sm transition-colors', openDay === i ? 'text-neon' : 'text-foreground')}>
                        {day.day}
                      </span>
                      {openDay !== i && (
                        <span className="hidden sm:block text-xs text-muted-foreground truncate max-w-xs">
                          {day.breakfast} · {day.lunch}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">{day.calories.toLocaleString()} cal</span>
                      <ChevronDown className={cn('size-4 text-muted-foreground transition-transform', openDay === i && 'rotate-180')} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {openDay === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {[
                            { label: 'Breakfast', value: day.breakfast, color: 'text-yellow-400' },
                            { label: 'Lunch',     value: day.lunch,     color: 'text-green-400' },
                            { label: 'Dinner',    value: day.dinner,    color: 'text-blue-400' },
                            { label: 'Snack',     value: day.snack,     color: 'text-purple-400' },
                          ].map((item) => (
                            <div key={item.label} className="bg-white/5 rounded-xl p-3">
                              <p className={cn('text-xs font-bold uppercase tracking-wide mb-1', item.color)}>{item.label}</p>
                              <p className="text-sm text-foreground leading-snug">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
