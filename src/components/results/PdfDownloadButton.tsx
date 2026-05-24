'use client'

import { NeonButton } from '@/components/shared/NeonButton'
import type { MacroResult } from '@/types'
import type { Goal } from '@/types'
import { FileDown } from 'lucide-react'

interface PdfDownloadButtonProps {
  result: MacroResult
  goal: Goal
}

export function PdfDownloadButton({ result, goal }: PdfDownloadButtonProps) {
  const handleDownload = () => {
    const params = new URLSearchParams({
      calories: String(result.calories),
      protein: String(result.protein),
      carbs: String(result.carbs),
      fat: String(result.fat),
      fiber: String(result.fiber),
      goal,
    })
    window.open(`/api/pdf?${params.toString()}`, '_blank')
  }

  return (
    <NeonButton
      variant="outline"
      size="md"
      onClick={handleDownload}
      className="w-full gap-2"
    >
      <FileDown className="size-4" />
      Download PDF Report
    </NeonButton>
  )
}
