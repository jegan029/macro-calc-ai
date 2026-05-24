import Link from 'next/link'
import { NeonButton } from '@/components/shared/NeonButton'
import { Home, Calculator } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-neon mb-4">404</p>
        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <NeonButton asChild>
            <Link href="/">
              <Home className="size-4" />
              Go Home
            </Link>
          </NeonButton>
          <NeonButton variant="outline" asChild>
            <Link href="/calculator">
              <Calculator className="size-4" />
              Try Calculator
            </Link>
          </NeonButton>
        </div>
      </div>
    </div>
  )
}
