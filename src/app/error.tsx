'use client'

import { useEffect } from 'react'
import { NeonButton } from '@/components/shared/NeonButton'
import { RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-red-400 mb-4">Error</p>
        <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <NeonButton onClick={reset}>
          <RefreshCw className="size-4" />
          Try Again
        </NeonButton>
      </div>
    </div>
  )
}
