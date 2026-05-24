'use client'

import { useState } from 'react'
import { NeonButton } from '@/components/shared/NeonButton'
import { buildShareUrl } from '@/lib/utils'
import type { MacroResult } from '@/types'
import type { Goal } from '@/types'
import { Share2, Check, Copy } from 'lucide-react'
import { toast } from 'sonner'

interface ShareButtonProps {
  result: MacroResult
  goal: Goal
}

export function ShareButton({ result, goal }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = buildShareUrl({
    calories: result.calories,
    protein: result.protein,
    carbs: result.carbs,
    fat: result.fat,
    fiber: result.fiber,
    goal,
  })

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast.success('Share link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNativeShare = async () => {
    if (!navigator.share) {
      handleCopy()
      return
    }
    await navigator.share({
      title: 'My MacroCalc AI Results',
      text: `My daily macros: ${result.calories} cal | ${result.protein}g protein | ${result.carbs}g carbs | ${result.fat}g fat. Calculate yours ↓`,
      url: shareUrl,
    })
  }

  return (
    <div className="flex gap-2">
      <NeonButton
        variant="outline"
        size="md"
        onClick={handleNativeShare}
        className="flex-1 gap-2"
      >
        <Share2 className="size-4" />
        Share Results
      </NeonButton>
      <NeonButton
        variant="ghost"
        size="md"
        onClick={handleCopy}
        className="gap-2"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </NeonButton>
    </div>
  )
}
