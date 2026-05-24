import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/calculator(.*)',
  '/results(.*)',
  '/pricing(.*)',
  '/blog(.*)',
  '/referral(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/macro/calculate',
  '/api/og(.*)',
  '/api/email/capture',
  '/api/referral/track(.*)',
  '/api/webhooks/(.*)',
])

export const proxy = clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
