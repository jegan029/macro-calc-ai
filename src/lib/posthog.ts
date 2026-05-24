import { PostHog } from 'posthog-node'

let _posthog: PostHog | null = null

export function getPostHogServer(): PostHog | null {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return null
  if (!_posthog) {
    _posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      flushAt: 1,
      flushInterval: 0,
    })
  }
  return _posthog
}

export function captureEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>
) {
  const ph = getPostHogServer()
  if (!ph) return
  ph.capture({ distinctId, event, properties })
}
