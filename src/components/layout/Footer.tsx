import Link from 'next/link'
import { Zap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="size-7 bg-neon rounded-md flex items-center justify-center">
                <Zap className="size-3.5 text-black" />
              </div>
              <span className="font-bold">MacroCalc AI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Calculate your perfect macros in 10 seconds. Science-backed. Influencer-approved.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2">
              {[
                { href: '/calculator', label: 'Calculator' },
                { href: '/meal-planner', label: 'Meal Planner' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/referral', label: 'Refer & Earn' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2">
              {[
                { href: '/blog', label: 'Blog' },
                { href: '/blog/macro-calculator-women', label: 'Macros for Women' },
                { href: '/blog/macro-calculator-fat-loss', label: 'Fat Loss Guide' },
                { href: '/blog/high-protein-meal-plans', label: 'Meal Plans' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MacroCalc AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Not medical advice. Consult a healthcare professional before making dietary changes.
          </p>
        </div>
      </div>
    </footer>
  )
}
