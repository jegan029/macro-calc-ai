import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'solid' | 'outline' | 'ghost'
}

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ children, className, asChild, size = 'md', variant = 'solid', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50',
          'disabled:opacity-50 disabled:pointer-events-none',
          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' && 'px-6 py-3 text-base',
          size === 'lg' && 'px-8 py-4 text-lg',
          size === 'xl' && 'px-10 py-5 text-xl',
          variant === 'solid' && [
            'bg-neon text-white',
            'hover:bg-neon-dim hover:shadow-[0_4px_20px_var(--neon-glow)]',
            'active:scale-[0.98]',
          ],
          variant === 'outline' && [
            'border border-neon text-neon bg-transparent',
            'hover:bg-neon/10 hover:shadow-[0_4px_15px_var(--neon-glow)]',
          ],
          variant === 'ghost' && [
            'text-neon bg-transparent',
            'hover:bg-neon/10',
          ],
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)

NeonButton.displayName = 'NeonButton'
