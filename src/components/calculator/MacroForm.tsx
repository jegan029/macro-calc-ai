'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useCalculatorStore } from '@/store/useCalculatorStore'
import { calculateMacros } from '@/lib/calc'
import { UnitToggle } from './UnitToggle'
import { GoalSelector } from './GoalSelector'
import { ActivitySlider } from './ActivitySlider'
import { NeonButton } from '@/components/shared/NeonButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Unit, Goal, ActivityLevel, Gender } from '@/types'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

const schema = z.object({
  weight: z.number({ error: 'Weight is required' }).min(20).max(500),
  height: z.number({ error: 'Height is required' }).min(30).max(300),
  unit: z.enum(['KG', 'LBS']),
  goal: z.enum(['FAT_LOSS', 'MAINTENANCE', 'MUSCLE_GAIN']),
  activityLevel: z.enum(['SEDENTARY', 'LIGHT', 'MODERATE', 'HIGH', 'ATHLETE']),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  age: z.number().min(13).max(100).optional(),
})

type FormValues = z.infer<typeof schema>

export function MacroForm() {
  const router = useRouter()
  const { setInput, setResult } = useCalculatorStore()

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      unit: 'KG',
      goal: 'MAINTENANCE',
      activityLevel: 'MODERATE',
    },
  })

  const unit = watch('unit')
  const goal = watch('goal')
  const activityLevel = watch('activityLevel')

  const onSubmit = (data: FormValues) => {
    const result = calculateMacros({
      weight: data.weight,
      height: data.height,
      unit: data.unit as Unit,
      goal: data.goal as Goal,
      activityLevel: data.activityLevel as ActivityLevel,
      gender: data.gender as Gender | undefined,
      age: data.age,
    })
    setInput({
      weight: data.weight,
      height: data.height,
      unit: data.unit as Unit,
      goal: data.goal as Goal,
      activityLevel: data.activityLevel as ActivityLevel,
      gender: data.gender as Gender | undefined,
      age: data.age,
    })
    setResult(result)
    router.push('/results')
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Weight + Unit */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Body Weight</Label>
          <UnitToggle
            value={unit}
            onChange={(u) => setValue('unit', u)}
          />
        </div>
        <div className="relative">
          <Input
            type="number"
            step="0.1"
            placeholder={unit === 'KG' ? 'e.g. 75' : 'e.g. 165'}
            className="bg-white border-border text-foreground placeholder:text-muted-foreground text-lg h-14 pr-16 focus:border-neon/50 focus:ring-neon/20"
            {...register('weight', { valueAsNumber: true })}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            {unit}
          </span>
        </div>
        {errors.weight && (
          <p className="text-sm text-destructive">{errors.weight.message}</p>
        )}
      </div>

      {/* Height */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Height</Label>
        <div className="relative">
          <Input
            type="number"
            step="0.1"
            placeholder={unit === 'KG' ? 'e.g. 170' : 'e.g. 67'}
            className="bg-white border-border text-foreground placeholder:text-muted-foreground text-lg h-14 pr-16 focus:border-neon/50 focus:ring-neon/20"
            {...register('height', { valueAsNumber: true })}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            {unit === 'KG' ? 'cm' : 'in'}
          </span>
        </div>
        {errors.height && (
          <p className="text-sm text-destructive">{errors.height.message}</p>
        )}
      </div>

      {/* Goal */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Your Goal</Label>
        <GoalSelector
          value={goal}
          onChange={(g) => setValue('goal', g)}
        />
      </div>

      {/* Activity Level */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Activity Level</Label>
        <div className="bg-white border border-border rounded-xl p-5">
          <ActivitySlider
            value={activityLevel}
            onChange={(a) => setValue('activityLevel', a)}
          />
        </div>
      </div>

      {/* Gender + Age */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Gender</Label>
          <Select onValueChange={(v) => setValue('gender', v as Gender)}>
            <SelectTrigger className="bg-white border-border focus:border-neon/50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-white border-border">
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Age</Label>
          <Input
            type="number"
            placeholder="e.g. 28"
            min={13}
            max={100}
            className="bg-white border-border focus:border-neon/50"
            {...register('age', { valueAsNumber: true })}
          />
        </div>
      </div>

      <NeonButton type="submit" size="xl" className="w-full gap-3">
        <Zap className="size-5" />
        Calculate My Macros
      </NeonButton>
    </motion.form>
  )
}
