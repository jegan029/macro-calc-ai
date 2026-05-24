import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  neonBorder?: boolean
}

export function GlassCard({ children, className, neonBorder = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-xl p-6',
        neonBorder && 'border-neon/30',
        className
      )}
    >
      {children}
    </div>
  )
}
