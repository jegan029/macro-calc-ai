'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Show, UserButton, SignInButton } from '@clerk/nextjs'
import { NeonButton } from '@/components/shared/NeonButton'
import { cn } from '@/lib/utils'
import { Zap, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '/calculator', label: 'Calculator' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
]

const hasClerk =
  process.env.NODE_ENV !== 'production' || !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="size-8 bg-neon rounded-lg flex items-center justify-center group-hover:shadow-[0_0_16px_var(--neon-glow)] transition-all">
            <Zap className="size-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">MacroCalc AI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-foreground',
                pathname === link.href ? 'text-neon' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {hasClerk ? (
            <>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <NeonButton asChild size="sm">
                  <Link href="/calculator">Get Started Free</Link>
                </NeonButton>
              </Show>
              <Show when="signed-in">
                <NeonButton asChild size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </NeonButton>
                <UserButton />
              </Show>
            </>
          ) : (
            <NeonButton asChild size="sm">
              <Link href="/calculator">Get Started Free</Link>
            </NeonButton>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-white"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'text-sm font-medium py-2 transition-colors',
                    pathname === link.href ? 'text-neon' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border flex flex-col gap-2">
                {hasClerk ? (
                  <>
                    <Show when="signed-out">
                      <NeonButton asChild size="md" className="w-full">
                        <Link href="/calculator" onClick={() => setMobileOpen(false)}>
                          Get Started Free
                        </Link>
                      </NeonButton>
                    </Show>
                    <Show when="signed-in">
                      <NeonButton asChild size="md" className="w-full">
                        <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                          Dashboard
                        </Link>
                      </NeonButton>
                    </Show>
                  </>
                ) : (
                  <NeonButton asChild size="md" className="w-full">
                    <Link href="/calculator" onClick={() => setMobileOpen(false)}>
                      Get Started Free
                    </Link>
                  </NeonButton>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
