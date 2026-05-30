export const dynamic = 'force-dynamic'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { Zap, LayoutDashboard, ChefHat, TrendingUp, Settings, Gift } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/meal-planner', label: 'Meal Planner', icon: ChefHat },
  { href: '/calculator', label: 'Calculator', icon: TrendingUp },
  { href: '/referral', label: 'Refer & Earn', icon: Gift },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) redirect('/')
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-sidebar min-h-screen">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 bg-neon rounded-lg flex items-center justify-center">
              <Zap className="size-4 text-black" />
            </div>
            <span className="font-bold">MacroCalc AI</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <UserButton />
            <div className="text-sm">
              <p className="font-medium text-foreground">Account</p>
              <p className="text-xs text-muted-foreground">Manage profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 h-14 flex items-center px-4 gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-7 bg-neon rounded-md flex items-center justify-center">
            <Zap className="size-3.5 text-black" />
          </div>
          <span className="font-bold text-sm">MacroCalc AI</span>
        </Link>
        <div className="ml-auto">
          <UserButton />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:pt-0 pt-14 overflow-auto">
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
