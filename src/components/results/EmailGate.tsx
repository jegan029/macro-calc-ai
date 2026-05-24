'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useCalculatorStore } from '@/store/useCalculatorStore'
import { NeonButton } from '@/components/shared/NeonButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

const schema = z.object({
  firstName: z.string().min(1, 'First name required'),
  email: z.string().email('Valid email required'),
})

type FormValues = z.infer<typeof schema>

export function EmailGate() {
  const { setEmailCaptured, setEmail, setFirstName, input, result } = useCalculatorStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      await fetch('/api/email/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          macros: result,
          goal: input?.goal,
        }),
      })
      setEmail(data.email)
      setFirstName(data.firstName)
      setEmailCaptured(true)
      toast.success('Results unlocked! Check your email for your PDF report.')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-8 max-w-md w-full mx-auto text-center border border-neon/20"
    >
      <div className="flex justify-center mb-4">
        <div className="size-14 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center">
          <Lock className="size-6 text-neon" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">Unlock Your Results</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Enter your email to see your personalized macro breakdown + receive a free PDF report.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
        <div className="space-y-1.5">
          <Label>First Name</Label>
          <Input
            placeholder="Alex"
            className="bg-white/5 border-white/10 focus:border-neon/50"
            {...register('firstName')}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="alex@example.com"
              className="pl-10 bg-white/5 border-white/10 focus:border-neon/50"
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <NeonButton type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
          <Sparkles className="size-4" />
          {isSubmitting ? 'Unlocking...' : 'Show My Macros + PDF'}
        </NeonButton>
      </form>

      <p className="text-xs text-muted-foreground mt-4">
        No spam. Unsubscribe anytime. We respect your privacy.
      </p>
    </motion.div>
  )
}
